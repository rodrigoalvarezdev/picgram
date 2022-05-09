const app = require('./app');
require('./database');

app.listen(3000, _ =>{
    console.log('server on port 3000');
});