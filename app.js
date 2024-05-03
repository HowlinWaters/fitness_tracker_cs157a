import express from "express";
import {
  getUsers,
  getUser,
  getUserFromLogin,
  createUser,
  updateUser,
  deleteUser,
  getFitnessGoalUser,
  createFitnessGoal,
  updateFitnessGoal,
  deleteFitnessGoal,
  getFitnessGoal,
  getLocation,
  createLocation,
  updateLocations,
  deleteLocation,
  getActivities,
  createActivities,
  updateActivities,
  deleteActivities,
  getTracksActivities,
  createTracksActivities,
  getActivityLocation,
  createActivityLocation,
  getProfile,
  createProfile,
  updateProfile,
  getFavLocationWall, 
  addFavLocationWall, 
  updateFavLocationWall, 
  deleteFavLocationWall,
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getProfileMilestones,
  createProfileMilestones,
  getComment,
  createComment,
  updateComment
} from "./database.js";

const app = express();

app.use(express.json());

//For Users table

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.get("/users/:Username/:Password", async (req, res) => {
  const Username = req.params.Username;
  const Password = req.params.Password;
  const user = await getUserFromLogin(Username, Password);
  res.send(user);
});

app.post("/createusers", async (req, res) => {
  const { Username, Password, FName, LName, DOB, Weight, Height, Email } =
    req.body;
  const user = await createUser(
    Username,
    Password,
    FName,
    LName,
    DOB,
    Weight,
    Height,
    Email
  );
  res.status(201).send(user);
});

app.put("/updateusers", async (req, res) => {
  const {
    Username,
    Password,
    FName,
    LName,
    DOB,
    Weight,
    Height,
    Email,
    UserID,
  } = req.body;
  const user = await updateUser(
    Username,
    Password,
    FName,
    LName,
    DOB,
    Weight,
    Height,
    Email,
    UserID
  );
  res.status(201).send(user);
});

app.delete("/deleteusers/:id", async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);
  res.send(user);
});
//end of user table

//start of fitnessgoals table
app.get("/fitnessgoalsuser/:id", async (req, res) => {
  const id = req.params.id;
  const fitnessgoals = await getFitnessGoalUser(id);
  res.send(fitnessgoals);
});

app.get("/fitnessgoal/:id", async (req, res) => {
  const id = req.params.id;
  const fitnessgoals = await getFitnessGoal(id);
  res.send(fitnessgoals);
});

app.post("/createfitnessgoals", async (req, res) => {
  const { UserID, Descriptions, CaloriesBurnt, CaloriesConsumed } = req.body;
  const fitnessgoals = await createFitnessGoal(
    UserID,
    Descriptions,
    CaloriesBurnt,
    CaloriesConsumed
  );
  res.status(201).send(fitnessgoals);
});

app.put("/updatefitnessgoals", async (req, res) => {
  const {
    UserID,
    Descriptions,
    CaloriesBurnt,
    CaloriesConsumed,
    FitnessGoalID,
  } = req.body;
  const fitnessgoals = await updateFitnessGoal(
    UserID,
    Descriptions,
    CaloriesBurnt,
    CaloriesConsumed,
    FitnessGoalID
  );
  res.status(201).send(fitnessgoals);
});

app.delete("/deletefitnessgoals/:id", async (req, res) => {
  const id = req.params.id;
  const fitnessgoals = await deleteFitnessGoal(id);
  res.send(fitnessgoals);
});
//end of fitnessgoals

//start of location
app.get("/location/:id", async (req, res) => {
  const id = req.params.id;
  const location = await getLocation(id);
  res.send(location);
});

app.post("/createlocations", async (req, res) => {
  const { Address, City, State, BuildingName } = req.body;
  const location = await createLocation(Address, City, State, BuildingName);
  res.status(201).send(location);
});

app.put("/updatelocations", async (req, res) => {
  const { Address, City, State, BuildingName, LocationID } = req.body;
  const location = await updateLocations(
    Address,
    City,
    State,
    BuildingName,
    LocationID
  );
  res.status(201).send(location);
});

app.delete("/deletelocations/:id", async (req, res) => {
  const id = req.params.id;
  const location = await deleteLocation(id);
  res.send(location);
});
//end of location

//start of activities
app.get("/activities/:id", async (req, res) => {
  const id = req.params.id;
  const activity = await getActivities(id);
  res.send(activity);
});

app.post("/createactivities", async (req, res) => {
  const { ActivityName, DurationTime, TotalCaloriesBurnt } = req.body;
  const activity = await createActivities(
    ActivityName,
    DurationTime,
    TotalCaloriesBurnt
  );
  res.status(201).send(activity);
});

app.put("/updateactivities", async (req, res) => {
  const { ActivityName, DurationTime, TotalCaloriesBurnt, ActivityID } =
    req.body;
  const activity = await updateActivities(
    ActivityName,
    DurationTime,
    TotalCaloriesBurnt,
    ActivityID
  );
  res.status(201).send(activity);
});

app.delete("/deleteactivities/:id", async (req, res) => {
  const id = req.params.id;
  const activity = await deleteActivities(id);
  res.send(activity);
});
//end of activities

//start of trackactivities
app.get("/tracksactivities/:id", async (req, res) => {
  const id = req.params.id;
  const trackactivity = await getTracksActivities(id);
  res.send(trackactivity);
});

app.post("/createtracksactivities", async (req, res) => {
  const { UserID, ActivityID } = req.body;
  const trackactivity = await createTracksActivities(UserID, ActivityID);
  res.status(201).send(trackactivity);
});
//end of trackactivities

//start of activitylocation
app.get("/activitylocation/:id", async (req, res) => {
  const id = req.params.id;
  const activitylocation = await getActivityLocation(id);
  res.send(activitylocation);
});

app.post("/createactivitylocation", async (req, res) => {
  const { ActivityID, LocationID } = req.body;
  const activitylocation = await createActivityLocation(ActivityID, LocationID);
  res.status(201).send(activitylocation);
});
//end of activitylocation

//start of profile and profileID and userID are the same
app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const profile = await getProfile(id);
  res.send(profile);
});

app.post("/createprofile", async (req, res) => {
  const { ProfileName, ProfileID } = req.body;
  const profile = await createProfile(ProfileName, ProfileID);
  res.status(201).send(profile);
});

app.put("/updateprofile", async (req, res) => {
  const { ProfileName, ProfileID } = req.body;
  const profile = await updateProfile(ProfileName, ProfileID);
  res.status(201).send(profile);
});
//end of profile

//start of favlocationwall
app.get("/favlocationwall/:id", async (req, res) => {
  const id = req.params.id;
  const activity = await getFavLocationWall(id);
  res.send(activity);
});

app.post("/createfavlocationwall", async (req, res) => {
  const { FavLocationWallID, LocationID } = req.body;
  const activity = await addFavLocationWall(FavLocationWallID, LocationID);
  res.status(201).send(activity);
});

app.put("/updatefavlocationwall", async (req, res) => {
  const { FavLocationWallID, LocationID } = req.body;
  const activity = await updateFavLocationWall(FavLocationWallID, LocationID);
  res.status(201).send(activity);
});

app.delete("/deletefavlocationwall", async (req, res) => {
  const { FavLocationWallID, LocationID } = req.body;
  const activity = await deleteFavLocationWall(FavLocationWallID, LocationID);
  res.send(activity);
});
//end of favlocationwall

//start of milestones
app.get("/milestones/:id", async (req, res) => {
  const id = req.params.id;
  const milestones = await getMilestones(id);
  res.send(milestones);
})

app.post("/createmilestone", async (req, res) => {
  const {Milestone, ProfileID} = req.body;
  const milestone = await createMilestone(Milestone, ProfileID);
  res.status(201).send(milestone);
})

app.put("/updatemilestones", async (req, res) => {
  const {MilestoneID, Milestone} = req.body;
  const milestone = await updateMilestone(MilestoneID, Milestone);
  res.status(201).send(milestone);
})

app.delete("/deletemilestone", async (req, res) => {
  const {MilestoneID} = req.body;
  const milestone = await deleteMilestone(MilestoneID);
  res.send(milestone);
})
//end of milestones

// start of profilehasmilestones
app.get("/profilemilestones/:id", async (req, res) => {
  const id = req.params.id;
  const profilemilestones = await getProfileMilestones(id);
  res.send(profilemilestones);
})

app.post("/createprofilemilestones", async (req, res) => {
  const {ProfileID, MilestoneID} = req.body;
  const profilemilestones = await createProfileMilestones(ProfileID, MilestoneID);
  res.status(201).send(profilemilestones);
})

//start of comment
app.get("/comment/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await getComment(id);
  res.send(comment);
})

app.post("/createcomment", async (req, res) => {
  const {ProfileID, Content, UserID, PublishDate} = req.body;
  const comment = await createComment(ProfileID, Content, UserID, PublishDate);
  res.status(201).send(comment);
})

app.put("/updatecomment", async (req, res) => {
  const {ProfileID, Content, UserID, PublishDate} = req.body;
  const comment = await updateComment(ProfileID, Content, UserID, PublishDate);
  res.status(201).send(comment);
})
//end of comment

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server on port 8080");
});
