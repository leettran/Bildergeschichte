/* 
 In this script file all methods which controls the processing within the bildergeschichte task are hosted.
 */



// global variables

var selectedTd_Id;
var selectedImg_Id;
var selectedImg_src;
var imageSelected = false;



// shows given page after a given time interval
function showFollowingPageDelayed(page, delay)
{
    try
    {
        setTimeout(function () {
            $.mobile.changePage('#' + page, {transition: "slide"});
        }, delay);



    }

    catch (error) {
        console.log("Error when switching to page: " + page + error);
    }


}


// to switch to the demo page
function goToDemoPage() {

    try
    {
        $.mobile.changePage('#slideToPicturesStoryDemo', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// shows the demo example
function onShowDemo() {
    try
    {
        $.mobile.changePage('#picturesStoryDemo1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}

// to switch to task2
function goToTask2() {

    try
    {
        $.mobile.changePage('#task2', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// to switch to task2
function goToTask3() {

    try
    {
        $.mobile.changePage('#task3', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// to switch to task4
function goToTask4() {

    try
    {
        $.mobile.changePage('#task4', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// to switch to task5
function goToTask5() {

    try
    {
        $.mobile.changePage('#task5', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// to switch to task6
function goToTask6() {

    try
    {
        $.mobile.changePage('#task6', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// to switch to end page
function goToEndpage() {

    try
    {
        $.mobile.changePage('#endPage', {transition: "slide"});
        $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "hidden");
        $(".whitePage").find(".hintText").css("visibility", "visible");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// starts the pictures story task
function startPicturesStoryTask() {
    try
    {
        $.mobile.changePage('#task1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}





// selects an image from original td
function selectImage(origTd, mainTable) {



    try
    {
        // get infos about clicked td
        var clickedTdId = origTd.id;
        var currentClass = $("#" + clickedTdId).attr('class');
        if ($("#" + clickedTdId).data("status") === "full") {
            var img = $("#" + clickedTdId).find("img");
            selectedImg_src = img.attr('src');
            selectedImg_Id = img.first().attr("id");
        }
        // only if selected image isn't already selected or slided
        if (currentClass !== "selectedImage" && $("#" + clickedTdId).data("status") === "full") {

            // show border on selected image
            $("#" + clickedTdId).attr('class', 'selectedImage');
            // set id
            selectedTd_Id = clickedTdId;
            // set selection bool
            imageSelected = true;
            // remove border if other image was selected
            var allTds = mainTable.getElementsByTagName('td');
            for (var i = 0; i < allTds.length; i++) {
                var id = allTds[i].id;
                var tdClass = $("#" + id).attr('class');
                // toggle only image fields
                if (id !== clickedTdId && tdClass !== "origField" && $("#" + id).data("status") === "full") {

                    $('#' + id).attr('class', 'origField');
                }

            }
        }

        // if image will be slided back
        else if (currentClass !== "selectedImage" && $("#" + clickedTdId).data("status") === "empty") {
            // slide image back
            slideImageToTargetField(origTd, mainTable);
        }


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}





// selects target field and then slides image there
function slideImageToTargetField(targetTd, mainTable) {
    try
    {
        // get infos about clicked target field
        var clickedTargetId = targetTd.id;
        var currentClass = $("#" + clickedTargetId).attr('class');

        // slide selected image only if target field is empty and not highlighted
        if (currentClass !== "selectedImage" && $('#' + clickedTargetId).data("status") === "empty" && imageSelected) {

            // show border on selected field
            $("#" + clickedTargetId).attr('class', 'selectedImage');

            setTimeout(function() {

               // empty target div to slide image to
               $("#" + clickedTargetId).empty();
               
               // mark target fiedl again with string
               if ($('#' + selectedTd_Id).data("rank") !== null && $('#' + selectedTd_Id).data("type") !== "source"){
                   var fieldRank = $('#' + selectedTd_Id).data("rank");
                   var fieldMark = "Zielfeld " + fieldRank;
                   $('#' + selectedTd_Id).append("<h1>"+fieldMark+"</h1>");
               }

                // move image to target field
                $("#" + selectedTd_Id).children('img').clone().appendTo("#" + clickedTargetId);
                $("#" + selectedTd_Id).find('img').remove();

                // update status              
                $('#' + selectedTd_Id).data("status", "empty");
                $('#' + clickedTargetId).data("status", "full");
                // remove highlighting
                $('#' + selectedTd_Id).attr('class', 'targetField');
                $('#' + clickedTargetId).attr('class', 'origField');
                
                // check if all target fields are full 
            if (allFieldsMatched(mainTable)){
               $(".whitePage").find("[data-type=forwardBtn]").css("visibility", "visible");
                $(".whitePage").find(".hintText").css("visibility", "hidden");
            }

            }, 100);
            
            // reset selection bool
            imageSelected = false;
            
            



//            // get coordinates to slide to
//            var targetX = $("#" + clickedTargetId).offset().left;
//            var targetY = $("#" + clickedTargetId).offset().top;
//            // get coordinates of image to slide
//            var origX = $("#" + selectedImg_Id).offset().left;
//            var origY = $("#" + selectedImg_Id).offset().top;
//            // calculate slide distance
//            var slideX = targetX - origX;
//            var slideY = targetY - origY;
//            // slide selected image to position above
//            setTimeout(function() {
//                $("#" + selectedImg_Id).animate({
//                    left: slideX + 'px',
//                    top: slideY + 'px'
//                }, 2000, function() {
//                    // Animation completed
//                     
//                     // assign status
//                     
//                     $('#' + selectedTd_Id).data("status","empty");
//                     $('#' + clickedTargetId).data("status","full");
//                   
//                   // remove border highlighting
//                    $('#' + selectedImg_Id).attr('class', 'unborderedImage');
//                    $('#' + clickedTargetId).attr('class', 'unborderedTd');
//                    
//                     
//                    // reset selected image id                  
//                    selectedImg_Id = null;
//
//                });
//            }, 1000);

        }

        // if image will be slided back
        else if (currentClass !== "selectedImage" && $('#' + clickedTargetId).data("status") === "full") {
            // select image
            selectImage(targetTd, mainTable);
        }



    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function allFieldsMatched(mainTable){
    
    var matchedTds = 0;
    var allMatched = false;
    try
    {
        var allTds = mainTable.getElementsByTagName('td');
         for (var i = 0; i < allTds.length; i++) {
                var id = allTds[i].id;
                var tdType = $("#" + id).data("type");
                var tdStatus = $("#" + id).data("status");
                // check if target field is matched with image
                if (tdType === "source" && tdStatus === "empty") {
                    // count matched fields
                    matchedTds++;
                }

            }
            
            // when all fields are matched 
            if (matchedTds === ((allTds.length-1)/2))
                allMatched = true;
    }
    
    catch (error) {
        console.log("An error has been occured! " + error);
    }
    
    return allMatched;
}
