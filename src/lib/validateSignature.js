const validateSignature = async (req, res, next) => {
    const signature_key = req.headers.signature_key
    if (!signature_key){
        return res.status(404).send({ error: 500, message: 'No signature key provided.' });
    }else{
        if(signature_key == process.env.SIGNATURE_KEY){
            next()
        }else{
            return res.status(404).send({ error: 500, message: "signature key Invalid" });
        }
    }
}

module.exports = validateSignature