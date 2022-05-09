const statCtrl = {};
statCtrl.vistas = async (model, {username}) =>{
    try {
        const viewsTotal = await model.aggregate([
            {$match: {username}},
            {$group:{_id: '1', viewsTotal: {$sum:'$views'}}}
        ])
        return viewsTotal[0].viewsTotal || 0
    } catch (error) {
        console.error(error)
    }
};

statCtrl.gustas = async (model, {username})=>{
    try {
        const likesTotal = await model.aggregate([
            {$match:{username: username}},
            {$group:{_id:'1', likesTotal: {$sum:'$likes'}}}
        ])
        return likesTotal[0].likesTotal || 0
    } catch (error) {
        console.error(error)
    }
};



module.exports = statCtrl