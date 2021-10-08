const router = require('express').Router();
const path = require('path');

router.get("/", ({res}) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get("/exercise", ({res}) =>{
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

router.get("/stats", ({res}) =>{
    res.sendFile(path.join(__dirname, '../public/stats.html'))
})

module.exports = router;
