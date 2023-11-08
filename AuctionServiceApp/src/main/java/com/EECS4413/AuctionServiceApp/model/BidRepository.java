package com.EECS4413.AuctionServiceApp.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByItemId(Long auctionId);

    Optional<Bid> findTopByItemIdOrderByAmountDesc(Long itemId);

}