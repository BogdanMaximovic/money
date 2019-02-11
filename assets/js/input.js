$(() => {
  let modal = $('#show');
  let btnSubmit = $('#send');
  let inputField = $('input')
  let msg = $('#message')
  let textMsg = $('#text');
  let url = 'http://localhost:4200/add';

  function delaying() {
      let delay = 500;
      setTimeout(() => { window.location = url }, delay);
  }


  modal.hide();

  btnSubmit.click((e) => {
    e.preventDefault();
    modal.show();
    let selectedDate = $('#date').val();
    let category = $("#category option:selected" ).val();
    let number = $('#number').val();
    let message = $('#message').val();

    let data = {};
    data.selectedDate = selectedDate;
    data.category = category;
    data.number = number;
    data.message = message;

    if (selectedDate !== '' && category !== '' && number !== '' && message !== '') {
        $.ajax({
          type: 'post',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: 'http://localhost:4200/addingNewInput',
          success: function(data) {
            console.log(JSON.stringify(data));
            }
          })
        textMsg.text('Adding success')
        delaying()
    } else {
      textMsg.text('Something wrong')
      inputField.addClass('is-invalid');
      msg.addClass('is-invalid');
    }
  })
});