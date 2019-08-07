const mongoose = require('mongoose');
const User = require('./models/user-model');
const categorySchema = require('./models/category-model');

mongoose.model('Category', categorySchema);

const getUsers = async (ctx) => {
    const result = await User.find({}).populate('category');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = {
        users: result,
    };
};

const searchUsers = async (ctx) => {
    // variables to use in queries

    const reqBody = ctx.request.body;
    const categoriesId = {
        front: '5d41f60825903907bc86f18e',
        back: '5d41f60825903907bc86f18f'
    };

    const searchText = /./;
    const objToFind = {};

    //set category

    if(reqBody.category){
        if (reqBody.category == 'Front-end') {
            objToFind.category = '5d41f60825903907bc86f18e'
        }else{
            objToFind.category = '5d41f60825903907bc86f18f'
        } 
    };

    //set search text

    if(reqBody.text === ''){
        objToFind.$or = [{
            firstName: {
                $regex: searchText
            }
        },
        {
           lastName:{
             $regex: searchText
           } 
        }]
    }else{
        objToFind.$or = [{
            firstName: {
                $regex: new RegExp(reqBody.text, 'i')
            }
        },
        {
           lastName:{
             $regex: new RegExp(reqBody.text, 'i')
           } 
        }]
    };

    //get users

    const result = await User.find(objToFind).sort({
        [reqBody.sort]: -1
    }).populate('category');

    ctx.body = {
    users: result,
    };
};



module.exports = {
  getUsers,
  searchUsers
};
