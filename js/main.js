//Global variables
var $li              = $('li.student-item'),
    pages            = [],
    pagination       = '<div class="pagination"><ul>',
    paginationBtnVal = 0,
    searchField      = '<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
    errorMessage     = '<div id="error"><h1 style="color:tomato; font-family:\'system-ui\'; margin-bottom:50px;">Sorry, your query returned no results.</h1></div>';


function showPage(pageNumber) {
    //If Javascript, hide all students. If not, well, do nothing. Because JS is switched off.
    $($li).each(function() {
        $(this).hide();
    });

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


$('.page-header').append(searchField);
$('.pagination').prepend(errorMessage);
$('#error').hide();


$('#search').on('keyup', function() {//On keyup is a better UX than on submit, no?

    var input = $(this).val();

    $($li).each(function() {
        $(this).hide();
    });

    $li.each(function() {
        var studentInfo = $(this).text();

        if (studentInfo.indexOf(input)!=-1) {
            $(this).show();
            $('#error').hide();
        } else if($('li.student-item:visible').length < 1) {
            $('#error').show();
        }

    });

    if(input == '' || input.length < 1) {
        showPage(paginationBtnVal);
    }
})

$('#search').on('blur', function() {
    if($('#search').val() == '' || $('#search').val().length < 1) {
        showPage(paginationBtnVal);
    }
});
