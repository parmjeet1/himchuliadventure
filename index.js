const express = require("express");
require("dotenv").config();
const app = express();

const adminRoutes = require("./routes/adminRoute");
const connectDB = require("./config/db");
const dashBoardRouter = require("./routes/dashboardRoute");
app.use(express.json());

// ----------------------- inclued required ----
app.use("/api/dashboard",dashBoardRouter);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("hello himchuli how are you doing! hi");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running at ${port} `);
  connectDB();
});
