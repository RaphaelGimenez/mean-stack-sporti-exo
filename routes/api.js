import express from "express";
import mongoose from "mongoose";

// import model
import List from "../models/List";

// import controllers
import * as Lists from "../controllers/lists";

const router = express.Router();

mongoose.connect(
  "mongodb://admin:myrbx2iV5Nk0@ds123584.mlab.com:23584/sporti-exo"
);
// mongoose.connect("mongodb://localhost:27017/sporti-exo");

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDb connection established.");
});

/* ############# */
/* API Endpoints */
/* ############# */

router.route("/lists").get(Lists.get_all_lists);

router.route("/lists").post(Lists.create_list);

router.route("/lists/:listId").get(Lists.get_single_list);

router.route("/lists/:listId").delete(Lists.delete_list);

router.route("/lists/:listId/spots/:spotId").patch(Lists.add_spot_to_list);

router
  .route("/lists/:listId/spots/:spotId")
  .delete(Lists.delete_spot_from_list);

export default router;
