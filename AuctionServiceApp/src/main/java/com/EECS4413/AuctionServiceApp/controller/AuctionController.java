package com.EECS4413.AuctionServiceApp.controller;

import org.springframework.web.bind.annotation.*;

import com.EECS4413.AuctionServiceApp.client.CatalogueServiceClient;
import com.EECS4413.AuctionServiceApp.dto.ItemDTO;
import com.EECS4413.AuctionServiceApp.model.*;
import com.EECS4413.AuctionServiceApp.repository.BidRepository;

import feign.FeignException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

//**********************************************************************************************
// Swagger / OpenAPI Documentation available at: http://localhost:3100/swagger-ui/index.html#/
//**********************************************************************************************

@RestController
@RequestMapping("/auctions")
public class AuctionController {
    private final BidRepository bidRepository;
    private final CatalogueServiceClient catalogueServiceClient;

    public AuctionController(BidRepository bidRepository, CatalogueServiceClient catalogueServiceClient) {
        this.bidRepository = bidRepository;
        this.catalogueServiceClient = catalogueServiceClient;

    }

    @Operation(summary = "Get all bids for an item", description = "Retrieve a list of all bids for a specific item")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all bids for the item", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @GetMapping("/{itemId}/bids")
    public ResponseEntity<List<Bid>> getAllBids() {
        List<Bid> bids = bidRepository.findAll();

        return new ResponseEntity<>(bids, HttpStatus.OK);
    }

    @Operation(summary = "Place a bid on a forward auction", description = "Submit a new bid for an item in a forward auction")
    @ApiResponse(responseCode = "201", description = "Bid placed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "404", description = "Item not found")
    @ApiResponse(responseCode = "400", description = "Invalid bid submission")
    @PostMapping("/{itemId}/bids")
    public ResponseEntity<?> placeForwardAuctionBid(@PathVariable Long itemId, @RequestBody Bid bid) {
        // Use the Feign client to check if the item exists in the CatalogueService
        ItemDTO itemDTO;
        try {
            itemDTO = catalogueServiceClient.getItemById(itemId);
            if (itemDTO.getCurrentBidPrice().doubleValue() < bid.getAmount()) {
                itemDTO.setCurrentBidPrice(BigDecimal.valueOf(bid.getAmount()));
                catalogueServiceClient.updateItem(itemId, itemDTO);
            }
        } catch (FeignException.NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        }

        // Additional validation for the bid can be placed here
        // For example, check if the bid amount is higher than the current bid, etc.

        // Associate the bid with the item ID
        bid.setItemId(itemId);

        // Save the new bid
        Bid savedBid = bidRepository.save(bid);

        // Return the response entity with the saved bid
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBid);
    }

    @Operation(summary = "Get highest bid for item", description = "Retrieve the highest bid for a specific item")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved highest bid", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)) })
    @ApiResponse(responseCode = "404", description = "Item not found or no bids available")
    @GetMapping("/{itemId}/bids/highest")
    public ResponseEntity<Bid> getHighestBidForItem(@PathVariable Long itemId) {
        return bidRepository.findTopByItemIdOrderByAmountDesc(itemId)
                .map(bid -> new ResponseEntity<>(bid, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Operation(summary = "Place a 'Buy Now' bid on a Dutch auction", description = "Immediately purchase an item at its 'Buy Now' price in a Dutch auction")
    @ApiResponse(responseCode = "201", description = "Item purchased successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "400", description = "Item not available for 'Buy Now'")
    @PostMapping("/{itemId}/buy-now")
    public ResponseEntity<?> placeDutchAuctionBid(@PathVariable Long itemId, @RequestBody Bid bid) {

        // Check if Buy Now is applicable for the item
        // Check if the item exists or if it is still available for Buy Now
        // Verify the buyNowBid amount matches the Buy Now price
        // Create a bid with a status that indicates it is a winning bid due to Buy Now
        // Update item status to reflect it is no longer available for bidding
        // Logic to handle the immediate purchase at Buy Now price
        // This could involve checking if the item has not already been sold or if the
        // auction is still active
        // It may also require interaction with other services to verify the item's
        // status and to update it as sold

        boolean itemAvailable = true;

        if (itemAvailable) {
            bid.setItemId(itemId);
            // buyNowBid.setWinningBid(true);
            Bid savedBid = bidRepository.save(bid);

            return new ResponseEntity<>(savedBid, HttpStatus.CREATED);
        } else {
            // Handle case where the item is not available for Buy Now
            return new ResponseEntity<>("Item is not available for Buy Now.", HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "Check auction status", description = "Get the status of an auction, including whether it has ended and details of the winning bidder")
    @ApiResponse(responseCode = "200", description = "Auction status retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "404", description = "Auction not found")
    @GetMapping("/{itemId}/status")
    public ResponseEntity<?> getAuctionStatus(@PathVariable Long itemId) {
        // Use the Feign client to check if the item exists in the CatalogueService
        ItemDTO itemDTO;
        try {
            itemDTO = catalogueServiceClient.getItemById(itemId);

        } catch (FeignException.NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        }
        // TODO: Implement the logic to return the status of the item/auction
        return new ResponseEntity<>(itemDTO.getEndTime(), HttpStatus.OK);
        // Logic to get the status of the auction goes here
    }

    public ItemDTO getItemDetails(Long itemId) {
        return catalogueServiceClient.getItemById(itemId);
    }
    // Additional bid-related endpoints...
}