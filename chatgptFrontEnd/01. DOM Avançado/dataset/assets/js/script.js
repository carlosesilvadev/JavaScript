let botaoAlterarDataset = document.querySelector('main section button');

botaoAlterarDataset.addEventListener('click', () => {
	let nomeDataset = document.querySelector('main section input').value;
	let valorDataset = document.querySelector('main section input:nth-child(2)').value;
	let elementoAlvo = document.querySelector('main section article');

	elementoAlvo.dataset[nomeDataset] = valorDataset;

	elementoAlvo.innerHTML = `${nomeDataset}: <br> ${valorDataset}`;
});