package com.fluxcom.controller;

import com.fluxcom.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload Map<String, Object> messageData) {
        try {
            String content = (String) messageData.get("content");
            String username = (String) ((Map<String, Object>) messageData.get("sender")).get("username");
            Long roomId = 1L;
            
            var savedMessage = chatService.saveMessage(content, username, roomId);
            
            Map<String, Object> responseMessage = Map.of(
                "id", savedMessage.getId(),
                "content", savedMessage.getContent(),
                "timestamp", savedMessage.getTimestamp().toString(),
                "sender", Map.of(
                    "id", savedMessage.getSender().getId(),
                    "username", savedMessage.getSender().getUsername()
                )
            );
            
            messagingTemplate.convertAndSend("/topic/room/1", responseMessage);
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
        }
    }
}
