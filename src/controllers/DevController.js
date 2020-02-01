const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async store (req , res)  {
    const {github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({github_username });
    if(!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    let {name = login , avatar_url, bio } = apiResponse.data;
   
   const techsArray = parseStringAsArray(techs)
  
   const location = {
     type:'Point',
     coordinates :[longitude, latitude],
   }
    dev = await Dev.create({
     github_username,
     name,
     avatar_url,
     bio,
     techs:techsArray,
     location
   })
   res.json(dev);
    }
    
    res.json({msg : "DEV JA CADASTRADO"});
    
  },

  async index (req, res)  {
    const ret = await Dev.find();
        res.json(ret);
  },

  async update (req , res) {
    const ret = req.body 
    const rest = await Dev.findOne({github_username : ret.github_username});
    console.log();
    if(!rest._id){
      const upp = await Dev.update({
        name : ret.name,
        bio : ret.bio,
      })
    }
     res.json(upp); 
  }


}