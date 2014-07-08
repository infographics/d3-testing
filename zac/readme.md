Non-AngularJS methods
===

These tests are limited to a bare-bones code structure, therefore no AngularJS boilerplates were used. It focused more on Jasmine specifics and all the D3 rendering is done on a separate file.

Running The Tests
---

Install Karma globally using NPM:"

```
$ npm install -g karma
```

Install the other modules and run the Karma config file (after starting a new server).

```
$ karma start karma.conf.js
```

Jasmine Nuances
---

I tried to make the scope of these tests as broad as I could, focusing on the nuances and functionalities and abilities of the Jasmine test framework as well. A few helpful functionalities are:

###Adding Matchers###
Sometimes, when testing, it is useful when a new type of assertion is combined. Jasmine calls these assertion types matchers. 

One can create a custom matcher as follows:

```
this.addMatchers({
	toBeDivisibleByTwo: function() {
		return (this.actual % 2) === 0;
	}
});
```
In this case, *actual* is the actual value passed to our matcher.


###Asynchronous Testing###
The previously used **waits()** is deprecated in the new versions of Jasmine below 2.0. Asynchronous testing, eg. loading JSON config files can be done as by placing the asynchronous code segment in the **runs()** block, along with the optional timeout parameter. Below that, include a **waitsFor()** block, which will be polled after **runs()** is run. If, after the timeout, the equality specified in the **waitsFor()** block is true, the test will pass:

```
runs(function() {
    setTimeout(function() {
        name = "Zac",
        description = "config file"
    }, 100);
})

 waitsFor(function() {
     return name == "Zac" && description == "config file";
 }, "JSON file to be read", 500);
 ```

###Spying### 
To make sure that an object's method has been called, use Jasmine's **spyOn()** function:

```
spyOn(d3Animation, "choppedAnimation");
d3Animation.choppedAnimation();
expect(d3Animation.choppedAnimation).toHaveBeenCalled();
```
 
###Evaluating the DOM###
For these tests, I used jQuery, which is included in the *karma.conf.js* file, under **included_files**. This allows us to use jQuery selectors within our tests, both when running them and debugging them.
 
 