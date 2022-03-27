$(document).ready(function () {

    getPersonalDetails();

    function getPersonalDetails() {
        var personalURL = '/api/personal';
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: personalURL,
            method: "GET",
            dataType: "JSON",
            statusCode: {
                404: function () {
                    alert("not found");
                    return;
                }
            },
            success: function(response) {
                $('#modalDisplay').empty();
                // Log the queryURL
                console.log(response);
                var imageArr = [
                    {image : 'assets/images/digiPic01.jpg'},
                    {image : 'assets/images/digiPic02.jpg'},
                    {image :'assets/images/digiPic03.jpg'}
                ]
                // Log the resulting object
                for(var i = 0; i < response.length; i++) {
                    var personalId = response[i].id;
                    var personalName = response[i].name;
                    // var personalImage = imageArr[i].image;
                    var personalImage = response[i].image;
                    var personalDescription = response[i].description;

                    var displayDiv = $('<div>').addClass('col-sm-6 col-md-5 col-lg-4');
                    var modalEl = $('<div>');
                    var image01El = $('<img>').addClass('img-fluid');
                    var btn01El = $('<button>').addClass('btn btn-primary label labelText profileBtn')

                    btn01El.attr({'type': 'button', 'data-bs-toggle': 'modal', 'data-bs-target': `#${personalName}`, 'dataIndex': i , 'data-target': `#${personalName}`});
                    btn01El.text(personalName)
                    image01El.css('text-align', 'left');
                    image01El.attr('src', personalImage);
                    displayDiv.attr('dataIndex', i);
                    // displayDiv.css({'border': 'solid', 'border-width': '1px', 'border-color': '#777777', 'padding-bottom': '20px'});
                    var div01El = $('<div>').addClass('modal fade');
                    div01El.attr({'id': personalName, 'tabindex': "-1", 'role': "dialog",
                    'aria-labelledby': "exampleModalCenterTitle", 'aria-hidden': "true"});

                    var div02El = $('<div>').addClass('modal-dialog');
                    // div02El.attr('role', 'document');

                    var div03El = $('<div>').addClass('modal-content');
                    var div04El = $('<div>').addClass('modal-header');
                    var header01El = $('<h6>').addClass('modal-title');
                    header01El.attr('id', "exampleModalLongTitle");
                    header01El.text(`${personalName}`);
                    var btn02El = $('<button>').addClass('close');
                    btn02El.attr({'type': 'button', 'data-dismiss': 'modal', 'aria-label': 'Close'});
                    var span01El = $('<span>');
                    span01El.attr('aria-hidden', 'true');
                    span01El.html(`&times;`);
                    var div05El = $('<div>').addClass('modal-body');
                    var cardEl = $('<div>').addClass('card');
                    cardEl.css('width', '100%')
                    var image02El = $('<img>').addClass('card-img-top');
                    image02El.attr({'src': personalImage, 'alt': "Card image cap"});
                    var cardBodyEl = $('<div>').addClass('card-body');
                    var cardTextEl = $('<p>').addClass('card-text');
                    cardTextEl.text(personalDescription);

                    var div06El = $('<div>').addClass('modal-footer');
                    var btn03El = $('<button>').addClass('btn btn-secondary');
                    btn03El.attr({'type': 'button', 'data-dismiss': 'modal'});
                    btn03El.text('Close');
                    
                    $('#modalDisplay').append(displayDiv);

                    displayDiv.append(image01El);
                    displayDiv.append(modalEl);
                    modalEl.append(btn01El);
                    modalEl.append(div01El);
                    div01El.append(div02El);
                    div02El.append(div03El);
                    div02El.append(div04El);
                    div04El.append(header01El);
                    div04El.append(btn02El);
                    btn02El.append(span01El);
                    div02El.append(div05El);
                    div05El.append(cardEl);
                    cardEl.append(image02El);
                    cardEl.append(cardBodyEl);
                    cardBodyEl.append(cardTextEl);
                    div02El.append(div06El);
                    div06El.append(btn03El);       
                }
            },
            error: function(){
                alert("Error, 404 (not found)!")
            }
        });
        // $.ajax({
        // url: queryForcast,
        // method: "GET"
        // })
        // // We store all of the retrieved data inside of an object called "response"
        // .then(function(response) {
            
        // });
    }

    function profileBtn(event) {
        // This 'preventDefault' method tells the user agent that if the event does not get explicitly
        // handled, its default action should not be taken as it normally would be.
        event.preventDefault(event);
        // The stopPropagation() method stops the bubbling of an event to parent elements, preventing
        // any parent handlers from being notified of the event. You can use the method event.isPropagationStopped()
        // to know whether this method was ever called (on that event object).
        event.stopPropagation(event);
        console.log("personal button clicked");
        var selectedNameIndex = $(this).attr('dataindex').trim();
        console.log(selectedNameIndex);
        var personalURL = '/api/personal';
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: personalURL,
            method: "GET",
            dataType: "JSON",
            statusCode: {
                404: function () {
                    alert("not found");
                    return;
                }
            },
            success: function(response) {
                // Log the queryURL
                console.log(response);
                personalId = response[selectedNameIndex].id;
                personalName = response[selectedNameIndex].name;
                // var personalImage = imageArr[i].image;
                personalImage = response[selectedNameIndex].image
                console.log(personalId);

                displayDiv = $('<div>').addClass('modal fade');
                displayDiv.attr({'id': personalName, 'tabindex': "-1", 'role': "dialog",
                'aria-labelledby': "exampleModalCenterTitle", 'aria-hidden': "true"});

                div01El = $('<div>').addClass('modal-dialog modal-dialog-centered');
                div01El.attr('role', 'document');

                div02El = $('<div>').addClass('modal-content');
                div03El = $('<div>').addClass('modal-header');
                div04El = $('<div>').addClass('modal-body');
                div05El = $('<div>').addClass('modal-footer');

                // displayDiv.css({'border': 'solid', 'border-width': '1px', 'border-color': '#777777', 'padding-bottom': '20px'});
                $('#modalDisplay').append(displayDiv);
                displayDiv.append(div01El);
                div01El.append(div02El);
                div02El.append(div03El);
                div02El.append(div04El);
                div02El.append(div05El);             
            },
            error: function(){
                alert("Error, 404 (not found)!")
            }
        });
    }  
});
  