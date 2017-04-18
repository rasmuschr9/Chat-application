/**
 * Created by RasmusChristiansen on 14/03/2017.
 */

// Sætter .active på .nav li
$(document).ready(function() {
    $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');
});

// Skjul beskedfelt på Chatrooms forsiden, og synliggør velkomstbesked.
var url = document.location.href;

if (url.indexOf('/chatrooms') >= 0) {
    $('#message-field').hide();
    $('#welcome-message').show();
} else {
    $('#message-field').show();
    $('#welcome-message').hide();
}

// Panel-body starter i bunden, så vinduet altid viser nyeste beskeder først
var objDiv = document.getElementById("chat-window");
objDiv.scrollTop = objDiv.scrollHeight;
