package com.EECS4413.CatalogueServiceApp.services;

import com.EECS4413.CatalogueServiceApp.model.Item;
import com.EECS4413.CatalogueServiceApp.database.ItemDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogueService {

    private final ItemDatabase itemDatabase;

    @Autowired
    public CatalogueService(ItemDatabase itemDatabase) {
        this.itemDatabase = itemDatabase;
    }

    public List<Item> findAllItems() {
        return itemDatabase.findAll();
    }

    public Optional<Item> findItemById(Long id) {
        return itemDatabase.findById(id);
    }

    public List<Item> searchItemsByKeyword(String keyword) {
        return itemDatabase.findByKeywordsContainingIgnoreCase(keyword);
    }

    public Item addItem(Item item) {
        // Here you can add any pre-save logic or validations
        return itemDatabase.save(item);
    }

    public Optional<Item> updateItem(Long id, Item updatedItem) {
        return itemDatabase.findById(id)
                .map(existingItem -> {
                    // Here you can add any update logic or validations
                    existingItem.setName(updatedItem.getName());
                    existingItem.setDescription(updatedItem.getDescription());
                    existingItem.setTypeOfAuction(updatedItem.getTypeOfAuction());
                    existingItem.setStartTime(updatedItem.getStartTime());
                    existingItem.setEndTime(updatedItem.getEndTime());
                    existingItem.setStartBidPrice(updatedItem.getStartBidPrice());
                    existingItem.setCurrentBidPrice(updatedItem.getCurrentBidPrice());
                    // ... other fields to update
                    return itemDatabase.save(existingItem);
                });
    }

    public boolean deleteItem(Long id) {
        return itemDatabase.findById(id)
                .map(item -> {
                    itemDatabase.delete(item);
                    return true;
                }).orElse(false);
    }
}
