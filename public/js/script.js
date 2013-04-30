$(document).ready(function() {
/*
 * Contains all Javascript/jQuery for the noneverything site.
 */


/*
 * Display the menu contents listed in menu.txt.
 *
$.get("menu.txt", function(data) {

    var lines = data.split("\n");

    $.each(lines, function(n, elem) {
       console.log("<dd>" + elem + "</dd>");
      // $('#myContainer').append('<div>' + elem + '</div>');
    });
    
});
*/


/*
 * Trigger actions when the browser window is resized.
 */
$(window).resize(function() {
    slideMenu();
});


/*
 * Enable a resonsive drop-down menu for narrow width screen sizes.
 */
function slideMenu() {

    // Return menu to normal expanded state.
    $(".sidebar .contents").remove();
    $(".post-button").off("click.list");
    $(".sidebar dl").show();

    // Convert to a drop-down menu if in single column mode.
    if( $(window).width() < 960 ) {

        // Hide the contents list.
        var sidebar  = $(".sidebar");
        var list = sidebar.find("dl");
        list.hide();
        
        // Add the "Contents" element.
        contentsButton = document.createElement("h2");
        $(contentsButton).addClass("contents").text("Contents");
        sidebar.prepend(contentsButton);
        
        $(".post-button, .contents").on("click.list", function() {
            list.slideToggle();
        });
    }
}
slideMenu();


/*
 * Display post and change url when an item is clicked.
 */
$(".post-button").click(function(event) {
    event.preventDefault();
	var href = $(this).attr("href");
	window.history.pushState(null, $(this).text(), href);
	displayPost(href);
	getDirectoryListing(href);
});


/*
 * Load post corresponding to address bar.
 */
window.onpopstate = function() {
	displayPost(location.href); //breaks chromium 
}
displayPost(location.href); //reqd on intial page load in FF, causes duplicate in chrome :(

/*
 * Display contents of a file as a post.
 *
 * string: "path/to/filename"
 */
function displayPost(href) {

    if(window.location.pathname == "/")
        href = "/posts/visual-synth/visual-synth.html";
        
	$.get(href, function(data) {
	    $("#post").fadeOut(200, 0.0, function() {
            $("#post").html(data);
            $("#post").fadeIn();
        });
    });
}


/*
 * Display Branch discussion related to visible post.
 * Be sure to include the data-branch-embedid from Branch embed script
 * as an attribute of the posts sidebar link.

function displayBranchComments(id) {
	$("#branch").empty();
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.src = "http://embed-script.branch.com/assets/embed/embed.m.js?body=0";
	script.setAttribute("data-branch-embedid", $("#"+id).attr("data-branch-embedid"));
	document.getElementById("branch").appendChild(script);
} */


function getDirectoryListing(href) {

    $.ajax({
        url: href,
        headers: { 
            Accept: "application/json",
        },
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data) {
            if(typeof(data) == "object") {
                $.each(data, function(key,val) {
                    console.log(key + " " + val);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ": " + errorThrown);
        }
    });
}


});
