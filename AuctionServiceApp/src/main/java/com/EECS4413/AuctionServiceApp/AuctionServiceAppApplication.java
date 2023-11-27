package com.EECS4413.AuctionServiceApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

//
@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class AuctionServiceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionServiceAppApplication.class, args);
	}

}
