'use strict';

// Adding custom matchers
describe("1+1", function() {
    beforeEach(function() {
        this.addMatchers({
            toBeDivisibleByTwo: function() {
                return (this.actual % 2) === 0;
            }
        });
    });

    it("should add correctly", function() {
        expect(1+1).toEqual(2);
    });

    it("should be divisible by two", function() {
        expect(1+1).toBeDivisibleByTwo();
    });
});

// Calling my own functions
describe("helloWorld() should work as expected", function() {
    it("and return 'hello world!'", function() {
        expect(helloWorld()).toEqual("Hello World!");
    });
});

// Mock asynchronous function testing
describe("Asynchronously", function() {
    it("should retrieve a JSON config file", function() {
        var name, description;
        runs(function() {
            setTimeout(function() {
                name = "Zac",
                description = "config file"
            }, 100);
        })

        waitsFor(function() {
            return name == "Zac" && description == "config file";
        }, "JSON file to be read", 500);
    });
});

// Evaluating the DOM
describe("Machine gun babies script", function() {
    var expCircles;
    var actCircles;
    var d3Animation;

    function flushAllD3Transitions() {
        var now = Date.now;
        Date.now = function() { return Infinity; };
        d3.timer.flush();
        Date.now = now;
    }

    beforeEach(function() {
        d3Animation = new SBAnimations();
        expCircles = dataArray.length;
        actCircles = $('svg circle').length;
    });

    it("should append the right number of circles to the DOM", function() {
        expect(expCircles).toEqual(actCircles);
    });

    it("should interpolate the circle radii accurately", function() {
        // jQuery selector not working here, probably because it's calculating radii before start of
        // animation.
        flushAllD3Transitions();
        var expectedRadii = _.map(dataArray, function(d) { 
            return Math.sqrt(d); 
        });

        var actualRadii = _.map($('svg circle'), function(d) { 
            return +$(d).attr('r'); 
        });

        expect(expectedRadii).toEqual(actualRadii);
    });

    it("should return circles with cy = 100", function() {
        var cyAcc = true;
        cyAcc = _.map($('svg circle'), function(d) {
            // console.log($(d).attr('cy'));
            return cyAcc && $(d).attr('cy') == 60;
        });

        expect((_.compact(cyAcc)).length).toEqual(expCircles);
    });

    // Spying on an object to make sure its function has been called.
    it("should call the choppedAnimation function", function() {
        spyOn(d3Animation, "choppedAnimation");
        d3Animation.choppedAnimation();
        expect(d3Animation.choppedAnimation).toHaveBeenCalled();
    });
});