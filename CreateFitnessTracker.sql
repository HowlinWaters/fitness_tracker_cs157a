CREATE SCHEMA IF NOT EXISTS fitnesstracker;
USE fitnesstracker;

CREATE TABLE User (
    UID VARCHAR(50) PRIMARY KEY,
    Username VARCHAR(50),
    FName VARCHAR(50),
    LName VARCHAR(50),
    DOB DATE,
    Weight VARCHAR(50),
    Height VARCHAR(50),
    Email VARCHAR(100),
    Avatar VARCHAR(100)
);

CREATE TABLE FriendList (
    UID VARCHAR(50),
    FID VARCHAR(50),
    FOREIGN KEY (UID) REFERENCES User(UID),
    FOREIGN KEY (FID) REFERENCES User(UID),
    PRIMARY KEY (UID, FID)
);

CREATE TABLE Fitness_Goal (
    Description VARCHAR(255),
    Burnt_Calories VARCHAR(50),
    Calorie_Consumption VARCHAR(50),
    Frequency VARCHAR(50),
    UID VARCHAR(50),
    FOREIGN KEY (UID) REFERENCES User(UID)
);

CREATE TABLE Location (
    Address VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    Building_Name VARCHAR(100),
    PRIMARY KEY (Address)
);

CREATE TABLE Activities (
    AID VARCHAR(50) PRIMARY KEY,
    Duration_Time VARCHAR(50),
    Total_Calories_Burnt VARCHAR(50)
);

CREATE TABLE Activity_Names (
    AID VARCHAR(50),
    Activity_Name VARCHAR(255),
    FOREIGN KEY (AID) REFERENCES Activities(AID),
    PRIMARY KEY (AID, Activity_Name)
);

CREATE TABLE ActivityLocation (
    AID VARCHAR(50),
    Address VARCHAR(255),
    FOREIGN KEY (AID) REFERENCES Activities(AID),
    FOREIGN KEY (Address) REFERENCES Location(Address),
    PRIMARY KEY (AID, Address)
);

CREATE TABLE Tracks_Activities (
    UID VARCHAR(50),
    AID VARCHAR(50),
    FOREIGN KEY (UID) REFERENCES User(UID),
    FOREIGN KEY (AID) REFERENCES Activities(AID),
    PRIMARY KEY (UID, AID)
);

CREATE TABLE Profile (
    PID VARCHAR(50) PRIMARY KEY,
    Profile_Name VARCHAR(50),
    Visibility VARCHAR(50)
);

CREATE TABLE FavLocationWall (
    FavWallID VARCHAR(50) PRIMARY KEY,
    PID VARCHAR(50),
    Address VARCHAR(255),
    FOREIGN KEY (PID) REFERENCES Profile(PID),
    FOREIGN KEY (Address) REFERENCES Location(Address)
);

CREATE TABLE Milestones (
    PID VARCHAR(50),
    Milestone VARCHAR(255),
    FOREIGN KEY (PID) REFERENCES Profile(PID),
    PRIMARY KEY (PID, Milestone)
);

CREATE TABLE Comment (
    Content TEXT,
    Author VARCHAR(50),
    Publish_Date DATETIME,
    PID VARCHAR(50),
    FOREIGN KEY (Author) REFERENCES User(UID),
    FOREIGN KEY (PID) REFERENCES Profile(PID)
);

CREATE TABLE FriendViewProfile (
    PID VARCHAR(50),
    FID VARCHAR(50),
    isViewable BOOLEAN,
    FOREIGN KEY (PID) REFERENCES Profile(PID),
    FOREIGN KEY (FID) REFERENCES FriendList(FID),
    PRIMARY KEY (PID, FID)
);
