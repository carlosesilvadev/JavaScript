const produtos = ["banana","laranja","cereja","morango","manga","cenoura","goiaba","uva","acerola","beringela"];
let contador = 1, ultimoContador;

/*Adicionar Item na Lista de maneira aleatória pega um dos produtos e adiciona na lista quando clica no botão.*/

document.querySelector('main button[name="adicionar"]').addEventListener('click', () => {
	
	const novoItem = document.createElement('li');
	
	novoItem.textContent = `${contador} - ` + produtos[Math.trunc(Math.random(10)*10)];
	
	document.querySelector('main ul').appendChild(novoItem);

	contador +=1;

	ultimoContador = contador;
});

/*Exclui Item da Lista a partir do ultimo item até o primeiro item da lista com controle do ultimoContador para saber qual vai ser o próximo item da lista a partir do ultimo item que foi excluído*/

document.querySelector('main button[name="excluir"]').addEventListener('click', () => {

	const lista = document.querySelector('main ul');
	
	if(lista.firstChild){
		lista.removeChild(lista.lastElementChild);
		ultimoContador -= 1;
		contador = ultimoContador;
	} else{
		contador = 1;
	}

});