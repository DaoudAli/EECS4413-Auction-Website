package com.EECS4413.CatalogueServiceApp.controller;

public class ErrorResponse {
    private String message;
    private String errorDetails;

    public ErrorResponse(String message, String errorDetails) {
        this.message = message;
        this.errorDetails = errorDetails;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Getter for errorDetails
    public String getErrorDetails() {
        return errorDetails;
    }
}
