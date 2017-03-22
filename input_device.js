/*
	input_device.js
	Input Device Definitions Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

(function(MAETLibrary)
{
	/**
	Object that tracks received input; it is up to individual games to handle tracked input
	**/
	//function InputDevice()
	MAETLibrary.prototype.InputDevice = function()
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
		
		document.body.onkeydown = function(event) { thisInputDevice.handlePressedInput(event); };
		document.body.onkeyup = function(event) { thisInputDevice.handleReleasedInput(event); };
		
		return;
	}
})(MAETLibrary);
