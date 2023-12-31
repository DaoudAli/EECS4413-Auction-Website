package com.EECS4413.AuctionServiceApp.services;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.EECS4413.AuctionServiceApp.dto.ItemDTO;

@FeignClient(name = "catalogue-service", url = "${catalogue.service.url}")
public interface CatalogueServiceClient {
    @GetMapping("/catalogue/items")
    List<ItemDTO> getAllItems();

    @GetMapping("/catalogue/items/{id}")
    ItemDTO getItemById(@PathVariable("id") Long id);

    @PutMapping("/catalogue/items/{id}")
    void updateItem(@PathVariable("id") Long id, @RequestBody ItemDTO item);

}
