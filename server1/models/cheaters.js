const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moment = require('moment');

let CheaterSchema = Schema({
    title: {
        type: String,
        require: true,
        max: 10
    },
    code: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date_created: {
        type: Date
    },
    date_updated: {
        type: Date
    },
    created_by: {
        type: String
    },
    updated_by: {
        type: String
    }
});

module.exports = mongoose.model('Cheaters', CheaterSchema);
