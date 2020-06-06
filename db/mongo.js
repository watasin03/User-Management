const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(config.get('DB.connectionString'),
    { 
      useNewUrlParser:true,
      useFindAndModify:false,
      useCreateIndex:true,
      useUnifiedTopology: true 
    }
  );
  mongoose.Promise = global.Promise
}
 



