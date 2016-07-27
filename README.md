# Cobblestone.js

JavaScript library for dynamic content loading (routing library).

This library will help you building SPA (Single-Page-Application) without using framework.

## Where to get?

Use next link to download library:

[Normal] (https://raw.githubusercontent.com/MrOnlineCoder/Cobblestone.js/master/src/cobblestone.js)

[Minified] (https://raw.githubusercontent.com/MrOnlineCoder/Cobblestone.js/master/dist/cobblestone.js)

## Getting started

We will show you step-by-step tutorial how to build simple SPA using Cobblestone.js

Let's begin

1. Connect Cobblestone.js to your index page:

```html

<script src="path/to/cobblestone.js"></script>

```

2. Create a div element, where content will be loaded:

```html

<div id="cobblestoneView"></div>

```

Specifying **id=cobblestoneView** tells Cobblestone that this div should be used as target for content.

3. Create a script, where Cobblestone.js will be configured:

```html

<script>
 //Magic 
</script>

```

4. Let's talk about app structure:

We will have 2 routes: **homepage** and **contacts** and 2 links (<a> elements) for thoose routes

5. Now let's add a route using **.route()** method. It takes 3 arguments:

```javascript

Cobblestone.route(name, url, controller);

```

**name** is our route's name.

**url** is URL/Path from which content will be loaded for that route

**controller** is function, that will be called on route change and it will handle the logic of route

So, we will add 2 routes:

```javascript


Cobblestone.route("homepage", "views/homepage.html", HomepageController);
Cobblestone.route("contacts", "views/contacts.html", ContactsController);

```

6. Now let's create views:

```html
<!--views/homepage.html-->

<h1>Welcome!</h1>
<p>Lorem ipsum goes here :)</p>


```

```html
<!--views/contacts.html-->

<h1>Contact us: </h1>
<a href="http://github.com">Link just to GitHub</a>

```

7. Now, we have to create controllers for our routes.

```javascript

function HomepageController(refs) {
	console.log("Welcome to our Homepage!");
}

function ContactsController(refs) {
	console.log("Want to contact us?");
}
```

Probably you will ask: "Why we have refs argument?"

So, the answer: when you navigate to route (call it), Cobblestone.js calls the controller of this route. And to make your life easier, Cobblestone.js automatically can send elements to your controller. To specify, what elements you will need in controller, just add the **id** attribute to your element:

```html

<p id="loremipsum">Lorem ipsum goes here :)</p>

```

And then in controller you can access it using refs object:

```javascript

refs.loremipsum == document.getElementById("loremipsum");

```

8.We came to the final! Now just add <a> elements:

```html

<a href="#homepage">Homepage</a>
<br>
<a href="#contacts">Contact us</a>

```

Now, if you click on Homepage link, the contents of **views/homepage.html** will be loaded in **cobblestoneView** and **HomepageController** will be called!


## Documentation

```javascript

Cobblestone.route(name, url, controller);

```

Creates a new route with **name** and **controller**. Content will be loaded from **url**.

```javascript

Cobblestone.navigate(name);

```

Navigates to route with **name**

```javascript

Cobblestone.config(key, value);

```

Edits the config of Cobblestone.js.

Avaliable keys:

**refAttr** (string) - attribute, which will be used for **refs** object. Default: id

**loaderId** (string) - ID of element, where content will be loaded. Default: cobblestoneView

**selector(e)** (function) - selector function, called when a new element in view with **refAttr** found. 

Parameters: 

e - native DOM element with **refAttr**

Returned value will be added in **refs** object in controller.

Default: just returns native DOM element

**debug** (boolean) - toggles debug mode. In debug mode, more info will be printed in console.

### Author: MrOnlineCoder
### License: MIT