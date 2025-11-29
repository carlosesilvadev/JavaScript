const suites = [
		{id:1, nome:'Suíte TV', descricao: '3 canais eróticos , ducha , garagem coletiva , internet Wi-Fi (sem fio) , secador de cabelo , som fm , TV LCD , ventilador de teto.', diaria: 180.00},
		{id:2, nome:'Suíte Luxo TV', descricao: '3 canais eróticos , ar-condicionado , ducha , garagem coletiva , internet Wi-Fi (sem fio) , secador de cabelo , som fm , TV LCD.', diaria: 190.00},
		{id:3, nome:'Suíte Hidro', descricao: '3 canais eróticos , ducha , garagem coletiva , hidro , internet Wi-Fi (sem fio) , secador de cabelo , som fm , TV LCD , ventilador de teto.', diaria: 220.00},
		{id:4, nome:'Suíte Luxo Hidro', descricao: '3 canais eróticos , ar-condicionado , ducha , garagem coletiva , hidro , internet Wi-Fi (sem fio) , secador de cabelo , som fm , TV LCD.', diaria: 230.00},
		{id:5, nome:'Suíte Luxo Hidro Cadeira Elétrica', descricao: '3 canais eróticos , ar-condicionado , cadeira erótica , ducha , garagem coletiva , hidro , internet Wi-Fi (sem fio) , secador de cabelo , som AM/FM , TV LCD.', diaria: 250.00},
];

document.addEventListener('DOMContentLoaded', () => carregarCarrinho());

document.addEventListener('click', e => {
	if(e.target.matches('.adicionar')){
		const suiteClicada = e.target.closest('tr');

		/*Precisei diminuir o id em -1 pq o array começa em 0 ao invés de 1*/
		adicionarNoCarrinho(suites[suiteClicada.dataset.id-1]);
	}

	if(e.target.matches('[data-remover]')){
		removerDoCarrinho();
	}

});

document.addEventListener('change', e =>{
	if(e.target.matches('input[type="date"]')){
		salvarCarrinho();
	}
});

const tabelaDeSuitesDisponiveis = document.querySelector('main section table tbody#suites');
const tabelaDeCarrinho = document.querySelector('main section table tbody#carrinho');

suites.forEach(suite => {
	const linha = document.createElement('tr');
	const celulaDoCodigo = document.createElement('td');
	const celulaDoNome = document.createElement('td');
	const celulaDaDescricao = document.createElement('td');
	const celulaDaDiaria = document.createElement('td');
	const celulaDoCarrinho = document.createElement('td');
	const celulaDoCarrinhoIcone = document.createElement('ion-icon');

	linha.dataset.id = suite.id;
	linha.classList.add('adicionar');

	celulaDoCodigo.textContent = suite.id;
	celulaDoCodigo.dataset.id = suite.id;
	celulaDoCodigo.classList.add('adicionar');

	celulaDoNome.textContent = suite.nome;
	celulaDoNome.classList.add('adicionar');

	celulaDaDescricao.textContent = suite.descricao;
	celulaDaDescricao.classList.add('adicionar');

	celulaDaDiaria.textContent = suite.diaria;
	celulaDaDiaria.dataset.diaria = suite.diaria;
	celulaDaDiaria.classList.add('adicionar');

	celulaDoCarrinhoIcone.setAttribute('name','add-circle-outline');
	celulaDoCarrinhoIcone.classList.add('adicionar');

	celulaDoCarrinho.appendChild(celulaDoCarrinhoIcone);
	celulaDoCarrinho.classList.add('adicionar');

	linha.append(celulaDoCodigo, celulaDoNome, celulaDaDescricao, celulaDaDiaria, celulaDoCarrinho);

	tabelaDeSuitesDisponiveis.appendChild(linha);
});


function adicionarNoCarrinho(suite){
	const suiteAdicionada = tabelaDeCarrinho.querySelector(`tr[data-id='${suite.id}']`);

	if(suiteAdicionada){
		return;
	} else{
		/*Se existir item no carrinho então remove para poder adicionar a nova Suite que foi clicada*/
		if(tabelaDeCarrinho.querySelector('tr')) removerDoCarrinho();
		const linha = document.createElement('tr');
		const celulaDoCodigo = document.createElement('td');
		const celulaDoNome = document.createElement('td');
		const celulaDaDescricao = document.createElement('td');
		const celulaDaDiaria = document.createElement('td');
		const celulaDaAgenda = document.createElement('td');
		const calendario = document.createElement('input');
		const celulaDeRemover = document.createElement('td');
		const celulaDeRemoverIcone = document.createElement('ion-icon');

		linha.dataset.id = suite.id;

		celulaDoCodigo.textContent = suite.id;
		celulaDoCodigo.dataset.id = suite.id;
	
		celulaDoNome.textContent = suite.nome;
	
		celulaDaDescricao.textContent = suite.descricao;

		calendario.value = suite.agenda;
		calendario.type = 'date';
		calendario.setAttribute('min', calcularData('min'));
		calendario.setAttribute('max', calcularData('max'));

		celulaDaAgenda.appendChild(calendario);

		celulaDaDiaria.textContent = suite.diaria;
		celulaDaDiaria.dataset.diaria = suite.diaria;

		celulaDeRemoverIcone.setAttribute('name','remove-circle-outline');
		celulaDeRemoverIcone.dataset.remover = '';

		celulaDeRemover.appendChild(celulaDeRemoverIcone);
		celulaDeRemover.dataset.remover = '';

		linha.append(celulaDoCodigo, celulaDoNome, celulaDaDescricao, celulaDaAgenda, celulaDaDiaria, celulaDeRemover);

		tabelaDeCarrinho.appendChild(linha);
		salvarCarrinho();
	}
}

function calcularData(extremo){
	let data = new Date();
 	let anoAtual = data.getFullYear();
 	let mesAtual = data.getMonth()+1;
 	let diaAtual = data.getDate();

	if(extremo === 'min'){
		if (diaAtual < 10){ diaAtual = '0'+data.getDate(); }
		return `${anoAtual}-${mesAtual}-${diaAtual}`;
	} else {
		data.setDate(data.getDate() +7);
		anoAtual = data.getFullYear();
		mesAtual = data.getMonth()+1;
 		diaAtual = data.getDate();
			if (diaAtual < 10){ diaAtual = '0'+data.getDate(); }
		return `${anoAtual}-${mesAtual}-${diaAtual}`;
	}
}

function removerDoCarrinho(){
	tabelaDeCarrinho.querySelector('tr').remove();
	salvarCarrinho();
}

function salvarCarrinho(){
	const carrinho = [];

	tabelaDeCarrinho.querySelectorAll('tr').forEach(item =>{
		const id = item.children[0].textContent;
		const nome = item.children[1].textContent;
		const descricao = item.children[2].textContent;
		const agenda = item.querySelector('td input[type="date"]').value;
		const valor = item.children[4].textContent;
		
		carrinho.push({id, nome, descricao, agenda, valor});
	});

	localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}

function carregarCarrinho(){
	const carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

	carrinho.forEach(item =>{
		adicionarNoCarrinho(item);
	});
}