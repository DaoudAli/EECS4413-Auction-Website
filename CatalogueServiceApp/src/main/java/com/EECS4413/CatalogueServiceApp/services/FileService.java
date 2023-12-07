package com.EECS4413.CatalogueServiceApp.services;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);
    private List<String> uploadedFileNames = new ArrayList<>();

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            LOG.error("Error {} occurred while converting the multipart file", e.getLocalizedMessage());
        }
        return file;
    }

    // @Async annotation ensures that the method is executed in a different thread

    @Async
    public S3ObjectInputStream findByName(String fileName) {
        LOG.info("Downloading file with name {}", fileName);
        return amazonS3.getObject(s3BucketName, fileName).getObjectContent();
    }

    @Async
    public void save(final MultipartFile multipartFile) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = LocalDateTime.now() + "_" + file.getName();
            uploadedFileNames.add(fileName); // Add the file name to the list
            LOG.info("Uploading file with name {}", fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath()); // Remove the file locally created in the project folder
        } catch (AmazonServiceException e) {
            LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        } catch (IOException ex) {
            LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Async
    public String uploadFile(final MultipartFile multipartFile) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = LocalDateTime.now() + "_" + file.getName();

            LOG.info("Uploading file with name {}", fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath()); // Remove the local file

            // Set the expiration time within the 7-day limit
            Date expiration = new Date(System.currentTimeMillis() + 3600 * 165000); // 1 hour from now

            // Generate the pre-signed URL
            URL presignedUrl = amazonS3.generatePresignedUrl(s3BucketName, fileName, expiration, HttpMethod.GET);

            System.out.println("Pre-Signed URL: " + presignedUrl.toString());
            return presignedUrl.toString();

        } catch (AmazonServiceException e) {
            LOG.error("Error occurred while uploading file", e.getLocalizedMessage());
            return null;
        } catch (IOException ex) {
            LOG.error("Error occurred while deleting temporary file", ex.getLocalizedMessage());
            return null;
        }
    }

    public List<String> getUploadedFileNames() {
        return new ArrayList<>(uploadedFileNames); // Return a copy of the list
    }

    public void clearUploadedFileNames() {
        uploadedFileNames.clear(); // Clear the list
    }
}