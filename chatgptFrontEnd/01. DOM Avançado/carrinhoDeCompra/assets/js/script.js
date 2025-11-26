window.addEventListener('load', () => {
	restaurarCarrinho();
});

const produtosDaLoja = [
			{id: 1, nome: 'Refrigerante Fanta Laranja Pet 2l', preco: 9.59},
			{id: 2, nome: 'Cebola Nacional 500g', preco: 1.60},
			{id: 3, nome: 'Óleo de Soja Soya 900ml', preco: 4.99},
			{id: 4, nome: 'Macarrão Espaguete com Ovos N8 Adria 500g', preco: 4.04},
			{id: 5, nome: 'Molho de Tomate Tradicional Fugini 300g', preco: 1.91},
];

const tabelaDeProdutosDaLoja = document.querySelector('#produtosDaLoja');
const tabelaDeprodutosDoCarrinho = document.querySelector('#produtosDoCarrinho');


produtosDaLoja.forEach(produto => {
	const linha = document.createElement('tr');
	const celulaID = document.createElement('td');
	const celulaProduto = document.createElement('td');
	const celulaPreco = document.createElement('td');
	const celulaAdicionarCarrinho = document.createElement('td');

	celulaID.textContent = produto.id;
	celulaProduto.textContent = produto.nome;
	celulaPreco.textContent = produto.preco;
	celulaAdicionarCarrinho.classList.add('fa-solid','fa-cart-plus', 'fa-2x');
	celulaAdicionarCarrinho.style.cursor = 'pointer';
	celulaAdicionarCarrinho.addEventListener('click', () => adicionarAoCarrinho(produto));

	linha.append(celulaID,celulaProduto,celulaPreco,celulaAdicionarCarrinho);

	tabelaDeProdutosDaLoja.appendChild(linha);
});

/*
*Aqui foi um for só pra testar se funcionava, e funcionou, só mudou a lógica comparado com o forEach


for(contador = 0; contador < produtosDaLoja.length; contador++){
	const linha = document.createElement('tr');
	const celulaID = document.createElement('td');
	const celulaProduto = document.createElement('td');
	const celulaPreco = document.createElement('td');
	const celulaAdicionarCarrinho = document.createElement('td');

	celulaID.textContent = produtosDaLoja[contador].id;
	celulaProduto.textContent = produtosDaLoja[contador].nome;
	celulaPreco.textContent = produtosDaLoja[contador].preco;
	celulaAdicionarCarrinho.textContent = '+';
	celulaAdicionarCarrinho.style.cursor = 'pointer';
	celulaAdicionarCarrinho.addEventListener('click', () => adicionarAoCarrinho(produtosDaLoja[contador]));

	linha.append(celulaID,celulaProduto,celulaPreco,celulaAdicionarCarrinho);

	tabelaDeProdutosDaLoja.appendChild(linha);
}

*
*/

function adicionarAoCarrinho(produto){
	
	const existeProdutoNoCarrinho = tabelaDeprodutosDoCarrinho.querySelector(`tr td[data-id='${produto.id}']`);

	if(existeProdutoNoCarrinho){
		let qtdAtual = 0;

		qtdAtual += Number(existeProdutoNoCarrinho.parentNode.querySelector('td[data-quantidade]').textContent)+1;

		existeProdutoNoCarrinho.parentNode.querySelector('td[data-quantidade]').textContent = qtdAtual;

		existeProdutoNoCarrinho.parentNode.querySelector('td:nth-child(7)').textContent = (produto.preco*qtdAtual).toFixed(2);

		calcularTotal();
		
		return;
	}

	const linha = document.createElement('tr');
	const celulaID = document.createElement('td');
	const celulaProduto = document.createElement('td');
	const celulaPreco = document.createElement('td');
	const celulaQuantidade = document.createElement('td');
	const celulaAdicionar = document.createElement('td');
	const celulaDiminuir = document.createElement('td');
	const celulaSubtotal = document.createElement('td');
	const celulaRemover = document.createElement('td');

	celulaID.textContent = produto.id;
	celulaID.dataset.id = produto.id;

	celulaProduto.textContent = produto.nome;

	celulaPreco.textContent = produto.preco;

	celulaQuantidade.textContent = 1;
	celulaQuantidade.dataset.quantidade = 1;

	celulaAdicionar.classList.add('fa-solid', 'fa-circle-plus', 'fa-2x');
	celulaAdicionar.style.cursor = 'pointer';
	celulaAdicionar.addEventListener('click', () => alterarQuantidade(produto.id, +1));

	celulaDiminuir.classList.add('fa-solid', 'fa-circle-minus', 'fa-2x');
	celulaDiminuir.style.cursor = 'pointer';
	celulaDiminuir.addEventListener('click', () => alterarQuantidade(produto.id, -1));

	celulaSubtotal.textContent = Number(celulaPreco.textContent*celulaQuantidade.textContent).toFixed(2);

	celulaRemover.classList.add('fa-solid', 'fa-circle-xmark', 'fa-2x');
	celulaRemover.style.cursor = 'pointer';
	celulaRemover.addEventListener('click', () => removerItemDoCarrinho(produto.id));

	linha.append(celulaID,celulaProduto,celulaPreco,celulaQuantidade,celulaAdicionar,celulaDiminuir,celulaSubtotal,celulaRemover);

	tabelaDeprodutosDoCarrinho.appendChild(linha);

	calcularTotal();
}

function alterarQuantidade(id, valor){
	const linha = tabelaDeprodutosDoCarrinho.querySelector(`tr td[data-id='${id}']`).parentNode;
	
	let qtdAtual = 0;

	qtdAtual += Number(linha.querySelector('td[data-quantidade]').textContent)+valor;

	if(qtdAtual <= 0) {removerItemDoCarrinho(id); return;}

	linha.querySelector('td[data-quantidade]').textContent = qtdAtual;

	linha.querySelector('td:nth-child(7)').textContent = (linha.querySelector('td:nth-child(3)').textContent*qtdAtual).toFixed(2);

	calcularTotal();
}

function calcularTotal(){
	let total = 0;
	let subTotal = tabelaDeprodutosDoCarrinho.querySelectorAll('tr td:nth-child(7)');

	subTotal.forEach(sub => {
		total += Number(sub.textContent);
	});

	document.querySelector('#totalDoCarrinho').textContent = total.toFixed(2);

	salvarCarrinho();
}

function removerItemDoCarrinho(id){
	const linha = tabelaDeprodutosDoCarrinho.querySelector(`tr td[data-id='${id}']`).parentNode;
	linha.remove();
	calcularTotal();
}

function salvarCarrinho(){
	const carrinho = [];

	tabelaDeprodutosDoCarrinho.querySelectorAll('tr').forEach(linha => {
		const id = linha.children[0].textContent;
		const nome = linha.children[1].textContent;
		const preco = Number(linha.children[2].textContent);
		const quantidade = Number(linha.children[3].textContent);

		carrinho.push({id, nome, preco, quantidade});
	});

	localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}

function restaurarCarrinho(){
	const carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

	carrinho.forEach(itemDoCarrinho =>{
		itemDoCarrinho.preco = Number(itemDoCarrinho.preco);
		adicionarAoCarrinho(itemDoCarrinho);

		const linha = tabelaDeprodutosDoCarrinho.querySelector(`tr td[data-id='${itemDoCarrinho.id}']`).parentNode;
		
		linha.querySelector('td[data-quantidade]').textContent = itemDoCarrinho.quantidade;

		linha.querySelector('td:nth-child(7)').textContent = (itemDoCarrinho.preco * itemDoCarrinho.quantidade).toFixed(2);
	});

	calcularTotal();
}