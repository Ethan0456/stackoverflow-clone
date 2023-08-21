// App.js

var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")
const User = require("./model/User");
const Question = require("./model/Question")
var app = express();


mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));
app.use(express.static("." + '/public'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
	res.render("home");
});
app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

app.get("/register", function (req, res) {
	res.render("register");
});

app.post("/register", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password
	});
	
	return res.status(200).json(user);
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

app.post("/login", async function(req, res){
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user) {
			const result = req.body.password === user.password;
			if (result) {
				//Create and assign a token
				// const token = jwt.sign({ username: req.body.username }, process.env.Token_SECRET);
				// res.cookie("auth", token)
				res.render("secret",  { username: req.body.username });
			} else {
				res.status(400).json({ error: "password doesn't match" });
			}
		} else {
			res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Showing question form
app.get("/askQuestion", function (req, res) {
	res.render("askQuestion",  { username: req.body.username });
})

app.post("/askQuestion", async (req, res) => {
	
	const question = await Question.create({
		title: req.body.title,
		content: req.body.content,
		asker: req.body.username,
		votes: 1
	});
	return res.status(200).json(question);
});

// Get Question of a specific user
app.get("/myQuestions", function (req, res) {
	res.render("myQuestions")
})


app.get('/myQuestions', async (req, res) => {
	try {
		const question = await Question.find();
		return res.status(200).json(question);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});