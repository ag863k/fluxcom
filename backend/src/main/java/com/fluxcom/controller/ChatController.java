package com.fluxcom.controller;

import com.fluxcom.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    // SimpMessagingTemplate allows us to send messages to specific destinations
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * Handles sending a message to a specific room.
     * The message is broadcast to all clients subscribed to "/topic/rooms/{roomId}".
     * The @MessageMapping path now includes the roomId as a variable.
     */
    @MessageMapping("/chat.sendMessage/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, @Payload ChatMessage chatMessage) {
        // The message is sent to the destination for the specific room
        messagingTemplate.convertAndSend(String.format("/topic/rooms/%s", roomId), chatMessage);
    }

    /**
     * Handles a new user joining a specific chat room.
     * Their username is added to the WebSocket session and a message is broadcast to that room.
     */
    @MessageMapping("/chat.addUser/{roomId}")
    public void addUser(@DestinationVariable String roomId, @Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add username and roomId in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("room_id", roomId);
        
        // Broadcast the JOIN message to the specific room
        messagingTemplate.convertAndSend(String.format("/topic/rooms/%s", roomId), chatMessage);
    }
}