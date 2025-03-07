const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

// Connect to DB
connectDB();

// Import Routes
const adminRoutes = require("./routes/adminRoute");
const dashBoardRouter = require("./routes/dashboardRoute");
const CountriesRouter = require("./routes/countriesRoute");
const stateRouter = require("./routes/stateRoute");
const destinationRouter = require("./routes/destinationRoute");
const itinarayRouter = require("./routes/itinaryRoute");
const packageRouter = require("./routes/packageRoute");
const exclusionRouter = require("./routes/exclusionRoute");
const inclusionRouter = require("./routes/inclusionRoute");
const tripDetailRouter = require("./routes/tripDetailRoute");
const sliderRouter = require("./routes/sliderRoute");
const sliderPublicRouter = require("./routes/sliderPublicRoute");
const countryPublicRouter = require("./routes/countryPublicRoute");
const galleryRouter=require("./routes/galleryRoute");
const galleryPublicRouter = require("./routes/galleryPublicRoute");
const cricleRouter = require("./routes/cricleDestinationRoute");
const criclePublicRouter = require("./routes/cricleImagePublicRoute");
const dynamicImageRouter = require("./routes/dynamicImageRoute");
const customerRouter = require("./routes/customerRoute");
const tourRouter = require("./routes/tourRoute");

const inclsionExclusionRouter = require("./routes/inclusionExclusionRoute");


const allowedOrigins = [
  'http://localhost:3000', 
  'http://13.60.227.23:3000', 
  'https://himchuliadventure.com'
];
app.use(cors({
  origin: "*",  // Allow all origins
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/dashboard", dashBoardRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/country", CountriesRouter);
app.use("/api/admin/state", stateRouter);
app.use("/api/admin/destination", destinationRouter);
app.use("/api/itinary", itinarayRouter);
app.use("/api/admin/exclusion", exclusionRouter);
app.use("/api/admin/inclusion", inclusionRouter);
app.use("/api/trip-detail", tripDetailRouter);
app.use("/api", packageRouter); // Package API route
app.use("/api/admin/slider",sliderRouter);
app.use("/api/slider",sliderPublicRouter);

app.use("/api/country",countryPublicRouter);
app.use("/api/admin/galery",galleryRouter);
app.use("/api/gallery",galleryPublicRouter)
app.use("/api/admin/destination",cricleRouter);
app.use("/api/image",criclePublicRouter);
app.use("/api/admin/dynamic-image",dynamicImageRouter)
app.use("/api/customer",customerRouter)
app.use("/api/tours",tourRouter);

app.use("/api/inclusoin-exclusion",inclsionExclusionRouter)




// Default Route
app.get("/", (req, res) => {
  res.send("Hello Himchuli! Server is running.");
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at port ${port}`);
});
