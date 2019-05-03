$(document).ready(function() {
    //Start Button 
    $("#start").on("click", function() {
        $(this).css("background-color", "green");
        $("#red").addClass("light");
        $("#green").addClass("light");
        $("#blue").addClass("light");
        $("#yellow").addClass("light");
        $("input").val("00");
    })

    //Reset Button
    $("#reset").on("mousedown", function() {
        $(this).css("background-color", "red");
        $("#start").removeAttr("style");
        $("input").val("");
    })

    $("#reset").on("mouseup", function() {
        $(this).removeAttr("style");
        $("#red").removeClass("light")
        $("#green").removeClass("light");
        $("#blue").removeClass("light");
        $("#yellow").removeClass("light");
    })
});
