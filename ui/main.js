console.log('Loaded!');
var img = document.getElementById('madi');
var marginleft= 0;
img.onclick = function(){
    
    setInterval( function() {
            marginLeft += 10;
            img.style.marginLeft = marginLeft.toString() + "px";
        } , 100);
} ;