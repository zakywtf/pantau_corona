// var express = require('express');
import express from 'express';
import {parseHtml} from './lib/scraping.js'; 
import {resultData} from './lib/cache';
// var SERVER_URI = require('../src/lib/scraping')
var app = express();  

app.get('/',async (req,res)=>{
    // return await resultData()
    res.end('oke')
})

var server = app.listen(process.env.PORT || 4321, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})  