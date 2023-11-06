package com.EECS4413.AuctionServiceApp.model;

import org.springframework.data.jpa.repository.JpaRepository;



public interface AuctionRepository  extends JpaRepository<Auction, Long> {

}