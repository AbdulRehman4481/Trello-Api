const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.CONNECTION_STRING;
mongoose.connect(MONGO_URL);

const registerRoutes = require("./src/routes/api/auth/register.route");
app.use(`/api/auth`, registerRoutes);

const loginRoutes = require("./src/routes/api/auth/login.route");
app.use(`/api/auth`, loginRoutes);

const logoutRoutes = require("./src/routes/api/auth/logout.route");
app.use(`/api/auth`, logoutRoutes);

const taskRoutes = require("./src/routes/api/tasks/tasks.route");
app.use(`/api`, taskRoutes);

const categoryRoutes = require("./src/routes/api/categories/category.route");
app.use(`/api`, categoryRoutes);

const searchRoutes = require("./src/routes/api/search/search.route");
app.use(`/api`, searchRoutes);

const profileRoutes = require("./src/routes/api/profile/profile.route");
app.use(`/api`, profileRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Your sever ruing on ${PORT}`);
});
