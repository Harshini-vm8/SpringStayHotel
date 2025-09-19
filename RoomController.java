package h.co.Hotel.controller;

import h.co.Hotel.model.Room;
import h.co.Hotel.model.RoomStatus;
import h.co.Hotel.model.RoomType;
import h.co.Hotel.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> getAll() {
        return roomRepository.findAll();
    }

    @GetMapping("/types")
    public RoomType[] roomTypes() {
        return RoomType.values();
    }

    @GetMapping("/status")
    public RoomStatus[] roomStatuses() {
        return RoomStatus.values();
    }

    @PostMapping
    public Room create(@RequestBody Room room) {
        if (room.getStatus() == null) room.setStatus(RoomStatus.AVAILABLE);
        return roomRepository.save(room);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> get(@PathVariable Long id) {
        return roomRepository.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> update(@PathVariable Long id, @RequestBody Room updated) {
        return roomRepository.findById(id).map(existing -> {
            existing.setRoomType(updated.getRoomType());
            existing.setPrice(updated.getPrice());
            existing.setStatus(updated.getStatus());
            return ResponseEntity.ok(roomRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!roomRepository.existsById(id)) return ResponseEntity.notFound().build();
        roomRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
