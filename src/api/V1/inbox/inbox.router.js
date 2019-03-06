import express from "express";
import inboxController from "./inbox.controller";

export const inboxRouter = express.Router();
inboxRouter.get('/unread', inboxController.unreadMessages);