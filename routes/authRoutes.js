const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* =========================
   REGISTER
========================= */

router.post("/register", async (req, res) => {

    try{

        const {
            email,
            surname,
            givenName,
            middleInitial,
            contactNumber,
            address,
            password
        } = req.body;

        /*
            CHECK IF EMAIL EXISTS
        */

        const existingUser =
            await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message:"Email already exists"
            });

        }

        /*
            CREATE USER
        */

        const user = new User({

            email,
            surname,
            givenName,
            middleInitial,
            contactNumber,
            address,
            password

        });

        await user.save();

        res.json({
            message:"Registered Successfully"
        });

    }

    catch(error){

        res.status(500).json(error);

    }

});

/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {

    try{

        const {
            email,
            password
        } = req.body;

        /*
            FIND USER
        */

        const user =
            await User.findOne({ email });

        /*
            EMAIL NOT FOUND
        */

        if(!user){

            return res.status(400).json({
                message:"Email not found"
            });

        }

        /*
            CHECK PASSWORD
        */

        if(user.password !== password){

            return res.status(400).json({
                message:"Incorrect Password"
            });

        }

        /*
            LOGIN SUCCESS
        */

        res.json({

            message:"Login Successful",

            token:"loggedin",

            user:{

                email:user.email,
                surname:user.surname,
                givenName:user.givenName

            }

        });

    }

    catch(error){

        res.status(500).json(error);

    }

});

module.exports = router;