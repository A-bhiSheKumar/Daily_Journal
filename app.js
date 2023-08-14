//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to Daily Journal, your personal haven for capturing and cherishing life's everyday moments! We're thrilled to have you join our community of mindful journalers. At Daily Journal, we understand the importance of preserving your daily experiences, thoughts, and reflections. Our user-friendly platform allows you to effortlessly document your day, whether it's an exciting adventure, a peaceful moment of self-discovery, or a simple joy that made you smile. Adding your daily entries is a breeze";
const aboutContent = "Welcome to Daily Journal, a platform where the tapestry of life is woven through words. At Daily Journal, we believe that every day holds a story worth sharing, and that the power of storytelling can connect us on a profound level. Our blog is a space where individuals from all walks of life come together to document the moments that shape us, the lessons we learn, and the experiences that mold our journeys.We are a community of writers, dreamers, and adventurers who find solace, inspiration, and growth in the act of putting pen to paper (or fingers to keyboard). Whether it's a reflection on a quiet morning's introspection, a snapshot of a captivating travel escapade, or a heartfelt narrative of life's trials and triumphs, our contributors open their hearts and minds to bring you stories that resonate.";
const contactContent = "Thank you for visiting our website! We're thrilled that you've taken the time to explore Daily Journal and immerse yourself in the stories and experiences shared by our community. We hope your time here has been inspiring, thought-provoking, and filled with moments of connection.";

const app = express();


//Declaring a global variabel
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Definig the Routes(home.ejs)1
app.get("/" , (req , res) =>{

  res.render("home",{
    StartingContent:homeStartingContent,
    posts:posts
  });// Rendering the "home" template and passing the "home" object

});

app.get("/about",(req,res)=>{
  res.render("about", {AboutContent: aboutContent});  // Rendering the "about" template and passing the "about" object
});

app.get("/contact",(req,res)=>{
  res.render("contact", {ContactContent: contactContent});  // Rendering the "contact" template and passing the "contact" object
});

app.get("/compose",(req,res)=>{
  res.render("compose");  // Rendering the "compose" template and passing the "contact" object
});

//Dyanmic websites 1st step
app.get("/post/:postName",(req,res) =>{
  // req.send(req.params);
  const requestedTitle = _.lowerCase(req.params.postName) ;
  posts.forEach(function(post){
    const ourTitle = _.lowerCase(post.title);

    if(requestedTitle === ourTitle){
      res.render("post",{
        requestedTitle: post.title,
        content:post.content
      });
    }
  })
});

//Here we declare what should happen when somebody make the post req
app.post("/compose",(req,res)=>{

  //Putting everything inside the arrray
  const newPost = {
    title : req.body.postTitle,
    content : req.body.postBody
  }
  posts.push(newPost);

  //Redirect to home page..
  res.redirect("/");
});





//Starting of server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
