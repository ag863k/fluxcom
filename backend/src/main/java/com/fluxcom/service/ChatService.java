package com.fluxcom.service;

import com.fluxcom.model.ChatMessage;
import com.fluxcom.model.User;
import com.fluxcom.repository.ChatMessageRepository;
import com.fluxcom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;

    public ChatMessage saveMessage(String content, String username, Long roomId) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        ChatMessage message = new ChatMessage();
        message.setContent(content);
        message.setSender(user);
        message.setRoomId(roomId != null ? roomId : 1L);
        message.setTimestamp(LocalDateTime.now());
        
        return messageRepository.save(message);
    }

    public List<ChatMessage> getMessagesByRoom(Long roomId) {
        return messageRepository.findTop50ByRoomIdOrderByTimestampDesc(roomId);
    }
}
