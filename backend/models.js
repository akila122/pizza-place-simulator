const {
  ORDER_STATES,
  ORDER_CREATED,
  SIZE_TYPES,
  ORDERS_LIMIT,
} = require("./config");
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
  demand: {
    type: Number,
    required: true,
    default: 0,
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
const orderSemaphoreSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
});
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
    price: {
      type: Number,
    },
    time: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const orderProcessedSchema = new mongoose.Schema(
  {
    order: {
      type: orderSchema,
      required: true,
    },
    coockId:{
      type: String,
      required: true
    },
    itemProcessed:{
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
const orderDoneSchema = new mongoose.Schema(
  {
    order: {
      type: orderSchema,
      required: true,
    },
    coockId:{
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
});

const timeSchema = new mongoose.Schema({
  totalSeconds: {
    type: Number,
  },
  sinceLastStartSeconds: {
    type: Number,
  },
});
module.exports.Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports.Order = mongoose.model("Order", orderSchema);
module.exports.OrderDone = mongoose.model("OrderDone", orderDoneSchema);
module.exports.OrderProcessed = mongoose.model(
  "OrderProcessed",
  orderProcessedSchema
);
module.exports.OrderSemaphore = mongoose.model(
  "OrderSemaphore",
  orderSemaphoreSchema
);
module.exports.Admin = mongoose.model("Admin", adminSchema);
module.exports.Time = mongoose.model("Time", timeSchema);
