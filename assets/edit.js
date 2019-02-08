$(() => {
<<<<<<< HEAD
  let myTable = $('#tableedit')
  let modal= $('#myModal')
  let btnSave = $('#save')
=======
<<<<<<< HEAD
  let myTable = $('#tableedit')
  let modal= $('#myModal')
  let btnSave = $('#save')
=======
  const myTable = $('#tableedit')
  const modal= $('#myModal')
  const btnSave = $('#save')
>>>>>>> 90b4298b37cfb9b0b1ed3ce45b9bbd8391c54741
>>>>>>> f90720eca932706b0b52d3da85abe8a4aa3c0ae9

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
           
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f90720eca932706b0b52d3da85abe8a4aa3c0ae9
          var id = $('#id').val();
          var nwct = $('#nwct').val();
          var nwdt = $('#nwdt').val();
          var nwam = $('#nwam').val();
          var nwcm = $('#nwcm').val();
<<<<<<< HEAD
=======
=======
          let id = $('#id').val();
          let nwct = $('#nwct').val();
          let nwdt = $('#nwdt').val();
          let nwam = $('#nwam').val();
          let nwcm = $('#nwcm').val();
>>>>>>> 90b4298b37cfb9b0b1ed3ce45b9bbd8391c54741
>>>>>>> f90720eca932706b0b52d3da85abe8a4aa3c0ae9

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