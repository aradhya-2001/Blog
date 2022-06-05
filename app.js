//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "I am an undergrad student doing Electronics and Communication Engineering from SRM IST.This is my first backend project in which I have used Node js, EJS, Express and Express routing parameters to create my first daily journal website.";


  const aboutContent =
  "Journaling can boost your productivity and well-being in a few minutes a day. You can write down your thoughts or record what happened during the day. It's a simple way to manage stress, enhance creativity, increase happiness, improve health, and increase work performance.";



  const contactContent =
  "You can contact me via gmail";

var posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { hContent: homeStartingContent, postContent: posts, _:_ });  /* here full lodlash(_) is exported as _  */
});

app.get("/2", (req, res) => {
  res.render("about", { aContent: aboutContent });
});
app.get("/3", (req, res) => {
  res.render("contact", { cContent: contactContent });
});

app.get("/4", (req, res) => {
  res.render("compose");
});

app.post("/4", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/:topic", (req, res) => {
  let a = _.lowerCase(req.params.topic);

  posts.forEach(function (i) {
    if (a === _.lowerCase(i.title)) {
      res.render("post", { pTitle: i.title, pBody: i.content });
      console.log("Found");
    }
    else{
      res.render("post",{pTitle: "Try Again!", pBody: "Title not found"})
    }
  });
});

app.listen(process.env.PORT||3000, function () {
  console.log("Server started");
});
