package h.co.Hotel.repository;

import h.co.Hotel.model.Room;
import h.co.Hotel.model.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    long countByStatus(RoomStatus status);
}
