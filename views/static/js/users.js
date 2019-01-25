$(document).ready(function(){

    var statusName = true
    var statusEmail = true
    var statusPassword = true


    $("#infoNewUser").hide()
    $(".errorProjName").hide()
    $(".errorEmail").hide()
    $(".errorPassw").hide()

    //Add user for sent news messages
    const addUser = document.getElementById("addUser")
    addUser.addEventListener("click", addUserFunction)

    function addUserFunction() {
        $("#infoNewUser").show()
    }

    $(".insertNewUser").click( function(){

        var projectName = $("#projectName").val()
        var email = $("#email").val()
        var statusProject = $("#statusProject").val()
        var password = $("#password").val()

        if (projectName.length < 4 || projectName.length > 20){
            statusName = false
            $("#projectName").closest(".inputNewParameter").addClass('error')
            $(".errorProjName").show()
            console.log("Has a error")
        }else{
            statusName = true
            $(".errorProjName").hide()
            $("#projectName").closest(".inputNewParameter").removeClass('error')
        }

        if(email.length < 5 || email.length > 20){
            statusEmail = false
            $("#email").closest(".inputNewParameter").addClass('error')
            $(".errorEmail").show()
        }else{
            if( email.indexOf("@") > -1 ) {
                statusEmail = true
                $(".errorEmail").hide()
                $("#email").closest(".inputNewParameter").removeClass('error')
            }else{
                statusEmail = false
                $(".errorEmail").show()
                $("#email").closest(".inputNewParameter").addClass('error')
                console.log("No contiene el argumento @.")
            }
        }

        if(password.length < 4 || password.length > 20){
            statusPassword = false
            $("#password").closest(".inputNewParameter").addClass('error')
            $(".errorPassw").show()
            console.log("Has a error")
        }else{
            statusPassword = true
            $(".errorPassw").hide()
            $("#password").closest(".inputNewParameter").removeClass('error')
        }

        if( statusName && statusEmail && statusPassword ){
            $.ajax({
                url:"api/signupnewuser",
                type:'POST',
                data:{
                    'projectName': projectName,
                    'email': email,
                    'password': password,
                    'statusProject':statusProject
                },
                success: function(data){
                    $("#infoNewUser").hide()
                    window.location.reload()
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("> received data:", xhr.responseJSON);
                }
            })
        }
    })

    $(".deleteUser").click( function(){
        var selectUserEmail = $(this).closest(".userItemContainer").attr("id")
        selectUserEmail = selectUserEmail.split('_')[1]
        selectUserEmail = $.trim(selectUserEmail)

        $('#delete_element_modal').modal({
            //closable: false,
            offset: 0,
            onApprove: function() {

                $.ajax({
                    url: "api/deleteuser/",
                    type:'DELETE',
                    data:{
                        'email':selectUserEmail
                    },
                    success: function(data){
                        console.log(" > data:" ,data);
                        window.location.reload()
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log("> received data:", xhr.responseJSON);
                    }
                })
                console.log(" > Your was have accept the request.");
            },
            onDeny: function() {
                console.log(" > Your was have cancel the request.");
            }
        }).modal('show')


    })

})
