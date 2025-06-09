const express = require("express");
const indexRouter = require("./routes/indexRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
cors({
origin: ["http://localhost:5173", "https://bakaevpartners.ru"],
methods: ["GET","POST","PUT","DELETE","OPTIONS"],
allowedHeaders: ["Authorization", "Content-Type"],
credentials: true,
})
);



app.use(express.json());
app.use(cookieParser("fdfdb"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

module.exports = app;