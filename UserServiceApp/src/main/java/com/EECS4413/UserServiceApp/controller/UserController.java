package com.EECS4413.UserServiceApp.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

@RestController
public class UserController {

	private UserServices userServices = new UserServices();
	
	@GetMapping("/")
	public String test() {
		return "login";
	}

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userServices.readAll();
	}
	
	@GetMapping("/users/{userName}")
	public User getSpecificUser(@PathVariable String userName) {
		return userServices.readUser(userName);
	}
	
	@GetMapping("/users/allSellers")
	public List<User> getAllSellers() {
		return userServices.readSellers();
	}
	
	@GetMapping("/users/allBuyers")
	public List<User> getAllBuyers() {
		return userServices.readBuyers();
	}

	@PostMapping("/newuser")
	public User createNewUser(@RequestBody User user) {
		return userServices.create(user);
	}
	
	@PutMapping("/updateuser/{userName}/{userName1}")
	public User updateUserName(@PathVariable String oldUserName, @PathVariable String newUserName) {
		return userServices.updateUserName(oldUserName, newUserName);
	}
	
	@DeleteMapping("/users/delete/{userName}")
	public User deleteUser(@PathVariable String userName) {
		return userServices.deleteUser(userName);
	}

}
