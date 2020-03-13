import {parseHtml} from './scraping';

const COUNTRIES = []

const countries = async(signature) => {
    let array = await parseHtml()
    
    for (let i = 0; i < array.length; i++) {
        const arr = array[i];
        // console.log({arr});
        var str = await replace(arr)
        var projection = await getProjection(str)
        COUNTRIES.push(projection)
    }
    // console.log({COUNTRIES});
    // console.log({signature:process.env.SIGNATURE_KEY});
    if(signature == process.env.SIGNATURE_KEY){
        return COUNTRIES
    }else{
        throw new Error('Signature key invalid!')
    }
}

const replace = (arr) => {
    var newArr = []
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        let str = element.replace(/,/gi, "")
        newArr.push(str)
    }
    return newArr
}

const getProjection = (arr) => {
    return {
        countries:arr[0],
        total_cases:parseInt(arr[1]) || 0, 
        new_cases:parseInt(arr[3]) || 0, 
        total_deaths:parseInt(arr[4]) || 0, 
        new_deaths:parseInt(arr[5]) || 0,
        total_recovered:parseInt(arr[6]) || 0,
        active_cases:parseInt(arr[8]) || 0,
        critical:parseInt(arr[9]) || 0,
        top_cases:parseFloat(arr[11]) || 0
        
    }
}

module.exports = {
    countries
}