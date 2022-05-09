const moment = require('moment');
const User = require('../models/user.model');
const helperHbs = {};

helperHbs.timeago = timestamp =>{
    return moment(timestamp).startOf('minute').fromNow();
};

helperHbs.less = (page, prev) =>{
    if(!prev){
        return page
    }else{
        let acum = page - 1
        return acum
    }
};

helperHbs.add = (page, next) =>{
    if(!next){
        return page
    }else{
        let acum = page + 1
        return acum
    }
};

helperHbs.getPartialProfile = async () =>{
    const user = await User.findById(req.user._id);
    return user.user
}
module.exports = helperHbs;