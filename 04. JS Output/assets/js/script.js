/*innerHTML*/
document.getElementById('demo').innerHTML = '<h2>Hello World</h2>';

/*innerText*/
document.getElementById('demoText').innerText = 'Hello World';

/*document.write()*/
document.write('document.write(5+6) => ', 5+6);

document.getElementsByTagName('button')[0].addEventListener('click', () => {
	document.write(5+6);
});

/*window.alert()*/
document.getElementsByTagName('button')[1].addEventListener('click', () => {
	window.alert(5+6);
});

/*alert()*/
document.getElementsByTagName('button')[2].addEventListener('click', () => {
	alert(5+6);
});

console.log(5+6)

/*window.print()*/
document.getElementsByTagName('button')[3].addEventListener('click', () => {
	window.print();
});