package com.EECS4413.UserServiceApp.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.EECS4413.UserServiceApp.model.User;
import com.EECS4413.UserServiceApp.services.UserServices;

@RestController
public class UserController {

	private UserServices userServices = new UserServices();

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userServices.readAll();
	}

	@PostMapping("/users")
	public User createNewUser(User user) {
		return userServices.create(user);
	}

}
