package com.EECS4413.UserServiceApp.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserServices userServices;

	@Autowired
	public UserController(UserServices userServices) {
		this.userServices = userServices;
	}

	@Operation(summary = "Test Endpoint", description = "Endpoint to check if the service is running.")
	@GetMapping("/")
	public String test() {
		return "Service is running";
	}

	@Operation(summary = "Get All Users", description = "Retrieves a list of all users.")
	@ApiResponse(responseCode = "200", description = "Successfully retrieved all users", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
	@GetMapping("/all")
	public ResponseEntity<?> getAllUsers() {
		List<User> users = userServices.readAll();
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}

	@Operation(summary = "Get Specific User", description = "Retrieves a specific user by username.")
	@GetMapping("/{userName}")
	public ResponseEntity<?> getSpecificUser(
			@Parameter(description = "Username of the user") @PathVariable String userName) {
		User user = userServices.readUser(userName);
		if (user == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	@Operation(summary = "Get All Sellers", description = "Retrieves a list of all sellers.")
	@GetMapping("/sellers")
	public ResponseEntity<?> getAllSellers() {
		List<User> allSellers = userServices.readSellers();
		return ResponseEntity.status(HttpStatus.OK).body(allSellers);
	}

	@Operation(summary = "Get All Buyers", description = "Retrieves a list of all buyers.")
	@GetMapping("/buyers")
	public ResponseEntity<?> getAllBuyers() {
		List<User> allBuyers = userServices.readBuyers();
		return ResponseEntity.status(HttpStatus.OK).body(allBuyers);
	}

	@Operation(summary = "Create User", description = "Creates a new user.")
	@ApiResponse(responseCode = "201", description = "User successfully created.")
	@ApiResponse(responseCode = "400", description = "Invalid user details.")
	@PostMapping("/new")
	public ResponseEntity<?> createNewUser(@RequestBody User user) {
		User newUser = userServices.create(user);
		if (newUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
	}

	@Operation(summary = "Update User", description = "Updates a user's username.")
	@ApiResponse(responseCode = "200", description = "Username successfully updated.")
	@ApiResponse(responseCode = "404", description = "User not found.")
	@PutMapping("/update/{oldUserName}/{newUserName}")
	public ResponseEntity<?> updateUserName(@Parameter(description = "The old username") @PathVariable String oldUserName,
			@Parameter(description = "The new username") @PathVariable String newUserName) {
		User user = userServices.updateUserName(oldUserName, newUserName);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	@Operation(summary = "Delete User", description = "Deletes a user by username.")
	@ApiResponse(responseCode = "200", description = "User successfully deleted.")
	@ApiResponse(responseCode = "404", description = "User not found.")
	@DeleteMapping("/delete/{userName}")
	public ResponseEntity<?> deleteUser(
			@Parameter(description = "The username of the user to delete") @PathVariable String userName) {
		String response = userServices.deleteUser(userName);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
