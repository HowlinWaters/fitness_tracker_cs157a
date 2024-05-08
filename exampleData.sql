USE fitnesstracker;
-- example
INSERT INTO User (Username, Password, FName, LName, DOB, Weight, Height, Email) 
VALUES ('bob', 'basd', 'dsf', 'dsf', '1985-05-15', 'dsf', 'dsf', 'dsf');

INSERT INTO FitnessGoal (UserID, Descriptions, CaloriesBurnt, CaloriesConsumed)
VALUES (1, "blob", 100,  100);

INSERT INTO Location (Address, City, State, BuildingName)
VALUES ("bobadb", "dsfadsf", "asda", "A");

INSERT INTO Location (Address, City, State, BuildingName)
VALUES ("bobadb", "dsfadsf", "asda", "A");

INSERT INTO Activities (ActivityName, DurationTime, TotalCaloriesBurnt)
VALUES ("asdf", 23, 32);

INSERT INTO Profile (ProfileID, ProfileName)
VALUES (1, "bibly");