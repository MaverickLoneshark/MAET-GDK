/*
	game_state_machine.js
	Game State Machine Definitions Script
	
	Maverick Loneshark
	MAET, 2013 - 2017
*/

//TODO: Move all definitions into following block and invoke from MAET_GDK global
(function(MAETGDK)
{
	function GameStateMachine(game)
	{
		//Enumerations for Game States
		this.GS_TITLE = 0;
		this.GS_NEW_GAME = 1;
		this.GS_NEW_LEVEL = 2;
		this.GS_PLAYER_START = 3;
		this.GS_PLAY_LEVEL = 4;
		this.GS_PAUSE = 5;
		this.GS_PLAYER_DIE = 6;
		this.GS_GAME_OVER = 7;
		
		/* variables */
		this.FPS = 0;
		this.frame_duration = 0;
		this.game_state = this.GS_TITLE;
		this.last_state = this.game_state;
		this.runGameState = null;
		this.gameLoop = gameLoop;
		this.setGameState = setGameState;
		this.startGame = startGame;
		this.game = game;
		
		var thisGSM = this;
		
		/* methods */
		//Changes the game's current state; sets the function to run in gameLoop
		function setGameState(new_state)
		{
			thisGSM.last_state = thisGSM.game_state;
			thisGSM.game_state = new_state;
			
			switch(thisGSM.game_state)
			{
				case thisGSM.GS_TITLE:
					thisGSM.runGameState = thisGSM.game.title;
				break;
				
				case thisGSM.GS_PLAY_LEVEL:
					thisGSM.runGameState = thisGSM.game.playLevel;
				break;
				
				case thisGSM.GS_PAUSE:
					thisGSM.runGameState = thisGSM.game.pause;
				break;
				
				case thisGSM.GS_GAME_OVER:
				default:
					thisGSM.runGameState = thisGSM.game.gameOver;
				break;
			}
			
			return;
		}
		
		
		//The main loop for the Game; calls a different function depending on current state
		function gameLoop()
		{
			MAET_GDK.pollGamePad();
			thisGSM.runGameState();
			
			return;
		}
		
		//Initializes game state and starts the game loop
		function startGame(frames_per_second)
		{
			thisGSM.setGameState(thisGSM.GS_TITLE);
			thisGSM.FPS = frames_per_second;
			thisGSM.frame_duration = 1000 / thisGSM.FPS;
			
			return setInterval(function() {
					thisGSM.gameLoop();
				},
				thisGSM.frame_duration
			);
		}
		
		return;
	}
	
	MAETGDK.prototype.GameStateMachine = GameStateMachine;
	
	return;
})(MAETGDK);
