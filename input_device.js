/*
	input_device.js
	Input Device Definitions Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

"use strict";

(function(MAETGDK) {
	//Object that tracks received input; it is up to individual games to handle tracked input
	function InputDevice() {
		var thisInputDevice = this,
			keyboard = {
				left: false,
				up: false,
				right: false,
				down: false,
				start: false,
				select: false,
				jump: false,
				special: false
			},
			controller = {
				left: false,
				up: false,
				right: false,
				down: false,
				start: false,
				select: false,
				jump: false,
				special: false
			};
		
		/* members */
		this.left_button = false;
		this.up_button = false;
		this.right_button = false;
		this.down_button = false;
		this.start_button = false;
		this.select_button = false;
		this.jump_button = false;
		this.special_button = false;
		this.gamepad;
		
		/* methods */
		function handlePressedInput(event) {
			var keycode,
				keychar;
			
			if(window.event) {
				keycode = event.keyCode;
			}
			else if(event.which) {
				keycode = event.which;
			}
			
			switch(keycode) {
				case 37: //left
				case 65: //a
					keyboard.left = true;
				break;
				
				case 38: //up
				case 87: //w
					keyboard.up = true;
				break;
				
				case 39: //right
				case 68: //d
					keyboard.right = true;
				break;
				
				case 40: //down
				case 83: //s
					keyboard.down = true;
				break;
				
				case 90: //z
				case 74: //j
					keyboard.special = true;
				break;
				
				case 88: //x
				case 75: //k
				case 32: //[space]
					keyboard.jump = true;
				break;
				
				case 220: //'\'
					keyboard.select = true;
				break;
				
				case 13: //enter
					keyboard.start = true;
				break;
				
				default: //other
				break;
			}
			
			return;
		}
		
		function handleReleasedInput(event) {
			var keycode,
				keychar;
			
			if(window.event) {
				keycode = event.keyCode;
			}
			else if(event.which) {
				keycode = event.which;
			}
			
			switch(keycode) {
				case 37: //left
				case 65: //a
					keyboard.left = false;
				break;
				
				case 38: //up
				case 87: //w
					keyboard.up = false;
				break;
				
				case 39: //right
				case 68: //d
					keyboard.right = false;
				break;
				
				case 40: //down
				case 83: //s
					keyboard.down = false;
				break;
				
				case 90: //z
				case 74: //j
					keyboard.special = false;
				break;
				
				case 88: //x
				case 75: //k
				case 32: //[space]
					keyboard.jump = false;
				break;
				
				case 220: //'\'
					keyboard.select = false;
				break;
				
				case 13: //enter
					keyboard.start = false;
				break;
				
				default: //other
				break;
			}
			
			return;
		}
		
		function fetchConnectedGamepad() {
			var gamepads = navigator.getGamepads(),
				i;
			
			for(i = 0; i < gamepads.length; i++) {
				if(gamepads[i]) {
					thisInputDevice.gamepad = gamepads[i];
					break;
				}
			}
			
			return;
		}
		
		MAETGDK.prototype.getInputs = function() {
			fetchConnectedGamepad();
			
			if(thisInputDevice.gamepad) {
				switch(thisInputDevice.gamepad.id) {
					case 'Xbox 360 Controller (XInput STANDARD GAMEPAD)':
					case 'xinput':
						processXInput(thisInputDevice.gamepad);
					break;
					
					default:
						processGeneric(thisInputDevice.gamepad);
					break;
				}
			}
			
			processInputs();
			
			return;
		}
		
		function processXInput(gamepad) {
			const A_BUTTON = 0,
				B_BUTTON = 1,
				X_BUTTON = 2,
				Y_BUTTON = 3,
				LB_BUTTON = 4,
				RB_BUTTON = 5,
				LT_BUTTON = 6,
				RT_BUTTON = 7,
				BACK_BUTTON = 8,
				START_BUTTON = 9,
				LEFT_STICK_IN = 10,
				RIGHT_STICK_IN = 11,
				UP_BUTTON = 12,
				DOWN_BUTTON = 13,
				LEFT_BUTTON = 14,
				RIGHT_BUTTON = 15;
			
			controller.left = gamepad.buttons[LEFT_BUTTON].pressed;
			controller.up = gamepad.buttons[UP_BUTTON].pressed;
			controller.right = gamepad.buttons[RIGHT_BUTTON].pressed;
			controller.down = gamepad.buttons[DOWN_BUTTON].pressed;
			controller.special = gamepad.buttons[X_BUTTON].pressed;
			controller.jump = gamepad.buttons[A_BUTTON].pressed;
			controller.start = gamepad.buttons[START_BUTTON].pressed;
			controller.select = gamepad.buttons[BACK_BUTTON].pressed;
			
			return;
		}
		
		function processGeneric(gamepad) {
			var i;
			
			for(i = 0; i < gamepad.buttons.length; i++) {
				if(gamepad.buttons[i].pressed) {
					console.debug("Button " + i + " was pressed! Woo-hoo!");
				}
			}
			
			return;
		}
		
		function processInputs() {
			thisInputDevice.left_button = controller.left || keyboard.left;
			thisInputDevice.up_button = controller.up || keyboard.up;
			thisInputDevice.right_button = controller.right || keyboard.right;
			thisInputDevice.down_button = controller.down || keyboard.down;
			thisInputDevice.special_button = controller.special || keyboard.special;
			thisInputDevice.jump_button = controller.jump || keyboard.jump;
			thisInputDevice.start_button = controller.start || keyboard.start;
			thisInputDevice.select_button = controller.select || keyboard.select;
			
			return;
		}
		
		document.body.onkeydown = handlePressedInput;
		document.body.onkeyup = handleReleasedInput;
		
		/*
		window.addEventListener("gamepadconnected", function(event) {
			thisInputDevice.gamepad = navigator.getGamepads()[event.gamepad.index];
		});
		*/
		
		return;
	}
	
	MAETGDK.prototype.InputDevice = InputDevice;
	MAET_GDK.input_device = new MAET_GDK.InputDevice();
	
	return;
})(MAETGDK);
