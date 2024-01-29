const express = require("express");
const authMiddleware = require("../middleware/middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async function (req, res) {
  const userAcc = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: userAcc.balance,
  });
});

router.post("/transfer", authMiddleware, async function (req, res) {
  if (req.body.amount <= 0) {
    return res.status(411).json({
      message: "Amount must be greater than 0",
    });
  }
  const session = await mongoose.startSession();

  session.startTransaction();
  const to = req.body.to;
  const amount = req.body.amount;

  const userAcc = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (amount > userAcc.balance) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: +amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
