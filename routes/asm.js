var express = require('express');
var router = express.Router();

var videoModel = require("../models/video");
var channelModel = require("../models/channel");

router.get("/allChannel", async function(res, req) {
    try {
        var list = await channelModel.find();
        res.status(200).json({status: true, message: "Thành công", data: list});
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.post("/addChannel", async function(res, req) {
    try {
        const {channelDescription, channelHandler, channelName, email} = req.body;
        const newChannel = {channelDescription, channelHandler, channelName, email};
        await channelModel.create(newChannel);
        res.status(200).json({status: true, message: "Thành công"});
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.put('/editChannel', async function(req, res) {
    try{
        const {id, channelDescription, channelHandler, channelName, email} = req.body;
        const editChannel = await channelModel.findById(id);
    if(editChannel) {
        editChannel.channelDescription = channelDescription ? channelDescription : editChannel.channelDescription;
        editChannel.channelHandler = channelHandler ? channelHandler : editChannel.channelHandler;
        editChannel.channelName = channelName ? channelName : editChannel.channelName;
        editChannel.email = email ? email : editChannel.email;
        await editChannel.save();
        res.status(200).json({status: true, message: "Thành công"});
    }
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.delete('/deleteChannel', async function(res, req) {
    try{
      const {id} = req.query.id;
      await channelModel.findByIdAndDelete(id);
      res.status(200).json({status: true, message: "Thành công"});
    } catch (error) {
      res.status(400).json({status: false, message: "error" + error});
    }
});

router.get('/findByChannelName', async function(res, req) {
    try{
        const {channelName} = req.params;
        var list = await channelModel.find({channelName : {$eq : channelName}});
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.get("/allVideo", async function(res, req) {
    try {
        var list = await videoModel.find();
        res.status(200).json({status: true, message: "Thành công", data: list});
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.post("/addVideo", async function(res, req) {
    try {
        const {videoDescription, releaseDate, title, type, videoLink, views, channelID} = req.body;
        const newVideo = {videoDescription, releaseDate, title, type, videoLink, views, channelID};
        await videoModel.create(newVideo);
        res.status(200).json({status: true, message: "Thành công"});
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.put('/editVideo', async function(req, res) {
    try{
        const {id, videoDescription, releaseDate, title, type, views} = req.body;
        const editVideo = await videoModel.findById(id);
    if(editVideo) {
        editVideo.videoDescription = videoDescription ? videoDescription : editVideo.videoDescription;
        editVideo.releaseDate = releaseDate ? releaseDate : editVideo.releaseDate;
        editVideo.title = title ? title : editVideo.title;
        editVideo.type = type ? type : editVideo.type;
        editVideo.views = views ? views : editVideo.views;
        await editVideo.save();
        res.status(200).json({status: true, message: "Thành công"});
    }
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

router.delete('/deleteVideo', async function(res, req) {
    try{
      const {id} = req.query.id;
      await videoModel.findByIdAndDelete(id);
      res.status(200).json({status: true, message: "Thành công"});
    } catch (error) {
      res.status(400).json({status: false, message: "error" + error});
    }
});

router.get('/findByVideoTitle', async function(res, req) {
    try{
        const {title} = req.params;
        var list = await videoModel.find({title : {$eq : title}});
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({status: false, message: "error" + error});
    }
});

module.exports = router;