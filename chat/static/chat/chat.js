var last_time = null;

function loop() {
    $.ajax({
        url: "/recv/",
        type: "POST",
        dataType: "json",
        data: {
            csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]")[0].value,
            last_time: last_time
        },
        success: function(data) {
            last_time = data.time;
            var messages = data.messages;
            for (var i = 0; i < messages.length; ++i) {
                var message = messages[i];
                $("#messages").val($("#messages").val() + "[" + message.time + "] " + message.author + ": " + message.text + "\n");
            }
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Receive error: " + errorThrown);
        }
    });
}

$(document).ready(function() {
    $("#message").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#send").click();
        }
    });
    
    $("#send").click(function() {
        $.ajax({
            url: "/send/",
            type: "POST",
            dataType: "json",
            data: {
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]")[0].value,
                author: $("#author").val(),
                text: $("#message").val()
            },
            success: function(data) {
                $("#message").val("");
                $("#message").focus();
            },
            error: function(xhr, textStatus, errorThrown) {
                $("#message").val("");
                alert("Send error:" + errorThrown);
            }
        });
    });
    
    setInterval(loop, 1000);
});