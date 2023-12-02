package com.EECS4413.UserServiceApp.authentication;

import com.EECS4413.UserServiceApp.database.UserRepository;
import com.EECS4413.UserServiceApp.model.User;

public class UserExistsHandler extends Handler {

    private final UserRepository userRepository;

    public UserExistsHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean handle(String userName, String passWord) {

        User user = userRepository.findByUserName(userName);

        if (user == null) {
            return false;
        }

        return handleNext(userName, passWord);
    }

}