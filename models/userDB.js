const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database connection succesful");
}).catch((e)=>{
    console.log("Error occured");
});

const userShcema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('User', userShcema);

const messageSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports.mongoose = mongoose.connect;