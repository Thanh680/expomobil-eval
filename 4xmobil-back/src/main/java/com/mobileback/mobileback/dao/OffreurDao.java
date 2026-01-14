package com.mobileback.mobileback.dao;

import com.mobileback.mobileback.models.Offreur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OffreurDao extends JpaRepository<Offreur,Integer> {
}
