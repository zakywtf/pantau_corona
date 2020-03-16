import fetch from 'node-fetch'
import { initTimer } from "./timer";

const PARSE_HTML = []

const getData = async(url) => {
    const options = {
        method:'GET',
        headers:{
            'content-Type':'text/html; charset=utf-8',
            Connection: 'keep-alive'
        }
    }

    const resp = await fetch(url, options)
    const htmlResp = await resp.text()
    return htmlResp
}

const doParseHtml = async() => {
    const parseHtml = async() => {
        const resp = await getData(`${process.env.SERVER_URI}`)
        
        let row = resp.split('<div class="row">')
        let col = row[3].split('<div class="col-md-8">')
        // let mTable = col[1].split('<div id="main_table_countries_div" style="font-size:15.5px; text-align:left; width:100%;" class="table-responsive">')
        let mTable = col[1].split('<table id="main_table_countries" class="table table-bordered table-hover">')
        // console.log({col, mTable});
        
        var rows = await parseTable(mTable[1])
        console.log(`req data to ${process.env.SERVER_URI}`);
        
        PARSE_HTML.push(parseRows(rows))
    }
    
    const parseRows=(rows)=>{
        const result=[];
        for (let ii = 0; ii < rows.length; ii++) {
            if(ii==0)continue;
            const row = rows[ii];
            result.push(parseData(row));
        }
        return result;
    }
    
    const parseData=(html)=>{
        const tds=html.split('<td');
        const result=[];
        for (let ii = 0; ii < tds.length; ii++) {
            if(ii==0)continue;
            const td = tds[ii];
            let temp = td.split('>');
            if(temp[1].indexOf('href')>=0){
                temp = temp[2].split('</a')            
            }
            else if(temp[1].indexOf('span') >=0 ){
                temp = temp[2].split('</span')            
    
            }
            else{
                temp = temp[1].split('</td')            
            }
            
            result.push(temp[0].trim());
        }
        return result;
    }

    const parseTable = async(table) => {
        console.log({table});
        
        let tBody = table.split('<tbody>')
        tBody = tBody[1].split('</tbody>');
        tBody = strReplace(tBody[0], '<tr style role="row" class="odd">', '<tr style role="row" class="even">')
        tBody = strReplace(tBody, '<tr style="">', '<tr style role="row" class="even">')
        let tr = tBody.split('<tr style role="row" class="even">')
        
        return tr
    }

    await parseHtml()
    initTimer(parseHtml)
}

const strReplace=(source, find, replace)=>{
    return source.split(find).join(replace);
}

const getParseHtml=()=>PARSE_HTML

module.exports = {
    doParseHtml,
    getParseHtml
}