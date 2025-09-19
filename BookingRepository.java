package h.co.Hotel.repository;

import h.co.Hotel.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findTop5ByOrderByBookingIdDesc();

    @Query("SELECT b FROM Booking b WHERE (:roomId IS NULL OR b.room.roomId = :roomId) AND (:customerId IS NULL OR b.customer.customerId = :customerId)")
    List<Booking> search(@Param("roomId") Long roomId, @Param("customerId") Long customerId);
}
