package com.EECS4413.AuctionServiceApp.controller;


import org.springframework.web.bind.annotation.*;

import com.EECS4413.AuctionServiceApp.model.*;
import java.util.List;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;

    public AuctionController(AuctionRepository auctionRepository, BidRepository bidRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
    }

    // Get all auctions
    @GetMapping
    public List<Auction> all() {
        return auctionRepository.findAll();
    }

    // Create a new auction
    @PostMapping
    public Auction newAuction(@RequestBody Auction newAuction) {
        return auctionRepository.save(newAuction);
    }

    // Get a single auction
    @GetMapping("/{id}")
    public Auction one(@PathVariable Long id) {
        return auctionRepository.findById(id)
                .orElseThrow(() -> new AuctionNotFoundException(id));
    }

    // Update an auction
    @PutMapping("/{id}")
    public Auction replaceAuction(@RequestBody Auction newAuction, @PathVariable Long id) {
        return auctionRepository.findById(id)
                .map(auction -> {
                    auction.setItemName(newAuction.getItemName());
                    auction.setItemDescription(newAuction.getItemDescription());
                    // Other updates as necessary
                    return auctionRepository.save(auction);
                })
                .orElseGet(() -> {
                    newAuction.setId(id);
                    return auctionRepository.save(newAuction);
                });
    }

    // Delete an auction
    @DeleteMapping("/{id}")
    public void deleteAuction(@PathVariable Long id) {
        auctionRepository.deleteById(id);
    }

    // Get bids for a specific auction
    @GetMapping("/{auctionId}/bids")
    public List<Bid> getBidsForAuction(@PathVariable Long auctionId) {
        return (List<Bid>) bidRepository.findByAuctionId(auctionId);
    }

    // Place a bid in an auction
    @PostMapping("/{auctionId}/bids")
    public Bid placeBid(@RequestBody Bid newBid, @PathVariable Long auctionId) {
        newBid.setAuctionId(auctionId);
        return bidRepository.save(newBid);
    }

}
