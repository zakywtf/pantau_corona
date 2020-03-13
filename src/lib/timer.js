import moment from 'moment-timezone';

const TIMEZONE='asia/jakarta';

const initTimer=(callbackDaily)=>{
    initDailyTimer(callbackDaily);
}

const initDailyTimer=(callback)=>{
    const nextDay = moment().add(1,'day').format('YYYY-MM-DD');
    const nextLocalTime = moment(nextDay).tz(TIMEZONE);
    const timeLeft = moment.duration(nextLocalTime.diff(moment()));
    console.log('nextCalls in', {timeLeft});
    
    setTimeout(()=>{        
        callback(nextDay);
        initDailyTimer(callback);
    }, timeLeft._milliseconds);
}

module.exports={    
    initTimer
}
