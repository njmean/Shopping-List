const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema  [Net Ninja Variant adds unique Id's, more use in real world App.]

const ItemSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);

