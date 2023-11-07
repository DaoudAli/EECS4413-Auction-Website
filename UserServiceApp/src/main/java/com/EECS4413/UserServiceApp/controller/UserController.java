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

	@PostMapping("/newuser")
	public User createNewUser(@RequestBody User user) {
		return userServices.create(user);
	}
	
	@PutMapping("/updateuser/{userName}/{userName1}")
	public User updateUserName(@PathVariable String userName, @PathVariable String userName1) {
		return userServices.updateUserName(userName, userName1);
	}

}
