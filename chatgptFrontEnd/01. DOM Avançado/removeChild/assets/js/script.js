const produtos = ["pão francês", "mouse", "laranja", "maminha", "orégano", "cartucho", "papel de parede", "pastel", "salsicha", "alho", "macarrão", "extrato de tomate"];

let contador = 1;

const botaoAdicionar = document.querySelector('main button[name="adicionar"]');
const botaoExcluir = document.querySelector('main button[name="excluir"]');
const lista = document.querySelector('main ul');

botaoAdicionar.addEventListener('click', () => {

	if(botaoExcluir.hasAttribute('disabled')){
		botaoExcluir.removeAttribute('disabled');
		botaoExcluir.style.cursor = 'pointer';
	}

	const novoItem = document.createElement('li');
	
	let produtoAleatorio = produtos[Math.floor(Math.random()*produtos.length)];

	novoItem.textContent = `${contador} - ${produtoAleatorio}`;

	lista.appendChild(novoItem);

	contador++;
});

botaoExcluir.addEventListener('click', () =>{
	
	if(lista.children.length > 0){
		lista.removeChild(lista.lastElementChild);
		contador--;
	} else {
		contador = 1;
		botaoExcluir.setAttribute('disabled','');
		botaoExcluir.style.cursor = 'not-allowed';
	}
});