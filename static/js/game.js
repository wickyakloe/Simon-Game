/* eslint-env jquery */

// Start/on Button
$('#start').on('click', function () {
  $(this).css('background-color', 'green')
  $('#red').addClass('light')
  $('#green').addClass('light')
  $('#blue').addClass('light')
  $('#yellow').addClass('light')
  $('input').val('00')
})

// Reset/off Button
$(function resetButton () {
  $('#reset').on('mousedown', function () {
    $(this).css('background-color', 'red')
    $('#start').removeAttr('style')
    $('input').val('')
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

// The main Playlist
var playlist = []
// New generated playlist
var newPlaylist = []

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

// ArrayPlusDelay(playlist[playlist.length - 1], function (obj) { checkValue(obj) }, 1000)

function checkValue (colorValue) {
  if (colorValue === 0) {
    changeColor('red')
    console.log('value is 0 red')
  } else if (colorValue === 1) {
    changeColor('green')
    console.log('value is 1 green')
  } else if (colorValue === 2) {
    changeColor('blue')
    console.log('value is 2 blue')
  } else {
    changeColor('yellow')
    console.log('value is 3 yellow')
  }
}

function changeColor (passcolor) {
  $('#' + passcolor).css('background-color', passcolor)
  setTimeout(function () { $('#' + passcolor).removeAttr('style') }, 600)
}

// function resetColor () {
//   // var x = document.getElementById("reset")
//   // // x.style.backgroundColor = "#ff000096"
//   // x.style.removeProperty('background-color')
//   setTimeout(function () { $('#red').removeAttr('style') }, 300)
// }

function showLevel () {
  $('#level').val(playlist.length)
}
