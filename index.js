//user: CoShop-Trial-User
//password:Mpif7U7Udsc9oKz2
const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
app.use(express.static(__dirname + '/client'))

// Start MongoDB Atlas ********
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require("mongoose");

const mongooseUri = "mongodb+srv://CoShopUser:n5K4KtS33C8cQRhs@coshopcluster.iyjalfb.mongodb.net/CoShopDB";
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true})

// define a schema for the user collection
const userSchema = ({
	name: {
		type: String,
		required: true
	}, 
	email: {
		type: String,
		required: true,
		unique: true
	},     
	password: {
		type: String,
		required: true
	}
	// figure out how to work around there being no image schema type 
  });
const User = mongoose.model("users", userSchema);

// Create route called from register.html
app.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass1, 10);
	    let newNote = new User({
		    name: req.body.name,
		    email: req.body.email,
    	    password: hashedPassword
	    })

	newNote.save();
	// line below commented out until login works 100% of the time
	//res.redirect("/pages/login.html");
	res.redirect("/");
} catch (err) {
    console.log(err);
}
})

// Create route called from login.html
// note: login does not work 100% of the time - needs to be debugged
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});  
      if (!user) {
        res.status(401).send("Incorrect email or password:" + req.body.email + " " + req.body.password);
        return;
      }
  
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!isPasswordMatch) {
        res.status(401).send("Incorrect email or password");
        return;
      }  
     
      res.redirect("/");

    } catch (err) {
      console.log(err);
    }
  });


const renderNotes = (notesArray) => {
	let text = "Users Collection:\n\n";
	notesArray.forEach((note)=>{
		text += "Name: " + note.name  + "\n";
		text += "email: " + note.email  + "\n";
		text += "password: " + note.password  + "\n";
		text += "ID:" + note._id + "\n\n";
	})
	text += "Total Count: " + notesArray.length;
	return text
}

app.get("/read", function(request, response) {
	User.find({}).then(notes => { 
		response.type('text/plain');
		response.send(renderNotes(notes));
	})
})


// End MongoDB Atlas ********

const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})