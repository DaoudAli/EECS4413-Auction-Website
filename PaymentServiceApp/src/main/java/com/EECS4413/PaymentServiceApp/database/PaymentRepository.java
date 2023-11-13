package com.EECS4413.PaymentServiceApp.database;

import com.EECS4413.PaymentServiceApp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // List<Payment> findPayment(String keyword);
}
