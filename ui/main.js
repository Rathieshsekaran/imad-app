
var button = document.getElementById('counter');
button.onclick = function(){
//create a request 
//var request = new XMLHttpRequest();
//capture the response and store it in a variable
//request.onreadystatechange = function () {
   // if(request.readyState===XMLHttpRequest.DONE)
   //{
        //if(requeststate===200)
       // {
            //var counter=request.responseText;
            var counter = 0;
            counter=counter+1;
            var span=document.getElementById('count');
            span.innerHTML = counter.toString();
        //}
   // }
};
//make a request
//request.open('GET','http://rathiesh3.imad.hasura-app.io',true);
//request.send(null);
//};