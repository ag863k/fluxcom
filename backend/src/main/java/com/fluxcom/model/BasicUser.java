package com.fluxcom.model;

/**
 * Basic User entity without Spring Security dependencies
 * Use this if there are dependency resolution issues
 */
public class BasicUser {
    
    private Long id;
    private String username;
    private String email;
    private String password;
    private Boolean online = false;

    // Default constructor
    public BasicUser() {}

    // Constructor with parameters
    public BasicUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.online = false;
    }

    // Getters and setters
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }
    
    public String getUsername() { 
        return username; 
    }
    
    public void setUsername(String username) { 
        this.username = username; 
    }

    public String getEmail() { 
        return email; 
    }
    
    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getPassword() { 
        return password; 
    }
    
    public void setPassword(String password) { 
        this.password = password; 
    }

    public Boolean getOnline() { 
        return online; 
    }
    
    public void setOnline(Boolean online) { 
        this.online = online; 
    }
}
