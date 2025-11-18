document.getElementsByTagName('a')[0].addEventListener('click', () =>{
	let classeAtual = document.getElementsByTagName('p')[0].classList[0];

	if(classeAtual != 'aumentarFonte'){
		document.getElementsByTagName('p')[0].classList.add('aumentarFonte');
		document.getElementsByTagName('a')[0].innerText = 'Diminuir Texto';
	} else {
		document.getElementsByTagName('p')[0].classList.remove('aumentarFonte');
		document.getElementsByTagName('a')[0].innerText = 'Aumentar Texto';
	}
});