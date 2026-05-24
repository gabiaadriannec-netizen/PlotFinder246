const express = require("express");

const router = express.Router();

const Plot = require("../models/Plot");

router.get("/", async (req, res) => {

    const plots = await Plot.find();

    res.json(plots);

});

router.post("/reserve/:plotNumber", async (req, res) => {

    const {
        surname,
        givenName,
        middleName
    } = req.body;

    const initials =
        surname[0] +
        "." +
        givenName[0] +
        "." +
        middleName[0];

    let plot = await Plot.findOne({
        plotNumber:req.params.plotNumber
    });

    if(!plot){

        plot = new Plot({
            plotNumber:req.params.plotNumber
        });

    }

    plot.status = "reserved";

    plot.reservedBy = {
        surname,
        givenName,
        middleName,
        initials
    };

    await plot.save();

    res.json(plot);

});

router.post("/approve/:plotNumber", async (req, res) => {

    const plot = await Plot.findOne({
        plotNumber:req.params.plotNumber
    });

    plot.status = "occupied";

    await plot.save();

    res.json(plot);

});

module.exports = router;