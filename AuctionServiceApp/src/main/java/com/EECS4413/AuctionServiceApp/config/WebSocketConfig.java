package com.EECS4413.AuctionServiceApp.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.EECS4413.AuctionServiceApp.database.AuctionRepository;
import com.EECS4413.AuctionServiceApp.database.BidRepository;
import com.EECS4413.AuctionServiceApp.websocket.AuctionWSHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@ComponentScan("com.offerup.auctionservice")
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(auctionHandler(), "/auctions/{auctionId}/update")
                .setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler auctionHandler() {
        return new AuctionWSHandler(auctionRepository, bidRepository, objectMapper);
    }

}
