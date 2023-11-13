package com.EECS4413.AuctionServiceApp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;

import com.EECS4413.AuctionServiceApp.database.AuctionRepository;
import com.EECS4413.AuctionServiceApp.database.BidRepository;
import com.EECS4413.AuctionServiceApp.dto.ItemDTO;
import com.EECS4413.AuctionServiceApp.model.Auction;
import com.EECS4413.AuctionServiceApp.model.Auction.AuctionStatus;
import com.EECS4413.AuctionServiceApp.model.Auction.AuctionType;

import org.springframework.stereotype.Component;

@Component
public class AuctionStatusScheduler {
    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final CatalogueServiceClient catalogueServiceClient;

    public AuctionStatusScheduler(AuctionRepository auctionRepository, BidRepository bidRepository,
            CatalogueServiceClient catalogueServiceClient) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.catalogueServiceClient = catalogueServiceClient;

    }

    @Scheduled(fixedRate = 10000) // runs every 10 seconds
    public void updateAuctionStatuses() {
        List<Auction> activeAuctions = auctionRepository.findByStatus(AuctionStatus.ACTIVE);
        List<Auction> nullAuctions = auctionRepository.findByStatus(null);
        activeAuctions.addAll(nullAuctions);
        LocalDateTime now = LocalDateTime.now();
        for (Auction auction : activeAuctions) {

            ItemDTO item = catalogueServiceClient.getItemById(auction.getItemId());
            auction.setType(AuctionType.valueOf(item.getTypeOfAuction().toUpperCase()));

            if (item.getEndTime().isBefore(now)) {

                if (bidRepository.findByAuctionId(auction.getId()).isEmpty())
                    auction.setStatus(Auction.AuctionStatus.EXPIRED);
                else
                    auction.setStatus(Auction.AuctionStatus.ENDED);
                auctionRepository.save(auction);
            }
        }
    }

    @Scheduled(fixedRate = 30000) // runs every 30 seconds
    public void createNewAuctionsForItems() {
        List<ItemDTO> items = catalogueServiceClient.getAllItems();

        for (ItemDTO item : items) {
            Optional<Auction> existingAuction = auctionRepository.findByItemId(item.getId());

            if (!existingAuction.isPresent()) {
                Auction newAuction = new Auction();
                newAuction.setItemId(item.getId());
                newAuction.setType(AuctionType.valueOf(item.getTypeOfAuction().toUpperCase()));
                auctionRepository.save(newAuction);
            }
        }
    }
}