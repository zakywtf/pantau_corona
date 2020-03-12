import express from 'express';
import {resultData} from './lib/cache';
import handleCtrl from './lib/ctrlHandler'

var app = express();  

app.get('/',async (req,res)=>{
    res.end('oke')
})

app.get('/corona/countries', async (req, res) => {
    handleCtrl(req, res, async (body) => {
        var datas = await resultData()
        return datas
    });
})

var server = app.listen(process.env.PORT || 4321, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})  