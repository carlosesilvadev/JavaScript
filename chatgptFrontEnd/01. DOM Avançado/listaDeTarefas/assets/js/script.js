let contadorPendentes = 0, contadorConcluidas = 0;

const spanPendentes = document.getElementsByName('contadorPendentes')[0];
const spanConcluidas = document.getElementsByName('contadorConcluidas')[0];
const adicionarTarefa = document.getElementsByTagName('button')[0];
const listaTarefasPendentes = document.getElementsByName('tarefasPendentes')[0];
const listaTarefasConcluidas = document.getElementsByName('tarefasConcluidas')[0];
const filtro = document.querySelector('main section select');

spanPendentes.innerText = contadorPendentes;
spanConcluidas.innerText = contadorConcluidas;

adicionarTarefa.addEventListener('click', () => {

	let campoNovaTarefa = document.getElementsByName('novaTarefa')[0].value;

	let novaTarefa = document.createElement('li');

	let novaTarefaBotaoConcluir = document.createElement('button');

	novaTarefaBotaoConcluir.setAttribute('onclick', 'concluirTarefa(this)');

	novaTarefaBotaoConcluir.textContent = "O";

	let novaTarefaBotaoExcluir = document.createElement('button');

	novaTarefaBotaoExcluir.setAttribute('onclick', 'excluirTarefa(this)');

	novaTarefaBotaoExcluir.textContent = "X";

	novaTarefa.textContent = campoNovaTarefa;

	novaTarefa.appendChild(novaTarefaBotaoConcluir);

	novaTarefa.appendChild(novaTarefaBotaoExcluir);

	novaTarefa.dataset.status = 'pendente';

	listaTarefasPendentes.appendChild(novaTarefa);
	
	contadorPendentes +=1;
	spanPendentes.innerText = contadorPendentes;
});

function concluirTarefa(elemento){
	contadorConcluidas +=1;
	spanConcluidas.innerText = contadorConcluidas;
	contadorPendentes -=1;
	spanPendentes.innerText = contadorPendentes;
	elemento.parentNode.style.textDecoration = 'line-through';
	elemento.setAttribute('disabled','');
	elemento.parentNode.dataset.status = 'concluida';
}

function excluirTarefa(elemento){
	
	if(contadorConcluidas > 0){
		contadorConcluidas -=1;
		spanConcluidas.innerText = contadorConcluidas;
	}

	if(contadorPendentes > 0){
		contadorPendentes -=1;
		spanPendentes.innerText = contadorPendentes;
	}
	
	elemento.parentNode.remove();
}

filtro.addEventListener('change', () => {
	
	if(filtro.value === 'Pendentes'){
		let tamanhoPendentes = listaTarefasPendentes.querySelectorAll('li[data-status="pendente"]').length;

		for(let contador=0;contador <= tamanhoPendentes; contador++){
			listaTarefasPendentes.querySelectorAll('li[data-status="pendente"]')[contador].style.display = 'block';
			listaTarefasPendentes.querySelectorAll('li[data-status="concluida"]')[contador].style.display = 'none';

		}
	} else if (filtro.value === 'Concluídas'){
		let tamanhoConcluidas = listaTarefasPendentes.querySelectorAll('li[data-status="concluida"]').length;

		for(let contador=0;contador <= tamanhoConcluidas; contador++){
			listaTarefasPendentes.querySelectorAll('li[data-status="concluida"]')[contador].style.display = 'block';
			listaTarefasPendentes.querySelectorAll('li[data-status="pendente"]')[contador].style.display = 'none';

		}
	} else {
		let tamanhoLista = listaTarefasPendentes.querySelectorAll('li').length;

		for(let contador=0;contador <= tamanhoLista; contador++){
			listaTarefasPendentes.querySelectorAll('li[data-status="concluida"]')[contador].style.display = 'block';
			listaTarefasPendentes.querySelectorAll('li[data-status="pendente"]')[contador].style.display = 'block';
		}
	}
});