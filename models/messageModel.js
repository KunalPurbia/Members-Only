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

module.exports.saveMessage = (data) =>{
    Message(data).save(err=>{
        if(err) throw err;
    })
}

module.exports.deleteMessage = (id)=>{
    Message.deleteOne({_id: id}, (err)=>{
        if(err) throw err;
    })
}