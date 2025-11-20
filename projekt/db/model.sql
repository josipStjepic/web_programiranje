-- 1. Kreiraj bazu
CREATE DATABASE travel_reservations CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Koristi tu bazu
USE travel_reservations;

-- 3. Tablica korisnika
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tablica putovanja
CREATE TABLE IF NOT EXISTS trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tablica rezervacija
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  trip_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);


INSERT INTO trips (destination, description, date, price) VALUES
('Pariz', 'Romantično putovanje u Pariz', '2025-12-15', 499.99),
('Barcelona', 'Vikend u Barceloni', '2026-01-10', 299.99),
('Rim', 'Povijesna tura kroz Rim', '2026-03-05', 399.50);
