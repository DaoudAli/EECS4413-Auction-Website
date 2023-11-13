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

    private Long auctionId;
    private Long bidderId;

    public Bid() {
    }

    public Bid(Double amount, Long auctionId, Long bidderId) {
        this.amount = amount;
        this.auctionId = auctionId;
        this.bidderId = bidderId;
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

    /**
     * @return Long return the bidderId
     */
    public Long getBidderId() {
        return bidderId;
    }

    /**
     * @param bidderId the bidderId to set
     */
    public void setBidderId(Long bidderId) {
        this.bidderId = bidderId;
    }

    /**
     * @return Long return the auctionId
     */
    public Long getAuctionId() {
        return auctionId;
    }

    /**
     * @param auctionId the auctionId to set
     */
    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

}
