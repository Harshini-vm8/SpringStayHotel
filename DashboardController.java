package h.co.Hotel.controller;

import h.co.Hotel.model.RoomStatus;
import h.co.Hotel.repository.BookingRepository;
import h.co.Hotel.repository.RoomRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public DashboardController(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public Map<String, Object> summary() {
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.countByStatus(RoomStatus.AVAILABLE);
        long occupiedRooms = roomRepository.countByStatus(RoomStatus.OCCUPIED);
        long totalBookings = bookingRepository.count();
        Map<String, Object> map = new HashMap<>();
        map.put("totalRooms", totalRooms);
        map.put("availableRooms", availableRooms);
        map.put("occupiedRooms", occupiedRooms);
        map.put("totalBookings", totalBookings);
        return map;
    }
}
