/*
	maet_library.js
	MAET Library Import Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

var MAET_GDK;

function MAETGDK() {
	return this;
}

(function(MAETGDK) {
	var includes = [
		"game_object.js",
		"input_device.js",
		"game_state_machine.js",
		"objects_manager.js"
	];
	
	MAET_GDK = new MAETGDK();
	
	MAETGDK.prototype.loadScript = function(url, callback) {
		// adding the script tag to the head as suggested before
		var script = document.createElement('script');
		
		script.type = 'text/javascript';
		script.src = url;
		
		// then bind the event to the callback function 
		// there are several events for cross browser compatibility
		script.onreadystatechange = callback;
		script.onload = callback;
		
		// fire the loading
		document.head.appendChild(script);
		
		return;
	}

	function loadMAETGDK(url) {
		if(!url) {
			url = document.getElementById("MAET-GDK").src.replace("maet_gdk.js", "");
		}
		
		function loadLibrary(url) {
			var load_counter = 0,
				i;
			
			for(i = 0; i < includes.length; i++) {
				MAET_GDK.loadScript(url + includes[i], startAfterLoaded);
			}
			
			function startAfterLoaded() {
				load_counter++;
				
				if(load_counter === includes.length) {
					return main();
				}
			}
			
			return;
		}
		
		loadLibrary(url);
		
		return;
	}
	
	return loadMAETGDK();
})(MAETGDK);
