import express from 'express';
import {countries, detailCountry} from './lib/cache';
import {doParseHtml} from './lib/scraping';
import handleCtrl from './lib/ctrlHandler'
import dotenv from 'dotenv'

var app = express();  
dotenv.config()

app.get('/',async (req,res)=>{
    res.end('oke')
})

app.get('/corona/countries/:signature_key', async (req, res) => {
    handleCtrl(req, res, async (body) => {
        var {signature_key} = req.params
        return await countries(signature_key)
    });
})

app.get('/corona/detail/:country/:signature_key', async (req, res) => {
    handleCtrl(req, res, async (body) => {
        var {country, signature_key} = req.params
        return await detailCountry(country, signature_key)
    });
})

var server = app.listen(process.env.PORT || 4321, function () { 
    doParseHtml()
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})  