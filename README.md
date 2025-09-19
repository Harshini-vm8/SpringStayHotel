# SpringStayHMS - Hotel Management System

## Overview
SpringStayHMS is a comprehensive Hotel Management System built with Spring Boot, designed to streamline hotel operations including room bookings, guest management, and staff coordination.

## 🚀 Features
- **Room Management**: View and manage hotel rooms and their availability
- **Booking System**: Handle reservations and check-ins/check-outs
- **Guest Management**: Maintain guest records and preferences
- **Staff Dashboard**: Administrative interface for hotel staff
- **H2 Database**: In-memory database for development with web console access

## 🛠️ Tech Stack
- **Backend**: Spring Boot 3.5.6
- **Database**: H2 (in-memory)
- **Frontend**: Thymeleaf templates
- **Build Tool**: Maven
- **Java Version**: 17

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6.3 or higher

### Installation
1. Clone the repository
   ```bash
   git clone [your-repository-url]
   cd SpringStayHMS
   ```

2. Build the project
   ```bash
   mvn clean install
   ```

### Running the Application
```bash
mvn spring-boot:run
```

The application will be available at: http://localhost:8082

### Accessing H2 Console
- URL: http://localhost:8082/h2
- JDBC URL: `jdbc:h2:mem:hotel_db`
- Username: `sa`
- Password: (leave empty)

## 🏗️ Project Structure
```
src/
├── main/
│   ├── java/h/co/Hotel/
│   │   ├── config/       # Configuration classes
│   │   ├── controller/   # MVC Controllers
│   │   ├── model/        # Entity classes
│   │   ├── repository/   # Data repositories
│   │   ├── service/      # Business logic
│   │   └── HotelApplication.java  # Main application class
│   └── resources/
│       ├── static/       # Static resources (CSS, JS, images)
│       ├── templates/    # Thymeleaf templates
│       └── application.properties  # Application configuration
```

## 🔧 Configuration
Edit `src/main/resources/application.properties` to configure:
- Server port
- Database settings
- Logging levels
- Application properties

## 📝 API Documentation
API documentation is available at: http://localhost:8082/swagger-ui.html (if Swagger is configured)

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments
- Spring Boot Team
- H2 Database
- Open Source Community
