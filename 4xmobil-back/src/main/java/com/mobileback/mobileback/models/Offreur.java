package com.mobileback.mobileback.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.mobileback.mobileback.views.OffreurView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Offreur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(OffreurView.class)
    private Integer id;
    @JsonView(OffreurView.class)
    private String titre;
    @JsonView(OffreurView.class)
    private String nom;
    @JsonView(OffreurView.class)
    private String prenom;
    @JsonView(OffreurView.class)
    private int age;
    @JsonView(OffreurView.class)
    private double latitude;
    @JsonView(OffreurView.class)
    private double longitude;
    @JsonView(OffreurView.class)
    private String ville;
    @JsonView(OffreurView.class)
    private String description;
    @JsonView(OffreurView.class)
    private String avatar;
    @JsonView(OffreurView.class)
    private double note;
    @JsonView(OffreurView.class)
    private int nbrdv;
    @JsonView(OffreurView.class)
    private int prix;

}
