package com.EECS4413.UserServiceApp.authentication;

import com.EECS4413.UserServiceApp.database.UserRepository;
import com.EECS4413.UserServiceApp.model.User;;

public class ValidPasswordHandler extends Handler {

    private final UserRepository userRepository;

    public ValidPasswordHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean handle(String userName, String passWord) {
        boolean result = false;
        User user = userRepository.findByUserNameAndPassWord(userName, passWord);
        System.out.println("user from valid password " + user);
        if (user == null) {
            result = false;
            System.out.println("Result: " + result);

            return result;

        } else {
            result = true;
            System.out.println("Result: " + result);
            return handleNext(userName, passWord);

        }

    }

}