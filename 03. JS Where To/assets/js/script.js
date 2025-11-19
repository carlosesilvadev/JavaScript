document.getElementsByTagName('input')[0].addEventListener('click', () =>{
	document.querySelector('main section[name="scriptNoArquivoExterno"] p').innerText = 'Texto do parágrafo alterado com função em arquivo externo.';
});

document.getElementsByTagName('input')[2].addEventListener('click', () =>{
	document.querySelector('main section[name="scriptNaRaiz"] p').innerText = "Texto do parágrafo alterado com função em arquivo externo com caminho a partir da raiz do disco /";
});