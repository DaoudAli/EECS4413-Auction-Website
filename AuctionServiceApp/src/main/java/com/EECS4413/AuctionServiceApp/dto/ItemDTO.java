package com.EECS4413.AuctionServiceApp.dto;

public class ItemDTO {
    // Define AuctionType enum here

    private Long id;
    private String name;
    private String description;
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
