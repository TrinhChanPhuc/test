const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const channel = new Schema({
    id: { type: ObjectId },
    channelDescription: { type: String },
    channelHandler: { type: String },
    channelName: { type: String },
    email: { type: String },
});
module.exports = mongoose.models.channel || mongoose.model('channel', channel);