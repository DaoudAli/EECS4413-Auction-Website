package com.EECS4413.AuctionServiceApp.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import com.EECS4413.AuctionServiceApp.dto.ItemDTO;

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

    public Auction() {
    }

    // Constructors, getters, setters, and other methods
    public Auction(Long itemId, AuctionStatus status) {
        this.itemId = itemId;
        this.status = status;
    }

    public void addItemDetails(ItemDTO item) {
        this.itemId = item.getId();
        try {
            this.type = AuctionType.valueOf(item.getTypeOfAuction().toUpperCase());
        } catch (IllegalArgumentException e) {
            // Handle the case where the string does not match any enum constant
        }
        // Additional logic to set or convert other item details
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

}
