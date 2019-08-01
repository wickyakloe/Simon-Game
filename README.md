# Simon - Game

Simon is an electronic game of memory skill.
The device creates a series of tones and lights and requires a user to repeat the sequence.

We will try to replicate this game in this project.

For more information see this
[Wikipedia](https://en.wikipedia.org/wiki/Z) article

## UX

- As a user i can turn the game on and off
- As a user i am presented with a random series of button presses.
- As a user each time I input a series of button presses correctly, I see the
same series of button presses but with an additional step.
- As a user I hear a sound that corresponds to each button both when the series
of button presses plays, and when I personally press a button.
- As a user if I press the wrong button, I am notified that I have done so, and
that series of button presses starts again to remind me of the pattern so I can try again.
- As a user i can see how many steps are in the current series of button presses.
- As a user i can play in strict mode where if I get a button press wrong, it notifies
  me that I have done so, and the game restarts at a new random series of button presses.
- As a  user i can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

## Mockup

You find a mockup of the application [here](https://wickyakloe.github.io/Simon-Game/mockup/)

```url
https://wickyakloe.github.io/Simon-Game/mockup/
```

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- HTML
- CSS
- Javascript
- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation.

## Testing

Tested one function using Jasmin [here](https://wickyakloe.github.io/Simon-Game/tests.html):
```link
https://wickyakloe.github.io/Simon-Game/tests.html
```

The following scenarios are manually tested in chrome on desktop and mobile:

1. The user can select strictmode on/off before starting the game after the game is turned on the button is disabled - *Passed*

2. The user should click the "on" button to start the game - *Passed*
3. During the game the user can click the "off" button to turn off the game - *Passed*

4. When the user presses the wrong button they will hear a buzz sound - *Passed*

5. When strictmode is on and the user presses a wrong button the game starts over with a new series. - *Passed*

6. When strictmode is off and the user presses a wrong button the series is replayed so the user can try again at the current level. - *Passed*

7. When the user passes level 20 the game shows a victory message and shutdowns. - *Passed*

## Deployment

The project is hosted on Github Pages [here](https://wickyakloe.github.io/Simon-Game)

```url
https://wickyakloe.github.io/Simon-Game
```

The deployment using Github Pages is done as follows:

1. Sign in to your github account
2. Go to the repository you want to host using github pages
3. Click on settings
4. Scroll down to the Github Pages section
5. Select the source master branch

### Local deployment

To deploy this project locally using git ( make sure git is installed):

```git
git clone https://github.com/wickyakloe/Simon-Game.git
```
