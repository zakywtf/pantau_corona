import {getParseHtml} from './scraping';

const COUNTRIES = []
const DETAIL_COUNTRIES = {}

const countries = async() => {
    let array = await getParseHtml()
    let arrayOfArray = array[0]
    
    for (let i = 0; i < arrayOfArray.length; i++) {
        const arr = arrayOfArray[i];
        var str = await replace(arr)
        var projection = await getProjection(str)
        COUNTRIES.push(projection)
        DETAIL_COUNTRIES[`${projection.country}`] = projection
    }
    console.log({COUNTRIES, DETAIL_COUNTRIES});
    
    return COUNTRIES
}

const detailCountry = async(country) => {
    return DETAIL_COUNTRIES[`${country}`]
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
        country:arr[0],
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
    countries,
    detailCountry
}