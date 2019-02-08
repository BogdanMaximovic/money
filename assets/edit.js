$(() => {
  const myTable = $('#tableedit')
  const modal= $('#myModal')
  const btnSave = $('#save')

  myTable.DataTable({ "columnDefs": [
        {
            "targets": [ 0 ],
            "visible": false  
        }]});
    $(document).on("click", "#tableedit tbody tr",() => {
        modal.modal('show')

        let row = myTable.row();
        let rowData = myTable.row(this).data(); 
        $('#id').val(`${rowData[0]}`) 
        $("#nwct option:selected" ).text(`${rowData[1]}`); 
        $('#nwdt').val(`${rowData[2]}`) 
        $('#nwam').val(`${rowData[3]}`) 
        $('#nwcm').val(`${rowData[4]}`) 

     
    }); 
        btnSave.on('click', (event) => {
          event.preventDefault();
           
          let id = $('#id').val();
          let nwct = $('#nwct').val();
          let nwdt = $('#nwdt').val();
          let nwam = $('#nwam').val();
          let nwcm = $('#nwcm').val();

          let data = {};
          data.id = id;
          data.nwct = nwct;
          data.nwdt = nwdt;
          data.nwam = nwam;
          data.nwcm= nwcm;

          $.ajax({
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:4200/editval',
            success: (data) => {
              console.log(JSON.stringify(data));
              }
          });
          window.location.href = "http://localhost:4200/edit"
        });
});