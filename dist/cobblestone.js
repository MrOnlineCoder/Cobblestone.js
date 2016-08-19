/*
	Cobblestone.js
	https://github.com/MrOnlineCoder/Cobblestone.js

	Author: MrOnlineCoder
	2016
*/

/*jshint esversion: 6*/

{

	"use strict";
    
	function selector(e) {
		return e;
	}

	function noop() {

	}

	let routes = {};
	let loader;
	let defaultRoute = "";
	let settings = {
		refAttr: "cb-ref",
		loaderId: "cobblestoneView",
		selector,
		debug: false
	};

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
		let parsed = window.location.hash.substring(1);
		if (routes[parsed]) {
			Cobblestone.navigate(parsed);
		}
	}

    var Cobblestone = {
    	route: function(name, url, controller=noop) {
    		routes[name] = {url, controller};
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
    	default: function(name) {
    		if (!routes[name]) {
    			error("Specified default_route is not found. Please, register all routes first ");
    			return;
    		}
    		defaultRoute = name;
    		if (window.location.hash == "") {
    			this.navigate(defaultRoute);
    			window.location.hash = name;
    		}
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