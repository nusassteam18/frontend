CREATE DATABASE IF NOT EXISTS nus_team18_db;
USE nus_team18_db;
CREATE USER 'nus_team18_db'@'localhost' IDENTIFIED BY 'my_password';
GRANT ALL PRIVILEGES ON nus_team18_db.* TO 'nus_team18_db'@'localhost';
FLUSH PRIVILEGES;

-- create user table -- 
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Admin', 'Customer') DEFAULT 'Customer'
);

-- create admin table -- 
CREATE TABLE IF NOT EXISTS `admins` (
  `adminId` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `restaurantId` INT NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `users`(`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- create customer table --
CREATE TABLE IF NOT EXISTS `customers` (
  `customerId` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `contactNo` VARCHAR(20),
  `creditCardNo` VARCHAR(20),
  `creditCardName` VARCHAR(100),
  `creditCardExpiryDate` DATE,
  `creditCardSecurityCode` VARCHAR(10),
  `homeAddress` VARCHAR(255),
  FOREIGN KEY (`userId`) REFERENCES `users`(`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


