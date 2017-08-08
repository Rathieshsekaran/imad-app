var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles= {
    'article-one':{
    title:'Articleone |Rathieshsekaran',
    heading:'article one',
    date:'sept 15,1996',
    content:`
            <p>
                
              Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
                Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
            </p>
            <p>
                Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
                </p>
                
},
'article-two':{ title:'Articleone |Rathieshsekaran',
    heading:'article two',
    date:'sept 16,1996',
    content:`
            `<p>
              Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
                Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
           
                
                
},
'article-three':{title:'Articlethree |Rathieshsekaran',
    heading:'article three',
    date:'sept 17,1996',
    content:`
            <p>
                
             ` Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
                Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
            </p>
            <p>
                Robert Louis Stevenson spent his last five years in Samoa, where the locals couldn't comprehend how he earned his living as a writer... 
                </p>
                }
};
function createtemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
var htmltemplate=
<html>
    <head>
        <title>
            ${title}
    </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
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
            <p>
                This the content of the third article
            </p>
            ${content}
        </div>
                </div>
    </body>
</html>
;
return htmltemplate;
}





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articlename',function(req,res){
var articlename=req.params.articlename;
    res.send(createtemplate(articles[articlename]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
