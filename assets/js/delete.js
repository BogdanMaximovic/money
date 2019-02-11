$(() => {
    let modal = $('#addingNew');
    let msg = $('#success');
    let btnSave = $('#save');
    let BtnClose = $('#close');
    let selectField = $("#id option:selected");
    let url = 'http://localhost:4200/exp';

    function delaying(){
      let delay = 500;
      setTimeout(() => { window.location = url }, delay);
    }

    modal.modal('show');
    msg.hide();

    btnSave.click((e) => {
        e.preventDefault();
        msg.show();
        let id = selectField.val();
        let data = {};
        data.id = id;
        
        $.ajax({
          type: 'post',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: 'http://localhost:4200/delete',
          success: (data) => {
            console.log(JSON.stringify(data));
            }
          });
        delaying()
      })
    BtnClose.click(() =>  {
      delaying()
    })
});