const mongoose = require('mongoose');

async function connectLocal(){
    mongoose.connect('mongodb://127.0.0.1:27017/blogsite?directConnection=true')
        .then(() => {console.log('Successful connection to local DB')})
        .catch((e) => {console.log('Error connecting to db\n' + e)});
}

async function connectAtlas(){
    let password = 'Olicard_101'
    mongoose.connect(process.env.VARIABLE_NAME)
        .then(() => {console.log('Successful connection to Atlas DB')})
        .catch((e) => {console.log('Error connecting to db\n' + e)});
}

module.exports.connectLocal = connectLocal;
module.exports.connectAtlas = connectAtlas;

