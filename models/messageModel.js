const {
    Message
} = require('../config/database');

module.exports.getMessages = () =>{
    return new Promise((resolve) => {
        Message.find({}, (err, result)=>{
            if(err) throw err;
            else{
                resolve(result)
            }
        })
    })
}