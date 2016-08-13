/*
	Cobblestone.js
	https://github.com/MrOnlineCoder/Cobblestone.js

	Author: MrOnlineCoder
	2016
*/

(function () {

	"use strict";
    
	var routes = {};
	var loader;
	var settings = {
		refAttr: "id",
		loaderId: "cobblestoneView",
		selector: selector,
		debug: false
	};

	function selector(e) {
		return e;
	}

	function loadContent(url) {
	    var req = new window.XMLHttpRequest();
	    if(!req)
	        return null;

	    req.open('GET', url, false);
	    req.send();
	    return req.responseText;
	}

	function processRefs(l) {
		var refCollection = l.querySelectorAll("*["+settings.refAttr+"]");
		var refs = {};
		for (var i = 0; i<refCollection.length; i++) {
			var current = refCollection[i];
			refs[current.getAttribute(settings.refAttr)] = settings.selector(current);
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
		var parsed = window.location.hash.substring(1);
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
    		var toUse  = routes[name];
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
}());