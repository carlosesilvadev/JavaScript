let contadorTarefasPendentes = 0, contadorTarefasConcluidas = 0;

const spanPendentes = document.getElementById('contadorTarefasPendentes');
const spanConcluidas = document.getElementById('contadorTarefasConcluidas');
const botaoAdicionarTarefa = document.getElementById('adicionarTarefa');
const listaDeTarefas = document.getElementById('listaDeTarefas');
const filtro = document.querySelector('main select');

botaoAdicionarTarefa.addEventListener('click', () => {
	
	const tarefaAdicionada = document.getElementById('nomeDaTarefa').value;
	if(!tarefaAdicionada) return;
	console.log(2);

	const itemDaLista = document.createElement('li');
	itemDaLista.dataset.status =  'pendente';

	const textoDaTarefa = document.createElement('span');
	textoDaTarefa.textContent = tarefaAdicionada;

	const botaoConcluirTarefa = document.createElement('i');
	botaoConcluirTarefa.classList.add('fa-solid');
	botaoConcluirTarefa.classList.add('fa-person-running');
	botaoConcluirTarefa.style.color = '#f1c40f';
	botaoConcluirTarefa.addEventListener('click', () => concluirTarefa(itemDaLista, textoDaTarefa, botaoConcluirTarefa));

	const botaoExcluirTarefa = document.createElement('i');
	botaoExcluirTarefa.classList.add('fa-solid');
	botaoExcluirTarefa.classList.add('fa-circle-xmark');
	botaoExcluirTarefa.style.color = '#e74c3c';
	botaoExcluirTarefa.addEventListener('click', () => excluirTarefa(itemDaLista));

	itemDaLista.appendChild(textoDaTarefa);
	itemDaLista.prepend(botaoConcluirTarefa);
	itemDaLista.appendChild(botaoExcluirTarefa);

	listaDeTarefas.appendChild(itemDaLista);

	contadorTarefasPendentes++;
	atualizaContadorTarefas();
});

function concluirTarefa(itemDaLista, textoDaTarefa, botaoConcluirTarefa){
	if(itemDaLista.dataset.status === 'concluida' || botaoConcluirTarefa.hasAttribute('disabled')) return;

	itemDaLista.dataset.status = 'concluída';
	textoDaTarefa.style.textDecoration = 'line-through';

	botaoConcluirTarefa.setAttribute('disabled','');

	contadorTarefasPendentes--;
	contadorTarefasConcluidas++;
	atualizaContadorTarefas();
}

function excluirTarefa(itemDaLista){
	if(itemDaLista.dataset.status === 'pendente'){
		contadorTarefasPendentes--;
	} else {
		contadorTarefasConcluidas--;
	}

	itemDaLista.remove();
	atualizaContadorTarefas();
}

function atualizaContadorTarefas(){
	spanPendentes.textContent = contadorTarefasPendentes;
	spanConcluidas.textContent = contadorTarefasConcluidas;
}

//Filtro
filtro.addEventListener('change', () => {
	const opcaoSelecionada = filtro.value;

	const itemsDaLista = listaDeTarefas.querySelectorAll('li');

	itemsDaLista.forEach(li => {
		if(opcaoSelecionada === 'Todas'){
			li.style.display = 'block'
		} else if (li.dataset.status === opcaoSelecionada.toLowerCase()){
				li.style.display = 'block';
		} else {
			li.style.display = 'none';
		}
	});
});