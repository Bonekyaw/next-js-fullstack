import express from "express";

import routes from "./routes";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: true })).use(express.json());
app.use(express.static("public"));

app.use(routes);

export default app;
