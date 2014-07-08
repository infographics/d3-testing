'use strict';
/* global $ */
describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('unitTestingApp'));

	var MainCtrl,
		scope,
        timers=[],
        flushD3Transition = new Event('flushD3Transition'); ////;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
        scope.init();
	}));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
   
    function flushAllD3Transitions() {
        var now = Date.now;
        Date.now = function() { return Math.pow(10,18); };
        d3.timer.flush();
        Date.now = now;
    }
    function flushAllD3Transitions2(){
        timers.forEach(function(timer) {
            console.log(timer);
            timer(Infinity); });
        timers = [];
    }
    function numberOfCircles(num){
        var svg=document.querySelector('svg').getBoundingClientRect();
        scope.buildCircles(num);
        return (function(){
            var count=0;
            $('svg circle').each(function(){
                var conditions=true;
                conditions=conditions && ($(this).attr('cx')*1-$(this).attr('r')*1>0);
                conditions=conditions && ($(this).attr('cy')*1-$(this).attr('r')*1>0);
                conditions=conditions && ($(this).attr('cx')*1+$(this).attr('r')*1<svg.width);
                conditions=conditions && ($(this).attr('cy')*1+$(this).attr('r')*1<svg.height);
                if(conditions){
                    count++;
                }
            });
            return count;
        })();
    }


    it('The svg object should have same number of circles inside it', function(){
        for(var num=1;num<=20;num+=1){
            expect(numberOfCircles(num)).toBe(num);
        }
    });

    it('The circle should transition from start to end in 2 seconds', function(){
        var data={
            bubble: {
                r: 10,
                color: '#FF0000'
            },
            start: {
                x: 20,
                y: 20   
            },
            end: {
                x: 250,
                y: 250
            }
        };
        var data2={
            bubble: {
                r: 10,
                color: '#FF0000'
            },
            start: {
                x: 22,
                y: 22   
            },
            end: {
                x: 151,
                y: 121
            }
        };
        var circle,circle2;
        runs(function(){
            circle=scope.placeCircle(data);
            circle2=scope.placeCircle(data2);
            expect($(circle[0][0]).attr('cx')*1).toBe(data.start.x);
            expect($(circle[0][0]).attr('cy')*1).toBe(data.start.y);

            expect($(circle2[0][0]).attr('cx')*1).toBe(data2.start.x);
            expect($(circle2[0][0]).attr('cy')*1).toBe(data2.start.y);
            
            scope.moveCircle(circle,data,2000);
            scope.moveCircle(circle2,data2,2000);
        });
        // waits(2000);
        runs(function(){
            flushAllD3Transitions();

            expect($(circle[0][0]).attr('cx')*1).toBe(data.end.x);
            expect($(circle[0][0]).attr('cy')*1).toBe(data.end.y);

            expect($(circle2[0][0]).attr('cx')*1).toBe(data2.end.x);
            expect($(circle2[0][0]).attr('cy')*1).toBe(data2.end.y);
        });
    });

    it('The circle should transition from start to end in 2 seconds passing trough middle', function(){
        var data={
            bubble: {
                r: 10,
                color: '#FF0000'
            },
            start: {
                x: 20,
                y: 20   
            },
            middle: {
                x: 200,
                y: 20   
            },
            end: {
                x: 250,
                y: 250
            }
        };
        var circle,
            d3circle,
            location=0 // 0 means start, 1 means middle, 2 means end
            ;
        runs(function(){
            d3circle=scope.placeCircle(data);
            circle=d3circle[0][0];
            expect($(circle).attr('cx')*1).toBe(data.start.x);
            expect($(circle).attr('cy')*1).toBe(data.start.y);
            $(circle).on('transitionStarted',function(){
                $(circle)[0].dispatchEvent(flushD3Transition);
            });
            $(circle).on('transitionEnded',function(){
                var x=$(circle).attr('cx')*1;
                var y=$(circle).attr('cy')*1;
                if(x===data.middle.x && y===data.middle.y && location===0){
                    location++;
                }
                if(x===data.end.x && y===data.end.y && location===1){
                    location++;
                }
            });
            scope.doubleTransition(d3circle,data,20000);
        });
        waits(100); // the wait is necessary but it's constant for any duration of the transition
        runs(function(){
            expect(location).toBe(2);
        });
    });
    it('The circles should transition trough all the points by order', function(){
        var bubbles=[{
            bubble: {
                r: 10,
                color: '#FF0000'
            },
            points: [
                {
                    x:20,
                    y:20
                },{
                    x:100,
                    y:100
                },{
                    x:200,
                    y:90
                }
            ],
            duration: 2000
        },{
            bubble: {
                r: 10,
                color: '#00FF00'
            },
            points: [
                {
                    x:120,
                    y:210
                },{
                    x:10,
                    y:40
                },{
                    x:200,
                    y:250
                },{
                    x:50,
                    y:50
                }
            ],
            duration: 6000
        },{
            bubble: {
                r: 10,
                color: '#0000FF'
            },
            points: [
                {
                    x:200,
                    y:20
                },{
                    x:20,
                    y:200
                },{
                    x:20,
                    y:20
                },{
                    x:200,
                    y:200
                },{
                    x:200,
                    y:20
                },{
                    x:20,
                    y:200
                },{
                    x:20,
                    y:20
                },{
                    x:200,
                    y:200
                },{
                    x:200,
                    y:20
                },{
                    x:20,
                    y:200
                },{
                    x:20,
                    y:20
                },{
                    x:200,
                    y:200
                },{
                    x:200,
                    y:20
                },{
                    x:20,
                    y:200
                },{
                    x:20,
                    y:20
                },{
                    x:200,
                    y:200
                },{
                    x:200,
                    y:20
                },{
                    x:20,
                    y:200
                },{
                    x:20,
                    y:20
                },{
                    x:200,
                    y:200
                }
            ],
            duration: 40000
        }];
        var circles=[];
        var checkpoints=[];
        for(var i=0;i<bubbles.length;i++){
            checkpoints.push(1);
        }
        var keep=false;
        for(var i=0;i<bubbles.length;i++){
            circles.push(scope.placeCircle(bubbles[i],undefined,keep));
            keep=true;
            $(circles[i]).on('transitionStarted',function(){
                $(circles)[i].dispatchEvent(flushD3Transition);
            });
            $(circles[i]).on('transitionEnded',function(){
                var x=$(circles[i]).attr('cx')*1;
                var y=$(circles[i]).attr('cy')*1;
                var checkpoint=checkpoints[i];
                if(x===data.points[checkpoint].x && y===data.points[checkpoint].y){
                    checkpoints[i]++;
                }
            });
            scope.transition(circles[i],bubbles[i].points,bubbles[i].duration/(bubbles[i].points.length));
        }
        waits(100);
        runs(function(){
            for(var i=0;i>checkpoints.length;i++){
                expect(checkpoints[i]).toBe(bubbles[i].points.length);
            }
        });
    });
    it('The transition should end in 2 seconds', function(){
        var data={
            bubble: {
                r: 10,
                color: '#FF0000'
            },
            start: {
                x: 20,
                y: 20   
            },
            end: {
                x: 250,
                y: 250
            }
        };
        var circle,t1,t2;
        runs(function(){
            circle=scope.placeCircle(data);
            expect($(circle[0][0]).attr('cx')*1).toBe(data.start.x);
            expect($(circle[0][0]).attr('cy')*1).toBe(data.start.y);
            $(circle[0][0]).on('transitionStarted',function(){
                t1=new Date();
                console.log(t1);
                t1=t1.getTime();
            });
            $(circle[0][0]).on('transitionEnded',function(){
                t2=new Date();
                t2=t2.getTime();
            });
            scope.moveCircle(circle,data,2000);
        });
        waits(2200);
        runs(function(){
            console.log(t2,t1,(t2-t1));
            expect(5).toBe(2);
        });
    });
});

