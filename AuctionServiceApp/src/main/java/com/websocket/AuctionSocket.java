package com.websocket;

import java.io.IOException;
import java.util.Comparator;
import java.util.Map;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import com.EECS4413.AuctionServiceApp.database.AuctionRepository;
import com.EECS4413.AuctionServiceApp.database.BidRepository;

import com.EECS4413.AuctionServiceApp.model.Auction;
import com.EECS4413.AuctionServiceApp.model.Bid;

@Configuration
@EnableWebSocket
public class AuctionSocket implements WebSocketConfigurer {

    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;

    public AuctionSocket(AuctionRepository auctionRepository, BidRepository bidRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(new WebSockHandler(), "/auctionId");

        throw new UnsupportedOperationException("Unimplemented method 'registerWebSocketHandlers'");
    }

    @Bean
    public HandshakeInterceptor auctionInterceptor() {
        return new HandshakeInterceptor() {

            @Override
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                    WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

                // Get the URI segment corresponding to the auction id
                String path = request.getURI().getPath();
                String auctionId = path.substring(path.lastIndexOf('/') + 1);

                // This will be added to the websocket session
                attributes.put("auctionId", auctionId);
                return true;

            }

            @Override
            public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                    WebSocketHandler wsHandler, Exception exception) {
                // Nothing to do after handshake
                throw new UnsupportedOperationException("Unimplemented method 'afterHandshake'");
            }
        };
    }

    @Bean
    public WebSocketHandler auctionHandler() {
        return new WebSockHandler() {
            public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
                // Retrieve the auction id from the websocket session (copied during the
                // handshake)
                // Gets the auction ID
                Long auctionId = (Long) session.getAttributes().get("auctionId");

                Optional<Auction> auction = auctionRepository.findById(auctionId);

                if (auction.isPresent()) {
                    Bid highestBid = bidRepository.findByAuctionId(auction.get().getId()).stream()
                            .max(Comparator.comparing(Bid::getAmount))
                            .orElse(null);
                    if (highestBid != null) {
                        // post bid
                    } else {
                        // post $0
                    }
                } else {
                    // post it was not found
                }
            }
        };
    }

}
