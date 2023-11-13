package com.EECS4413.UserServiceApp.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
	 * @throws SQLException
	 */

	public User create(User user) throws SQLException {

		Connection con = null;
		String sql = "INSERT INTO dummyuser(id, userName, passWord, firstName, lastName, isSeller) VALUES (?,?,?,?,?,?)";

		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);

			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, user.getId());
			pstmt.setString(2, user.getUserName());
			pstmt.setString(3, user.getPassWord());
			pstmt.setString(4, user.getFirstName());
			pstmt.setString(5, user.getLastName());

			if (user.isSeller()) {
				pstmt.setString(6, "Yes");
			} else {
				pstmt.setString(6, "No");
			}
			pstmt.executeUpdate();
		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}

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
	 * @throws SQLException 
	 */

	public User updateUserName(String oldUserName, String newUserName) throws SQLException {
		
		
		String sql = "UPDATE dummyuser SET userName = ? WHERE userName = ?";
		Connection con = null;
		
		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);
			
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setString(1, newUserName);
			pstmt.setString(2, oldUserName);
			pstmt.executeUpdate();
		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}

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
	 * @throws SQLException
	 */
	public List<User> readAll() throws SQLException {

		List<User> allUsers = new ArrayList<>();
		Connection con = null;
		String sql = "SELECT * FROM dummyuser";

		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);

			Statement stmt = con.createStatement();

			ResultSet rs = stmt.executeQuery(sql);
			{
				while (rs.next()) {
					User u = new User();
					u.setId(rs.getInt("id"));
					u.setUserName(rs.getString("userName"));
					u.setPassWord(rs.getString("passWord"));
					u.setFirstName(rs.getString("firstName"));
					u.setLastName(rs.getString("lastName"));

					if (rs.getString("isSeller").equals("yes")) {
						u.setSeller(true);
					} else {
						u.setSeller(false);
					}
					allUsers.add(u);

				}
			}

		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}
		return allUsers;
	}

	/**
	 * Read specific user
	 * 
	 * @param userName username of user
	 * @return user object
	 * @throws SQLException
	 */

	public User readUser(String userName) throws SQLException {

		Connection con = null;
		String sql = "SELECT firstName, lastName FROM dummyuser WHERE userName = ?";
		User returnedUser = null;

		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);

			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setString(1, userName);

			ResultSet rs = pstmt.executeQuery();

			if (rs.next()) {
				returnedUser.setUserName(userName);
				returnedUser.setFirstName(rs.getString("firstName"));
				returnedUser.setLastName(rs.getString("lastName"));

			}

		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}

		return returnedUser;

	}

	/**
	 * Reads all sellers
	 * 
	 * @param no params
	 * @return a list of all sellers
	 * @throws SQLException 
	 */

	public List<User> readSellers() throws SQLException {
		List<User> sellers = new ArrayList<>();

		Connection con = null;
		String sql = "SELECT id, firstName, lastName, userName FROM dummyuser WHERE isSeller = Yes";
		User seller = null;

		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);

			PreparedStatement pstmt = con.prepareStatement(sql);

			ResultSet rs = pstmt.executeQuery();

			if (rs.next()) {
				seller.setId(rs.getInt("id"));
				seller.setUserName(rs.getString("userName"));
				seller.setFirstName(rs.getString("firstName"));
				seller.setLastName(rs.getString("lastName"));
				sellers.add(seller);
			}

		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}

		return sellers;
	}

	/**
	 * Reads all buyers
	 * 
	 * @param no params
	 * @return a list of all buyers
	 * @throws SQLException 
	 */

	public List<User> readBuyers() throws SQLException {
		List<User> buyers = new ArrayList<>();

		Connection con = null;
		String sql = "SELECT id, firstName, lastName, userName FROM dummyuser WHERE isSeller = No";
		User buyer = null;

		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);

			PreparedStatement pstmt = con.prepareStatement(sql);

			ResultSet rs = pstmt.executeQuery();

			if (rs.next()) {
				buyer.setId(rs.getInt("id"));
				buyer.setUserName(rs.getString("userName"));
				buyer.setFirstName(rs.getString("firstName"));
				buyer.setLastName(rs.getString("lastName"));
				buyers.add(buyer);
			}

		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}

		return buyers;
	}

	/**
	 * Deletes a specified user
	 * 
	 * @param userName user name of User object
	 * @return the deleted user
	 * @throws SQLException 
	 */

	public User deleteUser(String userName) throws SQLException {
		
		String sql = "DELETE FROM dummyuser WHERE userName = ?";
		Connection con = null;
		
		try {
			String url = "";
			String dbUser = "";
			String password = "";

			con = DriverManager.getConnection(url, dbUser, password);
			
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setString(1, userName);
			pstmt.executeUpdate();
		} catch (SQLException ex) {
			System.out.println("Exception: " + ex.getMessage());
		} finally {
			con.close();
		}
		
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getUserName().equals(userName)) {
				User u = users.get(i);
				users.remove(i);
				return u;
			}
		}

		return null;
	}

}
