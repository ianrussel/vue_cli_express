const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moment = require('moment');

let BugSchema = Schema({
    title: {
        type: String,
        require: true,
        max: 10
    },
    name: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    date_created: {
        type: Date
    },
});

BugSchema
    .virtual('created')
    .get(function() {
        return this.date_created ? moment(this.date_created).format('YYYY-MM-DD') : '';
    });
module.exports = mongoose.model('Bugs', BugSchema);
