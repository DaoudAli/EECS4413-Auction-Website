package com.EECS4413.UserServiceApp.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

@RestController
public class UserController {

	private UserServices userServices = new UserServices();
	
	//at the root, displays simple string text (can delete I used it to test if my local host was working)
	@GetMapping("/")
	public String test() {
		return "login";
	}

	//returns a list of all users
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userServices.readAll();
	}
	
	//returns the specific user with the userName
	@GetMapping("/users/{userName}")
	public User getSpecificUser(@PathVariable String userName) {
		return userServices.readUser(userName);
	}

	//returns all sellers
	@GetMapping("/users/allSellers")
	public List<User> getAllSellers() {
		return userServices.readSellers();
	}
	
	//returns all buyers
	@GetMapping("/users/allBuyers")
	public List<User> getAllBuyers() {
		return userServices.readBuyers();
	}

	//create a new user
	@PostMapping("/newuser")
	public User createNewUser(@RequestBody User user) {
		return userServices.create(user);
	}
	
	//update a username if its not taken
	@PutMapping("/updateuser/{userName}/{userName1}")
	public User updateUserName(@PathVariable String oldUserName, @PathVariable String newUserName) {
		return userServices.updateUserName(oldUserName, newUserName);
	}
	
	//delete the user
	@DeleteMapping("/users/delete/{userName}")
	public User deleteUser(@PathVariable String userName) {
		return userServices.deleteUser(userName);
	}

}
