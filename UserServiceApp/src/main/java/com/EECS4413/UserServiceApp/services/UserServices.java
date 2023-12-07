package com.EECS4413.UserServiceApp.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EECS4413.UserServiceApp.authentication.Handler;
import com.EECS4413.UserServiceApp.authentication.UserExistsHandler;
import com.EECS4413.UserServiceApp.authentication.ValidPasswordHandler;
import com.EECS4413.UserServiceApp.database.UserRepository;
import com.EECS4413.UserServiceApp.model.User;

@Service
public class UserServices {
	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private JWTService jwtService;

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

	public String authenticate(String username, String password) {
		System.out.println("In authenticate");
		User user = userRepository.findByUserNameAndPassWord(username, password);
		// Handler is instantiated
		Handler handler = new UserExistsHandler(userRepository);
		handler.setNextHandler(new ValidPasswordHandler(userRepository));
		// Authorization is instantiated with the handler that is used
		AuthorizationService authService = new AuthorizationService(handler);
		System.out.println("In aauhtneticate user:" + user);
		System.out.println("auth service login: " + authService.logIn(username, password));

		// If authservice passes, then we generate token
		if (authService.logIn(username, password)) {
			System.out.println("In auhtneticate service success:" + username);
			return jwtService.generateToken(user);
		}

		return null;
	}

	public User getUserFromToken(String token) {
		if (jwtService.validateToken(token)) {
			return jwtService.getUserFromToken(token);
		}
		return null; // or throw an appropriate exception
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
	 * Read specific user
	 * 
	 * @param userName username of user
	 * @return user object
	 */

	public Optional<User> readUserById(Long userId) {
		return userRepository.findById(userId);
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
