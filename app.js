const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes/mainRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');


const app = express();
// read cookie from browser
app.use(cookieParser());
// 
app.use(express.static(path.join(__dirname, "public")));
//set engine

app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// Logging requests
app.use(morgan("dev"));

//Use forms for put / delete


app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});

app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

app.use(globalErrorHandler);

module.exports = app;
