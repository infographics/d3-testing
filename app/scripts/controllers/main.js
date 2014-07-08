'use strict';
var rene;
/* global d3,$ */
angular.module('unitTestingApp')
	.controller('MainCtrl', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.init= function(){
			return d3.select('body')
				.append('svg')
				.attr('width','600')
				.attr('height','300')
				;
		};
		$scope.buildCircles=function(numberOfCircles,svgNumber){
			var svg;
			if(svgNumber || svgNumber===0){
				$('#example'+svgNumber+'svg').html('');
				svg=d3.select('#example'+svgNumber+'svg');
			} else {
				$('svg').html('');
				svg=d3.select('svg');
			}
			
			var cx=-35,cy=25,r=15;
			for(var i=0;i<numberOfCircles;i++){
				cx+=70;
				if(cx+r+1>svg.style('width').replace('px', '')*1){
					cy+=50;
					cx=35;
				}
				svg.append('circle')
					.attr('cx',cx)
					.attr('cy',cy)
					.attr('r',r)
					;
			}
		};
		$scope.placeCircle=function(data,svgNumber,keep){
			var svg;
			if(svgNumber || svgNumber===0){
				if(!keep){
					$('#example'+svgNumber+'svg').html('');
				}
				svg=d3.select('#example'+svgNumber+'svg');
			} else {
				if(!keep){
					$('svg').html('');
				}
				svg=d3.select('svg');
			}
			var bubble=data.bubble;
			var circle=svg.append('circle')
				.attr('r',bubble.r)
				.style('fill',bubble.color)
				;
			if(data.start){
				circle
					.attr('cx',data.start.x)
					.attr('cy',data.start.y);
				} else {
					circle
					.attr('cx',data.points[0].x)
					.attr('cy',data.points[0].y);
				}
			return circle;
		};
		$scope.moveCircle=function(circle,data,duration){
			circle
				.transition()
				.attr('cx',data.end.x)
				.attr('cy',data.end.y)
				.duration(duration)
				.ease('linear')
				;
		};
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
		$scope.doubleTransition=function(circle,data,duration){
			circle
				.transition()
				.attr('cx',data.middle.x)
				.attr('cy',data.middle.y)
				.duration(duration/2)
				.ease('linear')
				.each('end', function(){
					circle
						.transition()
						.attr('cx',data.end.x)
						.attr('cy',data.end.y)
						.duration(duration/2)
						.ease('linear')
						;
				})
				;
		}
		$scope.transition=function(circle,points,duration){
			points=points.slice(1);
			if(points.length===0){
				return;
			}

			circle
				.transition()
				.attr('cx',points[0].x)
				.attr('cy',points[0].y)
				.duration(duration)
				.ease('linear')
				.each('end', function(){
					$scope.transition(circle,points,duration);
				});
		}

		function createTrio(testNumber){
			var titles=_.map(all, 'title');
			var descriptions=_.map(all, 'description');
			var codes=_.map(all, 'code');
			var tests=_.map(all, 'test');

			var tabs=$('<ul class="nav nav-tabs" id="example'+testNumber+'">\
				<li class="active"><a href="#example'+testNumber+'code">Code</a></li>\
				<li><a href="#example'+testNumber+'test">Test</a></li>\
				<li><a href="#example'+testNumber+'demo">Demo</a></li>\
				</ul>');

			
			var code=codes[testNumber];
			var test=tests[testNumber];

			var title=$('<h3>')
				.html((testNumber+1) + '- ' + titles[testNumber])
				;
			var description=$('<div></div>')
				.html(descriptions[testNumber])
				;

			var codeBlock=$('<juicy-ace-editor id="edit" style="width:600px;height:300px;display:inline-block" theme="ace/theme/monokai" mode="ace/mode/javascript" readonly="true"></juicy-ace-editor>').html(code);
			var testBlock=$('<juicy-ace-editor id="edit" style="width:600px;height:300px;display:inline-block" theme="ace/theme/monokai" mode="ace/mode/javascript" readonly="true"></juicy-ace-editor>').html(test);
			var demoSvg=$('<svg id="example'+testNumber+'svg"></svg>');

			var btns=$('<div class="btns"></div>');
			var demoBtnPlay=$('<button>Play</button>');
			var demoBtnReset=$('<button>Reset</button>');
			btns
				.append(demoBtnPlay)
				.append(demoBtnReset)
				;
			switch(testNumber){
				case 0:
					demoBtnPlay.click(function(){
						$scope.buildCircles(14,testNumber);
					});
				break;
				case 1:
				case 5:
					demoBtnPlay.click(function(){
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
						var circle=$scope.placeCircle(data,testNumber);
						$scope.moveCircle(circle,data,2000);
					});
				break;
				case 2:
				case 3:
					demoBtnPlay.click(function(){
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
						var circle=$scope.placeCircle(data,testNumber);
						$scope.doubleTransition(circle,data,10000);
					});
				break;
				case 4:
					demoBtnPlay.click(function(){
						var bubbles=[{
							bubble: {
								r: 10,
								color: '#FF0000'
							},
							points: [
								{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
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
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								}
							],
							duration: 30000
						},{
							bubble: {
								r: 10,
								color: '#00FF00'
							},
							points: [
								{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								}
							],
							duration: 30000
						},{
							bubble: {
								r: 10,
								color: '#0000FF'
							},
							points: [
								{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								}
							],
							duration: 30000
						},{
							bubble: {
								r: 10,
								color: '#FF00FF'
							},
							points: [
								{
									x:200,
									y:100
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:20,
									y:200
								}
							],
							duration: 30000
						},{
							bubble: {
								r: 10,
								color: '#00FFFF'
							},
							points: [
								{
									x:100,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								},{
									x:20,
									y:20
								},{
									x:200,
									y:20
								},{
									x:200,
									y:200
								},{
									x:20,
									y:200
								}
							],
							duration: 30000
						}
						];
						var circles=[];
						var keep=false;
						for(var i=0;i<bubbles.length;i++){
							circles.push($scope.placeCircle(bubbles[i],testNumber,keep));
							keep=true;
							$scope.transition(circles[i],bubbles[i].points,bubbles[i].duration/(bubbles[i].points.length));
						}
					});
				break;
			}
			demoBtnReset.click(function(){
				$('#example'+testNumber+'svg').html('');
			});

			var codeDiv=$('<div class="tab-pane active" id="example'+testNumber+'code"></div>').append(codeBlock);
			var testDiv=$('<div class="tab-pane" id="example'+testNumber+'test"></div>').append(testBlock);
			var demoDiv=$('<div class="tab-pane" id="example'+testNumber+'demo"></div>').append(btns).append(demoSvg);

			var contents=$('<div class="tab-content"></div>')
				.append(codeDiv)
				.append(testDiv)
				.append(demoDiv)
				;
			var whole=$('<div></div>')
				.addClass('example')
				.append(title)
				.append(description)
				.append(tabs)
				.append(contents)
				;

			$('#container').append(whole);
			$('#example'+testNumber+' a').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});
		}
		var all=[
			{
				title :			'Check if all bubbles are inside the svg box',
				description :	'I wrote a function that initialize the svg dom element. And Another function that clears everything inside the svg, then appends the parameter passed number of circles inside the scg. I wrote a test to make sure that the number of circles inside the SVG DOM object is equal to the number passed. Then I modified the function a little to place the circles in a grid without getting its x absicca over the width of the svg Element. And I tested that inserting x elements inside the svg will have x elements inside it visually i.e. no intersection with the borders or the bubble is outiside the box.',
				code :			'$scope.buildCircles=function(numberOfCircles,svgNumber){\n\tvar svg;\n\tif(svgNumber || svgNumber===0){\n\t\t$(\'#example\'+svgNumber+\'svg\').html(\'\');\n\t\tsvg=d3.select(\'#example\'+svgNumber+\'svg\');\n\t} else {\n\t\t$(\'svg\').html(\'\');\n\t\tsvg=d3.select(\'svg\');\n\t}\n\t\n\tvar cx=-35,cy=25,r=15;\n\tfor(var i=0;i&lt;numberOfCircles;i++){\n\t\tcx+=70;\n\t\tif(cx+r+1&gt;svg.style(\'width\').replace(\'px\', \'\')*1){\n\t\t\tcy+=50;\n\t\t\tcx=35;\n\t\t}\n\t\tsvg.append(\'circle\')\n\t\t\t.attr(\'cx\',cx)\n\t\t\t.attr(\'cy\',cy)\n\t\t\t.attr(\'r\',r)\n\t\t\t;\n\t}\n};',
				test :			'function numberOfCircles(num){\n    var svg=document.querySelector(\'svg\').getBoundingClientRect();\n    scope.buildCircles(num);\n    return (function(){\n        var count=0;\n        $(\'svg circle\').each(function(){\n            var conditions=true;\n            conditions=conditions &amp;&amp; ($(this).attr(\'cx\')*1-$(this).attr(\'r\')*1&gt;0);\n            conditions=conditions &amp;&amp; ($(this).attr(\'cy\')*1-$(this).attr(\'r\')*1&gt;0);\n            conditions=conditions &amp;&amp; ($(this).attr(\'cx\')*1+$(this).attr(\'r\')*1&lt;svg.width);\n            conditions=conditions &amp;&amp; ($(this).attr(\'cy\')*1+$(this).attr(\'r\')*1&lt;svg.height);\n            if(conditions){\n                count++;\n            }\n        });\n        return count;\n    })();\n}\n\n\nit(\'The svg object should have same number of circles inside it\', function(){\n    for(var num=1;num&lt;=20;num+=1){\n        expect(numberOfCircles(num)).toBe(num);\n    }\n});'
			},
			{
				title :			'Check that transition is starting and ending at correct position',
				description :	'I created a function to place a circle, and another to transition this circle to another place. The test checks that the object has been correctly placed and after the transition it checks if its new location is correct. I found 2 ways to test this: the first one is to place the object, check for initial position wait for 2000 ms then check for ending position. Another approach is to place and check then start the transition and flush it (make the transition finish instantly) and check for the ending position. If we use the first method the time to wait is not 100% accurate so it might take a little longer to terminate.',
				code :			'$scope.placeCircle=function(data,svgNumber){\n\tvar svg;\n\tif(svgNumber || svgNumber===0){\n\t\t$(\'#example\'+svgNumber+\'svg\').html(\'\');\n\t\tsvg=d3.select(\'#example\'+svgNumber+\'svg\');\n\t} else {\n\t\t$(\'svg\').html(\'\');\n\t\tsvg=d3.select(\'svg\');\n\t}\n\tvar bubble=data.bubble;\n\tvar circle=svg.append(\'circle\')\n\t\t.attr(\'r\',bubble.r)\n\t\t.style(\'fill\',bubble.color)\n\t\t;\n\tcircle\n\t\t.attr(\'cx\',data.start.x)\n\t\t.attr(\'cy\',data.start.y);\n\treturn circle;\n};\n$scope.moveCircle=function(circle,data,duration){\n\tcircle\n\t\t.transition()\n\t\t.attr(\'cx\',data.end.x)\n\t\t.attr(\'cy\',data.end.y)\n\t\t.duration(duration)\n\t\t.ease(\'linear\')\n\t\t;\n};\nvar data={\n\tbubble: {\n\t\tr: 10,\n\t\tcolor: \'#FF0000\'\n\t},\n\tstart: {\n\t\tx: 20,\n\t\ty: 20\t\n\t},\n\tend: {\n\t\tx: 250,\n\t\ty: 250\n\t}\n};',
				test :			'function flushAllD3Transitions() {\n        var now = Date.now;\n        Date.now = function() { return Infinity; };\n        d3.timer.flush();\n        Date.now = now;\n    }\n\nit(\'The circle should transition from start to end in 2 seconds\', function(){\n    var data={\n        bubble: {\n            r: 10,\n            color: \'#FF0000\'\n        },\n        start: {\n            x: 20,\n            y: 20   \n        },\n        end: {\n            x: 250,\n            y: 250\n        }\n    };\n    var data2={\n        bubble: {\n            r: 10,\n            color: \'#FF0000\'\n        },\n        start: {\n            x: 22,\n            y: 22   \n        },\n        end: {\n            x: 151,\n            y: 121\n        }\n    };\n    var circle,circle2;\n    runs(function(){\n        circle=scope.placeCircle(data);\n        circle2=scope.placeCircle(data2);\n        expect($(circle[0][0]).attr(\'cx\')*1).toBe(data.start.x);\n        expect($(circle[0][0]).attr(\'cy\')*1).toBe(data.start.y);\n\n        expect($(circle2[0][0]).attr(\'cx\')*1).toBe(data2.start.x);\n        expect($(circle2[0][0]).attr(\'cy\')*1).toBe(data2.start.y);\n        \n        scope.moveCircle(circle,data,6000);\n        scope.moveCircle(circle2,data2,2000);\n    });\n    waits(3000);\n    runs(function(){\n        \/\/ flushAllD3Transitions();\n\n        expect($(circle[0][0]).attr(\'cx\')*1).toBe(data.end.x);\n        expect($(circle[0][0]).attr(\'cy\')*1).toBe(data.end.y);\n\n        expect($(circle2[0][0]).attr(\'cx\')*1).toBe(data2.end.x);\n        expect($(circle2[0][0]).attr(\'cy\')*1).toBe(data2.end.y);\n    });\n});'
			},
			{
				title :			'Checking that the transition is passing trough a middle point',
				description :	'I create a function to place the circle, then call a double transition: as soon as the first one ends, the second one is called to have a chained transition. Testing this is really difficult, because the previous solution to flushAllD3Transitions doesn\'t work anymore: It makes the jump to the end of the first transition but doesn\'t trigger the second one after it. So I came up with a workaround to test this. This workaround requires to add 2 lines of code in d3.js and also obliges you to wait until all transitions ends. Add this to line 8631: "window.dispatchEvent(event2);" and this to line 1: "var event2 = new Event(\'transitionEnded\');"',
				code :			'$scope.placeCircle=function(data,svgNumber){\n\tvar svg;\n\tif(svgNumber || svgNumber===0){\n\t\t$(\'#example\'+svgNumber+\'svg\').html(\'\');\n\t\tsvg=d3.select(\'#example\'+svgNumber+\'svg\');\n\t} else {\n\t\t$(\'svg\').html(\'\');\n\t\tsvg=d3.select(\'svg\');\n\t}\n\tvar bubble=data.bubble;\n\tvar circle=svg.append(\'circle\')\n\t\t.attr(\'r\',bubble.r)\n\t\t.style(\'fill\',bubble.color)\n\t\t;\n\tcircle\n\t\t.attr(\'cx\',data.start.x)\n\t\t.attr(\'cy\',data.start.y);\n\treturn circle;\n};\n$scope.doubleTransition=function(circle,data,duration){\n\tcircle\n\t\t.transition()\n\t\t.attr(\'cx\',data.middle.x)\n\t\t.attr(\'cy\',data.middle.y)\n\t\t.duration(duration\/2)\n\t\t.ease(\'linear\')\n\t\t.each(\'end\', function(){\n\t\t\tcircle\n\t\t\t\t.transition()\n\t\t\t\t.attr(\'cx\',data.end.x)\n\t\t\t\t.attr(\'cy\',data.end.y)\n\t\t\t\t.duration(duration\/2)\n\t\t\t\t.ease(\'linear\')\n\t\t\t\t;\n\t\t})\n\t\t;\n}\n\nvar data={\n\tbubble: {\n\t\tr: 10,\n\t\tcolor: \'#FF0000\'\n\t},\n\tstart: {\n\t\tx: 20,\n\t\ty: 20\t\n\t},\n\tmiddle: {\n\t\tx: 200,\n\t\ty: 20\t\n\t},\n\tend: {\n\t\tx: 250,\n\t\ty: 250\n\t}\n};',
				test :			'it(\'The circle should transition from start to end in 2 seconds passing trough middle\', function(){\n    var data={\n        bubble: {\n            r: 10,\n            color: \'#FF0000\'\n        },\n        start: {\n            x: 20,\n            y: 20   \n        },\n        middle: {\n            x: 200,\n            y: 20   \n        },\n        end: {\n            x: 250,\n            y: 250\n        }\n    };\n    var circle;\n    runs(function(){\n        circle=scope.placeCircle(data);\n        expect($(circle[0][0]).attr(\'cx\')*1).toBe(data.start.x);\n        expect($(circle[0][0]).attr(\'cy\')*1).toBe(data.start.y);\n        \n        scope.doubleTransition(circle,data,2000);\n    });\n    var location=0;\/\/ 0 means start, 1 means middle, 2 means end\n   \n    runs(function(){\n        $(window).on(\'transitionEnded\',function(){\n            var x=$(circle[0][0]).attr(\'cx\')*1;\n            var y=$(circle[0][0]).attr(\'cy\')*1;\n            if(x===data.middle.x &amp;&amp; y===data.middle.y &amp;&amp; location===0){\n                location++;\n            }\n            if(x===data.end.x &amp;&amp; y===data.end.y &amp;&amp; location===1){\n                location++;\n            }\n        });\n    });\n    waits(5000); \/\/5 seconds is more than the duration of the transition to ensure it ends\n    runs(function(){\n        expect(location).toBe(2);\n    });\n});'
			},
			{
				title :			'Checking that the transition is passing trough a middle point (faster than above)',
				description :	'It\'s the same thing we are testing as the previous example, but now a lot faster. I added more code in the d3.js library to support this change. I dispatch an event when the transition starts, and dispatch another when the transition ends. On the testing side, I wait until the transition starts and dispatch an event to flush the transition. In the d3.js, I wait fot the flush transition event to terminate the transition immidiatly. But all of this is asynchronous, so we have to wait some time (much less than before and inpedendent of the transition time) to finish.',
				code :			'to be replaced',
				test :			'it(\'The circle should transition from start to end in 2 seconds passing trough middle\', function(){\n    var data={\n        bubble: {\n            r: 10,\n            color: \'#FF0000\'\n        },\n        start: {\n            x: 20,\n            y: 20   \n        },\n        middle: {\n            x: 200,\n            y: 20   \n        },\n        end: {\n            x: 250,\n            y: 250\n        }\n    };\n    var circle,\n        d3circle,\n        location=0 \/\/ 0 means start, 1 means middle, 2 means end\n        ;\n    runs(function(){\n        d3circle=scope.placeCircle(data);\n        circle=d3circle[0][0];\n        expect($(circle).attr(\'cx\')*1).toBe(data.start.x);\n        expect($(circle).attr(\'cy\')*1).toBe(data.start.y);\n        $(circle).on(\'transitionStarted\',function(){\n            $(circle)[0].dispatchEvent(flushD3Transition);\n        });\n        $(circle).on(\'transitionEnded\',function(){\n            var x=$(circle).attr(\'cx\')*1;\n            var y=$(circle).attr(\'cy\')*1;\n            if(x===data.middle.x &amp;&amp; y===data.middle.y &amp;&amp; location===0){\n                location++;\n            }\n            if(x===data.end.x &amp;&amp; y===data.end.y &amp;&amp; location===1){\n                location++;\n            }\n        });\n        scope.doubleTransition(d3circle,data,20000);\n    });\n    waits(100); \/\/ the wait is necessary but it\'s constant for any duration of the transition\n    runs(function(){\n        expect(location).toBe(2);\n    });\n});'
			},
			{
				title :			'Testing multiple transitions with multiple durations and multiple middle points',
				description :	'I will apply the test above to a new situation where there are multiple objects moving to see how good and fast the test is. Altough the lengthiest transition is around 40 seconds long, the test requires only 100ms just as the previous test needed time.',
				code :			'$scope.placeCircle=function(data,svgNumber,keep){\n\tvar svg;\n\tif(svgNumber || svgNumber===0){\n\t\tif(!keep){\n\t\t\t$(\'#example\'+svgNumber+\'svg\').html(\'\');\n\t\t}\n\t\tsvg=d3.select(\'#example\'+svgNumber+\'svg\');\n\t} else {\n\t\tif(!keep){\n\t\t\t$(\'svg\').html(\'\');\n\t\t}\n\t\tsvg=d3.select(\'svg\');\n\t}\n\tvar bubble=data.bubble;\n\tvar circle=svg.append(\'circle\')\n\t\t.attr(\'r\',bubble.r)\n\t\t.style(\'fill\',bubble.color)\n\t\t;\n\tif(data.start){\n\t\tcircle\n\t\t\t.attr(\'cx\',data.start.x)\n\t\t\t.attr(\'cy\',data.start.y);\n\t\t} else {\n\t\t\tcircle\n\t\t\t.attr(\'cx\',data.points[0].x)\n\t\t\t.attr(\'cy\',data.points[0].y);\n\t\t}\n\treturn circle;\n};\n\n$scope.transition=function(circle,points,duration){\n\tpoints=points.slice(1);\n\tif(points.length===0){\n\t\treturn;\n\t}\n\n\tcircle\n\t\t.transition()\n\t\t.attr(\'cx\',points[0].x)\n\t\t.attr(\'cy\',points[0].y)\n\t\t.duration(duration)\n\t\t.ease(\'linear\')\n\t\t.each(\'end\', function(){\n\t\t\t$scope.transition(circle,points,duration);\n\t\t});\n}',
				test :			'it(\'The circles should transition trough all the points by order\', function(){\n    var bubbles=[{\n        bubble: {\n            r: 10,\n            color: \'#FF0000\'\n        },\n        points: [\n            {\n                x:20,\n                y:20\n            },{\n                x:100,\n                y:100\n            },{\n                x:200,\n                y:90\n            }\n        ],\n        duration: 2000\n    },{\n        bubble: {\n            r: 10,\n            color: \'#00FF00\'\n        },\n        points: [\n            {\n                x:120,\n                y:210\n            },{\n                x:10,\n                y:40\n            },{\n                x:200,\n                y:250\n            },{\n                x:50,\n                y:50\n            }\n        ],\n        duration: 6000\n    },{\n        bubble: {\n            r: 10,\n            color: \'#0000FF\'\n        },\n        points: [\n            {\n                x:200,\n                y:20\n            },{\n                x:20,\n                y:200\n            },{\n                x:20,\n                y:20\n            },{\n                x:200,\n                y:200\n            },{\n                x:200,\n                y:20\n            },{\n                x:20,\n                y:200\n            },{\n                x:20,\n                y:20\n            },{\n                x:200,\n                y:200\n            },{\n                x:200,\n                y:20\n            },{\n                x:20,\n                y:200\n            },{\n                x:20,\n                y:20\n            },{\n                x:200,\n                y:200\n            },{\n                x:200,\n                y:20\n            },{\n                x:20,\n                y:200\n            },{\n                x:20,\n                y:20\n            },{\n                x:200,\n                y:200\n            },{\n                x:200,\n                y:20\n            },{\n                x:20,\n                y:200\n            },{\n                x:20,\n                y:20\n            },{\n                x:200,\n                y:200\n            }\n        ],\n        duration: 40000\n    }];\n    var circles=[];\n    var checkpoints=[];\n    for(var i=0;i&lt;bubbles.length;i++){\n        checkpoints.push(1);\n    }\n    var keep=false;\n    for(var i=0;i&lt;bubbles.length;i++){\n        circles.push(scope.placeCircle(bubbles[i],undefined,keep));\n        keep=true;\n        $(circles[i]).on(\'transitionStarted\',function(){\n            $(circles)[i].dispatchEvent(flushD3Transition);\n        });\n        $(circles[i]).on(\'transitionEnded\',function(){\n            var x=$(circles[i]).attr(\'cx\')*1;\n            var y=$(circles[i]).attr(\'cy\')*1;\n            var checkpoint=checkpoints[i];\n            if(x===data.points[checkpoint].x &amp;&amp; y===data.points[checkpoint].y){\n                checkpoints[i]++;\n            }\n        });\n        scope.transition(circles[i],bubbles[i].points,bubbles[i].duration\/(bubbles[i].points.length));\n    }\n    waits(100);\n    runs(function(){\n        for(var i=0;i&gt;checkpoints.length;i++){\n            expect(checkpoints[i]).toBe(bubbles[i].points.length);\n        }\n    });\n});'
			},
			{
				title :			'Testing the duration of the transition',
				description : 	'This will test if the duration of the d3 transition is correct, the code will be the same as number 2',
				code : 			'to be replaced',
				test : 			'The new test'
			}
		];
		
		all[3].code=all[2].code;
		all[5].code=all[1].code;

		(function wait() {
		    if ($('#container').length!=0) {
		    	for(var i=0;i<all.length;i++){
		    		createTrio(i);
		    	}
		    } else {
		        setTimeout( wait, 100 );
		    }
		})();
		
	});
