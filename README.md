# HOW TO RUN!!
open the folder in your terminal, then do the following 
- run the following in your terminal: **npm install -i** 
- to start the website run: **npm start**
### **GAMEPLAY IS FINISHED BUT NEEDS TESTING, BUGS MAY OCCUR**
## how the game works:
### rules for any gamestate:
1. if a player gets 3 bricks in a straight horizontal or vertical line, they make what is called a wall.
   once a player has made a wall, they can remove one of the other players bricks from the board before their turn ends
2. a brick that is part of a wall is considered "walled" and cannot be removed from the board so long as it stays "walled"
3. if a brick that is part of a wall is moved such that the wall is no longer formed, it and the other bricks that made
   up the wall are no longer "walled"
4. a brick can only be placed or moved on an unoccupied spot

### pregame:
players take turn placing one of their 9 total reserve bricks onto the board

### midgame:
players must now choose a brick to move and may only move it to a connected spot on the map (only moved to where the paths lead)
a brick can only be moved one spot at a time, and moving a brick takes a turn.

### endgame:
once a player only has 3 bricks left, they can move their bricks anywhere that is unoccupied on the map, this only applies to
the player with 3 bricks left, and can apply to both players if both only have 3 bricks left.

### win condition: 
the first player to get the enemy players brick count to 2 wins. That is to say if you only have 2 bricks left, you lose

### whats missing:
- ✓ some kind of check for if a player has no available moves, as if not this will softlock the game
- alot of testing for bugs
- improved visuals
- main menu screen
- home screen/startup menu
- VS bot
- online multiplayer
- quickmatch?
- adjusting the map lines so they ACTUALLY line up