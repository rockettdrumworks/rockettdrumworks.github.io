// jQuery Initialization
jQuery(document).ready(function($){
"use strict"; 

        if ($('.lightbox, .button-fullsize, .fullsize').length > 0) {
        $('.lightbox, .button-fullsize, .fullsize').fancybox({
            padding    : 0,
            margin    : 0,
            maxHeight  : '90%',
            maxWidth   : '90%',
            loop       : true,
            fitToView  : false,
            mouseWheel : false,
            autoSize   : false,
            closeClick : false,
            overlay    : { showEarly  : true },
            helpers    : { media : {} }
        });
    }


    
     $('#gototop').click(function(e){
        jQuery('html, body').animate({scrollTop:0}, 750, 'linear');
        e.preventDefault();
        return false;
    });
    

    $("#submit_btn").click(function() { 

        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        var user_message      = $('input[name=message]').val();
        //var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-color','red'); 
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','red'); 
            proceed = false;
        }
        if(user_company=="") {    
            $('input[name=company]').css('border-color','red'); 
            proceed = false;
        }
        // if(user_message=="") {  
        //     $('textarea[name=message]').css('border-color','red'); 
        //     proceed = false;
        // }

        //everything looks good! proceed...
        if(proceed) 
        {
            $.fancybox("#hidden");
            // output = '<div class="success">'+response.text+'</div>';
            
            //reset values in all input fields
            $('#contact_form input').val(''); 
            $('#contact_form textarea').val(''); 

            //data to be sent to server
            var post_data;
            var output;
            post_data = {'userName':user_name, 'userEmail':user_email, 'userCompany':user_company};
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){  

                //load json data from server and output message     
                if(response.type == 'error')
                {
                    output = '<div class="error">'+response.text+'</div>';
                }else{

                }
                
                $("#result").hide().html(output).slideDown();
            }, 'json');
            
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() { 
        $("#contact_form input, #contact_form textarea").css('border-color',''); 
        $("#result").slideUp();
    });
});