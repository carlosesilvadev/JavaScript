window.addEventListener('load', () => {
	const novoElementoCriado = document.createElement('h1');

	novoElementoCriado.textContent = 'Este é o conteúdo do novo elemento criado com createElement.';

	const elementoJaExistente = document.querySelector('main div');

	/*Before - Adiciona o elemento como irmão antes do elemento alvo*/
	elementoJaExistente.before(novoElementoCriado);

	/*After - Adiciona o elemento como irmão depois do elemento alvo
	elementoJaExistente.after(novoElementoCriado);*/

	/*appendChild - Adiciona o elemento como ultimo filho dentro do elemento alvo
	elementoJaExistente.appendChild(novoElementoCriado);*/

	/*prepend - Adiciona o elemento como primeiro filho dentro do elemento alvo
	elementoJaExistente.prepend(novoElementoCriado);*/
});