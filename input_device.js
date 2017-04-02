/*
	input_device.js
	Input Device Definitions Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

(function(MAETGDK)
{
	/**
	Object that tracks received input; it is up to individual games to handle tracked input
	**/
	//function InputDevice()
	MAETGDK.prototype.InputDevice = function()
	{
		var thisInputDevice = this;
		
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
		this.handlePressedInput = function(ev)
		{
			var keycode,
				keychar;
			
			if(window.ev)
			{
				keycode = ev.keyCode;
			}
			else if(ev.which)
			{
				keycode = ev.which;
			}
			
			switch(keycode)
			{
				case 37: //left
				case 65: //a
					this.left_button = true;
				break;
				
				case 38: //up
				case 87: //w
					this.up_button = true;
				break;
				
				case 39: //right
				case 68: //d
					this.right_button = true;
				break;
				
				case 40: //down
				case 83: //s
					this.down_button = true;
				break;
				
				case 90: //z
				case 74: //j
					this.special_button = true;
				break;
				
				case 88: //x
				case 75: //k
				case 32: //[space]
					this.jump_button = true;
				break;
				
				case 220: //\
					this.select_button = true;
				break;
				
				case 13: //enter
					this.start_button = true;
				break;
				
				default: //other
				break;
			}
			
			return;
		}

		this.handleReleasedInput = function(ev)
		{
			var keycode,
				keychar;
			
			if(window.ev)
			{
				keycode = ev.keyCode;
			}
			else if(ev.which)
			{
				keycode = ev.which;
			}
			
			switch(keycode)
			{
				case 37: //left
				case 65: //a
					this.left_button = false;
				break;
				
				case 38: //up
				case 87: //w
					this.up_button = false;
				break;
				
				case 39: //right
				case 68: //d
					this.right_button = false;
				break;
				
				case 40: //down
				case 83: //s
					this.down_button = false;
				break;
				
				case 90: //z
				case 74: //j
					this.special_button = false;
				break;
				
				case 88: //x
				case 75: //k
				case 32: //[space]
					this.jump_button = false;
				break;
				
				case 220: //\
					this.select_button = false;
				break;
				
				case 13: //enter
					this.start_button = false;
				break;
				
				default: //other
				break;
			}
			
			return;
		}
		
		
		MAETGDK.prototype.pollGamePad = function() {
			if(thisInputDevice.gamepad) {
				switch(thisInputDevice.gamepad.id) {
					case 'xinput':
						processXInput(thisInputDevice.gamepad);
					break;
					
					default:
						processGeneric(thisInputDevice.gamepad);
					break;
				}
			}
			
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
			
			thisInputDevice.left_button = gamepad.buttons[LEFT_BUTTON].pressed;
			thisInputDevice.up_button = gamepad.buttons[UP_BUTTON].pressed;
			thisInputDevice.right_button = gamepad.buttons[RIGHT_BUTTON].pressed;
			thisInputDevice.down_button = gamepad.buttons[DOWN_BUTTON].pressed;
			thisInputDevice.special_button = gamepad.buttons[X_BUTTON].pressed;
			thisInputDevice.jump_button = gamepad.buttons[A_BUTTON].pressed;
			thisInputDevice.start_button = gamepad.buttons[START_BUTTON].pressed;
			thisInputDevice.select_button = gamepad.buttons[BACK_BUTTON].pressed;
			
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
		
		document.body.onkeydown = function(event) { thisInputDevice.handlePressedInput(event); };
		document.body.onkeyup = function(event) { thisInputDevice.handleReleasedInput(event); };
		window.addEventListener("gamepadconnected", function(event) {
			thisInputDevice.gamepad = navigator.getGamepads()[event.gamepad.index];
		});
		
		return;
	}
	
	MAET_GDK.input_device = new MAET_GDK.InputDevice();
	
	return;
})(MAETGDK);
