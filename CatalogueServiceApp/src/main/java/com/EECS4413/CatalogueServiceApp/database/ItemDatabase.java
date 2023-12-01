package com.EECS4413.CatalogueServiceApp.database;

import com.EECS4413.CatalogueServiceApp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDatabase extends JpaRepository<Item, Long> {
    List<Item> findByKeywordsContainingIgnoreCase(String keyword);

    List<Item> findBySellerId(Long sellerId);
}
