const { ORDER_STATES, ORDER_CREATED, SIZE_TYPES, ORDERS_LIMIT } = require("./config");
const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Client's first fame required"],
  },
  lastName: {
    type: String,
    required: [true, "Client's last fame required"],
  },
  email: {
    type: String,
    required: [true, "Client's email required"],
  },
  phone: {
    type: String,
    required: [true, "Client's phone required"],
  },
  address: {
    type: String,
    required: [true, "Client's address required"],
  },
});
const orderSemaphoreSchema = new mongoose.Schema(
  {
    count:{
      type: Number,
      required: true
    }
  }
)
const orderSchema = new mongoose.Schema(
  {
    client: {
      type: clientSchema,
      required: [true, "Client info required"],
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients",
        required: [true, "Ingredients required"],
      },
    ],
    size: {
      type: String,
      enum: SIZE_TYPES,
      required: [true, "Order size required"],
    },
    status: {
      type: String,
      enum: ORDER_STATES,
      default: ORDER_CREATED,
    },
    patched: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    capped: {
      max: ORDERS_LIMIT,
      autoIndexId: true,
    },
  }
);
const orderProcessedSchema = new mongoose.Schema(
  {
    order:{
      type: orderSchema,
      required: true
    }
  },
  {
    timestamps:true
  }
)
const orderDoneSchema = new mongoose.Schema(
  {
    order:{
      type: orderSchema,
      required: true
    }
  },
  {
    timestamps:true
  }
)
module.exports.Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports.Order = mongoose.model("Order", orderSchema);
module.exports.OrderDone = mongoose.model("OrderDone", orderDoneSchema);
module.exports.OrderProcessed = mongoose.model("OrderProcessed", orderProcessedSchema);
module.exports.OrderSemaphore = mongoose.model("OrderSemaphore", orderSemaphoreSchema);