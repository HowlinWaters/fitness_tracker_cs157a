CREATE SCHEMA IF NOT EXISTS fitnesstracker;
USE fitnesstracker;

CREATE TABLE User (
    UID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50),
    FName VARCHAR(50),
    LName VARCHAR(50),
    DOB DATE,
    Weight VARCHAR(50),
    Height VARCHAR(50),
    Email VARCHAR(100),
    Avatar VARCHAR(100)
);

INSERT INTO User (Username, FName, LName, DOB, Weight, Height, Email, Avatar)
VALUES 
('johndoe', 'John', 'Doe', '1985-05-15', '180lbs', '5ft 9in', 'john.doe@example.com', 'avatar001.jpg');

INSERT INTO User (Username, FName, LName, DOB, Weight, Height, Email, Avatar)
VALUES 
('janedoe', 'Jane', 'Doe', '1990-07-22', '130lbs', '5ft 5in', 'jane.doe@example.com', 'avatar002.jpg');

