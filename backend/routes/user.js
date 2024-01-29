const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { objectId } = require("mongodb");
const authMiddleware = require("../middleware/middleware");
const dotenv = require("dotenv");

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});

const updateSchema = zod.object({
  password: zod.string().min(8).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async function (req, res) {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: body.username,
  });
  if (user) {
    return res.status(411).json({
      message: "User already exists",
    });
  }
  const dbUser = await User.create(body);
  const userId = dbUser._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async function (req, res) {
  const body = req.body;
  const username = req.body.username;
  const password = req.body.password;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  const checkUser = await User.findOne({
    username: username,
    password: password,
  });

  if (checkUser) {
    const token = jwt.sign(
      {
        userId: checkUser._id,
      },
      process.env.JWT_SECRET
    );
    return res.json({
      token: token,
    });
  } else {
    return res.status(411).json({
      message: "Error while logging, wrong email or password ",
    });
  }
});

router.put("/", authMiddleware, async function (req, res) {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(404).json({
      message: "Invalid inputs",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({
    message: "Updated successfully",
  });
});
router.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  const usersWithoutCurrUser = users.filter((obj) => {
    return obj._id.toString() !== req.userId;
  });
  res.json({
    user: usersWithoutCurrUser.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/currentUser", authMiddleware, async function (req, res) {
  const user = await User.findOne({
    _id: req.userId,
  });

  if (!user) {
    return res.status(404).send("user not found");
  }

  return res.status(200).json(user);
});
module.exports = router;
