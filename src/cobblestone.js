/*
	Cobblestone.js
	https://github.com/MrOnlineCoder/Cobblestone.js

	Author: MrOnlineCoder
	2016
*/

{

	"use strict";
    
	let routes = {};
	let loader;
	let settings = {
		refAttr: "id",
		loaderId: "cobblestoneView",
		selector,
		debug: false
	};

	function selector(e) {
		return e;
	}

	function loadContent(url) {
	    let req = new window.XMLHttpRequest();
	    if(!req)
	        return null;

	    req.open('GET', url, false);
	    req.send();
	    return req.responseText;
	}

	function processRefs(l) {
		let refCollection = l.querySelectorAll("*["+settings.refAttr+"]");
		let refs = {};
		for (let i = 0; i<refCollection.length; i++) {
			let current = refCollection[i];
			refs[current.getAttribute(settings.refAttr)] = current;
			log("Ref found: "+current.getAttribute(settings.refAttr));
		}

		return refs;
	}

	function log(msg) {
		if (settings.debug) console.log("[Cobblestone.js] "+msg);
	}

	function error(msg) {
		console.error("[Cobblestone.js] Error: "+msg);
	}

	function hashHandler(event) {
		log("Hash changed: "+window.location.hash);
		let parsed = window.location.hash.substring(1);
		if (routes[parsed]) {
			Cobblestone.navigate(parsed);
		}
	}

    var Cobblestone = {
    	route: function(name, url, controller) {
    		routes[name] = {url: url, controller: controller};
    		log("Added new route:"+name);
    		return true;
    	},
    	navigate: function(name) {
    		let toUse  = routes[name];
    		loader = document.getElementById(settings.loaderId);
 			log("Loading content for route: "+name);
    		loader.innerHTML = loadContent(toUse.url);
    		log("Processing refs and calling controller...");
    		toUse.controller(processRefs(loader));
    	},
    	config: function(name, key) {
    		settings[name] = key;
    	}
    };

    if (!("onhashchange" in window)) {
    	error("This browser does not support onhashchange event!");
    } 

    window.onhashchange = hashHandler;
    window.Cobblestone = Cobblestone;
};