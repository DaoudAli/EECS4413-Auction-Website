package com.EECS4413.UserServiceApp.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EECS4413.UserServiceApp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserName(String userName);

  User findBypassWord(String passWord);

  List<User> findByIsSeller(boolean isSeller);

  User findByUserNameAndPassWord(String userName, String passWord);

}
