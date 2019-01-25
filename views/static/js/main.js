$(document).ready( function(){

    //Button from changes login view. Only this view is for admin role.
    $('.inverted .button').click(function(){
        console.log("Change view to login admin ...")
        window.location.replace('/login')
    })

})
