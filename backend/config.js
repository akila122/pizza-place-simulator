const port = parseInt(process.env.PORT || "3000")
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const dbUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.s4l3j.mongodb.net/myFirstDatabase?retryWrites=true/${dbName}`
const seedPath = process.env.INGREDIENTS_SEED_PATH

const ORDER_CREATED = "created"
const ORDER_PROCESSED = "processed"
const ORDER_DONE = "done"
const ORDER_CANCELLED = "cancelled"
const ORDER_STATES = [
  ORDER_CREATED,
  ORDER_PROCESSED,
  ORDER_DONE,
  ORDER_CANCELLED,
]

const SIZE_SMALL = "small"
const SIZE_MEDIUM = "medium"
const SIZE_LARGE = "large"
const SIZE_TYPES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE]

const ORDERS_LIMIT = parseInt(process.env.ORDERS_LIMIT)

module.exports.port = port
module.exports.dbUri = dbUri
module.exports.seedPath = seedPath
module.exports.ORDER_STATES = ORDER_STATES
module.exports.ORDER_CREATED = ORDER_CREATED
module.exports.ORDER_PROCESSED = ORDER_PROCESSED
module.exports.ORDER_DONE = ORDER_DONE
module.exports.SIZE_TYPES = SIZE_TYPES
module.exports.ORDER_CANCELLED = ORDER_CANCELLED
module.exports.ORDERS_LIMIT = ORDERS_LIMIT
