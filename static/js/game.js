/* eslint-env jquery */

// The main Playlist
let playlist = []
// The user input
let userInput = []
// Start/on Button

$('#start').on('click', function () {
  $(this).css('background-color', 'green')
  $('#red').addClass('light')
  $('#green').addClass('light')
  $('#blue').addClass('light')
  $('#yellow').addClass('light')
  // Activate buttons if inactive
  addRemClick()
  // Disable the strict button
  $('#strictBut').attr('disabled', true)
  // Disable the on button
  $('#start').attr('disabled', true)
  // Start game
  fillPlaylist()
  playButtons()
})

// Reset/off Button
$(function resetButton () {
  $('#reset').on('mousedown', function () {
    $(this).css('background-color', 'red')
    $('#start').removeAttr('style')
    // Deactivate buttons if active
    addRemClick()
    $('#level').text('00')
    // Enable the strict button
    $('#strictBut').attr('disabled', false)
    // Enable the on button
    $('#start').attr('disabled', false)
  })

  $('#reset').on('mouseup', function () {
    $(this).removeAttr('style')
    $('#red').removeClass('light')
    $('#green').removeClass('light')
    $('#blue').removeClass('light')
    $('#yellow').removeClass('light')
    playlist.length = 0
  })
})

// Strict button
$('#strictBut').on('click', function () {
  if (this.value === 'OFF') {
    this.value = 'ON'
    $('#strictOnOff').text('STRICT MODE: ON')
    $(this).css('background-color', 'red')
  } else {
    this.value = 'OFF'
    $('#strictOnOff').text('STRICT MODE: OFF')
    $(this).removeAttr('style')
  }
})

// Play buttons
// red = 0
// green = 1
// blue = 2
// yellow = 3
function clickButton (color, value) {
  changeColor(color)
  checkValue(value)
  userInput.push(value)
  return userInput
}

// Check if strictmode is on or off
function strictMode () {
  if ($('#strictBut').val() === 'OFF') {
    wrongButton()
    userInput = []
    playButtons()
  } else {
    wrongButton()
    playlist = []
    userInput = []
    $('#level').text('00')
    fillPlaylist()
    playButtons()
  }
}

// Test userInput array against playlist array
function tester (userinput) {
  if (userinput.length !== playlist.length) {
    userinput.forEach(function (number, index) {
      if (userinput[index] !== playlist[index]) {
        strictMode()
      }
    })
  } else if (userinput[userinput.length - 1] !== playlist[playlist.length - 1]) {
    strictMode()
  } else {
    fillPlaylist()
    playButtons()
    userInput = []
  }
}

// Generate random number between 0 and 3
function genRandomInt () {
  var genNo = Math.floor(Math.random() * Math.floor(4))
  return genNo
}

// fill Playlist
function fillPlaylist () {
  playlist.push(genRandomInt())
  showLevel()
  victoryCheck()
}

function victoryCheck () {
  if (showLevel() === '21') {
    victory()
    $('#reset').mousedown()
    $('#reset').mouseup()
  } else {
    console.log('Awaiting victory')
  }
}

function addRemClick () {
  const butColors = { 'red': 0, 'green': 1, 'blue': 2, 'yellow': 3 }
  Object.keys(butColors).forEach(function (key) {
    if ($(`#${key}`)[0].hasAttribute('onclick')) {
      $(`#${key}`).removeAttr('onclick')
    } else {
      $(`#${key}`).attr('onclick', `tester(clickButton('${key}', ${butColors[key]}))`)
    }
  })
}

// Play the current level/round from the Main playlist
function playButtons () {
  addRemClick()
  return arrayPlusDelay(playlist, 800)
}

// Program to pass each iteration with a delay
// code from stackoverflow
function arrayPlusDelay (array, delay) {
  array.forEach(function (number, index) {
    setTimeout(function () {
      checkValue(number)
    }, delay * (index + 1))
  })
  setTimeout(function () {
    addRemClick()
  }, delay * (playlist.length + 1))
}

// check the value in playlist and change color and play sound
function checkValue (colorValue) {
  if (colorValue === 0) {
    changeColor('red')
    let simonSound1 = new Audio('static/media/simonSound1.mp3')
    simonSound1.play()
  } else if (colorValue === 1) {
    changeColor('green')
    let simonSound2 = new Audio('static/media/simonSound2.mp3')
    simonSound2.play()
  } else if (colorValue === 2) {
    changeColor('blue')
    let simonSound3 = new Audio('static/media/simonSound3.mp3')
    simonSound3.play()
  } else {
    changeColor('yellow')
    let simonSound4 = new Audio('static/media/simonSound4.mp3')
    simonSound4.play()
  }
}

// Change tot color of the button
function changeColor (passcolor) {
  $('#' + passcolor).css('background-color', passcolor)
  setTimeout(function () { $('#' + passcolor).removeAttr('style') }, 600)
}

// show the last level your in
function showLevel () {
  if (playlist.length < 10) {
    $('#level').text('0' + playlist.length)
  } else {
    $('#level').text(playlist.length)
  }
  return $('#level').text()
}

// Victory message, see css for animation
function victory () {
  $('<div id="victory"><span>VICTORY</span></div>').insertAfter('#strictMode')
  setTimeout(function () {
    $('#victory').remove()
  }, 5000)
}

function wrongButton () {
  let wrongSound = new Audio('static/media/Wrong.mp3')
  wrongSound.volume = 0.5
  wrongSound.play()
}
