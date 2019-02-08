 $(() => {

 	const modal = $('#addingNew')
 	const findIconId = $('.aLink')
 	const msg = $('#success')
 	const btnSave = $('#save')
 	const btnClose = $('#close')

	modal.modal('show')
	msg.hide();
	let iconID = null;

	findIconId.on('click', (event) => {
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
	    });
	  msg.show();
	    let delay = 1500; 
	    let url = 'http://localhost:4200/add';
	    setTimeout(() => { window.location = url }, delay);
	})
	btnClose.click((event) => {
	let delay = 100; 
	let url = 'http://localhost:4200/exp';
	setTimeout(() => { window.location = url }, delay);
	})
});