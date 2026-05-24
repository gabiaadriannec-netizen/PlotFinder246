const mongoose = require("mongoose");

const PlotSchema = new mongoose.Schema({

    plotNumber: String,

    type: String,

    status: {
        type: String,
        enum: ["unoccupied", "reserved", "occupied"],
        default: "unoccupied"
    },

    reservedBy: {
        surname: String,
        givenName: String,
        middleName: String,
        initials: String
    }

});

module.exports = mongoose.model("Plot", PlotSchema);