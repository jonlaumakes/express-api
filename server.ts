import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewuser, signin } from "./modules/handlers/user";

const app = express();

app.use(cors());
// logging requests
// will call next
app.use(morgan("dev"));
// allows client to send JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hello from express - update logger");
  res.status(200);
  res.json({ message: "hello from home" });
});

// protect middleware only applies to /api
app.use("/api", protect, router);

// users can still get to user || signin w/ no token
app.post("/user", createNewuser);
app.post("/signin", signin);

export default app;
