document.querySelector('main i').addEventListener('click', () => {

	let lampada = document.querySelector('header i');

	if(lampada.id == ''){
		document.querySelector('header i').setAttribute('id', 'lampadaLigada');
		document.querySelector('main i').setAttribute('id', 'botaoClicado');
	}else{
		document.querySelector('header i').removeAttribute('id', 'lampadaLigada');
		document.querySelector('main i').removeAttribute('id', 'botaoClicado');
	}
});