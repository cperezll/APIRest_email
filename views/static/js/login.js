$(document).ready(function(){
    // const formLogin = document.querySelector("#login")
    //
    // formLogin.addEventListener("submit", event => {

    $("#login").submit(() => {
        let email = document.querySelector("#login [type=emailAdmin]").value
        let password = document.querySelector("#login [type=passAdmin]").value

        event.preventDefault()

        $.ajax({
            url: "api/signin",
            type: "POST",
            data: {
                'email': email,
                'password': password
            },
            success: function(data) {
                $('.message').removeClass('hidden')
                localStorage.setItem("token", data.token)
                displayMainView()
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("> received data:", xhr.responseJSON);
                $('.message').removeClass('hidden')
                $('.message').addClass('visible')
            }
        })
    })

    function displayMainView() {
        $.ajax({
            url: "users",
            type: "GET",
            headers: {
                'authorization': "bearer " + localStorage.getItem("token")
            },
            success: function(data) {
                $("body").html(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("> received data:", xhr.responseJSON);
            }
        })
    }


    $("#closeErrorMessagePass").click(function(){
        $('.message').removeClass('visible')
        $(this).closest('.messageContainer').addClass('hidden')
    });
});
