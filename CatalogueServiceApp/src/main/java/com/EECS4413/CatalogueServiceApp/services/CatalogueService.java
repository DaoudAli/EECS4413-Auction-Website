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
                    if (updatedItem.getName() != null) {
                        existingItem.setName(updatedItem.getName());
                    }
                    if (updatedItem.getDescription() != null) {
                        existingItem.setDescription(updatedItem.getDescription());
                    }
                    if (updatedItem.getKeywords() != null) {
                        existingItem.setKeywords(updatedItem.getKeywords());
                    }
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
