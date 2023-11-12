package com.EECS4413.AuctionServiceApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.AuctionServiceApp.model.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidRepository bidRepository;

    public BidController(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    // Get all bids
    @GetMapping
    public ResponseEntity<List<Bid>> getAllBids() {
        List<Bid> bids = bidRepository.findAll();

        return new ResponseEntity<>(bids, HttpStatus.OK);
    }

    // Place a bid
    @PostMapping
    public ResponseEntity<Bid> placeBid(@RequestBody Bid newBid) {
        Bid savedBid = bidRepository.save(newBid);
        return new ResponseEntity<>(savedBid, HttpStatus.CREATED);
    }

    // Get the highest bid for a specific item
    @GetMapping("/highest/{itemId}")
    public ResponseEntity<Bid> getHighestBidForItem(@PathVariable Long itemId) {
        return bidRepository.findTopByItemIdOrderByAmountDesc(itemId)
                .map(bid -> new ResponseEntity<>(bid, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Buy Now feature
    @PostMapping("/{itemId}/buynow")
    public ResponseEntity<?> buyNow(@PathVariable Long itemId, @RequestBody Bid buyNowBid) {
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
            buyNowBid.setItemId(itemId);
            // buyNowBid.setWinningBid(true);
            Bid savedBid = bidRepository.save(buyNowBid);

            return new ResponseEntity<>(savedBid, HttpStatus.CREATED);
        } else {
            // Handle case where the item is not available for Buy Now
            return new ResponseEntity<>("Item is not available for Buy Now.", HttpStatus.BAD_REQUEST);
        }
    }

    // Additional bid-related endpoints...
}