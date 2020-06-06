const mongoose = require('mongoose');
const db = require('../db/models');
const bcrypt = require('bcrypt');

exports.Register = (req,res,next)=>{
    db.UserDetail.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(409).json({
                    message:"Your email already exits"
                });
            } else {
                bcrypt.hash(req.body.password, 10,(err,hash)=> {
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    } else {
                        const User = new db.UserDetail({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            phone: req.body.phone,
                            sex:req.body.sex,
                            age:req.body.age,
                            address: req.body.address,
                            create: new Date().toLocaleString(),
                        });
                    User
                    .save()
                    .then(result =>{
                        console.log(result);
                        const Config = new db.UserConfig({
                            _id: new mongoose.Types.ObjectId(),
                            userId:result.id,
                            m01:true,
                            m02:true,
                            m03:true,
                            m04:true,
                            createDate: result.create,
                        });
                        Config
                        .save()
                        .then(results =>{
                            console.log(results);
                            return res.status(201).json({
                                message:'Complete Registration!!!'
                            });
                        });  
                    })
                    .catch(err =>{
                        console.log(err);
                        return res.status(500).json({
                            error:err
                        });
                    });
                }
            });
        }
    })
};