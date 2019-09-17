
var touchBuffer = [];


function touchEvent(canvas, e){

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log(x, y);
    var tap = new Touch(x, y);
    touchBuffer.push(tap);
    tap.animate();
}

function Touch(x, y){
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.isAnimating = false;
}

Touch.prototype.animate = function(){
    this.isAnimating = true;
    var self = this;
    var timer = window.setInterval(function(){
        console.log(self);
        if(self.radius >= 20){
            window.clearInterval(timer);
            self.isAnimating = false;
        }
        self.radius++;

    }, 1000 / 60);
};

var c = document.getElementById("canvas");
c.addEventListener("click", function(e){touchEvent(c, e)});
var ctx = c.getContext("2d");


var loop = function(){
    console.log("running");

    ctx.clearRect(0, 0, 800, 800);
    touchBuffer.forEach(function(tap, i){

        if(!tap.isAnimating)
            touchBuffer.shift();


        ctx.beginPath();
        ctx.strokeStyle = "#f3abee";
        ctx.lineWidth = 7;
        ctx.arc(tap.x,tap.y,tap.radius,0,2*Math.PI);
        ctx.stroke();
    });



    window.requestAnimationFrame(loop);


};

window.requestAnimationFrame(loop);


