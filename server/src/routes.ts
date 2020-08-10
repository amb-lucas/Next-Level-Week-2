import express from "express";
import ClassesController from "./controllers/classesController";
import ConnectionsController from "./controllers/connectionsController";

const routes = express.Router();

const classesController = new ClassesController();
routes.get("/classes", classesController.index);
routes.get("/classes/:id", classesController.show);
routes.post("/classes", classesController.create);

const connectionsController = new ConnectionsController();
routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

export default routes;
