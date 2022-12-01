const {User} = require('../config/database');

module.exports.registerUser = (data)=>{
    new User(data).save((err)=>{
        if(err) throw err
    })
}

module.exports.updateAdmin = (id)=>{
    User.findByIdAndUpdate(id, {admin: true}, (err)=>{
        if(err) throw err;
    })
}

module.exports.updateMember = (id)=>{
    User.findByIdAndUpdate(id, {member: true}, (err)=>{
        if(err) throw err;
    })
}