const express = require("express");
const router = express.Router();
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const uploadsPath = __dirname + '/../uploads/';
const normalizedPath = require('path').normalize(uploadsPath);


// -------------------upload by link---------------------

router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    try {
        await imageDownloader.image({
            url: link,
            dest: normalizedPath + newName,
            timeout: 60000,
        });
        res.json(newName);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Error downloading the image' });
    }
})


// --------------------upload from device-----------------

const photosMiddleware = multer({ dest: "uploads" })

router.post("/upload", photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace("uploads", ""))
    }
    res.json(uploadFiles);
})


module.exports = router;