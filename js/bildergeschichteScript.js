/* 
 In this script file all methods which controls the processing within the bildergeschichte task are hosted.
 */



// global variables

var selectedTd_Id;
var selectedImg_Id;
var selectedImg_src;
var noSelecting = false;


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
        if (currentClass !== "borderedTd" && $("#" + clickedTdId).data("status") === "full") {

            // show border on selected image
            $("#" + clickedTdId).attr('class', 'borderedTd');
            // set id
            selectedTd_Id = clickedTdId;

            // remove border if other image was selected
            var allTds = mainTable.getElementsByTagName('td');
            for (var i = 0; i < allTds.length; i++) {
                var id = allTds[i].id;
                var tdClass = $("#" + id).attr('class');
                if (id !== clickedTdId && tdClass !== "unborderedTd") {

                    $('#' + id).attr('class', 'unborderedTd');
                }

            }
        }
        
        // if image will be slided back
        else if (currentClass !== "borderedTd" && $("#" + clickedTdId).data("status") === "empty"){
            // slide image back
            slideImageToTargetField(origTd,mainTable);
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
        if (currentClass !== "borderedTd" && $('#' + clickedTargetId).data("status") === "empty") {

            // show border on selected field
            $("#" + clickedTargetId).attr('class', 'borderedTd');

            setTimeout(function() {
               
                
                // move image to target field
                $("#" + selectedTd_Id).children('img').clone().appendTo("#" + clickedTargetId);
                $("#" + selectedTd_Id).find('img').remove();

                // update status              
                $('#' + selectedTd_Id).data("status", "empty");
                $('#' + clickedTargetId).data("status", "full");
                // remove highlighting
                $('#' + selectedTd_Id).attr('class', 'unborderedTd');
                $('#' + clickedTargetId).attr('class', 'unborderedTd');

            }, 100);
            
           

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
        else if (currentClass !== "borderedTd" && $('#' + clickedTargetId).data("status") === "full"){
            // select image
            selectImage(targetTd,mainTable);
        }


       
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


