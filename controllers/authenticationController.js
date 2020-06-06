const models = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.Login = (req,res,next)=> {
    models.UserDetail.find({
        email:req.body.email
    })
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(404).json({
                message:'email not found, user doesn\'t exit'
            });
        } else {
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{ 
                if(result){
                  const token =  jwt.sign(
                    {
                        email:user[0].email,
                        userId:user[0]._id,
                        name: [0].name,
                        phone: [0].phone,
                        sex:[0].sex,
                        age:[0].age,
                        address:[0].address
                    },
                    config.get('PRIVATE_KEY'), 
                    {
                        expiresIn:'1h'
                    });
                    return res.status(200).json({
                        message:'Login Successful',
                        token: token
                    });
                } else {
                    return res.status(401).json({
                        message:'Wrong Password'
                    });
                }
            });
        }
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({error:err});
    });
}

// exports.user_delete = (req ,res ,next) =>{
//     User.remove({_id: req.params.userId})
//     .exec()
//     .then(result =>{
//         res.status(200).json({
//             message:"User Removed"
//         });
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
// };

// exports.user_update = (req ,res ,next) =>{
//     const props = req.body;
//     User.update({_id: req.params.userId},props)
//     .exec()
//     .then(result =>{
//         res.status(201).json({
//             message:"User Update",
//             result: result
//         });
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
// };

// exports.user_detail = (req ,res ,next) =>{
//     User.find({
//         email:req.params.userEmail
//     })
//     .then(result =>{
//         res.status(201).json({
//             message:'Success',
//             result: result
//         });
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
// };

// exports.user_all = (req ,res ,next) =>{
//     User.find()
//     .select('email name branch _id')
//     .then(docs =>{
//         res.status(200).json({
//             result: docs
//         });
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
// };