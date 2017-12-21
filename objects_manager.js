/*
	objects_manager.js
	Objects Manager Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

(function(MAETGDK) {
	function ObjectsManager() {
		this.player_objects = new Array();
		this.enemy_objects = new Array();
		this.item_objects = new Array();
		this.foreground_objects = new Array();
		this.background_objects = new Array();
		this.level_objects = new Array();
		
		return;
	}

	ObjectsManager.prototype.drawEnemies = function(context) {
		var i;
		
		for(i = 0; i < this.enemy_objects.length; i++) {
			this.enemy_objects[i].draw(context);
		}
		
		return;
	}

	ObjectsManager.prototype.drawPlayers = function(context) {
		var i;
		
		for(i = 0; i < this.player_objects.length; i++) {
			this.player_objects[i].draw(context);
		}
		
		return;
	}

	ObjectsManager.prototype.drawForeground = function(context) {
		var i;
		
		for(i = 0; i < this.foreground_objects.length; i++) {
			this.foreground_objects[i].draw(context);
		}
		
		return;
	}

	ObjectsManager.prototype.drawBackground = function(context) {
		var i;
		
		for(i = 0; i < this.background_objects.length; i++) {
			this.background_objects[i].draw(context);
		}
		
		return;
	}

	ObjectsManager.prototype.drawItems = function(context) {
		var i;
		
		for(i = 0; i < this.item_objects.length; i++) {
			this.item_objects[i].draw(context);
		}
		
		return;
	}

	//TODO: Figure out how the hell level objects are going to work

	ObjectsManager.prototype.drawBoundingBoxes = function(context) {
		var i;
		
		for(i = 0; i < this.enemy_objects.length; i++) {
			this.enemy_objects[i].drawBoundingBox(context);
		}
		
		for(i = 0; i < this.item_objects.length; i++) {
			this.item_objects[i].drawBoundingBox(context);
		}
		
		for(i = 0; i < this.level_objects.length; i++) {
			this.level_objects[i].drawBoundingBox(context);
		}
		
		for(i = 0; i < this.player_objects.length; i++) {
			this.player_objects[i].drawBoundingBox(context);
		}
		
		return;
	}

	ObjectsManager.prototype.updateEnemies = function(elapsed_time) {
		var i;
		
		for(i = 0; i < this.enemy_objects.length; i++) {
			this.enemy_objects[i].update(elapsed_time);
		}
		
		return;
	}

	ObjectsManager.prototype.updatePlayers = function(elapsed_time) {
		var i;
		
		for(i = 0; i < this.player_objects.length; i++) {
			this.player_objects[i].update(elapsed_time);
		}
		
		return;
	}

	ObjectsManager.prototype.updateForeground = function(elapsed_time) {
		var i;
		
		for(i = 0; i < this.foreground_objects.length; i++) {
			this.foreground_objects[i].update(elapsed_time);
		}
		
		return;
	}

	ObjectsManager.prototype.updateBackground = function(elapsed_time) {
		var i;
		
		for(i = 0; i < this.background_objects.length; i++) {
			this.background_objects[i].update(elapsed_time);
		}
		
		return;
	}

	ObjectsManager.prototype.updateItems = function(elapsed_time) {
		var i;
		
		for(i = 0; i < this.item_objects.length; i++) {
			this.item_objects[i].update(elapsed_time);
		}
		
		return;
	}

	/** externally referenced functions **/
	//Game Object Collision Detection Handler
	/**TODO: CollisionDetection should flag all colliding objects, then each object should handle its own resolution according to its flag**/
	ObjectsManager.prototype.detectCollisions = function(game) {
		//BEGIN OBJECTS TEMP COLLISION TEST
		function tempCollisionTest(thisObject) {
			//convert coordinates to the nearest on-screen tile
			var screen_x = Math.floor(thisObject.x / game.level.screenMap.tilewidth),
				screen_y = Math.floor(thisObject.y / game.level.screenMap.tilewidth);
			
			thisObject.contact_left = false;
			thisObject.contact_right = false;
			thisObject.contact_up = false;
			thisObject.contact_down = false;
			
			//detect left-right screen collisions
			if(screen_x < 0) {
				screen_x = 0;
				thisObject.x = 0;
				thisObject.contact_left = true;
			}
			else if(screen_x >= (game.level.screenMap.mapwidth - 6)) {
				screen_x = game.level.screenMap.mapwidth - 6;
				thisObject.x = screen_x * game.level.screenMap.tilewidth;
				thisObject.contact_right = true;
			}
			
			//detect top-bottom screen collisions
			if(screen_y < 0) {
				screen_y = 0;
				thisObject.y = 0;
				thisObject.contact_up = true;
				//thisObject.falling = true;
			}
			else if(screen_y >= (game.level.screenMap.mapheight - 6)) {
				screen_y = game.level.screenMap.mapheight - 6;
				thisObject.y = screen_y * game.level.screenMap.tilewidth;
				thisObject.contact_down = true;
				//thisObject.falling = false;
				//thisObject.has_doubled = false;
				//thisObject.can_doublejump = false;
			}
			
			if(thisObject === game.hero) {
				var i;
				
				for(i = 0; i < game.objects_manager.enemy_objects.length; i++) {
					if(thisObject.isColliding(game.objects_manager.enemy_objects[i])) {
						if(thisObject.y < game.objects_manager.enemy_objects[i].y) {
							thisObject.contact_down = true;
							//thisObject.falling = false;
							//thisObject.has_doubled = false;
							//thisObject.can_doublejump = false;
						}
						else if(thisObject.y > game.objects_manager.enemy_objects[i].y) {
							thisObject.contact_up = true;
							//thisObject.falling = true;
						}
						
						if(thisObject.x > game.objects_manager.enemy_objects[i].x) {
							thisObject.contact_left = true;
							game.objects_manager.enemy_objects[i].x += game.hero.xvel;
						}
						else /*if(thisObject.x < game.objects_manager.enemy_objects[i].x)*/ {
							thisObject.contact_right = true;
							game.objects_manager.enemy_objects[i].x += game.hero.xvel;
						}
					}
				}
			}
			/*TODO: Introducing O(N) here...REFACTOR DAMNIT!*/
			else if(game.objects_manager.enemy_objects.lastIndexOf(thisObject) !== -1) {
				if(thisObject.isColliding(game.hero)) {
					if(thisObject.y < game.hero.y) {
						thisObject.contact_down = true;
						//thisObject.falling = false;
					}
					else if(thisObject.y > game.hero.y) {
						thisObject.contact_up = true;
						//thisObject.falling = true;
					}
					
					if(thisObject.x > game.hero.x) {
						thisObject.contact_left = true;
					}
					else /*if(thisObject.x < game.hero.x)*/ {
						thisObject.contact_right = true;
					}
				}
			}
			
			return;
		}

		function crudeCheck(object_manager) {
			var i;
			
			for(i = 0; i < object_manager.player_objects.length; i++) {
				tempCollisionTest(object_manager.player_objects[i]);
			}
			
			for(i = 0; i < object_manager.enemy_objects.length; i++) {
				tempCollisionTest(object_manager.enemy_objects[i]);
			}
			
			return;
		}

		crudeCheck(this);
		//END OBJECTS TEMP COLLISION TEST
		
		return;
	}
	
	MAETGDK.prototype.ObjectsManager = ObjectsManager;
	
	return;
})(MAETGDK);
