package com.EECS4413.UserServiceApp.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EECS4413.UserServiceApp.database.UserRepository;
import com.EECS4413.UserServiceApp.model.User;

@Service
public class UserServices {

	private final UserRepository userRepository;

	@Autowired
	public UserServices(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User create(User user) {
		if (userRepository.findByUserName(user.getUserName()) != null) {
			return null;
		}
		return userRepository.save(user);
	}

	/**
	 * Updates username if username is available
	 * 
	 * @param oldUserName the older username of the user, newUserName the new
	 *                    username of user
	 * @return user object that had name changed
	 */

	public User updateUserName(String oldUserName, String newUserName) {

		User user = userRepository.findByUserName(oldUserName);

		if (user == null)
			return null;

		user.setUserName(newUserName);

		return userRepository.save(user);
	}

	/**
	 * Reads all users
	 * 
	 * @param no params
	 * @return a list of all users
	 */
	public List<User> readAll() {
		return userRepository.findAll();
	}

	/**
	 * Read specific user
	 * 
	 * @param userName username of user
	 * @return user object
	 */

	public User readUser(String userName) {
		return userRepository.findByUserName(userName);
	}

	/**
	 * Reads all sellers
	 * 
	 * @param no params
	 * @return a list of all sellers
	 */

	public List<User> readSellers() {
		return userRepository.findByIsSeller(true);
	}

	/**
	 * Reads all buyers
	 * 
	 * @param no params
	 * @return a list of all buyers
	 */

	public List<User> readBuyers() {
		return userRepository.findByIsSeller(false);
	}

	/**
	 * Deletes a specified user
	 * 
	 * @param userName user name of User object
	 * @return the deleted user
	 */

	public String deleteUser(String userName) {
		User user = userRepository.findByUserName(userName);

		if (user == null) {
			return "User not found";
		}
		userRepository.delete(user);
		return "User successfully deleted";
	}

}
