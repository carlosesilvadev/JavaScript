window.addEventListener('load', () =>{
	const novoElementoH1 = document.createElement('h1');

	novoElementoH1.textContent = 'Este texto foi criado com createElement';

	const divAtual = document.querySelector('main div');

	divAtual.before(novoElementoH1);

});