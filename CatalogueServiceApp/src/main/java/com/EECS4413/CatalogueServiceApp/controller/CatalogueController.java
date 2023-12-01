package com.EECS4413.CatalogueServiceApp.controller;

import com.EECS4413.CatalogueServiceApp.model.Item;
import com.EECS4413.CatalogueServiceApp.services.CatalogueService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Collections;
import java.util.List;

//**********************************************************************************************
// Swagger / OpenAPI Documentation available at: http://localhost:3100/swagger-ui/index.html#/
//**********************************************************************************************

@RestController
@RequestMapping("/catalogue")
public class CatalogueController {

    private final CatalogueService catalogueService;

    @Autowired
    public CatalogueController(CatalogueService catalogueService) {
        this.catalogueService = catalogueService;
    }

    // Get a list of all items
    @Operation(summary = "Get all items", description = "Retrieve a list of all items in the catalogue")
    @ApiResponse(responseCode = "200", description = "Items found", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item.class)) })
    @ApiResponse(responseCode = "204", description = "No items found")
    @GetMapping("/items")
    public ResponseEntity<?> getAllItems() {
        List<Item> items = catalogueService.findAllItems();
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(items);
    }

    // Search for items by keyword
    @GetMapping("/items/search")
    @Operation(summary = "Search items by keyword", description = "Search for items in the catalogue matching the keyword")
    @ApiResponse(responseCode = "200", description = "Search successful", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item.class)) })
    @ApiResponse(responseCode = "200", description = "No items found matching the keyword")
    public ResponseEntity<?> searchItems(@RequestParam String keyword) {
        List<Item> items = catalogueService.searchItemsByKeyword(keyword);
        if (items.isEmpty()) {
            return ResponseEntity.ok("No items found matching the keyword.");
        }
        return ResponseEntity.ok(items);
    }

    // Get details of a single item by ID
    @Operation(summary = "Get item by ID", description = "Retrieve a single item by its unique identifier")
    @ApiResponse(responseCode = "200", description = "Item found", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item.class)) })
    @ApiResponse(responseCode = "404", description = "Item not found")
    @GetMapping("/items/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        Optional<Item> itemOptional = catalogueService.findItemById(id);
        if (!itemOptional.isEmpty()) {
            return ResponseEntity.ok(itemOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Item not found", "Item with ID " + id + " does not exist."));
        }
    }

    // Add a new item to the catalogue
    @Operation(summary = "Add a new item", description = "Add a new item to the catalogue")
    @ApiResponse(responseCode = "201", description = "Item created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item.class)) })
    @PostMapping("/items")
    public ResponseEntity<?> addItem(@RequestBody Item item) {
        Item savedItem = catalogueService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Item created successfully with ID " + savedItem.getId());
    }

    // Update an existing item
    @Operation(summary = "Update an existing item", description = "Update details of an existing item in the catalogue")
    @ApiResponse(responseCode = "200", description = "Item updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item.class)) })
    @ApiResponse(responseCode = "404", description = "Item not found")
    @PutMapping("/items/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return catalogueService.updateItem(id, updatedItem)
                .map(item -> ResponseEntity.ok("Item updated successfully."))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Unable to update. Item with ID " + id + " not found."));
    }

    // Delete an item from the catalogue
    @Operation(summary = "Delete an item", description = "Delete an item from the catalogue")
    @ApiResponse(responseCode = "204", description = "Item deleted successfully")
    @ApiResponse(responseCode = "404", description = "Item not found")
    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        boolean wasDeleted = catalogueService.deleteItem(id);
        if (wasDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Unable to delete. Item with ID " + id + " not found.");
        }
    }

    // Get all items by Seller ID
    @Operation(summary = "Get all items by Seller ID", description = "Retrieve all items associated with a seller ID")
    @ApiResponse(responseCode = "200", description = "Items found", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Item[].class)) })
    @ApiResponse(responseCode = "404", description = "No items found for the seller")
    @GetMapping("/items/seller/{sellerId}")
    public ResponseEntity<List<Item>> findItemsBySellerId(@PathVariable Long sellerId) {
        List<Item> items = catalogueService.findItemsBySellerId(sellerId);
        if (!items.isEmpty()) {
            return ResponseEntity.ok(items);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList()); // Or a suitable response indicating no items found
        }
    }

}