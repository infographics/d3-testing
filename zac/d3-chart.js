'use strict';

var dataArray = [50,20,30,40];
var timerStart, animDuration;

var svg = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

var circle = svg.selectAll('circle')
    .data(dataArray);

var SBAnimations = function() {};
SBAnimations.prototype.choppedAnimation = function() {
    return circle.enter()
        .append("circle")
        .attr("cy", 60)
        .attr("cx", function(d,i) { return i*100+100; })
        .attr("r", 0)
        .transition()
        .delay(function(d,i) {
            return i*300;
        })
        .duration(400)
        .attr("r", function(d) { return Math.sqrt(d); })
}

var d3Animation = new SBAnimations().choppedAnimation();