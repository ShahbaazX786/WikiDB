// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; //either uses server allocated port number or 3000 port number.
const ejs = require('ejs'); // importing ejs

const app = express(); //storing and initializing our express in the app variable. its just a good practice to use app variable, you can use any name however.

app.set('view engine', 'ejs'); //setting the default view engine to ejs
app.use(express.static('public')); //using the static files by express server. ex:styles.css, assets etc.

// bodyParser middleware for parsing the data to JSON
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",{useNewUrlParser:true},function(err){ // now after v5+ localhost is replaced by 127.0.0.1 or 0.0.0.0 so.. it is what it is....
    if(err){
        console.error(err);
    }
    else{
        console.log('Successfully connected to the DB bro!!'); //just added a simple function to make sure we are really connected to the mongodb.
    }
}); // mongodb connection string

const articleSchema = new mongoose.Schema({ //creating the articleschema which is nothing but the blueprint of our collection.
    title:String,
    content:String
});

const Article = new mongoose.model('Article', articleSchema); //creating the model(object) from the schema.(note: the first parameter is the collection name in singular Noun[means first letter capital and if collection name is articles then use Article]);


//routes here
//supposedly express is written in js and js has a functionality called as chaining and the below route method is called as "route chaining".
// in this we use app.route().get().post().delete() etc to chain all the methods to a single route i.e., ('/articles')
app.route('/articles')
.get(function(req,res){
    Article.find({}, function(err,foundArticles){
        if(!err){
            // console.log(foundArticles);
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    });
})
.post(function(req,res){
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send('New Article successfully added into the DB!')
        }
        else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    Article.deleteMany({}, function(err){
        if(!err){
            res.send('Whoa! all the docs deleted bro!!');
        }
        else{
            res.send(err);
        }
    });
});


// so we basically reformatted / restructred our code to avoid repeated route name...sheeeeeshhhh it is what it is......
// app.get('/articles', );
// app.post('/articles', );
// app.delete('/articles', );

app.route('/articles/:id')
.get(function(req,res){
    const id = req.params.id; //you can use id,title,content also
    Article.findOne({_id:id}, function(err, foundArticle){ //but id seems to be unique so i just used _id
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("No matching artile found bro!"+err);
        }
    });
})
.put(function(req,res){
    const id = req.params.id; //update function is deprecated in v5+ of mongodb instead use updateOne, updateMany.
    Article.updateOne({_id:id},{title:req.body.title, content:req.body.content},function(err,result){ //also now mongodb doesn't allow overwrite:true parameter in this function instead use ==>  //this update is the mongoose method which is an implementation of PUT method in mongoDB and it takes 2 parameters, [{conditions(what to check)},{updates(what to update)}] and we report the status with a callback function.
        if(!err){
            res.send('Document data successfully updated bro!');
        }
        else{
            res.send('Whoops! there was some error while updating the data: '+err);
        }
    });
})
.patch(function(req,res){
    const id = req.params.id; 
    Article.updateOne({_id:id},{$set:req.body},function(err){ //here you used req.body as $set and what it does is it updates whatever values the req.body requests. ex: if only title is requested to be updated then it updates only title, else if both title and content is requested to be updated then it will update both of them/all of them.
        if(!err){
            res.send('Document data successfully updated bro!');
        }
        else{
            res.send('Whoops! there was some error while updating the data: '+err);
        }
    });
})
.delete(function(req,res){
    const id = req.params.id; 
    Article.deleteOne({_id:id},function(err){
        if(!err){
            res.send('Document successfully deleted bro!!');
        }
        else{
            res.send('Whoops! there was some error while deleting the document or the document doesnt exists!!: '+err);
        }
    });
});

app.listen(PORT,()=>{
    console.log('Server started at port '+PORT+' bro!');
});


