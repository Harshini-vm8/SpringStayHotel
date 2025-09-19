package h.co.Hotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private Double price;

    @Enumerated(EnumType.STRING)
    private RoomStatus status = RoomStatus.AVAILABLE;
}
