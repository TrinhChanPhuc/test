var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var productModel = require('../models/product');
var categoryModel = require('../models/category');
var SvModel = require('../models/SinhVien');
const JWT = require('jsonwebtoken');
const config = require("../utils/tokenConfig");


// router.get('/all', async function(req, res ) {
//   try {
//     var list = await productModel.find();
//     res.json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });
// router.get('/all', async function(req, res ) {
//   try {
//     var list = await productModel.find().populate("category");
//     res.status(200).json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });
// router.get('/gt20', async function(req, res) {
//   try {
//     var list = await productModel.find({soluong : {$gt: 20}});
//     res.status(200).json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });
// router.get('/priceand', async function(req, res) {
//   try {
//     var list = await productModel.find({gia : {$gte: 20000, $lte: 50000}});
//     res.status(200).json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });
// router.get('/priceor', async function(req, res) {
//   try {
//     var list = await productModel.find($or[{soluong : {$lt: 10}}, {gia : {$gt: 15000}}]);
//     res.status(200).json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });
// router.get('/findname', async function(req, res) {
//   try {
//     const {name} = req.query;
//     var list = await productModel.find({tensp : {$eq: name}});
//     res.status(200).json(list);
//   } catch (error) {
//     res.status(400).json({status: false, message: "error" + error});
//   }
// });


router.get('/bai1', async function(req, res) {
  const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: 'Có lỗi xảy ra: ' + err});
      }else{
        var list = await SvModel.find();
        res.status(200).json(list);
      }
    });
  }else{
    res.status(401).json({status: false, message: "Không xác thực"});
  }

  // try {
  //   var list = await SvModel.find();
  //   res.status(200).json(list);
  // } catch (error) {
  //   res.status(400).json({status: false, message: "error" + error});
  // }
});
router.get('/bai2', async function(req, res) {
  const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: 'Có lỗi xảy ra: ' + err});
      }else{
        const {BoMon} = req.query;
        var list = await SvModel.find({BoMon : {$eq : BoMon}});
        res.status(200).json(list);
      }
    });
  }else{
    res.status(401).json({status: false, message: "Không xác thực"});
  }
  // try {
  //   const {BoMon} = req.query;
  //   var list = await SvModel.find({BoMon : {$eq : BoMon}});
  //   res.status(200).json(list);
  // } catch (error) {
  //   res.status(400).json({status: false, message: "error" + error});
  // }
});
router.get('/bai3', async function(req, res) {
  const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: 'Có lỗi xảy ra: ' + err});
      }else{
        const {max, min} = req.query;
        var list = await SvModel.find({DTB : {$gte : min, $lte : max}});
        res.status(200).json(list);
      }
    });
  }else{
    res.status(401).json({status: false, message: "Không xác thực"});
  }
  // try {
  //   const {max, min} = req.query;
  //   var list = await SvModel.find({DTB : {$gte : min, $lte : max}});
  //   res.status(200).json(list);
  // } catch (error) {
  //   res.status(400).json({status: false, message: "error" + error});
  // }
});
router.get('/bai4', async function(req, res) {
  const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: 'Có lỗi xảy ra: ' + err});
      }else{
        const {mssv} = req.query;
        var list = await SvModel.find({MSSV : {$eq : mssv}});
        res.status(200).json(list);
      }
    });
  }else{
    res.status(401).json({status: false, message: "Không xác thực"});
  }
  // try {
  //   const {mssv} = req.query;
  //   var list = await SvModel.find({MSSV : {$eq : mssv}});
  //   res.status(200).json(list);
  // } catch (error) {
  //   res.status(400).json({status: false, message: "error" + error});
  // }
});
router.post('/bai5', async function(req, res) {
  try {
    const {MSSV, HoTen, DTB, BoMon, Tuoi} = req.body;
    const newSv = {MSSV, HoTen, DTB, BoMon, Tuoi};
    await SvModel.create(newSv);
    res.status(200).json({status: true, message: "Thành công"});
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
router.put('/bai6', async function(req, res) {
  try{
    const {id, MSSV, HoTen, DTB, BoMon, Tuoi} = req.body;
    const editSv = await SvModel.findById(id);
    if(editSV) {
      editSv.MSSV = MSSV ? MSSV : editSv.MSSV;
      editSv.HoTen = HoTen ? HoTen : editSv.HoTen;
      editSv.DTB = DTB ? DTB : editSv.DTB;
      editSv.BoMon = BoMon ? BoMon : editSv.BoMon;
      editSv.Tuoi = Tuoi ? Tuoi : editSv.Tuoi;
      await editSv.save();
      res.status(200).json({status: true, message: "Thành công"});
    }
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
router.delete('/bai7', async function(res, req) {
  try{
    const {id} = req.query.id;
    await SvModel.findByIdAndDelete(id);
    res.status(200).json({status: true, message: "Thành công"});
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
router.get('/bai8', async function(req, res) {
  const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: 'Có lỗi xảy ra: ' + err});
      }else{
        const {BoMon, DTB} = req.query;
        var list = await SvModel.find({BoMon : {$eq : BoMon}, DTB : {$gte: DTB}});
        res.status(200).json(list);
      }
    });
  }else{
    res.status(401).json({status: false, message: "Không xác thực"});
  }
  // try {
  //   const {BoMon, DTB} = req.query;
  //   var list = await SvModel.find({BoMon : {$eq : BoMon}, DTB : {$gte: DTB}});
  //   res.status(200).json(list);
  // } catch (error) {
  //   res.status(400).json({status: false, message: "error" + error});
  // }
});
router.get('/bai9', async function(req, res) {
  try {
    const {BoMon, DTB, max, min} = req.query;
    var list = await SvModel.find({BoMon : {$eq : BoMon}, DTB : {$gte: DTB}, Tuoi : {$gte : min, $lte : max}});
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
router.get('/bai10', async function(req, res) {
  try {
    var list = await SvModel.find().sort({DTB : 1});
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
router.get('/bai11', async function(req, res) {
  try {
    const {BoMon} = req.query;
    var max;
    var list = await SvModel.find({BoMon : {$eq : BoMon}}).sort({DTB : -1});
    max = list[0];
    res.status(200).json(max);
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
});
/* GET users listing. */

router.post('/login', async function(req, res) {
  try {
    const {username, password} = req.body;
    const checkUser = await userModel.findOne({name: username, password: password});
    if(checkUser == null){
      res.status(200).json({status: false, message: "Username hoặc mật khẩu không đúng"});
    }else{
      const token = JWT.sign({name: username}, config.SECRETKEY, {expiresIn:'30s'});
      const refreshToken = JWT.sign({name: username}, config.SECRETKEY, {expiresIn:'1d'});
      res.status(200).json({status: true, message: "Đăng nhập thành công", token: token, refreshToken: refreshToken});
    }
  } catch (error) {
    res.status(400).json({status: false, message: "error" + error});
  }
})


module.exports = router;
