package com.EECS4413.AuctionServiceApp.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;

@Entity
public
class Auction {

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Double getStartBid() {
		return startBid;
	}

	public void setStartBid(Double startBid) {
		this.startBid = startBid;
	}

	public Double getCurrentBid() {
		return currentBid;
	}

	public void setCurrentBid(Double currentBid) {
		this.currentBid = currentBid;
	}

	public Boolean getIsFinished() {
		return isFinished;
	}

	public void setIsFinished(Boolean isFinished) {
		this.isFinished = isFinished;
	}

	public AuctionType getAuctionType() {
		return auctionType;
	}

	public void setAuctionType(AuctionType auctionType) {
		this.auctionType = auctionType;
	}

	private @Id @GeneratedValue Long id;
    private String itemName;
    private String itemDescription;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double startBid;
    private Double currentBid;
    private Boolean isFinished;
    
    // Assuming there is an enum for different types of auctions
    @Enumerated(EnumType.STRING)
    private AuctionType auctionType;

    Auction() {}

    Auction(String itemName, String itemDescription, LocalDateTime startTime, LocalDateTime endTime, Double startBid, AuctionType auctionType) {
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startBid = startBid;
        this.currentBid = startBid;
        this.isFinished = false;
        this.auctionType = auctionType;
    }


    
    public enum AuctionType {
        DUTCH,
        FORWARD
    }
    
}
