$(() => {
    const modal = $('#addingNew');
    const msg = $('#success');
    const btnSave = $('#save');
    const BtnClose = $('#close');
    const selectField = $("#id option:selected");

    modal.modal('show');
    msg.hide();

    btnSave.click((e) => {
        e.preventDefault();
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
        msg.show();
          let delay = 1500; 
          let url = 'http://localhost:4200/exp';
          setTimeout(() => { window.location = url }, delay);
      })
    BtnClose.click(() =>  {
      let delay = 100; 
      let url = 'http://localhost:4200/exp';
      setTimeout(() => { window.location = url }, delay);
    })
});