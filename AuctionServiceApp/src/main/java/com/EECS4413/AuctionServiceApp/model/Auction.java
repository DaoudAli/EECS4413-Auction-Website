package com.EECS4413.AuctionServiceApp.model;

import jakarta.persistence.*;

import com.EECS4413.AuctionServiceApp.dto.ItemDTO;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
public class Auction {
    public enum AuctionStatus {
        ACTIVE, ENDED, SOLD, EXPIRED
    }

    public enum AuctionType {
        FORWARD, DUTCH
    }

    @Id
    @GeneratedValue
    private Long id;

    private Long itemId;

    @Enumerated(EnumType.STRING)
    private AuctionType type; // This will store the auction type as a string.

    @Enumerated(EnumType.STRING)
    private AuctionStatus status = AuctionStatus.ACTIVE; // Default status

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(name = "start_bid_price", nullable = false, scale = 2)
    private BigDecimal startBidPrice;

    @Column(name = "current_bid_price", scale = 2)
    private BigDecimal currentBidPrice;

    public void addItemDetails(ItemDTO item) {
        this.itemId = item.getId();
        try {
            // this.type = AuctionType.valueOf(item.getTypeOfAuction().toUpperCase());
        } catch (IllegalArgumentException e) {
            // Handle the case where the string does not match any enum constant
        }
        // Additional logic to set or convert other item details
    }

    public void setDefaultValues() {
        if (this.type == null) {
            this.type = AuctionType.FORWARD; // Default auction type
        }
        if (this.status == null) {
            this.status = AuctionStatus.ACTIVE; // Default auction status
        }
        if (this.startTime == null) {
            this.startTime = LocalDateTime.now(ZoneId.systemDefault()); // Default start time
        }
        if (this.endTime == null) {
            this.endTime = LocalDateTime.now(ZoneId.systemDefault()).plusDays(1); // Default end time
        }
        if (this.startBidPrice == null) {
            this.startBidPrice = BigDecimal.ZERO; // Default starting bid
        }
        if (this.currentBidPrice == null) {
            this.currentBidPrice = BigDecimal.ZERO; // Default current bid
        }
        // Other default initializations if necessary
    }

    public void calculateStatus() {
        // Logic to calculate the auction status based on item details and bids
    }

    /**
     * @return Long return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return AuctionStatus return the status
     */
    public AuctionStatus getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(AuctionStatus status) {
        this.status = status;
    }

    /**
     * @return AuctionStatus return the status
     */
    public AuctionType getType() {
        return type;
    }

    /**
     * @param status the status to set
     */
    public void setType(AuctionType type) {
        this.type = type;
    }

    /**
     * @return Long return the itemId
     */
    public Long getItemId() {
        return itemId;
    }

    /**
     * @param itemId the itemId to set
     */
    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        if (startTime == null || startTime.isBefore(LocalDateTime.of(1, 1, 1, 0, 0))) {
            System.out.println("Zero or invalid start time was set, defaulting to current time.");
            this.startTime = LocalDateTime.now(ZoneId.systemDefault());
        } else {
            this.startTime = startTime;
        }
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        if (endTime == null || endTime.isBefore(LocalDateTime.of(1, 1, 1, 0, 0))) {
            System.out.println("Zero or invalid end time was set, defaulting to current time.");
            this.endTime = LocalDateTime.now(ZoneId.systemDefault());
        } else {
            this.endTime = endTime;
        }
    }

    public BigDecimal getStartBidPrice() {
        return startBidPrice;
    }

    public void setStartBidPrice(BigDecimal startBidPrice) {
        this.startBidPrice = startBidPrice;
    }

    public BigDecimal getCurrentBidPrice() {
        return currentBidPrice;
    }

    public void setCurrentBidPrice(BigDecimal currentBidPrice) {
        this.currentBidPrice = currentBidPrice;
    }

}
