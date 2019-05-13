/* eslint-env jquery */

$(document).ready(function () {
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
  })
})

// The main Playlist
var playlist = []
// Array to generate a new array for the main Playlist
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
  console.log(getLastPlaylist)
  for (var index in getLastPlaylist) {
    var value = getLastPlaylist[index]
    console.log(value)
    if (value === 0) {
      changeColor('red')
      console.log('value is 0')
    } else if (value === 1) {
      changeColor('green')
      console.log('value is 1')
    } else if (value === 2) {
      changeColor('blue')
      console.log('value is 2')
    } else {
      changeColor('yellow')
    }
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
