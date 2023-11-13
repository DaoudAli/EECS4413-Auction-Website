package com.EECS4413.UserServiceApp.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EECS4413.UserServiceApp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);

  List<User> findByIsSeller(boolean isSeller);
}
