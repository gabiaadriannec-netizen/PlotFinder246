const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   STATIC PUBLIC FOLDER
========================= */

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

/* =========================
   DEFAULT ROUTE
   OPEN LOGIN FIRST
========================= */

app.get("/", (req, res) => {

    res.redirect("/login.html");

});

/* =========================
   MONGODB CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch(err => {

    console.log(err);

});

/* =========================
   ROUTES
========================= */

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/plots",
    require("./routes/plotRoutes")
);

/* =========================
   SERVER
========================= */

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});