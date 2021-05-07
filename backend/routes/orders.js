const express = require("express");
const {
  ORDER_CREATED,
  ORDER_CANCELLED,
  PRICE_SIZE_DICT,
  TIME_SIZE_DICT,
} = require("../config");
const {
  Order,
  OrderDone,
  OrderSemaphore,
  Ingredient,
} = require("../models");
const router = express.Router();

// GET recent orders
router.get("/", async function (req, res, next) {
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
    // Kinda bad should be automated on DB level e.g. trigger
    let price = PRICE_SIZE_DICT[newOrder.size];
    let time = TIME_SIZE_DICT[newOrder.size];

    for (ingredientId of req.body.ingredients) {
      let ingredient = await Ingredient.findById(ingredientId).exec();
      if (!ingredient) {
        throw "Invalid ingredient";
      }
      price += ingredient.price;
      time += ingredient.time;
      ingredient.demand ++
      await ingredient.save()
    }
    newOrder.time = time;
    newOrder.price = price;
    await newOrder.save();

    allOrders = await Order.find({}).sort({ createdAt: "asc" }).exec();
    let count = 0;
    let waitTime = 0;
    for (o of allOrders) {
      count++;
      waitTime += o.time;
      if (o._id == newOrder._id) break;
    }
    res.json({count,waitTime});
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
      throw "Order not Found";
    }
  } catch (e) {
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
      // Kinda bad should be automated on DB level e.g. trigger
      for (ingredientId of req.body.ingredients) {
        let ingredient = await Ingredient.findById(ingredientId).exec();
        order.price += ingredient.price;
        order.time += ingredient.time;
        ingredient.demand ++
        await ingredient.save()
      }
      await order.save();
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

module.exports = router;
