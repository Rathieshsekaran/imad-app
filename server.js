var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles= {
    'article-one' : { 
        title: 'articleone|rathiesh',
        heading:'articleone',
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
            ${date}
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
var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/submit-name', function (req, res) {
    var name=req.query.name;
    names.push(name);
    //json=javascript object notation
    res.send(JSON.stringify(names));
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/:articlename',function(req,res){
var articlename=req.params.articlename;
    res.send(createtemplate(articles[articlename]));
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
var names=[];


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
