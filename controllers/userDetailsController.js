const models = require('../db/models');

exports.All = (req ,res ,next) =>{
    models.UserDetail.find()
    .select('email name phone phone sex age address _id')
    .then(docs =>{
        return res.status(200).json({
            result: docs
        });
    })
    .catch(err =>{
        return res.status(500).json({
            error:err
        });
    });
};

exports.Detail = (req ,res ,next) =>{
    models.UserDetail.find({_id: req.params.id})
    .exec()
    .then(user =>{
        models.UserConfig.find({userId: req.params.id})
        .exec()
        .then(config=>{
            return res.status(200).json({
                detail: user,
                config:config
            });
        })
        .catch(err=>{
            return res.status(500).json({
                error:err
            });
        });
    })
    .catch(err =>{
        return res.status(500).json({
            error:err
        });
    });
};