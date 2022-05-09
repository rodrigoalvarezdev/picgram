const mongoose = require('mongoose');

(()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('database is connected');
    } catch (err) {
        console.error(err);
    }
})();