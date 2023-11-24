package com.EECS4413.UserServiceApp.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

//**********************************************************************************************
// Swagger / OpenAPI Documentation available at: http://localhost:3300/swagger-ui/index.html#/
//**********************************************************************************************

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
		String token = userServices.authenticate(user.getUserName(), user.getPassWord());
		if (newUser == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
		}
		if (token != null) {
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.SET_COOKIE, token);
			return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(newUser);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to create user");
		}
	}

	@Operation(summary = "Sign In User", description = "Authenticates a user and returns a token.")
	@ApiResponse(responseCode = "200", description = "User successfully authenticated.")
	@ApiResponse(responseCode = "401", description = "Invalid credentials.")
	@PostMapping("/sign-in")
	public ResponseEntity<?> signIn(@RequestBody User credentials) {
		String token = userServices.authenticate(credentials.getUserName(), credentials.getPassWord());

		if (token != null) {
			System.out.println("Token not null in /sign-in: " + token);
			HttpHeaders headers = new HttpHeaders();

			// Create a cookie
			ResponseCookie cookie = ResponseCookie.from("auth-token", token)
					.httpOnly(true) // Secure cookie, not accessible via JavaScript
					.path("/") // Available for entire application
					// .secure(true) // Uncomment this for HTTPS only
					.build();

			// Add cookie to the headers
			headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
			User user = userServices.getUserFromToken(token);

			System.out.println("Headers in /sign-in: " + headers.toString());

			// Return response entity with headers
			return ResponseEntity.ok().headers(headers).body(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}

	@Operation(summary = "Get Authenticated User Details", description = "Returns user details for a valid JWT token.")
	@ApiResponse(responseCode = "200", description = "User details retrieved successfully", content = @Content(schema = @Schema(implementation = User.class)))
	@ApiResponse(responseCode = "401", description = "Unauthorized - Invalid Token", content = @Content(schema = @Schema(implementation = String.class)))
	@GetMapping("/me")
	public ResponseEntity<?> getUserDetails(@CookieValue(name = "auth-token", required = false) String token) {
		if (token == null || token.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized - No Token Provided");
		}

		User user = userServices.getUserFromToken(token);
		if (user != null) {
			System.out.println("User: " + user);
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized - Invalid Token");
		}
	}

	@Operation(summary = "Update User", description = "Updates a user's username.")
	@ApiResponse(responseCode = "200", description = "Username successfully updated.")
	@ApiResponse(responseCode = "404", description = "User not found.")
	@PutMapping("/update/{oldUserName}/{newUserName}")
	public ResponseEntity<?> updateUserName(
			@Parameter(description = "The old username") @PathVariable String oldUserName,
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
		if (response == "User not found") {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
