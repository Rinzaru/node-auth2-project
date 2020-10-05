const express = require("express");
const users = require("./user-model");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restrict = require("./middleware/auth-user");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  let user = req.body;
  const hash = bcyrpt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await users.add(user);
    res.status(201).json(saved);
    console.log(`User added!`);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;

  try {
    const [user] = await users.findBy({ username });
    const passwordValidation = await bcyrpt.compare(password, user.password);

    if (!user || !passwordValidation) {
      return res.status(401).json({
        message: "Invalid Username Or Password",
      });
    }
    const token = jwt.sign(
      {
        userID: user.id,
        userRole: "Basic", //This value is normally grabbed from the database
      },
      process.env.JWT_SECRET
    );
    res.json({
      message: `Welcome ${user.username}`,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", restrict(), async (req, res, next) => {
  try {
    res.json(await users.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
