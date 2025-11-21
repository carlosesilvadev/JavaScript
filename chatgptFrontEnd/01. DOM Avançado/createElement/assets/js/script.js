document.body.onload = adicionarElemento;

function adicionarElemento() {
	const novoTitulo = document.createElement('h1');

	const conteudoDoTitulo = document.createTextNode('Este texto foi criado com JavaScript.');

	novoTitulo.appendChild(conteudoDoTitulo);

	const divAtual = document.getElementsByTagName('div')[0];

	divAtual.parentNode.insertBefore(novoTitulo,divAtual);
}