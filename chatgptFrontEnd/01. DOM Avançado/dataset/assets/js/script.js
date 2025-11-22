const el = document.querySelector('#user');

el.dataset.dateOfBirth = '1960-10-03';

if(el.dataset.someDataAttr === undefined){
	el.dataset.someDataAttr = 'mydata';
}

delete el.dataset.user;