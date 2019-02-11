 $(() => {
    let myTable = $('#tabledata')

    myTable.DataTable({ "columnDefs":[
        {
            "targets": [4],
            "visible" : false
        }
    ]});
   
    $(document).on("click", "#tabledata tbody tr", () => {
        let row = myTable.row();
        let rowData = myTable.row( this ).data(); 
        $('#myModal').modal('show')
        $('#id').val(`${rowData[4]}`)
        
  }); 
    $('#delete').click((e) =>{
      e.preventDefault();
        let id = $('#id').val();
        let data = {};
        data.id = id;
      
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:4200/delete',
        success: (data) => {
          console.log(JSON.stringify(data));
          }
        });
        window.location.href = "http://localhost:4200/transactions";
    })
});