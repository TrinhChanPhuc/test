const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SinhVien = new Schema({
    id: { type: ObjectId },
    MSSV: { type: String },
    HoTen: { tyoe: String },
    DTB: { type: String },
    BoMon: { type: String },
    Tuoi: { type: Number }
});
module.exports = mongoose.models.SinhVien || mongoose.model('SinhVien', SinhVien);