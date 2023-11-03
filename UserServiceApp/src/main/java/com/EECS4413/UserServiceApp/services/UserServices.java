package com.EECS4413.UserServiceApp.services;

import java.util.*;
import com.EECS4413.UserServiceApp.model.User;

public class UserServices {

	private static List<User> users = new ArrayList<>();

	/**
	 * CREATE methods
	 */

	/**
	 * Creates a new User Users can not have the same username
	 * 
	 * @param User the new user object
	 * @return new user object
	 */

	public User create(User user) {

		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getUserName().equals(user.getUserName())) {
				return null;
			}
		}

		users.add(user);
		return null;
	}

	/**
	 * Updates username if username is available
	 * 
	 * @param oldUserName the older username of the user, newUserName the new
	 *                    username of user
	 * @return user object that had name changed
	 */

	public User updateUserName(String oldUserName, String newUserName) {

		// userNum is used to locate the User with the old user name
		int userNum = -1;

		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getUserName().equals(oldUserName)) {
				userNum = i;
				break;
			}
		}

		if (userNum != -1) {
			for (int i = 0; i < users.size(); i++) {
				if (users.get(i).getUserName().equals(newUserName)) {
					return null;
				}
			}
		} else {
			return null;
		}

		users.get(userNum).setUserName(newUserName);

		return users.get(userNum);
	}

	/**
	 * Reads all users
	 * 
	 * @param no params
	 * @return a list of all users
	 */
	public List<User> readAll() {
		return users;
	}

}
