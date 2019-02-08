$(() => {
  const modal = $('#show');
  const btnSubmit = $('#send');
  const inputField = $('input')
  const msg = $('#message')

  modal.hide();

  btnSubmit.click((e) => {
    e.preventDefault();
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
        modal.show();
          let delay = 1500; 
          let url = 'http://localhost:4200/add';
          setTimeout(function(){ window.location = url }, delay);
    } else {
      inputField.addClass('is-invalid');
      msg.addClass('is-invalid');
    }
  })
});