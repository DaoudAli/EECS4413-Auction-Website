import React, { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCatalogue } from '@/context/CatalogueContext';
import { catalogueServiceApi } from '@/api/spring-services-api';
import { useDropzone } from 'react-dropzone';
import { Link } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import withAuth from '@/hoc/withAuth';

function AuctionItemForm() {
  // Router for Pages
  const router = useRouter();
  const { addItem } = useCatalogue(); // Get addItem function from context

  const { currentUser } = useAuth();
  const maxSize = 10 * 1024 * 1024; // 5 Megabytes

  const [itemName, setItemName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setItemImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'image/webp': [],
    },
    maxSize,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare formData
    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', itemDescription);
    formData.append('keywords', keywords);
    formData.append('sellerId', currentUser.id);
    itemImages.forEach((file) => formData.append('images', file));

    try {
      console.log('Form data in /add: ', formData.getAll);
      await addItem(formData); // Use addItem from context
      router.push('/catalogue/sell');
      // Handle successful submission (e.g., redirect or show a message)
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="mx-auto py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 p-4 bg-gray-900 rounded-lg shadow-md w-full max-w-2xl mx-auto justify-center"
        >
          <h1 className="text-4xl font-bold text-white text-center">
            Add a New Item to Sell
          </h1>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="auction-type"
            >
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white`}
            />
          </div>
          <div>
            <label htmlFor="itemDescription">Description</label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              rows={4}
              className={`flex  w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white`}
            />
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="auction-type"
            >
              Item Keywords
            </label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white`}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-white">Item Image(s)</label>

            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-600 rounded-md flex flex-col items-center justify-center p-4 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-white"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m16 16-4-4-4 4"></path>
              </svg>
              <span className="mt-2 text-white">
                Drag &amp; drop or click to upload item images
              </span>

              <input {...getInputProps()} />
            </div>
          </div>
          <div>
            {itemImages.map((file) => (
              <Image
                key={file.name}
                src={file.preview}
                alt={file.name}
                width={500}
                height={500}
                className="h-20 w-20 object-cover"
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
export default withAuth(AuctionItemForm);
