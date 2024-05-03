CREATE SCHEMA IF NOT EXISTS fitnesstracker;
USE fitnesstracker;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50),
    Password VARCHAR(50),
    FName VARCHAR(50),
    LName VARCHAR(50),
    DOB DATE,
    Weight VARCHAR(50),
    Height VARCHAR(50),
    Email VARCHAR(100)
);

CREATE TABLE FitnessGoal (
    FitnessGoalID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Descriptions TEXT,
    CaloriesBurnt INT,
    CaloriesConsumed INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE Location (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    Address VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    BuildingName VARCHAR(255)
);

CREATE TABLE Activities (
    ActivityID INT AUTO_INCREMENT PRIMARY KEY,
    ActivityName VARCHAR(255),
    DurationTime INT,
    TotalCaloriesBurnt INT
);

CREATE TABLE TracksActivities (
    UserID INT,
    ActivityID INT,
    PRIMARY KEY(UserID, ActivityID),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, 
    FOREIGN KEY (ActivityID) REFERENCES Activities(ActivityID) ON DELETE CASCADE
);

CREATE TABLE ActivityLocation (
    ActivityID INT,
    LocationID INT,
    PRIMARY KEY (ActivityID, LocationID),
    FOREIGN KEY (ActivityID) REFERENCES Activities(ActivityID) ON DELETE CASCADE, 
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE
);

CREATE TABLE Profile (
    ProfileID INT,
    ProfileName VARCHAR(255),
    FOREIGN KEY (ProfileID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE FavLocationWall (
    ProfileID INT PRIMARY KEY,
    LocationID INT,
    FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE
);

CREATE TABLE Milestones (
    ProfileID INT,
    Milestone TEXT,
    PRIMARY KEY(ProfileID),
    FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE 
);

CREATE TABLE Comment (
    ProfileID INT,
    Content TEXT,
    UserID INT,
    PublishDate DATE,
    PRIMARY KEY (UserID, ProfileID),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, 
    FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE 
);

-- example
INSERT INTO User (Username, Password, FName, LName, DOB, Weight, Height, Email) 
VALUES ('bob', 'basd', 'dsf', 'dsf', '1985-05-15', 'dsf', 'dsf', 'dsf');

INSERT INTO FitnessGoal (UserID, Descriptions, CaloriesBurnt, CaloriesConsumed)
VALUES (1, "blob", 100,  100);

INSERT INTO Location (Address, City, State, BuildingName)
VALUES ("bobadb", "dsfadsf", "asda", "A");

INSERT INTO Activities (ActivityName, DurationTime, TotalCaloriesBurnt)
VALUES ("asdf", 23, 32)



