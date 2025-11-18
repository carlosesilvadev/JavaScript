document.getElementsByName('botao')[0].addEventListener('click', () => {

	let displayDoParagrafo = document.getElementsByName('paragrafo')[0].style.display;
	
	if(displayDoParagrafo === 'block'){
		document.getElementsByName('paragrafo')[0].style.display = 'none';
		document.getElementsByName('botao')[0].value = 'Exibir Texto';
	} else {
		document.getElementsByName('paragrafo')[0].style.display = 'block';
		document.getElementsByName('botao')[0].value = 'Esconder Texto';
	}
});