package com.EECS4413.AuctionServiceApp.controller;

public class AuctionNotFoundException extends RuntimeException {
	AuctionNotFoundException(Long id) {
	    super("Could not find employee " + id);
	  }
}

