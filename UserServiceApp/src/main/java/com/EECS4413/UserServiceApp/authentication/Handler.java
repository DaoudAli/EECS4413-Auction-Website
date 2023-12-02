package com.EECS4413.UserServiceApp.authentication;

// abstract class for handler for the chain of responsibility design pattern
public abstract class Handler {

    // assigns next handler
    private Handler next;

    // sets the next handler
    public Handler setNextHandler(Handler next) {
        this.next = next;
        return this.next;
    }

    // this checks to see if there is another handler check needed otherwise it will
    // return true
    protected boolean handleNext(String userName, String passWord) {
        if (next == null) {
            return true;
        }
        return next.handle(userName, passWord);
    }

    // abstract method that handles based on the child classes, and allows to pass
    // them down or stop authentication
    public abstract boolean handle(String userName, String passWord);

}
