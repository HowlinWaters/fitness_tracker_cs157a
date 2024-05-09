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
      SELECT UserID FROM Login WHERE Username = ? AND Password = ?`,
    [Username, Password]
  );
  return result[0];
}

export async function createLogin(Username, Password, UserID) {
  const [result] = await dbconnection.query(
    `
    INSERT INTO Login (Username, Password, UserID)
    VALUES(?,?,?)`,
    [Username, Password, UserID]
  );
  await createProfile(Username, UserID);
  await createBMI(UserID, "");
  await createNote(UserID, "");
  return getUser(UserID);
}

export async function createUser(FName, LName, DOB, Weight, Height, Email) {
  const [result] = await dbconnection.query(
    `
    INSERT INTO User (FName, LName, DOB, Weight, Height, Email)
    VALUES(?,?,?,?,?,?)
    `,
    [FName, LName, DOB, Weight, Height, Email]
  );
  const id = result.insertId;
  return getUser(id);
}

export async function updateUser(
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
        SET FName = ?, LName = ?, DOB = ?, Weight = ?, Height = ?, Email = ?
        WHERE UserID = ?
    `,
    [FName, LName, DOB, Weight, Height, Email, UserID]
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
  return result;
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
  const userID = 1; // Temporary constant for user ID.
  await createActivityLocation(userID, id);
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
  const userID = 1;
  await createTracksActivities(userID, id); // Current user ID (possibly global) must be used for this function call
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
export async function getTracksActivities(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM TracksActivities WHERE UserID = ?`,
    [id]
  );
  return result;
}

export async function createTracksActivities(UserID, ActivityID) {
  const [result] = await dbconnection.query(
    `INSERT INTO TracksActivities (UserID, ActivityID)
    VALUES (?, ?)`,
    [UserID, ActivityID]
  );
  return getTracksActivities(UserID);
}
//end of trackactivities

//start of activitylocation
export async function getActivityLocation(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM ActivityLocation WHERE UserID = ?`,
    [id]
  );
  return result;
}

export async function createActivityLocation(UserID, LocationID) {
  const [result] = await dbconnection.query(
    `INSERT INTO ActivityLocation (UserID, LocationID)
    VALUES (?, ?)`,
    [UserID, LocationID]
  );
  return getActivityLocation(UserID);
}
//end of activitylocation

//start of profile
export async function getProfile(id) {
  const [result] = await dbconnection.query(
    `SELECT * FROM Profile WHERE ProfileID = ?`,
    [id]
  );
  return result[0];
}

export async function createProfile(ProfileName, UserID) {
  const [result] = await dbconnection.query(
    `INSERT INTO Profile (ProfileID, ProfileName)
    VALUES (?, ?)`,
    [UserID, ProfileName]
  );
  return getProfile(UserID);
}

export async function updateProfile(ProfileName, UserID) {
  const [result] = await dbconnection.query(
    `
    UPDATE Profile 
    SET ProfileName = ?
    WHERE ProfileID = ?`,
    [ProfileName, UserID]
  );
  return getProfile(UserID);
}

export async function getAllProfiles() {
  const [result] = await dbconnection.query(`SELECT * FROM Profile`);
  return result;
}
//end of profile

//start of milestones
export async function getMilestones(id) {
  const [result] = await dbconnection.query(
    `
        SELECT * FROM Milestones WHERE MilestoneID = ?`,
    [id]
  );
  return result;
}

export async function createMilestone(Milestone, ProfileID) {
  const [result] = await dbconnection.query(
    `INSERT INTO Milestones (Milestone)
        VALUES (?)`,
    [Milestone]
  );
  const id = result.insertId;
  await createProfileMilestones(ProfileID, id);
  return getMilestones(id);
}

export async function updateMilestone(MilestoneID, Milestone) {
  const [result] = await dbconnection.query(
    `
        UPDATE Milestones
        SET Milestone = ?
        WHERE MilestoneID = ?`,
    [Milestone, MilestoneID]
  );
  return getMilestones(MilestoneID);
}

export async function deleteMilestone(MilestoneID) {
  const [result] = await dbconnection.query(
    `
        DELETE FROM Milestones WHERE MilestoneID = ?`,
    [MilestoneID]
  );
  return result.affectedRows;
}
//end of milestones

// I'm not sure if we need this, so I'll leave the functions for ProfileHasMilestones for now.
// start of profilehasmilestones
export async function getProfileMilestones(id) {
  const [result] = await dbconnection.query(
    `
        SELECT * FROM ProfileHasMilestones WHERE ProfileID = ?`,
    [id]
  );
  return result[0];
}

export async function createProfileMilestones(ProfileID, MilestoneID) {
  const [result] = await dbconnection.query(
    `
        INSERT INTO ProfileHasMilestones (ProfileID, MilestoneID)
        VALUES (?, ?)`,
    [ProfileID, MilestoneID]
  );
  return getProfileMilestones(ProfileID);
}
//end of profilehasmilestones

//start of comment
export async function getComment(id) {
  const [result] = await dbconnection.query(
    `
        SELECT * FROM Comment WHERE CommentID = ?`,
    [id]
  );
  return result[0]; // Show all comments a user has made?
}

export async function getCommentwProfile(id) {
  const [result] = await dbconnection.query(
    `
        SELECT * FROM Comment WHERE ProfileID = ?`,
    [id]
  );
  return result; // Show all comments a user has made?
}

export async function createComment(ProfileID, Content, UserID, PublishDate) {
  const [result] = await dbconnection.query(
    `
        INSERT INTO Comment(ProfileID, Content, UserID, PublishDate)
        VALUES (?, ?, ?, ?)`,
    [ProfileID, Content, UserID, PublishDate]
  );
  return getComment(ProfileID);
}

export async function updateComment(ProfileID, Content, UserID, PublishDate) {
  const [result] = await dbconnection.query(
    `
        UPDATE Comment
        SET ProfileID = ?, Content = ?, UserID = ?, PublishDate = ?`,
    [ProfileID, Content, UserID, PublishDate]
  );
  return getComment(ProfileID);
}
//end of comment

//start of BMI
export async function getBMI(id) {
  const [result] = await dbconnection.query(
    `
      SELECT * FROM BMI WHERE BMIID = ?`,
    [id]
  );
  return result[0]; // Show all comments a user has made?
}

export async function createBMI(BMIID, BMIContent) {
  const [result] = await dbconnection.query(
    `
      INSERT INTO BMI(BMIID, BMIContent)
      VALUES (?, ?)`,
    [BMIID, BMIContent]
  );
  return getBMI(BMIID);
}

export async function updateBMI(BMIID, BMIContent) {
  const [result] = await dbconnection.query(
    `
      UPDATE BMI
      SET BMIContent = ? WHERE BMIID = ?`,
    [BMIContent, BMIID]
  );
  return getBMI(BMIID);
}
//end of BMI

//start of Note
export async function getNote(id) {
  const [result] = await dbconnection.query(
    `
      SELECT * FROM Note WHERE NoteID = ?`,
    [id]
  );
  return result[0]; // Show all comments a user has made?
}

export async function createNote(NoteID, NoteContent) {
  const [result] = await dbconnection.query(
    `
      INSERT INTO Note(NoteID, NoteContent)
      VALUES (?, ?)`,
    [NoteID, NoteContent]
  );
  return getNote(NoteID);
}

export async function updateNote(NoteID, NoteContent) {
  const [result] = await dbconnection.query(
    `
      UPDATE Note
      SET NoteContent = ? WHERE NoteID = ?`,
    [NoteContent, NoteID]
  );
  return getNote(NoteID);
}
//end of Note
