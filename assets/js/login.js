$(() => {
  let btnSubmit = $('#log');
  

  btnSubmit.click((e) => {
    e.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();

    let data = {}
    data.username = username;
    data.password = password;

    console.log(data)

    $.ajax({
      type: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:4200/log',
      success: function(data) {
        console.log(JSON.stringify(data));
        }
      })
  })
});