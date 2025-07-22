package com.fluxcom.controller;

import com.fluxcom.model.User;
import com.fluxcom.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/online")
    public ResponseEntity<List<User>> getOnlineUsers() {
        List<User> users = userService.getOnlineUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{username}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable String username, 
            @RequestParam boolean online) {
        User user = userService.updateUserStatus(username, online);
        return ResponseEntity.ok(user);
    }
}
