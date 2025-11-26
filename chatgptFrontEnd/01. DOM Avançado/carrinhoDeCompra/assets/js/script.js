window.addEventListener('DOMContentLoaded', () =>{
	carregarCarrinho();
});

let produtosDaLoja = [
	{id: 1, nome: 'Arroz', preco: 5.40}, 
	{id: 2, nome: 'Feijão', preco: 7.25}, 
	{id: 3, nome: 'Macarrão', preco: 3.75}, 
	{id: 4, nome: 'Alho', preco: 2.89}
];

let produtoEscolhido = 1;

const tabelaDeProdutos = document.querySelector('main section table#produtosDaLoja tbody');
const tabelaDoCarrinho = document.querySelector('main section table#carrinhoDeCompra tbody');

produtosDaLoja.forEach(produto => {
	
	const linha = document.createElement('tr');
	const celulaIdentificador = document.createElement('td');
	const celulaNome = document.createElement('td');
	const celulaPreco = document.createElement('td');
	const celulaAdicionarCarrinho = document.createElement('td');


	celulaIdentificador.textContent = produto.id;
	linha.appendChild(celulaIdentificador);

	celulaNome.textContent = produto.nome;
	linha.appendChild(celulaNome);

	celulaPreco.textContent = produto.preco;
	linha.appendChild(celulaPreco);

	celulaAdicionarCarrinho.classList.add('fa-solid');
	celulaAdicionarCarrinho.classList.add('fa-cart-plus');
	celulaAdicionarCarrinho.setAttribute('name','adicionarItemNoCarrinho');
	celulaAdicionarCarrinho.style.cursor = 'pointer';
	celulaAdicionarCarrinho.addEventListener('click', () => adicionarAoCarrinho(produto));
	linha.appendChild(celulaAdicionarCarrinho);

	tabelaDeProdutos.appendChild(linha);
});

function adicionarAoCarrinho(produto){

	//Verifica se o item já existe no carrinho
	const existente = tabelaDoCarrinho.querySelector(`tr[data-id="${produto.id}"]`);

	if(existente){
		//Aumenta a quantidade
		const qtdCell = existente.querySelector('[data-qtd]');
		let qtd = Number(qtdCell.textContent);
		qtd++;
		qtdCell.textContent = qtd;

		//Recalcula total
		const totalCell = existente.querySelector('[data-total]');
		totalCell.textContent = (qtd*produto.preco).toFixed(2);

		totalDoCarrinho();

		salvarCarrinho();

		return;
	}
	
	//Criar nova linha se o produto não existir no carrinho
	const linha = document.createElement('tr');
	linha.setAttribute('data-id', produto.id);

	const celulaId = document.createElement('td');
	celulaId.textContent = produto.id;

	const celulaNome = document.createElement('td');
	celulaNome.textContent = produto.nome;

	const celulaPreco = document.createElement('td');
	celulaPreco.textContent = produto.preco.toFixed(2);

	const celulaQtd = document.createElement('td');
	celulaQtd.textContent = '1';
	celulaQtd.setAttribute('data-qtd','');
	
	const celulaMais = document.createElement('td');
	celulaMais.textContent = '+';
	celulaMais.style.cursor = 'pointer';
	celulaMais.addEventListener('click', () => alterarQuantidade(produto.id, +1));

	const celulaMenos = document.createElement('td');
	celulaMenos.textContent = '-';
	celulaMenos.style.cursor = 'pointer';
	celulaMenos.addEventListener('click', () => alterarQuantidade(produto.id, -1));

	const celulaTotal = document.createElement('td');
	celulaTotal.textContent = produto.preco.toFixed(2);
	celulaTotal.setAttribute('data-total','');

	const celulaRemover = document.createElement('td');
	celulaRemover.textContent = 'X';
	celulaRemover.style.cursor = 'pointer';
	celulaRemover.addEventListener('click', () => excluirItemDoCarrinho(produto.id));

	linha.appendChild(celulaId);
	linha.appendChild(celulaNome);
	linha.appendChild(celulaPreco);
	linha.appendChild(celulaQtd);
	linha.appendChild(celulaMais);
	linha.appendChild(celulaMenos);
	linha.appendChild(celulaTotal);
	linha.appendChild(celulaRemover);


	tabelaDoCarrinho.appendChild(linha);

	totalDoCarrinho();

	salvarCarrinho();
}

function alterarQuantidade(identificador, valor){
	const linhaDoCarrinho = tabelaDoCarrinho.querySelector(`tr[data-id='${identificador}']`);

	const qtdItem = Number(linhaDoCarrinho.querySelector('td[data-qtd]').textContent) + valor;
	
	if(qtdItem <= 0) return;

	linhaDoCarrinho.querySelector('td[data-qtd]').textContent = qtdItem;

	const subtotal = Number(linhaDoCarrinho.querySelector('td:nth-child(3)').textContent)*qtdItem;

	linhaDoCarrinho.querySelector('td[data-total]').textContent = subtotal.toFixed(2);

	totalDoCarrinho();

	salvarCarrinho();
}

function excluirItemDoCarrinho(id){
	const linhaDoCarrinho = tabelaDoCarrinho.querySelector(`tr[data-id='${id}']`);

	linhaDoCarrinho.remove();

	totalDoCarrinho();

	salvarCarrinho();
}

function totalDoCarrinho(){
	let total = 0;

	const subTotal = tabelaDoCarrinho.querySelectorAll('tr td[data-total]');

	subTotal.forEach(item => {
		total += Number(item.textContent);
	});

	document.querySelector('#total').textContent = total.toFixed(2);
}

function salvarCarrinho(){
	const carrinho = [];

	tabelaDoCarrinho.querySelectorAll('tr').forEach(linha =>{
		const id = Number(linha.getAttribute('data-id'));
		const nome = linha.children[1].textContent;
		const preco = Number(linha.children[2].textContent);
		const qtd = Number(linha.querySelector('td[data-qtd]').textContent);

		carrinho.push({id, nome, preco, qtd});
	});

	localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}

function carregarCarrinho(){
	const carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

	carrinho.forEach(itemDoCarrinho => {
		itemDoCarrinho.preco = Number(itemDoCarrinho.preco);
		adicionarAoCarrinho(itemDoCarrinho);

		const linha = tabelaDoCarrinho.querySelector(`tr[data-id='${itemDoCarrinho.id}']`);

		linha.querySelector('td[data-qtd]').textContent = itemDoCarrinho.qtd;
		linha.querySelector('td[data-total]').textContent = (itemDoCarrinho.preco * itemDoCarrinho.qtd).toFixed(2);
	});

	totalDoCarrinho();
}