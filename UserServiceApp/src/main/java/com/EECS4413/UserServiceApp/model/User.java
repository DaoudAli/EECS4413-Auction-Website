package com.EECS4413.UserServiceApp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String userName;

	@Column(nullable = false)
	private String passWord;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;

	@Column(nullable = false)
	private String street;

	@Column(nullable = false)
	private String streetNumber;

	@Column(nullable = false)
	private String province;

	@Column(nullable = false)
	private String country;

	@Column(nullable = false)
	private String postalCode;

	@Column
	private boolean isSeller;

	// Constructors, getters, and setters
	public User() {
	}

	public User(String userName, String passWord, String firstName, String lastName,
			String street, String streetNumber, String province, String country,
			String postalCode, boolean isSeller) {
		this.userName = userName;
		this.passWord = passWord;
		this.firstName = firstName;
		this.lastName = lastName;
		this.street = street;
		this.streetNumber = streetNumber;
		this.province = province;
		this.country = country;
		this.postalCode = postalCode;
		this.isSeller = isSeller;
	}

	// Include other constructors if necessary

	// Getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getprovince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;

	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public boolean getIsSeller() {
		return isSeller;
	}

	public void setIsSeller(boolean isSeller) {
		this.isSeller = isSeller;
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", userName='" + userName + '\'' +
				", passWord='" + passWord + '\'' +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", street='" + street + '\'' +
				", streetNumber='" + streetNumber + '\'' +
				", province='" + province + '\'' +
				", country='" + country + '\'' +
				", postalCode='" + postalCode + '\'' +
				", isSeller=" + isSeller +
				'}';
	}

}
