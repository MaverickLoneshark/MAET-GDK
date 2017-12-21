/*
	game_object.js
	Game Object Definitions Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

//TODO: Move all definitions into following block and invoke from MAET_GDK global
(function(MAETGDK) {
	/**
	Object that tracks sprite animation frame data
	**/
	function Frame() {
		this.x = 0;
		this.y = 0;
		this.width = 48;
		this.height = 48;
		this.time = 0;
		
		return;
	}

	/**
	Object that marks collision detection boundaries
	NOTE: this was made with tiles in mind, but maybe pixel collision detection would make this obsolete
	**/
	function HitBox() {
		//0 = no collision, 1 = collision
		this.grid = new Array();
		this.grid[0] = 0;
		this.grid[1] = 0;
		this.grid[2] = 1;
		this.grid[3] = 1;
		this.grid[4] = 0;
		this.grid[5] = 0;
		this.grid[6] = 0;
		this.grid[7] = 0;
		this.grid[8] = 1;
		this.grid[9] = 1;
		this.grid[10] = 0;
		this.grid[11] = 0;
		this.grid[12] = 0;
		this.grid[13] = 0;
		this.grid[14] = 1;
		this.grid[15] = 1;
		this.grid[16] = 0;
		this.grid[17] = 0;
		this.grid[18] = 0;
		this.grid[19] = 0;
		this.grid[20] = 1;
		this.grid[21] = 1;
		this.grid[22] = 0;
		this.grid[23] = 0;
		this.grid[24] = 0;
		this.grid[25] = 0;
		this.grid[26] = 1;
		this.grid[27] = 1;
		this.grid[28] = 0;
		this.grid[29] = 0;
		this.grid[30] = 0;
		this.grid[31] = 0;
		this.grid[32] = 1;
		this.grid[33] = 1;
		this.grid[34] = 0;
		this.grid[35] = 0;
		
		return;
	}

	/**
	Object that contains information for animated 2D game objects
	**/
	function Sprite() {
		this.x = 0;
		this.y = 0;
		this.xscale = 1.0;
		this.yscale = 1.0;
		this.rotation = 0.0;
		
		this.hitbox = new HitBox();
		
		//current frame
		this.f_num = 0;
		//current animation state; 0 = standing, 5 = running, 10 = ?
		this.anim_state = 0;
		this.frame = new Array();
		//standing
		this.frame[0] = new Frame();
		this.frame[1] = new Frame();
		this.frame[2] = new Frame();
		this.frame[3] = new Frame();
		this.frame[4] = new Frame();
		//running
		this.frame[5] = new Frame();
		this.frame[6] = new Frame();
		this.frame[7] = new Frame();
		this.frame[8] = new Frame();
		this.frame[9] = new Frame();
		
		this.xvel = 0;
		this.yvel = 0;
		
		this.contact_up = false;
		this.contact_down =  false;
		this.contact_left = false;
		this.contact_right = false;
		this.falling = false;
		this.can_doublejump = false;
		this.has_doubled = false;
		
		this.doublejump_power = true;
		
		this.color = "#000000";
		this.img = new Image();
		this.img.src = "sprite.png";
		
		/* 'virtual' methods */
		this.update = update;
		//this.collisionDetection = collisionDetection;
		
		return;
	}

	/* functions */

	/**
	Draws a sprite
	**/
	Sprite.prototype.draw = function(context) {
		var tempx = this.x,
			tempy = this.y;
		
		if(this.xscale < 1) {
			tempx += this.frame[this.f_num].width;
		}
		
		if(this.yscale < 1) {
			tempy += this.frame[this.f_num].height;
		}
		
		context.save();
		context.scale(1.0, 1.0);
		//context.rotate(this.rotation * Math.PI / 180.0);
		context.translate(tempx, tempy);
		context.scale(this.xscale, this.yscale);
		//context.rotate(radians);
		//context.translate(x, y);
		//context.drawImage(img, clipping_x, clipping_y, clipping_width, clipping_height, position_x, position_y, resize_width, resize_height);
		context.drawImage(this.img, this.frame[this.f_num].x, this.frame[this.f_num].y,
						this.frame[this.f_num].width, this.frame[this.f_num].height,
						0, 0,
						this.frame[this.f_num].width, this.frame[this.f_num].height);
		context.restore();
		
		return;
	}

	/**
	Returns true if a collision is detected with another object
	**/
	Sprite.prototype.isColliding = function(other_object) {
		if(this.boxCollides(other_object)) {
			//if(pixelTest) {
				return true;
			//}
		}
		
		return false;
	}

	/* Helper functions */
	Sprite.prototype.boxCollides = function(other_object) {
		var my_left = this.x,
			my_right = this.x + this.frame[this.f_num].width,
			my_top = this.y,
			my_bottom = this.y + this.frame[this.f_num].height,
			
			other_left = other_object.x,
			other_right = other_object.x + other_object.frame[other_object.f_num].width,
			other_top = other_object.y,
			other_bottom = other_object.y + other_object.frame[other_object.f_num].height;
		
		if(my_bottom < other_top) {
			return false;
		}
		
		if(my_top > other_bottom) {
			return false;
		}
		
		if(my_left > other_right) {
			return false;
		}
		
		if(my_right < other_left) {
			return false;
		}
		
		return true;
	}

	Sprite.prototype.drawBoundingBox = function(context) {
		context.save();
		context.translate(this.x, this.y);
		context.strokeStyle="#FF0000";
		context.strokeRect(0, 0, this.frame[this.f_num].width, this.frame[this.f_num].height);
		context.restore();
		
		return;
	}
	
	MAETGDK.prototype.Frame = Frame;
	MAETGDK.prototype.HitBox = HitBox;
	MAETGDK.prototype.Sprite = Sprite;
	
	return;
})(MAETGDK);
