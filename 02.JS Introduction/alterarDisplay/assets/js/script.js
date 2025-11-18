document.getElementsByTagName('button')[0].addEventListener('click', () =>{
	
	let currentStyle = document.getElementsByTagName('p')[0].style.display;

	if(currentStyle === 'block'){
		document.getElementsByTagName('p')[0].style.display = 'none';
		document.getElementsByTagName('button')[0].innerText = 'Show Text';
	} else {
		document.getElementsByTagName('p')[0].style.display = 'block';
		document.getElementsByTagName('button')[0].innerText = 'Hide Text';
	}
});