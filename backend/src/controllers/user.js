const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
module.exports = {
	signup: async (req, res) => {
		const { email, password } = req.body;
		password = await bcrypt.hash(password, 10);
	    const newUser = new User({email, password});
	    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
	    res.status(200).json({token});
	},
	signin: async (req, res) => {
	    const { email, password } = req.body;
	    const user = await User.findOne({email});

	    if (!user) return res.status(401).send('The email doen\' exists');
	    if (bcrypt.compare(password,user.password)){
	    	const token = jwt.sign({_id: user._id}, 'secretkey');
	    	return res.status(200).json({token});
	    }else{
	    	return res.status(401).send('Wrong Password');
	    }
	},
	getAll: async (req, res) => {
	    const users = await User.find({});
    	res.json(users)
	},
	add: async (req, res) => {
	    const { email, country, password } = req.body;
	    cryptPassword = await bcrypt.hash(password, 10);
	    const newUser = new User({email, country, password:cryptPassword});
	    await newUser.save();
	    const users = await User.find({});
    	res.json(users)
	},
	update: async (req, res) => {
	    const { _id, email, country, password } = req.body;
	    cryptPassword = await bcrypt.hash(password, 10);
	    await User.findByIdAndUpdate({_id},{email, country, password:cryptPassword});
	    const users = await User.find({});
    	res.json(users)
	},
	delete: async (req, res) => {
	    const { _id } = req.body;
	    await User.findByIdAndRemove({_id:_id},);
	    const users = await User.find({});
    	res.json(users)
	},

}