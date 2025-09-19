package h.co.Hotel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/")
    public String index() { return "index"; }

    @GetMapping("/rooms")
    public String rooms() { return "rooms"; }

    @GetMapping("/customers")
    public String customers() { return "customers"; }

    @GetMapping("/bookings")
    public String bookings() { return "bookings"; }
}
