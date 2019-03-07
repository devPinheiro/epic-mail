import express from "express";
import sentController from "./sent.controller";

export const sentRouter = express.Router();
sentRouter.get('/sent', sentController.sentMessages);