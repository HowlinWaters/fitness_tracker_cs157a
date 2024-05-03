import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const dbconnection = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//start of users
export async function getUsers() {
  const [result] = await dbconnection.query("SELECT * FROM User");
  return result;
}

export async function getUser(id) {
  const [result] = await dbconnection.query(
    `
    SELECT *
    FROM User
    WHERE UserID = ?`,
    [id]
  );
  return result[0];
}

export async function getUserFromLogin(Username, Password) {
  const [result] = await dbconnection.query(
    `
      SELECT UserID FROM User WHERE Username = ? AND Password = ?`,
    [Username, Password]
  );
  return result[0];
}

export async function createUser(
  Username,
  Password,
  FName,
  LName,
  DOB,
  Weight,
  Height,
  Email
) {
  const [result] = await dbconnection.query(
    `
    INSERT INTO User (Username, Password, FName, LName, DOB, Weight, Height, Email)
    VALUES(?,?,?,?,?,?,?,?)
    `,
    [Username, Password, FName, LName, DOB, Weight, Height, Email]
  );
  const id = result.insertId;
  return getUser(id);
}

export async function updateUser(
  Username,
  Password,
  FName,
  LName,
  DOB,
  Weight,
  Height,
  Email,
  UserID
) {
  const [result] = await dbconnection.query(
    `
        UPDATE User
        SET Username = ?, Password = ?, FName = ?, LName = ?, DOB = ?, Weight = ?, Height = ?, Email = ?
        WHERE UserID = ?
    `,
    [Username, Password, FName, LName, DOB, Weight, Height, Email, UserID]
  );
  return getUser(UserID);
}

export async function deleteUser(UserID) {
  const [result] = await dbconnection.query(
    `
        DELETE FROM User WHERE UserID = ?
    `,
    [UserID]
  );
  return result.affectedRows;
}
//end of users

//start of fitnessgoals
export async function getFitnessGoalUser(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM FitnessGoal WHERE UserID = ?`,
    [id]
  );
  return result[0];
}

export async function getFitnessGoal(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM FitnessGoal WHERE FitnessGoalID = ?`,
    [id]
  );
  return result[0];
}

export async function createFitnessGoal(
  UserID,
  Descriptions,
  CaloriesBurnt,
  CaloriesConsumed
) {
  const [result] = await dbconnection.query(
    `INSERT INTO FitnessGoal (UserID, Descriptions, CaloriesBurnt, CaloriesConsumed)
    VALUES (?, ?, ?, ?)`,
    [UserID, Descriptions, CaloriesBurnt, CaloriesConsumed]
  );
  const id = result.insertId;
  return getFitnessGoal(id);
}

export async function updateFitnessGoal(
  UserID,
  Descriptions,
  CaloriesBurnt,
  CaloriesConsumed,
  FitnessGoalID
) {
  const [result] = await dbconnection.query(
    `
    UPDATE FitnessGoal 
    SET UserID = ?, Descriptions = ?, CaloriesBurnt = ?, CaloriesConsumed = ?
    WHERE FitnessGoalID = ?`,
    [UserID, Descriptions, CaloriesBurnt, CaloriesConsumed, FitnessGoalID]
  );
  return getFitnessGoal(FitnessGoalID);
}

export async function deleteFitnessGoal(FitnessGoalID) {
  const [result] = await dbconnection.query(
    `
        DELETE FROM FitnessGoal WHERE FitnessGoalID = ?
      `,
    [FitnessGoalID]
  );
  return result.affectedRows;
}
//end of fitnessgoals

//start of location
export async function getLocation(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM Location WHERE LocationID = ?`,
    [id]
  );
  return result[0];
}

export async function createLocation(Address, City, State, BuildingName) {
  const [result] = await dbconnection.query(
    `INSERT INTO Location (Address, City, State, BuildingName)
    VALUES (?, ?, ?, ?)`,
    [Address, City, State, BuildingName]
  );
  const id = result.insertId;
  return getLocation(id);
}

export async function updateLocations(
  Address,
  City,
  State,
  BuildingName,
  LocationID
) {
  const [result] = await dbconnection.query(
    `
    UPDATE Location 
    SET Address = ?, City = ?, State = ?, BuildingName = ?
    WHERE LocationID = ?`,
    [Address, City, State, BuildingName, LocationID]
  );
  return getLocation(LocationID);
}

export async function deleteLocation(LocationID) {
  const [result] = await dbconnection.query(
    `
    DELETE FROM Location WHERE LocationID = ?
    `,
    [LocationID]
  );
  return result.affectedRows;
}
//end of location

//start of activities
export async function getActivities(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM Activities WHERE ActivityID = ?`,
    [id]
  );
  return result[0];
}

export async function createActivities(
  ActivityName,
  DurationTime,
  TotalCaloriesBurnt
) {
  const [result] = await dbconnection.query(
    `INSERT INTO Activities (ActivityName, DurationTime, TotalCaloriesBurnt)
      VALUES (?, ?, ?)`,
    [ActivityName, DurationTime, TotalCaloriesBurnt]
  );
  const id = result.insertId;
  return getActivities(id);
}

export async function updateActivities(
  ActivityName,
  DurationTime,
  TotalCaloriesBurnt,
  ActivityID
) {
  const [result] = await dbconnection.query(
    `
    UPDATE Activities 
    SET ActivityName = ?, DurationTime = ?, TotalCaloriesBurnt = ?
    WHERE ActivityID = ?`,
    [ActivityName, DurationTime, TotalCaloriesBurnt, ActivityID]
  );
  return getActivities(ActivityID);
}

export async function deleteActivities(ActivityID) {
  const [result] = await dbconnection.query(
    `
    DELETE FROM Activities WHERE ActivityID = ?`,
    [ActivityID]
  );
  return result.affectedRows;
}
//end of activities

//start of trackactivities
//end of trackactivities

//start of activitylocation
//end of activitylocation

//start of profile
//end of profile

//start of favlocationwall
//end of favlocationwall

//start of milestones
//end fo milestones

//start of comment
//end of comment
