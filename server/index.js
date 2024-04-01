//external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

// internal imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/errorHandler");
//const logInRouter = require("./routers/logInRouter");
const allApi = require("./allApi");

const app = express();
dotenv.config();
//cors
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}
//app.use(cors());
app.use(cors(corsOptions));

//request parser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//routing setup
app.use("/api", allApi);

//common error handler
app.use(notFoundHandler);
app.use(errorHandler);

//listen app
app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
