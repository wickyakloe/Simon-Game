/* eslint-env jquery */

// Start/on Button
$('#start').on('click', function () {
  $(this).css('background-color', 'green')
  $('#red').addClass('light')
  $('#green').addClass('light')
  $('#blue').addClass('light')
  $('#yellow').addClass('light')
  $('input').val('00')
  // Start game
  fillPlaylist()
  playButtons()
  // Activate buttons
  $('#red').attr('onclick', 'testor(redClick, playButtons)')
  $('#green').attr('onclick', 'testor(greenClick, playButtons)')
  $('#blue').attr('onclick', 'testor(blueClick, playButtons)')
  $('#yellow').attr('onclick', 'testor(yellowClick, playButtons)')
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

function testor (cb1, cb2) {
  var input = cb1() - 1
  console.log(input)
  var lastInPlaylist = playlist[playlist.length - 1]
  var value = lastInPlaylist[input]
  if (value === userInput[input]) {
    console.log(value)
    console.log(userInput[input])
    if ( playlist.length !== userInput.length ) {
      console.log("palylistnotEqual")
    } else {
      console.log("playlistequalss")
      fillPlaylist()
      playButtons()
      userInput = []
    }
  } else {
    console.log(value + "playlistvalue")
    console.log(userInput[input] + "userinputvalue")
    cb2()
    userInput = []
  }
}

// The main Playlist
var playlist = []
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
    // Get last item
    var lastInPlaylist = playlist[playlist.length - 1]
    // Concatenate the array with the random generated number
    var newList = lastInPlaylist.concat(genRandomInt())
    // Push as new array to playlist
	  playlist.push(newList)
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
// Check userInput against last playlist
function checkUserInput () {
  // will return the index if found in playlist else will return -1
  var lastInPlaylist = playlist[playlist.length - 1]
  for (var index in lastInPlaylist) {
    var value = lastInPlaylist[index]
    if ( value === userInput[index] ) {
      console.log(value)
      console.log(userInput[index])
    } else {
      playButtons()
    }
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
