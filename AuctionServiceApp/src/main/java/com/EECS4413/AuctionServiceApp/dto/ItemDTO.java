package com.EECS4413.AuctionServiceApp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ItemDTO {
    // Define AuctionType enum here
    public enum AuctionType {
        FORWARD, DUTCH
    }

    private Long id;
    private String name;
    private String description;
    private AuctionType typeOfAuction;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal startBidPrice;
    private BigDecimal currentBidPrice;
    private Long sellerId;
    private String imageUrls;
    private String keywords;

    // Getters and setters for each field

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ... other getters and setters ...

    public BigDecimal getCurrentBidPrice() {
        return currentBidPrice;
    }

    public void setCurrentBidPrice(BigDecimal currentBidPrice) {
        this.currentBidPrice = currentBidPrice;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return AuctionType return the typeOfAuction
     */
    public AuctionType getTypeOfAuction() {
        return typeOfAuction;
    }

    /**
     * @param typeOfAuction the typeOfAuction to set
     */
    public void setTypeOfAuction(AuctionType typeOfAuction) {
        this.typeOfAuction = typeOfAuction;
    }

    /**
     * @return LocalDateTime return the startTime
     */
    public LocalDateTime getStartTime() {
        return startTime;
    }

    /**
     * @param startTime the startTime to set
     */
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    /**
     * @return LocalDateTime return the endTime
     */
    public LocalDateTime getEndTime() {
        return endTime;
    }

    /**
     * @param endTime the endTime to set
     */
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    /**
     * @return BigDecimal return the startBidPrice
     */
    public BigDecimal getStartBidPrice() {
        return startBidPrice;
    }

    /**
     * @param startBidPrice the startBidPrice to set
     */
    public void setStartBidPrice(BigDecimal startBidPrice) {
        this.startBidPrice = startBidPrice;
    }

    /**
     * @return Long return the sellerId
     */
    public Long getSellerId() {
        return sellerId;
    }

    /**
     * @param sellerId the sellerId to set
     */
    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    /**
     * @return String return the imageUrls
     */
    public String getImageUrls() {
        return imageUrls;
    }

    /**
     * @param imageUrls the imageUrls to set
     */
    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    /**
     * @return String return the keywords
     */
    public String getKeywords() {
        return keywords;
    }

    /**
     * @param keywords the keywords to set
     */
    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

}
