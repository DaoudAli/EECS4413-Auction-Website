package com.EECS4413.CatalogueServiceApp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
public class Item {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AuctionType getTypeOfAuction() {
        return typeOfAuction;
    }

    public void setTypeOfAuction(AuctionType typeOfAuction) {
        this.typeOfAuction = typeOfAuction;
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

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_auction", nullable = false)
    private AuctionType typeOfAuction;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "start_bid_price", nullable = false)
    private BigDecimal startBidPrice;

    @Column(name = "current_bid_price")
    private BigDecimal currentBidPrice;

    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

    @Column(name = "image_urls")
    private String imageUrls;

    @Column
    private String keywords;

    public enum AuctionType {
        FORWARD, DUTCH, forward, dutch
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", typeOfAuction=" + typeOfAuction +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", startBidPrice=" + startBidPrice +
                ", currentBidPrice=" + currentBidPrice +
                ", sellerId=" + sellerId +
                ", imageUrls='" + imageUrls + '\'' +
                ", keywords='" + keywords + '\'' +
                '}';
    }

}
