package com.EECS4413.UserServiceApp.controller;

import java.sql.SQLException;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

@RestController
public class UserController {

	private UserServices userServices = new UserServices();

	@Operation(summary = "Test Endpoint", description = "Endpoint to check if the service is running.")
	@GetMapping("/")
	public String test() {
		return "Server running";
	}

	@Operation(summary = "Get All Users", description = "Retrieves a list of all users.")
	@GetMapping("/users")
	public List<User> getAllUsers() throws SQLException {
		return userServices.readAll();
	}

	@Operation(summary = "Get Specific User", description = "Retrieves a specific user by username.")
	@GetMapping("/users/{userName}")
	public User getSpecificUser(@Parameter(description = "Username of the user") @PathVariable String userName) throws SQLException {
		return userServices.readUser(userName);
	}

	@Operation(summary = "Get All Sellers", description = "Retrieves a list of all sellers.")
	@GetMapping("/users/allSellers")
	public List<User> getAllSellers() throws SQLException {
		return userServices.readSellers();
	}

	@Operation(summary = "Get All Buyers", description = "Retrieves a list of all buyers.")
	@GetMapping("/users/allBuyers")
	public List<User> getAllBuyers() throws SQLException {
		return userServices.readBuyers();
	}

	@Operation(summary = "Create User", description = "Creates a new user.")
	@ApiResponse(responseCode = "201", description = "User successfully created.")
	@ApiResponse(responseCode = "400", description = "Invalid user details.")
	@PostMapping("/newuser")
	public User createNewUser(@RequestBody User user) throws SQLException {
		return userServices.create(user);
	}

	@Operation(summary = "Update User", description = "Updates a user's username.")
	@ApiResponse(responseCode = "200", description = "Username successfully updated.")
	@ApiResponse(responseCode = "404", description = "User not found.")
	@PutMapping("/updateuser/{oldUserName}/{newUserName}")
	public User updateUserName(@Parameter(description = "The old username") @PathVariable String oldUserName,
			@Parameter(description = "The new username") @PathVariable String newUserName) throws SQLException {
		return userServices.updateUserName(oldUserName, newUserName);
	}

	@Operation(summary = "Delete User", description = "Deletes a user by username.")
	@ApiResponse(responseCode = "200", description = "User successfully deleted.")
	@ApiResponse(responseCode = "404", description = "User not found.")
	@DeleteMapping("/users/delete/{userName}")
	public User deleteUser(
			@Parameter(description = "The username of the user to delete") @PathVariable String userName) throws SQLException {
		return userServices.deleteUser(userName);
	}
}
