import express from "express";
import { getUsers } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.get("/data",userAuth, getUsers);

export default userRouter;
