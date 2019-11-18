# jSharkanoid

A clone of classic arcade game Arkanoid written in javascript and shark themed. There are block-shaped sea life at the top of the screen that the user must consume by sending a shark at them. The shark ricochets on blocks, the top, left, and rights sides of the screen, and a deployment pad at the bottom of the screen that the user uses the LEFT and RIGHT arrow keys to move.

## Functionality and MVP
 - [ ] Certain sea life will take more than one bite to consume
 - [ ] Lose a hit point if the shark misses the deployment pad and reaches the bottom of the screen
 - [ ] Regenerate hit points up to a certain maximum after consuming enough sea life
 - [ ] Includes multiple levels that may take on a variety of sea life layout
 - [ ] Has game stats shown on the side of the screen
 - [ ] Can pause and resume the game

## Architecture and Technologies
 * `Javascript` for game logic
 * `Browserify` to bundle js files
 
Additionally, the following scripts will be involved:
`aquarium.js`: This script handles rendering and managing of the game objects along with the launchpad movement.
`sealife.js`: This script handles basic sealife data like type and hit points.
`shark.js`: This script handles the position logic of the shark in the game along with stats

## Implementation Timeline
**Day 1:** Setup node modules including Browserify, setup project skeleton. Organize sprites and get them working.

**Day 2:** Setup object movement and collision and test them, then work on game logic associated with various object collisions

**Day 3:** Build out various game levels

**Day 4:** Implement stats sidebar and pause/resume functionality

## Bonus Features
 - [ ] Implement more complex maps, including more usage of invulnerable sea life blocks
 - [ ] Implement power up drops as a result of random consume chance or as drops that fall by random chance
