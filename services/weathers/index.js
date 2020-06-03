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

router.get('/:city', 
    async(req, res) => {
        try{
            const city = req.params.city;
            const url = api_url + 'current.json?key=' + api_key + "&q=" + city;
            console.log(url);
            const response = await axios.get(url);
            return res.status(200).send(response.data);
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
});

router.get('/forecast/:city',
    async(req, res) => {
        try{
            const city = req.params.city;
            const url = api_url + "forecast.json?key=" + api_key + "&q=" + city + "&days=3";
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