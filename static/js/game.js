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


var playlist = [];

//Generate random number between 0 and 3
function genRandomInt() {
    var genNo = Math.floor(Math.random() * Math.floor(4));
    return genNo;
}

//fill Playlist
function fillPlaylist(){
    if( playlist.length !== 0 ){
        var lastInPlaylist = playlist[playlist.length -1].toString();
        console.log(lastInPlaylist)
        var newPlaylist = [];
        newPlaylist.push(lastInPlaylist, genRandomInt().toString());
        console.log(newPlaylist);
        playlist.push(newPlaylist);

    } else{
        playlist.push([genRandomInt()]);
    }
}
