/*
	Cobblestone.js
	https://github.com/MrOnlineCoder/Cobblestone.js

	Author: MrOnlineCoder
	2016
*/

"use strict";

(function () {
    
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
	    var req = new XMLHttpRequest;
	    if(!req)
	        return null;

	    req.open('GET', url, false); // get page synchronously 
	    req.send();
	    return req.responseText;
	}

	function processRefs(l) {
		var refCollection = l.querySelectorAll("*["+settings.refAttr+"]");
		var refs = {};
		for (var i = 0; i<refCollection.length; i++) {
			var current = refCollection[i];
			refs[current.getAttribute(settings.refAttr)] = current;
			log("Ref found: "+current.getAttribute(settings.refAttr));
		}

		return refs;
	}

	function log(msg) {
		console.log("[Cobblestone.js] "+msg);
	}

	function error(msg) {
		console.error("[Cobblestone.js] Error: "+msg);
	}

    var Cobblestone = {
    	route: function(name, url, controller) {
    		routes[name] = {url: url, controller: controller};
    		return true;
    	},
    	navigate: function(name) {
    		var toUse  = routes[name];
    		loader = document.getElementById(settings.loaderId);
    		loader.innerHTML = loadContent(toUse.url);
    		toUse.controller(processRefs(loader));
    	},
    	config: function(name, key) {
    		settings[name] = key;
    	}
    };


    window.Cobblestone = Cobblestone;
}());