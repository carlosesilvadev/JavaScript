document.getElementsByTagName('a')[1].addEventListener('click', () =>{
	document.querySelector('main section[name="scriptSemCaminho"] p').innerText = 'Texto do parágrafo alterado com função em arquivo externo sem caminho.';
});