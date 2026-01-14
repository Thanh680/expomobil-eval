package com.mobileback.mobileback.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Email
    @NotBlank
    protected String email;

    @NotBlank
    @Length(min = 4)
    protected String password;

    @OneToOne
    protected Utilisateur utilisateur;

    protected boolean offreur;

    protected boolean admin;
}
