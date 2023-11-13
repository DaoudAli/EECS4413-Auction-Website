package com.EECS4413.AuctionServiceApp.database;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EECS4413.AuctionServiceApp.model.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByAuctionId(Long auctionId);

    Optional<Bid> findTopByAuctionIdOrderByAmountDesc(Long auctionId);

}