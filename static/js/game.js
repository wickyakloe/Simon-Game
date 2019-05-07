$(document).ready(function() {
    //Start/on Button 
    $("#start").on("click", function() {
        $(this).css("background-color", "green");
        $("#red").addClass("light");
        $("#green").addClass("light");
        $("#blue").addClass("light");
        $("#yellow").addClass("light");
        $("input").val("00");
    })

    //Reset/off Button
    $("#reset").on("mousedown", function() {
        $(this).css("background-color", "red");
        $("#start").removeAttr("style");
        $("input").val("");
    });

    $("#reset").on("mouseup", function() {
        $(this).removeAttr("style");
        $("#red").removeClass("light")
        $("#green").removeClass("light");
        $("#blue").removeClass("light");
        $("#yellow").removeClass("light");
    });

});

//The main Playlist
var playlist = [];
//Array to generate a new array for the main Playlist
var newPlaylist = [];

//Generate random number between 0 and 3
function genRandomInt() {
    var genNo = Math.floor(Math.random() * Math.floor(4));
    return genNo;
}

//fill Playlist
function fillPlaylist() {
    if (playlist.length !== 0) {
        //Clear array
        var newPlaylist = [];

        //Get last item
        var lastInPlaylist = playlist[playlist.length - 1];
        //Iterate trough last item and push to newPlaylist with new value
        for (var index in lastInPlaylist) {
            var value = lastInPlaylist[index];
            newPlaylist.push(value);
        }
        newPlaylist.push(genRandomInt());
        //Push to the main Playlist
        playlist.push(newPlaylist);
        //Show level you are playing
        showLevel();


    }
    else {
        playlist.push([genRandomInt()]);
        //Show level you are playing
        showLevel();
    }
}

//Play the current level/round from the Main playlist
function playButtons() {


}

function showLevel() {
    $("#level").val(playlist.length);
}
