package com.mobileback.mobileback.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.mobileback.mobileback.dao.OffreurDao;
import com.mobileback.mobileback.models.Offreur;
import com.mobileback.mobileback.views.OffreurView;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/offreur")
@RequiredArgsConstructor
@CrossOrigin
public class OffreurController {

    @Autowired
    protected OffreurDao offreurDao;

    @GetMapping("/list")
    @JsonView(OffreurView.class)
    public List<Offreur> show() {
        return offreurDao.findAll();
    }

    @PutMapping("/{id}/rate")
    public ResponseEntity<Offreur> rate(@PathVariable Integer id, @RequestParam int rating) {
        return offreurDao.findById(id)
                .map(offreur -> {
                    offreur.setNote(rating);
                    offreurDao.save(offreur);
                    return ResponseEntity.ok(offreur);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @JsonView(OffreurView.class)
    public ResponseEntity<Offreur> get(@PathVariable Integer id) {
        return offreurDao.findById(id)
                .map(offreur -> ResponseEntity.ok(offreur))
                .orElse(ResponseEntity.notFound().build());
    }
}
