var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config ={
    user:'rathiesh3',
    database:'rathiesh3',
 host:'db.imad.hasura-app.io',
 port:'5432',
 password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));    


var articles= {
    'article-one' : { 
        title: 'article-one',
        heading:'Article one',
        date:'sept 15,1996',
        content: `<p>
               Study: Loss of Arctic sea ice impacting Atlantic Ocean water circulation system
GEOLOGY AND GEOPHYSICS

Arctic sea ice is not merely a passive responder to the climate changes occurring around the world, according to new research. 
            </p>`
    },
    'article-two' : {
        title: 'articletwo|rathiesh',
        heading:'articltwo',
        date:'sept 16,1996',
        content: `<p>
               Study: Loss of Arctic sea ice impacting Atlantic Ocean water circulation system
GEOLOGY AND GEOPHYSICS

Arctic sea ice is not merely a passive responder to the climate changes occurring around the world, according to new research. 
            </p>`
    },
    'article-three' : {
        title: 'articlethree|rathiesh',
        heading:'articlthree',
        date:'sept 17,1996',
        content: `<p>
               Study: Loss of Arctic sea ice impacting Atlantic Ocean water circulation system
GEOLOGY AND GEOPHYSICS

Arctic sea ice is not merely a passive responder to the climate changes occurring around the world, according to new research. 
            </p>`
    }
};

function createtemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmltemplate=`

<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>

    <body>
        <div>
            <a href="/">HOME</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}
        </div>
    </body>
</html>
`;
return htmltemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool =new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('SELECT *FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
           
       }else{
           res.send(JSON.stringify(result.rows));
       }
   });
});
var counter=0;
app.get('/counter',function(req,res){   
   counter=counter+1;
   res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req, res) {
    var name=req.query.name;
    names.push(name);
    //json=javascript object notation
    res.send(JSON.stringify(names));
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/articles/:articleName',function(req,res){
pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
  if(err){
      res.status(500).send(err.toString());
  }  else {
      if(result.rows.length===0){
          res.status(404).send('Article not found');
          }
          else{
         var articleData=result.rows[0];
             res.send(createtemplate(articleData));
     }
  }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
