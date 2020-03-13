import express from 'express';
import {countries, detailCountry} from './lib/cache';
import {doParseHtml} from './lib/scraping';
import handleCtrl from './lib/ctrlHandler'
import validateSignature from './lib/validateSignature';
import dotenv from 'dotenv'

var app = express();  
dotenv.config()

app.get('/',async (req,res)=>{
    res.end('oke')
})

app.get('/corona/countries', async (req, res) => {
    validateSignature(req, res, async (body) => {
        handleCtrl(req, res, async (body) => {
            return await countries()
        });
    });
    
})

app.get('/corona/detail/:country', async (req, res) => {
    validateSignature(req, res, async (body) => {
        handleCtrl(req, res, async (body) => {
            var {country} = req.params
        return await detailCountry(country)
        });
    });
})

var server = app.listen(process.env.PORT || 4321, function () { 
    doParseHtml()
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})  