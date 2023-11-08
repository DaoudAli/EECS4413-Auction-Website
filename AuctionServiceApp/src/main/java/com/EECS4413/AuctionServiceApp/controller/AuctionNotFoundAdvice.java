package com.EECS4413.AuctionServiceApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice

class AuctionNotFoundAdvice {
	 @ResponseBody
	  @ExceptionHandler(AuctionNotFoundException.class)
	  @ResponseStatus(HttpStatus.NOT_FOUND)
	  String auctionNotFoundHandler(AuctionNotFoundException ex) {
	    return ex.getMessage();
	  }

}