package com.fluxcom.model;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity @Table(name = "users")
@Getter @Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
}
