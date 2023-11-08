package com.EECS4413.AuctionServiceApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Bid {

    @Id
    @GeneratedValue
    private Long id;
    private Double amount;
    private LocalDateTime bidTime;
    
    private Long itemId;

    public Bid() {}

    public Bid(Double amount, LocalDateTime bidTime, Long itemId) {
        this.amount = amount;
        this.bidTime = bidTime;
        this.itemId = itemId;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getBidTime() {
        return bidTime;
    }

    public void setBidTime(LocalDateTime bidTime) {
        this.bidTime = bidTime;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long auctionId) {
        this.itemId = auctionId;
    }



}

