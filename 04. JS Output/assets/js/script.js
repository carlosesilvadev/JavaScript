document.querySelector('main table tbody tr td:first-child').addEventListener('mouseenter', () => {
	document.querySelector('main table tbody tr td:last-child').innerHTML = '<h1>Passe o mouse no método</h1>';
});

document.querySelector('main table tbody tr:nth-child(2) td:first-child').addEventListener('mouseenter', () => {
	document.querySelector('main table tbody tr:nth-child(2) td:last-child').innerText = 'Texto alterado com innerText';
});

document.write('Este é o resultado do método document.write(25+19): '+ (25+19));

document.querySelector('main table tbody tr:nth-child(4) td button').addEventListener('click', () => {
	document.write('Este é o resultado do método document.write(25+19), depois que a página é carregada: '+ (25+19));
});

document.querySelector('main table tbody tr:nth-child(5) td button').addEventListener('click', () => {
	window.alert(25-19);
});

document.querySelector('main table tbody tr:nth-child(6) td button').addEventListener('click', () => {
	alert(25*19);
});

console.log(19-25);

document.querySelector('main table tbody tr:nth-child(8) td button').addEventListener('click', () => {
	window.print();
});