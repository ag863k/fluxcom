package com.fluxcom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fluxcom.model.ChatMessage;
import com.fluxcom.service.ChatService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private ChatService chatService;

    @GetMapping
    public ResponseEntity<List<ChatMessage>> getMessages(@RequestParam(defaultValue = "1") Long roomId) {
        List<ChatMessage> messages = chatService.getMessagesByRoom(roomId);
        return ResponseEntity.ok(messages);
    }
}
