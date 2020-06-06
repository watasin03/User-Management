const models = require('../db/models');

exports.Delete = (req ,res ,next) =>{
    models.UserDetail.deleteOne({_id: req.params.id})
    .exec()
    .then(result =>{
        models.UserConfig.deleteOne({userId:req.params.userId})
        .exec()
        .then(results=>{
            return res.status(201).json({
                message:"User Removed"
            });
        })
        .catch(err=>{
            return res.status(500).json({
                error:err
            });
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({
            error:err
        });
    });
};

exports.UpdateDetail = (req ,res ,next) =>{
    const props = req.body;
    models.UserDetail.updateOne({_id: req.params.id},{
        ...props,
        update:new Date().toLocaleString() + "|"+ req.params.id
    })
    .exec()
    .then(result =>{
        return res.status(201).json({
            message:"User Update",
            result: result
        });
    })
    .catch(err =>{
        return res.status(500).json({
            error:err
        });
    });
};

exports.UpdateConfigUser = (req ,res ,next) =>{
    const props = req.body;
    models.UserConfig.updateOne({userId: req.params.id},{
        ...props,
        updateDate:new Date().toLocaleString(),
        updateUser:req.params.id
    })
    .exec()
    .then(result =>{
        return res.status(201).json({
            message:"User Update",
            result: result
        });
    })
    .catch(err =>{
        return res.status(500).json({
            error:err
        });
    });
};