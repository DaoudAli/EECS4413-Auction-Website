package com.EECS4413.AuctionServiceApp.websocket;

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

    // Repos for when we retrieve the highest bids
    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;

    public AuctionSocket(AuctionRepository auctionRepository, BidRepository bidRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
    }

    // registers the websocket handler to the specified path, and the WebSockHandler
    // uses texthandler for the text of auction price
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Need to put the whole path
        registry.addHandler(new WebSockHandler(), "/auctionId");

        throw new UnsupportedOperationException("Unimplemented method 'registerWebSocketHandlers'");
    }

    // The intercepter basically just is used to handshake with the http request and
    // add the auctionID as an attribute to the websocket
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

    // Here is where the auction and the highest bid is found
    @Bean
    public WebSocketHandler auctionHandler() {
        return new WebSockHandler() {
            public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
                // Retrieve the auction id from the websocket session
                // Gets the auction ID
                Long auctionId = (Long) session.getAttributes().get("auctionId");

                Optional<Auction> auction = auctionRepository.findById(auctionId);

                String responseMessage = "";

                if (auction.isPresent()) {
                    Bid highestBid = bidRepository.findByAuctionId(auction.get().getId()).stream()
                            .max(Comparator.comparing(Bid::getAmount))
                            .orElse(null);
                    if (highestBid != null) {
                        responseMessage = highestBid.getAmount().toString();
                    } else {
                        responseMessage = "0";
                    }
                    session.sendMessage(new TextMessage(responseMessage));
                }
                responseMessage = "0";
                session.sendMessage(new TextMessage(responseMessage));
            }
        };
    }

}
