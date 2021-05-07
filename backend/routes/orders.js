const express = require("express");
const { ORDER_CREATED, ORDER_CANCELLED } = require("../config");
const {
  Order,
  OrderDone,
  OrderSemaphore,
  OrderProcessed,
} = require("../models");
const router = express.Router();
const authenticateJWT = require("./auth").authenticateJWT

// GET recent orders
router.get("/", authenticateJWT, async function (req, res, next) {
  let recentOrders = await Order.find({}).exec();
  res.json(
    recentOrders.map((order) => {
      return {
        ingredients: order.ingredients,
        size: order.size,
      };
    })
  );
});

// POST create order
router.post("/", async function (req, res, next) {
  try {
    let newOrder = new Order({
      client: req.body.client,
      ingredients: req.body.ingredients,
      size: req.body.size,
      status: ORDER_CREATED,
      patched: false,
    });
    let validatedModel = newOrder.validateSync();
    if (!!validatedModel) {
      throw "Invalid request body.";
    }
    let orderSemaphore = await OrderSemaphore.findOneAndUpdate(
      {
        count: { $gt: 0 },
      },
      {
        $inc: { count: -1 },
      }
    ).exec();
    if (!orderSemaphore) {
      throw "We are too busy at the momment. Please try again later.";
    }
    await newOrder.save();
    // CALC TIME
    res.json(newOrder);
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});
// GET order status by id
router.get("/:orderId/isFinished", async function (req, res, next) {
  try {
    let orderDone = await OrderDone.findOne({
      order: { _id: req.params.orderId },
    }).exec();
    res.send(!!orderDone);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

// Cancell order
router.delete("/:orderId", async function (req, res, next) {
  try {
    let order = await Order.findOneAndDelete({
      _id: req.params.orderId,
    }).exec();
    if (order) {
      await OrderSemaphore.findOneAndUpdate({
        $inc: { count: 1 },
      }).exec();
      res.send("Order cancelled");
    } else {
      order = await OrderProcessed.findOneAndUpdate(
        { order: { _id: req.params.orderId } },
        { $set: { status: ORDER_CANCELLED } }
      ).exec();
      if (!order) {
        throw "Order not Found";
      } else {
        res.send("Order cancelled");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send(e);
  }
});

// Update order
router.patch("/:orderId", async function (req, res, next) {
  if (!req.body.ingredients || !Array.isArray(req.body.ingredients)) {
    res.status(400);
    res.send("Invalid request body.");
  }
  try {
    let order = await Order.findOneAndUpdate(
      {
        _id: req.params.orderId,
        patched: false,
      },
      {
        $push: { ingredients: req.body.ingredients },
        $set: { patched: true },
      }
    ).exec();
    if (!order) {
      throw "Order not found";
    } else {
      res.send("Order updated");
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

module.exports = router;
