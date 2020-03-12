const path=require('path');
const handleRequest = async (req, res, callback, getErrorCodeCb=false) =>{
    // let m = new model()
    let jres = {
        error:0,
        data:[],
        message:'',
        stack:{},
        errorName:''
    }
    try {
        jres.data = await callback(req.body)        
    } catch (error) {
        const root=path.join(__dirname , '../../')
        jres.error=(getErrorCodeCb && getErrorCodeCb()) || 500
        jres.message=error.message
        jres.stack = error.stack.split(root).join('HOMEDIR/');
        jres.errorName = error.name 
    }
    res.json(jres)
} 

module.exports = handleRequest
