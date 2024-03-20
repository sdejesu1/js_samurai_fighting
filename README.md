Based off a tutorial video here: https://www.youtube.com/watch?v=vyqbNFMDRGQ
Game assets: 
    Oak Woods Assets: https://brullov.itch.io/oak-woodsFighter Asset #1: https://luizmelo.itch.io/martial-hero
    Fighter Asset #2: https://luizmelo.itch.io/martial-hero-2

From following the tutorial, I learned how to code in vanilla Javascript, mainly syntax and its typical function calls such as window and document calls. I also refreshed myself on
Object Oriented Programming and its practices and improved on that, and learned to manipulate sprites to create fluid animation.

Personal additions from tutorial:
- From tutorial, either character model has only one set of animations, regardless of directions. For example, if player 1 is pointing towards the right and chooses to run left, 
the character will move left while having the animation of running to the right. Therefore, I added another set of animations for each character so that they can have fluid 
animations for each direction they move. 
- Updated character animations for taking hits such that there is a white flash to indicate damage, for both characters.
- Added another character (in progress), Luffy from One Piece.


Game is in progress:
- Features to be added are more characters and environments, menus, music, and fixes to small bugs.



Game Description:

This game is a two player game to be played on the same keyboard, where the two players fight each other freely and can run, jump, attack in both directions, in real time. A timer
in the middle of the health bars is running, and when it reaches 0, the player with the most health wins. Otherwise if either player's health reaches 0 before the time is up,
the game is over.

Player 1 moves: W - jump, A - run left, D - run right, Spacebar - attack
Player 2 moves: Up Arrow - jump, Left Arrow - run left, Right Arrow - run right, Down Arrow - attack
