CREATE SCHEMA IF NOT EXISTS fitnesstracker;
USE fitnesstracker;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FName VARCHAR(50),
    LName VARCHAR(50),
    DOB DATE,
    Weight VARCHAR(50),
    Height VARCHAR(50),
    Email VARCHAR(100)
);

CREATE TABLE Login (
    Username VARCHAR(50),
    Password VARCHAR(50),
    UserID INT,
    PRIMARY KEY(Username, Password),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
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
    UserID INT,
    LocationID INT,
    PRIMARY KEY (UserID, LocationID),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, 
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE CASCADE
);

CREATE TABLE Profile (
    ProfileID INT,
    ProfileName VARCHAR(255),
    FOREIGN KEY (ProfileID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE Milestones (
    MilestoneID INT AUTO_INCREMENT PRIMARY KEY,
    Milestone TEXT
);

CREATE TABLE ProfileHasMilestones (
    ProfileID INT,
    MilestoneID INT,
    PRIMARY KEY(ProfileID, MilestoneID),
    FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE,
    FOREIGN KEY (MilestoneID) REFERENCES MIlestones(MilestoneID) ON DELETE CASCADE
);

CREATE TABLE Comment (
    ProfileID INT,
    Content TEXT,
    UserID INT,
    PublishDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, 
    FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE 
);

CREATE INDEX UserIndex USING BTREE ON User(UserID);
CREATE INDEX FitnessGoalIndex USING BTREE ON FitnessGoal(FitnessGoalID);
CREATE INDEX LocationIndex USING BTREE ON Location(LocationID);
CREATE INDEX ActivitiesIndex USING BTREE ON Activities(ActivityID);
CREATE INDEX ProfileIndex USING BTREE ON Profile(ProfileID);
CREATE INDEX MilestonesIndex USING BTREE ON Milestones(MilestoneID);
