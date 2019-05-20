/* eslint-env jquery */

// Start/on Button
$('#start').on('click', function () {
  $(this).css('background-color', 'green')
  $('#red').addClass('light')
  $('#green').addClass('light')
  $('#blue').addClass('light')
  $('#yellow').addClass('light')
  $('input').val('00')
  // Activate buttons
  $('#red').attr('onclick', 'redClick()')
  $('#green').attr('onclick', 'greenClick()')
  $('#blue').attr('onclick', 'blueClick()')
  $('#yellow').attr('onclick', 'yellowClick()')
})

// Reset/off Button
$(function resetButton () {
  $('#reset').on('mousedown', function () {
    $(this).css('background-color', 'red')
    $('#start').removeAttr('style')
    $('input').val('')
    // Deactive buttons
    $('#red').removeAttr('onclick')
    $('#green').removeAttr('onclick')
    $('#blue').removeAttr('onclick')
    $('#yellow').removeAttr('onclick')
  })

  $('#reset').on('mouseup', function () {
    $(this).removeAttr('style')
    $('#red').removeClass('light')
    $('#green').removeClass('light')
    $('#blue').removeClass('light')
    $('#yellow').removeClass('light')
    playlist.length = 0
    clearInterval(playButtons())
  })
})

// Play buttons
// red = 0
// green = 1
// blue = 2
// yellow = 3
function redClick () {
  changeColor('red')
  checkValue(0)
  return userInput.push(0)
}

function greenClick () {
  changeColor('green')
  checkValue(1)
  return userInput.push(1)
}

function blueClick () {
  changeColor('blue')
  checkValue(2)
  return userInput.push(2)
}

function yellowClick () {
  changeColor('yellow')
  checkValue(3)
  return userInput.push(3)
}

// The main Playlist
var playlist = []
// New generated playlist
var newPlaylist = []
// The user input
var userInput = []

// Generate random number between 0 and 3
function genRandomInt () {
  var genNo = Math.floor(Math.random() * Math.floor(4))
  return genNo
}

// fill Playlist
function fillPlaylist () {
  if (playlist.length !== 0) {
    // Clear array
    var newPlaylist = []

    // Get last item
    var lastInPlaylist = playlist[playlist.length - 1]
    // Iterate trough last item and push to newPlaylist with new value
    for (var index in lastInPlaylist) {
      var value = lastInPlaylist[index]
      newPlaylist.push(value)
    }
    newPlaylist.push(genRandomInt())
    // Push to the main Playlist
    playlist.push(newPlaylist)
    // Show level you are playing
    showLevel()
  } else {
    playlist.push([genRandomInt()])
    // Show level you are playing
    showLevel()
  }
}

// Play the current level/round from the Main playlist
function playButtons () {
  var getLastPlaylist = playlist[playlist.length - 1]
  var inter = ArrayPlusDelay(getLastPlaylist, function (obj) { checkValue(obj) }, 1000)
  return inter
}

// Program to pass each iteration with a delay
// code from stackoverflow
function ArrayPlusDelay (array, delegate, delay) {
  var i = 0

  // seed first call and store interval (to clear later)
  var interval = setInterval(function () {
  // each loop, call passed in function
    delegate(array[i])

    // increment, and if we're past array, clear interval
    if (i++ >= array.length - 1) { clearInterval(interval) }
  }, delay)

  return interval
}
// check the value in playlist and change color and play sound
function checkValue (colorValue) {
  if (colorValue === 0) {
    changeColor('red')
    $('#redSound')[0].play()
    console.log('value is 0 red')
  } else if (colorValue === 1) {
    changeColor('green')
    $('#greenSound')[0].play()
    console.log('value is 1 green')
  } else if (colorValue === 2) {
    changeColor('blue')
    $('#blueSound')[0].play()
    console.log('value is 2 blue')
  } else {
    changeColor('yellow')
    $('#yellowSound')[0].play()
    console.log('value is 3 yellow')
  }
}
// Check userInput against last playlist
function checkUserInput () {
  // will return the index if found in playlist else will return -1
  var lastInPlaylist = playlist[playlist.length - 1]
  for (var index in userInput) {
    var value = userInput[index]
    console.log($.inArray(value, lastInPlaylist, index))
  }
}
// Change tot color of the button
function changeColor (passcolor) {
  $('#' + passcolor).css('background-color', passcolor)
  setTimeout(function () { $('#' + passcolor).removeAttr('style') }, 600)
}

// show the last level your in
function showLevel () {
  $('#level').val(playlist.length)
}
