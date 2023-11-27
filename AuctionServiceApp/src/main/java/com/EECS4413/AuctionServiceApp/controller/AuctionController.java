package com.EECS4413.AuctionServiceApp.controller;

import org.springframework.web.bind.annotation.*;

import com.EECS4413.AuctionServiceApp.database.AuctionRepository;
import com.EECS4413.AuctionServiceApp.database.BidRepository;
import com.EECS4413.AuctionServiceApp.dto.ItemDTO;
import com.EECS4413.AuctionServiceApp.model.*;
import com.EECS4413.AuctionServiceApp.model.Auction.AuctionStatus;
import com.EECS4413.AuctionServiceApp.services.CatalogueServiceClient;

import feign.FeignException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

//**********************************************************************************************
// Swagger / OpenAPI Documentation available at: http://localhost:3200/swagger-ui/index.html#/
//**********************************************************************************************

@RestController
@RequestMapping("/auctions")
public class AuctionController {
    private final BidRepository bidRepository;
    private final AuctionRepository auctionRepository;
    private final CatalogueServiceClient catalogueServiceClient;

    public AuctionController(BidRepository bidRepository, AuctionRepository auctionRepository,
            CatalogueServiceClient catalogueServiceClient) {
        this.bidRepository = bidRepository;
        this.auctionRepository = auctionRepository;
        this.catalogueServiceClient = catalogueServiceClient;

    }

    @Operation(summary = "Get service health", description = "Check if service is up")
    @ApiResponse(responseCode = "200", description = "Service is up")
    @GetMapping("/health")
    public ResponseEntity<?> getServiceHealth() {

        return new ResponseEntity<>("Service is running", HttpStatus.OK);
    }

    @Operation(summary = "Get all auctions", description = "Retrieve a list of all auctions")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all auctions", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @GetMapping
    public ResponseEntity<List<Auction>> getAllAuctions() {
        List<Auction> auctions = auctionRepository.findAll();

        return new ResponseEntity<>(auctions, HttpStatus.OK);
    }

    @Operation(summary = "Get auction by Id", description = "Retrieve details of an auction by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved auction details", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Auction.class)))
    @ApiResponse(responseCode = "404", description = "Auction not found")
    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getAuctionDetails(@PathVariable Long auctionId) {
        Optional<Auction> auctionOptional = auctionRepository.findById(auctionId);

        if (auctionOptional.isPresent()) {
            Auction auction = auctionOptional.get();
            // Optionally, you might want to include additional details like item
            // information
            // or highest bid, depending on your application's requirements
            return new ResponseEntity<>(auction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Auction not found", HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get all bids", description = "Retrieve a list of all bids")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all bids", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @GetMapping("/bids")
    public ResponseEntity<List<Bid>> getAllBids() {
        List<Bid> bids = bidRepository.findAll();

        return new ResponseEntity<>(bids, HttpStatus.OK);
    }

    @Operation(summary = "Get bid by Id", description = "Retrieve details of a bid by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved bid details", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "404", description = "Bid not found")
    @GetMapping("/bids/{bidId}")
    public ResponseEntity<?> getBidDetails(@PathVariable Long bidId) {
        Optional<Bid> bidOptional = bidRepository.findById(bidId);

        if (bidOptional.isPresent()) {
            return new ResponseEntity<>(bidOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bid not found", HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get all bids for an auction", description = "Retrieve a list of all bids for a specific auction")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all bids for the item", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @GetMapping("/{auctionId}/bids")
    public ResponseEntity<List<Bid>> getAllBidsForAuction(@PathVariable Long auctionId) {
        List<Bid> bids = bidRepository.findByAuctionId(auctionId);

        return new ResponseEntity<>(bids, HttpStatus.OK);
    }

    @Operation(summary = "Place a bid on a forward auction", description = "Submit a new bid for an item in a forward auction")
    @ApiResponse(responseCode = "201", description = "Bid placed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "404", description = "Item not found")
    @ApiResponse(responseCode = "400", description = "Invalid bid submission")
    @PostMapping("/{itemId}/bids")
    public ResponseEntity<?> placeForwardAuctionBid(@PathVariable Long itemId, @RequestBody Bid bid) {
        try {
            // Check if the item exists using the CatalogueServiceClient
            ItemDTO itemDTO = catalogueServiceClient.getItemById(itemId);

            // Check if the auction exists for this item
            Optional<Auction> auctionOptional = auctionRepository.findByItemId(itemId);
            Auction auction;

            if (auctionOptional.isPresent()) {
                // Use the existing auction
                auction = auctionOptional.get();
            } else {
                // Create a new auction as it does not exist
                auction = new Auction();
                auction.setItemId(itemId);
                auction.addItemDetails(itemDTO);
                auction.calculateStatus(); // Implement this method in Auction
                auctionRepository.save(auction);
            }
            // Check if the auction type is FORWARD
            if (auction.getType() != Auction.AuctionType.FORWARD
                    || auction.getStatus() != Auction.AuctionStatus.ACTIVE) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Item not available for bidding.");
            }
            // Get the highest bid for this auction
            Bid highestBid = getHighestBidForAuction(auction.getId());

            // Check if the new bid is higher than the highest bid
            if (highestBid != null && bid.getAmount() <= highestBid.getAmount()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Bid must be higher than the current highest bid.");
            }

            // Save the new bid
            bid.setAuctionId(auction.getId());
            Bid savedBid = bidRepository.save(bid);

            // Update auction status if necessary
            auction.calculateStatus();
            auctionRepository.save(auction);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedBid);
        } catch (FeignException.NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        }
    }

    @Operation(summary = "Get highest bid for an item", description = "Retrieve the highest bid for a specific item")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved highest bid", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)) })
    @ApiResponse(responseCode = "404", description = "Item not found or no bids available")
    @GetMapping("/{auctionId}/bids/highest")
    public ResponseEntity<Bid> getHighestBidForItem(@PathVariable Long auctionId) {
        Optional<Auction> auction = auctionRepository.findById(auctionId);
        if (auction.isPresent()) {
            Bid highestBid = bidRepository.findByAuctionId(auction.get().getId()).stream()
                    .max(Comparator.comparing(Bid::getAmount))
                    .orElse(null);
            if (highestBid != null) {
                return new ResponseEntity<>(highestBid, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Place a 'Buy Now' bid on an item up for Dutch auction", description = "Immediately purchase an item at its 'Buy Now' price in a Dutch auction")
    @ApiResponse(responseCode = "201", description = "Item purchased successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "400", description = "Item not available for 'Buy Now'")
    @PostMapping("/{auctionId}/buy-now")
    public ResponseEntity<?> placeDutchAuctionBid(@PathVariable Long auctionId, @RequestBody Bid bid) {

        Optional<Auction> optionalAuction = auctionRepository.findByItemId(auctionId);

        if (!optionalAuction.isPresent()) {
            return new ResponseEntity<>("Auction not found.", HttpStatus.NOT_FOUND);
        }

        Auction auction = optionalAuction.get();
        // Check auction type and status
        if (auction.getType() != Auction.AuctionType.DUTCH
                || auction.getStatus() != Auction.AuctionStatus.ACTIVE) {
            return new ResponseEntity<>("Item not available for 'Buy Now'.", HttpStatus.BAD_REQUEST);
        }
        // Check if the auction type is FORWARD
        if (auction.getType() != Auction.AuctionType.DUTCH) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Only dutch auctions are eligible to buy now.");
        }
        // Verify buyNowBid amount
        if (bid.getAmount().compareTo(auction.getStartBidPrice().doubleValue()) != 0) {
            // getBuyNowPrice method
            return new ResponseEntity<>("Invalid bid amount for 'Buy Now'.", HttpStatus.BAD_REQUEST);
        }

        // Process the bid and auction update
        bid.setAuctionId(auction.getId());
        Bid savedBid = bidRepository.save(bid);

        auction.setStatus(Auction.AuctionStatus.SOLD); // Update auction status
        auctionRepository.save(auction);

        return new ResponseEntity<>(savedBid, HttpStatus.CREATED);

    }

    @Operation(summary = "Check auction status", description = "Get the status of an auction, including whether it has ended and details of the winning bidder")
    @ApiResponse(responseCode = "200", description = "Auction status retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Bid.class)))
    @ApiResponse(responseCode = "404", description = "Auction not found")
    @GetMapping("/{auctionId}/status")
    public ResponseEntity<?> getAuctionStatus(@PathVariable Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (!optionalAuction.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Auction not found.");
        }

        Auction auction = optionalAuction.get();

        // You can directly return the auction object or create a custom DTO to format
        // the response
        // For example:
        return new ResponseEntity<>(auction, HttpStatus.OK);
    }

    @Operation(summary = "Delete a bid", description = "Delete a bid by its ID")
    @ApiResponse(responseCode = "200", description = "Bid deleted successfully")
    @ApiResponse(responseCode = "404", description = "Bid not found")
    @DeleteMapping("/bids/{bidId}")
    public ResponseEntity<?> deleteBid(@PathVariable Long bidId) {
        Optional<Bid> bidOptional = bidRepository.findById(bidId);
        if (bidOptional.isPresent()) {
            bidRepository.deleteById(bidId);
            return new ResponseEntity<>("Bid deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bid not found", HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Delete an auction", description = "Delete an auction by its ID")
    @ApiResponse(responseCode = "200", description = "Auction deleted successfully")
    @ApiResponse(responseCode = "404", description = "Auction not found")
    @DeleteMapping("/{auctionId}")
    public ResponseEntity<?> deleteAuction(@PathVariable Long auctionId) {
        Optional<Auction> auctionOptional = auctionRepository.findById(auctionId);

        if (auctionOptional.isPresent()) {
            // Before deleting the auction, you may want to perform some checks,
            // e.g., whether the auction can be deleted based on its status or other rules.

            auctionRepository.deleteById(auctionId);
            return new ResponseEntity<>("Auction deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Auction not found", HttpStatus.NOT_FOUND);
        }
    }

    private Bid getHighestBidForAuction(Long auctionId) {
        return bidRepository.findByAuctionId(auctionId)
                .stream()
                .max(Comparator.comparing(Bid::getAmount))
                .orElse(null);
    }

    @PostMapping("/{itemId}/new-auction")
    public ResponseEntity<?> createNewAuction(@PathVariable Long itemId, @RequestBody Auction newAuction) {
        // Check to see if this auction already exists for this item
        Optional<Auction> auctionOp = auctionRepository.findById(itemId);

        // if the auction already exists, then return a HTTP response saying it already
        // exists
        if (auctionOp.isPresent()) {
            return new ResponseEntity<>("Auction already exists", HttpStatus.ALREADY_REPORTED);
        }

        // if auction does not exist, add it to the database, and it will give it an
        // automatic auctionId
        auctionRepository.save(newAuction);
        return new ResponseEntity<>("Auction is now created", HttpStatus.OK);
    }

}