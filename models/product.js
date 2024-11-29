const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
    id: { type: ObjectId },
    masp: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        default: 'No name'
    },
    tensp : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        default: 'No name'
    },
    gia : {
        type: Number,
        required: true,
        trim: true,
        default: '0'
    },
    soluong : {
        type: Number,
        required: true,
        trim: true,
        default: '0'
    },
    category : {
        type: ObjectId,
        ref: "category"
    }
});
module.exports = mongoose.models.product || mongoose.model('product', product);
