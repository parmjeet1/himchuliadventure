const express = require("express");
require("dotenv").config();
const app = express();

const adminRoutes = require("./routes/adminRoute");
const connectDB = require("./config/db");
const dashBoardRouter = require("./routes/dashboardRoute");
app.use(express.json());
const CountriesRouter=require("./routes/countriesRoute");
const stateRouter = require("./routes/stateRoute");
const destinationRouter = require("./routes/destinationRoute");
const itinarayRouter = require("./routes/itinaryRoute");
const packageRouter = require("./routes/packageRoute");
const exclusionRouter = require("./routes/exclusionRoute");
// ----------------------- inclued required ----
app.use("/api/dashboard",dashBoardRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/country",CountriesRouter);
app.use("/api/admin/state",stateRouter);
app.use("/api/admin/destination", destinationRouter);
app.use("/api/admin/itinary",itinarayRouter);
app.use("/api/admin/package",packageRouter)
app.use("/api/admin/exclusion",exclusionRouter)
app.get("/", (req, res) => {
  res.send("hello himchuli how are you doing! hi");
});
const port = process.env.PORT;
app.listen(port,'0.0.0.0', () => {
  console.log(`server running at ${port} `);
  connectDB();
});
