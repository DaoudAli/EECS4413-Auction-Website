package com.EECS4413.AuctionServiceApp.websocket;

import com.EECS4413.AuctionServiceApp.database.AuctionRepository;
import com.EECS4413.AuctionServiceApp.database.BidRepository;
import com.EECS4413.AuctionServiceApp.model.Auction;
import com.EECS4413.AuctionServiceApp.model.Bid;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;

@Component
public class AuctionWSHandler extends TextWebSocketHandler {

    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final ObjectMapper objectMapper;
    private static Map<String, Set<WebSocketSession>> auctionSessions = new HashMap<>();

    public AuctionWSHandler(AuctionRepository auctionRepository, BidRepository bidRepository,
            ObjectMapper objectMapper) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String auctionId = getAuctionId(session);
        if (!auctionSessions.containsKey(auctionId)) {
            auctionSessions.put(auctionId, new HashSet<>());
        }
        auctionSessions.get(auctionId).add(session);
        // Optionally send initial data to the client
        sendAuctionUpdate(session, Long.parseLong(auctionId));
    }

    private void sendAuctionUpdate(WebSocketSession session, Long auctionId) throws IOException {
        Optional<Auction> auctionOptional = auctionRepository.findById(auctionId);
        if (auctionOptional.isPresent()) {
            Auction auction = auctionOptional.get();
            List<Bid> bids = bidRepository.findByAuctionId(auctionId);
            // Create a response with auction details and highest bid
            // The response format can be JSON or any format you prefer
            String response = createAuctionResponse(auction, bids);
            session.sendMessage(new TextMessage(response));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String auctionId = getAuctionId(session);
        Set<WebSocketSession> sessions = auctionSessions.get(auctionId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                auctionSessions.remove(auctionId);
            }
        }
    }

    private String createAuctionResponse(Auction auction, List<Bid> bids) {
        // Implement logic to create a JSON response
        try {
            // Here you can create a custom object or Map to hold the response data
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("auction", auction);
            responseData.put("highestBid", bids.stream().max(Comparator.comparing(Bid::getAmount)).orElse(null));

            return objectMapper.writeValueAsString(responseData);
        } catch (IOException e) {
            // Handle exceptions, possibly logging them and returning an error message
            return "{\"error\": \"Error creating auction response\"}";
        }

    }

    public void broadcast(String auctionId, Auction message) throws IOException {

        Set<WebSocketSession> sessions = auctionSessions.get(auctionId);
        if (sessions != null) {

            for (WebSocketSession session : sessions) {
                System.out.println("Session broadcast: " + auctionId);
                sendAuctionUpdate(session, Long.parseLong(auctionId));

            }
        }
    }

    private String getAuctionId(WebSocketSession session) {
        // Assuming the URI pattern is /ws/auctions/{auctionId}/update
        String path = session.getUri().getPath();
        String[] segments = path.split("/");
        return segments[segments.length - 2]; // Adjust index as needed
    }

}
