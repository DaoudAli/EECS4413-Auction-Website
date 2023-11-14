package com.EECS4413.PaymentServiceApp.util;

public class Util {
    public static boolean containsNonNumeric(String input) {
        // This regular expression matches only strings that contain at least one non-digit character
        return !input.matches("\\d+"); 
    }
}
