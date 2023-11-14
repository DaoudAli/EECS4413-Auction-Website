package com.EECS4413.PaymentServiceApp.controller;

import org.springframework.web.bind.annotation.*;

//import com.EECS4413.PaymentServiceApp.services.AuctionServiceClient;

import com.EECS4413.PaymentServiceApp.model.*;
import com.EECS4413.PaymentServiceApp.database.PaymentRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.EECS4413.PaymentServiceApp.util.Util;
//**********************************************************************************************
// Swagger / OpenAPI Documentation available at: http://localhost:3400/swagger-ui/index.html#/
//**********************************************************************************************

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentRepository paymentRepository;
    // private final AuctionServiceClient auctionServiceClient;

    // public PaymentController(PaymentRepository paymentRepository,
    // AuctionServiceClient auctionServiceClient) {
    // this.paymentRepository = paymentRepository;
    // this.auctionServiceClient = auctionServiceClient;

    // }

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Operation(summary = "Get all payments", description = "Retrieve a list of all payments")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all payments", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class)))
    @GetMapping("/all")
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        if (payments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    // @Operation(summary = "Get all bids for an item", description = "Retrieve a
    // list of all bids for a specific item")
    // @ApiResponse(responseCode = "200", description = "Successfully retrieved all
    // bids for the item", content = @Content(mediaType = "application/json", schema
    // = @Schema(implementation = Bid.class)))
    // @GetMapping("/{itemId}/bids")
    // public ResponseEntity<List<Bid>> getAllBidsForItem(@PathVariable Long itemId)
    // {
    // List<Bid> bids = bidRepository.findByItemId(itemId);
    //
    // return new ResponseEntity<>(bids, HttpStatus.OK);
    // }

    @Operation(summary = "Make a payment", description = "Submit a payment")
    @ApiResponse(responseCode = "201", description = "Payment successful", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Payment.class)))
    @ApiResponse(responseCode = "400", description = "Invalid payment submission")
    @PostMapping("/pay")
    public ResponseEntity<?> makePayment(@RequestBody Payment payment) {
        if (payment.getCardNumber().isEmpty() || Util.containsNonNumeric(payment.getCardNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input on Card Number");
        }
        // Use the Feign client to check if the item exists in the CatalogueService
        // AuctionDTO auctionDTO;
        // try {
        // auctionDTO = auctionServiceClient.getItemById(itemId);
        // if (auctionDTO.getCurrentBidPrice().doubleValue() < bid.getAmount()) {
        // auctionDTO.setCurrentBidPrice(BigDecimal.valueOf(bid.getAmount()));
        // auctionServiceClient.updateItem(itemId, itemDTO);
        // }
        // } catch (FeignException.NotFound e) {
        // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        // }

        // Additional validation for the bid can be placed here
        // For example, check if the bid amount is higher than the current bid, etc.

        // Associate the bid with the item ID
        // payment.setItemId(itemId);

        // Save the new bid
        Payment newPayment = paymentRepository.save(payment);
        // Return the response entity with the saved bid
        return ResponseEntity.status(HttpStatus.CREATED).body(newPayment);
    }

}