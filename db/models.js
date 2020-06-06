const mongoose = require('mongoose');
const models = {};
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{ 
        type: String, 
        require:true, 
        unique:true, 
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{ type: String, require:true },
    name:{ type: String, require: true },
    phone: {type: String, require: true},
    sex: {type: String, require: true},
    age: {type: Number, require: false},
    address: {type: String, require : true},
    create: {type:String, require: false},
    update: {type:String, require: false}
});

const userConfig = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String, require:true},
    m01:{type:Boolean, require:false},
    m02:{type:Boolean, require:false},
    m03:{type:Boolean, require:false},
    m04:{type:Boolean, require:false},
    createDate: {type:String, require: false},
    updateDate: {type:String, require: false},
    updateUser:{type: String, require: false},
});

const userDetail = mongoose.model('user_detail', userSchema);
const userSetting = mongoose.model('user_config', userConfig);

models.UserDetail = userDetail;
models.UserConfig = userSetting;

module.exports = models
