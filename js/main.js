window.onload = function() {
    setTimeout(function() {
        let preloader = document.querySelector('.preloader');
        if (!preloader.classList.contains('done')) {
            preloader.classList.add('done');
        }
    }, 500);
};


let request = new XMLHttpRequest();
    request.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
let usersData;

request.onload =  function() {
    if (request.readyState === 4 && request.status == 200) {
        usersData = JSON.parse(request.response).results;
        displayResults();
    } else {
        console.log(`Error ${request.status}: ${request.statusText}`);
    }
};

function displayResults() {
    for (let i = 0; i < usersData.length; i++) {
        document.querySelector('.users').innerHTML += '<li class = "user-block" onclick="displayModal(' + i + ')"><img class="user-pic_small" src="' 
        + usersData[i].picture.medium + '" alt = "user pic"><br><p>' + usersData[i].name.title + ' '
         + usersData[i].name.first + ' ' + usersData[i].name.last + '</p></li>';     
    }
}

function clearResults() {
    document.querySelector('.users').innerHTML = '';
}

let ch; 
document.querySelector('.input-number').addEventListener('input', function() {
    letCh();
    sortSelect();
});

function letCh() {
    if (+document.querySelector('.input-number').value > 0) {
        ch = +document.querySelector('.input-number').value - 1;
    } else { 
    ch = 0;
    }
    return ch;
}


function sortNameFirst() {
    usersData.sort(function(a, b){
        let nameA = a.name.first.slice(ch), nameB = b.name.first.slice(ch);
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        return 0; 
        });
        
        clearResults();
        displayResults();
}
function sortNameFirstReverse() {
    usersData.sort(function(a, b){
        let nameA = a.name.first.slice(ch), nameB = b.name.first.slice(ch);
        if (nameA < nameB) {return 1;}
        if (nameA > nameB) {return -1;}
        return 0; 
        });
        clearResults();
        displayResults();
}
function sortNameLast() {
    usersData.sort(function(a, b){
        let nameA = a.name.last.slice(ch), nameB = b.name.last.slice(ch);
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        return 0; 
        });
        clearResults ();
        displayResults();
}
function sortNameLasttReverse() {
    usersData.sort(function(a, b){
        let nameA = a.name.last.slice(ch), nameB = b.name.last.slice(ch);
        if (nameA < nameB) {return 1;}
        if (nameA > nameB) {return -1;}
        return 0; 
        });
        clearResults ();
        displayResults();
}

document.querySelector('.select-sort').addEventListener('change', sortSelect);
function sortSelect() {
    let s = document.querySelector('.select-sort').value;
    switch(s) {
        case 'first-name': return sortNameFirst();
        case 'first-name-reverse': return sortNameFirstReverse();
        case 'last-name': return sortNameLast();
        case 'last-name-reverse': return sortNameLasttReverse();
    }
}

function displayModal(i) {
    document.querySelector('.modal').classList.add('show');
    document.querySelector('.fade').classList.add('show');
    document.querySelector('.modal__name').innerHTML = '';
    document.querySelector('.modal__name').innerHTML = `${usersData[i].name.title} ${usersData[i].name.first} ${usersData[i].name.last}`; 
    if (document.body.contains(document.querySelector('.modal__user_pic'))) {
        document.querySelector('.modal__user_pic').remove();
        document.querySelector('.modal__name').insertAdjacentHTML('afterend',`<img class="modal__user_pic" src="${usersData[i].picture.large}" alt="user pic">` );
    } else {
        document.querySelector('.modal__name').insertAdjacentHTML('afterend',`<img class="modal__user_pic" src="${usersData[i].picture.large}" alt="user pic">` );
    }
    document.querySelector('.modal__address_street').innerHTML = '';
    document.querySelector('.modal__address_street').innerHTML = `<b>St: </b>${usersData[i].location.street}`;
    document.querySelector('.modal__address_city').innerHTML = '';
    document.querySelector('.modal__address_city').innerHTML = `<b>City: </b>${usersData[i].location.city}`;
    document.querySelector('.modal__address_state').innerHTML = '';
    document.querySelector('.modal__address_state').innerHTML = `<b>State: </b>${usersData[i].location.state}`;
    document.querySelector('.modal__contacts_email').innerHTML = '';
    document.querySelector('.modal__contacts_email').innerHTML = `<b>Mail: </b>${usersData[i].email}`;
    document.querySelector('.modal__contacts_phone').innerHTML = '';
    document.querySelector('.modal__contacts_phone').innerHTML = `<b>Phone: </b>${usersData[i].phone}`;
}

document.querySelector('.modal__close').addEventListener('click', removeModal);
document.querySelector('.fade').addEventListener('click', removeModal);

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        removeModal();
    }
});

function removeModal() {
    if (document.querySelector('.fade').classList.contains('show')) {
        document.querySelector('.fade').classList.remove('show');
    }
    if (document.querySelector('.modal').classList.contains('show')) {
        document.querySelector('.modal').classList.remove('show');
    }
}
