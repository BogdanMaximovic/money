let url= 'http://localhost:4200/registration'
let btnreg = $('#btnreg');


$('#password, #con-password').on('keyup', function () {
    if ($('#password').val() == $('#con-password').val()) {
      $('#message').html('Password matching').addClass("ok");
    } else 
      $('#message').html('Password not matching').addClass("wrong");
});

 

btnreg.on('click', (event) => {
    event.preventDefault();
    
    let name = $('#name').val();
    let lastname = $('#lastname').val();
    let username = $('#username').val();
    let email = $('#email').val();
    let pass = $('#password').val();
    
    console.log(name);
   

     let data = {};

     data.name = name;
     data.lastname = lastname;
     data.username = username;
     data.email = email;
     data.pass = pass;
     
        


    if(name === '' || (/\d/.test(name))){
        $('#message1').html('Fisrt name field must be filled in and can not hold numbers').addClass("wrong");
    } else if(lastname == '' || (/\d/.test(lastname))){
        $('#message1').html('Last name field must be filled in and can not hold numbers').addClass("wrong");
    } else if(username == ''){
        $('#message1').html('Enter Username').addClass("wrong");
    } else if(email == ''){
        $('#message1').html('Enter Email').addClass("wrong");
    } else if(pass == ''){
        $('#message1').html('Enter and cofirm password').addClass("wrong");
    }
    else{
    $.ajax({
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:4200/register',
        success: (data) => {
            console.log(JSON.stringify(data));
        }
    })

    window.location.href = 'http://localhost:4200';
}

})