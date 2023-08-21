
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

var Question = new Schema({
	title: {
		type: String
	},
	content: {
		type: String
	},
	asker: {
		type: String
	},
	votes: {
		type: Number
	}
})

Question.plugin(passportLocalMongoose);

module.exports = mongoose.model('Question', Question)