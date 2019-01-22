$(document).ready(function() {

    const getDate = $('.month');

    (function() {
        var now, months, month, year;

        now = new Date();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();

        year = now.getFullYear();

        getDate.text(`${months[month]} ${year}`);
    })();

    /*$.ajax({
        url: '/spending',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: 'print',
        success: function(print){
            $('#myTable').DataTable()
        }
    });*/
    

    /*$('#myTable').DataTable( {
    	processing: true,
    	serverSide: true,
		    ajax: {
		        type: 'GET',
                url: 'http://localhost:4200/spending',
                contentType: 'application/json',
		        dataType: 'json',
                dataSrc: 'data'
		    },
		  columns: [
		    { data: 'categories_name' },
		    { data: 'transactions_amount' },
		  ]
	})*/
})