package h.co.Hotel.service;

import h.co.Hotel.model.*;
import h.co.Hotel.repository.BookingRepository;
import h.co.Hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> findById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> recent() {
        return bookingRepository.findTop5ByOrderByBookingIdDesc();
    }

    @Transactional
    public Booking create(Booking booking) {
        Room room = roomRepository.findById(booking.getRoom().getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        if (room.getStatus() == RoomStatus.OCCUPIED) {
            throw new IllegalStateException("Room is already occupied");
        }
        // Persist booking
        Booking saved = bookingRepository.save(booking);
        // Update room status
        room.setStatus(RoomStatus.OCCUPIED);
        roomRepository.save(room);
        return saved;
    }

    @Transactional
    public void delete(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        // Set room back to AVAILABLE
        Room room = booking.getRoom();
        room.setStatus(RoomStatus.AVAILABLE);
        roomRepository.save(room);
        bookingRepository.deleteById(id);
    }
}
