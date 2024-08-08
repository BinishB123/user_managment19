const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const adminRoute = require('./routes/adminRoute')
const userRoute = require("./routes/userRoute");

const cors = require('cors')
const mongoose = require("mongoose");
const { errorHandler } = require("../backend/middleware/errorMiddleware");
const app = express();
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/", userRoute);   
app.use('/admin',adminRoute)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
