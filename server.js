const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const session = require("express-session");
// const knexSessionStore = require("connect-session-knex")(session);
const server = express();
const userRouter = require("./users/user-router");

// const sessionConfig = {
//   name: "Starting Session",
//   secret: process.env.JWT_SECRET,
//   cookie: {
//     maxAge: 60 * 60 * 1000,
//     secure: false,
//     hhtpsOnly: true,
//   },
//   resave: false,
//   saveUninitialize: true,
//   store: new knexSessionStore({
//     knex: require("./data/config"),
//   }),
// };

// server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/users", userRouter);
server.use(userRouter);
server.get("/", (req, res) => {
  res.json({ api: "Open" });
});

module.exports = server;
