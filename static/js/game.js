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
  // Activate buttons
  $('#red').attr('onclick', 'tester(clickButton("red", 0 ))')
  $('#green').attr('onclick', 'tester(clickButton("green", 1 ))')
  $('#blue').attr('onclick', 'tester(clickButton("blue", 2 ))')
  $('#yellow').attr('onclick', 'tester(clickButton("yellow", 3 ))')
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
    // Deactivate buttons
    $('#red').removeAttr('onclick')
    $('#green').removeAttr('onclick')
    $('#blue').removeAttr('onclick')
    $('#yellow').removeAttr('onclick')
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

// Test userInput array against playlist array
function tester (cb1) {
  if (cb1.length !== playlist.length) {
    cb1.forEach(function (number, index) {
      if (cb1[index] !== playlist[index]) {
        // Check strictmode on or off
        if ($('#strictBut').val() === 'OFF') {
          console.log('values are not equal2')
          userInput = []
          playButtons()
        } else {
          playlist = []
          userInput = []
          $('#level').text('00')
          fillPlaylist()
          playButtons()
        }
      } else {
        console.log('values equal')
      }
    })
  } else {
    if (cb1[cb1.length - 1] !== playlist[playlist.length - 1]) {
      if ($('#strictBut').val() === 'OFF') {
        console.log('values are not equal2')
        userInput = []
        playButtons()
      } else {
        playlist = []
        userInput = []
        $('#level').text('00')
        fillPlaylist()
        playButtons()
      }
    } else {
      console.log('values equal2')
      fillPlaylist()
      playButtons()
      userInput = []
    }
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
  if ($('#red')[0].hasAttribute('onclick') && $('#blue')[0].hasAttribute('onclick') &&
  $('#green')[0].hasAttribute('onclick') && $('#yellow')[0].hasAttribute('onclick')) {
    $('#red').removeAttr('onclick')
    $('#green').removeAttr('onclick')
    $('#blue').removeAttr('onclick')
    $('#yellow').removeAttr('onclick')
  } else {
    $('#red').attr('onclick', 'tester(clickButton("red", 0 ))')
    $('#green').attr('onclick', 'tester(clickButton("green", 1 ))')
    $('#blue').attr('onclick', 'tester(clickButton("blue", 2 ))')
    $('#yellow').attr('onclick', 'tester(clickButton("yellow", 3 ))')
  }
}

// Play the current level/round from the Main playlist
function playButtons () {
  console.log('Removing onclick attribute')
  addRemClick()
  console.log('Playing')
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
    console.log('Adding onclick attribute')
    addRemClick()
  }, delay * (playlist.length + 1))
}

// check the value in playlist and change color and play sound
function checkValue (colorValue) {
  if (colorValue === 0) {
    changeColor('red')
    var simonSound1 = new Audio('static/media/simonSound1.mp3')
    simonSound1.play()
    console.log('value is 0 red')
  } else if (colorValue === 1) {
    changeColor('green')
    var simonSound2 = new Audio('static/media/simonSound2.mp3')
    simonSound2.play()
    console.log('value is 1 green')
  } else if (colorValue === 2) {
    changeColor('blue')
    var simonSound3 = new Audio('static/media/simonSound3.mp3')
    simonSound3.play()
    console.log('value is 2 blue')
  } else {
    changeColor('yellow')
    var simonSound4 = new Audio('static/media/simonSound4.mp3')
    simonSound4.play()
    console.log('value is 3 yellow')
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
