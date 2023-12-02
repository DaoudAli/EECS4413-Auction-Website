package com.EECS4413.UserServiceApp.services;

import com.EECS4413.UserServiceApp.authentication.Handler;

// The authorization service class allows for the authentication to take place
public class AuthorizationService {

    private Handler handler;

    public AuthorizationService(Handler handler) {
        this.handler = handler;
    }

    public boolean logIn(String userName, String passWord) {
        // If the handler has passed all checks, then we are clear to log in
        if (handler.handle(userName, passWord)) {
            return true;
        }
        return false;
    }

}