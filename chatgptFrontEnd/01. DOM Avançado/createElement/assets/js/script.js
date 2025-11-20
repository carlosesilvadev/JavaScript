document.body.onload = addElement;

function addElement() {
	//Cria um novo elemento div.
	const newDiv = document.createElement('div');

	//E adiciona algum conteúdo no novo elemento.
	const newContent = document.createTextNode('Hi there and greetings!');

	//Adiciona o 'text node' para o div recém criado.
	newDiv.appendChild(newContent);

	const currentDiv = document.getElementById('div1');

	//Insere a nova div criada antes da div atual que já existe no documento.
	document.body.insertBefore(newDiv,currentDiv);
}

