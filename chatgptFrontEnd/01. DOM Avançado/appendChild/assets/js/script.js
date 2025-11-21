let numeroItem = 1;

document.querySelector('main button').addEventListener('click', () => {

	const novoItem = document.createElement('li');
	novoItem.textContent = `Elemento ${numeroItem}`;
	numeroItem = numeroItem+1;

	const lista = document.querySelector('main ul');
	
	lista.appendChild(novoItem);
});