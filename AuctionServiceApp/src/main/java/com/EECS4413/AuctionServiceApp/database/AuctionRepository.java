package com.EECS4413.AuctionServiceApp.database;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.EECS4413.AuctionServiceApp.model.Auction;
import com.EECS4413.AuctionServiceApp.model.Auction.AuctionStatus;
import com.EECS4413.AuctionServiceApp.model.Auction.AuctionType;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByStatus(AuctionStatus status);

    List<Auction> findByType(AuctionType type);

    Optional<Auction> findByItemId(Long itemId);

}