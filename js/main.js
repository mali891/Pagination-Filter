//Global variables
var $li              = $('li.student-item'),
    pages            = [],//Create array literal to catch split student list items
    pagination       = '<div class="pagination"><ul>',
    paginationBtnVal = 0,//original index value of pages array to show, this will change depending on what the user clicks in the pagination
    searchField      = '<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
    errorMessage     = '<div id="error"><h1 style="color:tomato; font-family:\'system-ui\'; margin-bottom:50px;">Sorry, your query returned no results.</h1></div>';


function showPage(pageNumber) {
    //If Javascript, hide all students. If not, well, do nothing. Because JS is switched off.
    $($li).each(function() {
        $(this).hide();
    });

    //Show pagination in case it is hidden further in the program
    $('.pagination').show();

    //Split into groups of ten, push each to array
    for (var i = 0; i < $li.length; i += 10) {
        pages.push($li.slice(i, i + 10));
    }

    //Show first group of students, until button click event
    pages[paginationBtnVal].show();

    return pages;
}


function appendPageLinks() {
    var showPages = showPage(paginationBtnVal),
    counter = 0;

    //Build out markup for pagination list
    for(var i = 0; i < pages.length; i++) {
        counter++;
        pagination += '<li><a href="#">' + counter + '</a></li>';
    }

    //Close off pagination markup
    pagination += '</ul></div>';

    return pagination;
}

//append pagination markup in appropriate place
$('ul.student-list').append(appendPageLinks());

//Find all pagination links
var paginationBtn = $('.pagination').find('a');

//Pagination button click handler
$(paginationBtn).click(function() {
    //Get value of clicked button text, convert to int, align with array index
    paginationBtnVal = parseInt($(this).text()) - 1;
    //Pass value to and call showPage function
    showPage(paginationBtnVal);
});

//add search markup in the right place
$('.page-header').append(searchField);
//insert error message into the DOM
$('ul.student-list').prepend(errorMessage);
//Hide error message from the user
$('#error').hide();


$('#search').on('keyup', function() {//On keyup is a better UX than on submit, no?
    //on keyup, get the value of input
    var input = $(this).val();

    //Hide list items
    $($li).each(function() {
        $(this).hide();
    });

    $li.each(function() {
        //get the text of each student list item
        var studentInfo = $(this).text();

        if (studentInfo.indexOf(input)!=-1) {
            //if the typed string matches, show the relevant list item
            $(this).show();
            //and hide the error message
            $('#error').hide();
            // and make sure the pagination is visible
            $('.pagination').show();
        } else if($('li.student-item:visible').length < 1) {
            //otherwise display the error message
            $('#error').show();
            //and hide the pagination
            $('.pagination').hide();
        }

    });

    if(input == '' || input.length < 1) {
        //If user deletes all the text in the search field, return pagination to original state
        showPage(paginationBtnVal);
    }
});

$('#search').on('blur', function() {
    //When user clicks away from the search field, if the search field is empty, return pagination to original state
    if($('#search').val() == '' || $('#search').val().length < 1) {
        showPage(paginationBtnVal);
    }
});
