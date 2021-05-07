const port = parseInt(process.env.PORT || "3000");
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.s4l3j.mongodb.net/myFirstDatabase?retryWrites=true/${dbName}`;
const seedPath = process.env.INGREDIENTS_SEED_PATH;

const ORDER_CREATED = "created";
const ORDER_PROCESSED = "processed";
const ORDER_DONE = "done";
const ORDER_CANCELLED = "cancelled";
const ORDER_STATES = [
  ORDER_CREATED,
  ORDER_PROCESSED,
  ORDER_DONE,
  ORDER_CANCELLED,
];

const SIZE_SMALL = "small";
const SIZE_MEDIUM = "medium";
const SIZE_LARGE = "large";
const SIZE_TYPES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE];

const SIZE_SMALL_PRICE = parseInt(process.env.SIZE_SMALL_PRICE);
const SIZE_MEDIUM_PRICE = parseInt(process.env.SIZE_MEDIUM_PRICE);
const SIZE_LARGE_PRICE = parseInt(process.env.SIZE_LARGE_PRICE);

const SIZE_SMALL_TIME = parseInt(process.env.SIZE_SMALL_TIME);
const SIZE_MEDIUM_TIME = parseInt(process.env.SIZE_MEDIUM_TIME);
const SIZE_LARGE_TIME = parseInt(process.env.SIZE_LARGE_TIME);

const ORDERS_LIMIT = parseInt(process.env.ORDERS_LIMIT);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const PRICE_SIZE_DICT = {
  small: SIZE_SMALL_PRICE,
  medium: SIZE_MEDIUM_PRICE,
  large: SIZE_LARGE_PRICE,
};

const TIME_SIZE_DICT = {
  small: SIZE_SMALL_TIME,
  medium: SIZE_MEDIUM_TIME,
  large: SIZE_LARGE_TIME,
};

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

module.exports.port = port;
module.exports.dbUri = dbUri;
module.exports.seedPath = seedPath;
module.exports.ORDER_STATES = ORDER_STATES;
module.exports.ORDER_CREATED = ORDER_CREATED;
module.exports.ORDER_PROCESSED = ORDER_PROCESSED;
module.exports.ORDER_DONE = ORDER_DONE;
module.exports.SIZE_TYPES = SIZE_TYPES;
module.exports.ORDER_CANCELLED = ORDER_CANCELLED;
module.exports.ORDERS_LIMIT = ORDERS_LIMIT;
module.exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
module.exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
module.exports.PRICE_SIZE_DICT = PRICE_SIZE_DICT;
module.exports.TIME_SIZE_DICT = TIME_SIZE_DICT;
module.exports.MAIL_USER = MAIL_USER;
module.exports.MAIL_PASS = MAIL_PASS;
