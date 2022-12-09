require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const quoteRouter = require("./routes/quote.routes");
app.use("/api", isAuthenticated, quoteRouter);

const likesRouter = require("./routes/likes.routes");
app.use("/api", likesRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
