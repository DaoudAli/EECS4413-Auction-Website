package com.EECS4413.AuctionServiceApp.websocket;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

public class WebSockHandler extends TextWebSocketHandler {

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws IOException {

        String receivedMessage = (String) message.getPayload();
        // Process the message and send a response if needed
        session.sendMessage(new TextMessage("Received: " + receivedMessage));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // Performs action when new websocket is established
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // Performs action when websocket connection is closed
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

    }

}
