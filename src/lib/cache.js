import {parseHtml} from './scraping';

const RESP = []

const resultData = async() => {
    let array = await parseHtml()
    
    for (let i = 0; i < array.length; i++) {
        const arr = array[i];
        // console.log({arr});

        RESP[`${arr[0]}`] = {
            total_cases:arr[1], 
            new_cases:arr[3], 
            total_deaths:arr[4], 
            new_deaths:arr[5],
            total_recovered:arr[6],
            active_cases:arr[8],
            critical:arr[9],
            top_cases:arr[11]
        }
    }
    console.log({RESP});
    
}

module.exports = {
    resultData
}