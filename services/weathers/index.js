const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const axios = require('axios');

const api_url = process.env.API_URL;
const api_key = process.env.API_KEY;

// @route   POST api/weathers
// @desc    POST weathers
// @access  Public
router.post('/', async(req, res) => {
    try{
        console.log("api routes  api/weathers");
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server ERROR');
    }
});

//  @route  GET api/weathers
//  @desc   GET weathers for a given city
//  @access Public

router.get('/', 
    [
        check('city', 'Please include a valide city').exists()
    ],
    async(req, res) => {
        console.log('get city')
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res
                    .status(400)
                    .json({errors : errors.array()});
        }
        try{
            const { city } = req.body;
            const url = api_url + 'current.json?key=' + api_key + "&q=" + city;
            console.log(url);
            const response = await axios.get(url);
            return res.status(200).send(response.data);Z
        }
        catch(err){
            console.log(err.response.status);
            if (err.response.status == 404){
                res.status(404).send('City not found.');
            }
            else{
                res.status(500).send('Server Error');
            }
        }
});

router.get('/forecast',
    [
        check('city', 'Please include a valide city').exists(),
        check('days', 'Please include a number of days').exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res
                    .status(400)
                    .json({errors : errors.array()});
        }
        try{
            const { city, days } = req.body;
            const url = api_url + "forecast.json?key=" + api_key + "&q=" + city + "&days=" + days;
            const response = await axios.get(url);
            return res.status(200).send(response.data);Z
        }
        catch(err){
            console.log(err);
            if (err.response.status == 404){
                res.status(404).send('City not found.');
            }
            else{
                res.status(500).send('Server Error');
            }
        }
    }
)

module.exports  = router;