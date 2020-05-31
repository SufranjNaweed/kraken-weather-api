const express = require('express');
const router = express.Router();

// @route   GET api/weathers
// @desc    Get weathers
// @access  Public
router.get('/', async(req, res) => {
    try{
        console.log("api routes  api/weathers");
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server ERROR');
    }
});

module.exports  = router;