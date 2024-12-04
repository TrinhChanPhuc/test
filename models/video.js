const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const video = new Schema({
    id: { type: ObjectId },
    videoDescription: { type: String },
    releaseDate: { type: String },
    title: { type: String },
    type: { type: String },
    videoLink: { type: String },
    views: { type: String },
    channelID: { type: ObjectId, ref: 'channel' },
});
module.exports = mongoose.models.video || mongoose.model('video', video);