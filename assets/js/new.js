 $(() => {

 	let modal = $('#addingNew')
 	let findIconId = $('.aLink')
 	let btnSave = $('#save')
 	let btnClose = $('#close')

    function delaying(url) {
        let delay = 500;
        setTimeout(() => { window.location = url }, delay);
    }

	modal.modal('show')
	let iconID = null;

	findIconId.on('click', function (event) {
		event.preventDefault();
		iconID = $(this).find('.iconImgId').attr('data-id');  
		icon = $(this).find('img')
		icon.toggleClass('iconBkg')
	});

	btnSave.click((e) => {
	  e.preventDefault();

	  let category = $('#name').val();
	  let radioBtn = $('input[name=radio]:checked').val();
	  let color = $('#color').val();

	  let data = {};
	  data.category = category;
	  data.radioBtn = radioBtn;
	  data.iconID = iconID;
	  data.color = color;

	  $.ajax({
	    type: 'post',
	    data: JSON.stringify(data),
	    contentType: 'application/json',
	    url: 'http://localhost:4200/addingNew',
	    success: (data) => {
	      console.log(JSON.stringify(data));
	      }
	    })

	let url = 'http://localhost:4200/add';
	delaying(url)

	})

	btnClose.click((event) => { 
		let url = 'http://localhost:4200/exp';
		delaying(url)
	})
})