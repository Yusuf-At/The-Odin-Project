const showButton = document.querySelector('#showdialog');
const inputDialog = document.querySelector('#input-dialog');
const formData = document.querySelector('.input-book');
const cardContainer = document.querySelector('.card-container');

function Book (author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

let myLibrary = [
    {
    'author': 'George R. R. Martin',
    'title': 'A Game of Thrones',
    'pages': 694,
    'status': 'Not Read'
    },
    {
    'author': 'Frank Herbert',
    'title': 'Dune',
    'pages': 896,
    'status': 'Not Read'
    },
    {
    'author': ' Dale Carnegie',
    'title': 'How to Win Friends & Influence People',
    'pages': 320,
    'status': 'Not Read'
    }
];

addNewCard();

// evenlistener for input form
showButton.addEventListener('click', () => {
    inputDialog.showModal();
})

// all data in input on showModal store value to the submit button
formData.addEventListener("submit", function (event) {
    let authorValue = document.getElementById('author').value;
    let titleValue = document.getElementById('title').value;
    let pagesValue = document.getElementById('pages').value;
    let statusValue = document.getElementById('status').value;

    function addBooktoLibrary() {
        let newBook = new Book(authorValue, titleValue, pagesValue, statusValue)
        myLibrary.push(newBook);
        // myLibrary.forEach((v, index) => {v.index = index})
    }
    addBooktoLibrary()
    addNewCard()
    event.preventDefault();
    // add cancel function
    // add clear input when submit or cancel
})

function addNewCard () {
    cardContainer.innerHTML = ''
    // while (cardContainer.firstChild) {
    //     cardContainer.removeChild(cardContainer.lastChild)
    // };
    for (let i = 0; i < myLibrary.length; i++) {
        // create a card div
        const div = document.createElement('div');
        div.classList.add('card');
        cardContainer.appendChild(div);
        // create card-data element
        const pAuthor = document.createElement('p');
        const pTitle = document.createElement('p');
        const pPages = document.createElement('p');
        const bStatus = document.createElement('button');
        bStatus.classList.add(`status`);
        bStatus.classList.add(`no${i}`);
        const bRemove = document.createElement('button');
        bRemove.classList.add(`remove-button`);
        bRemove.classList.add(`no${i}`);
        // myLibrary.splice(i, 0, 'index: i')

        pAuthor.textContent = myLibrary[i].author;
        pTitle.textContent = myLibrary[i].title;
        pPages.textContent = `${myLibrary[i].pages} pages`;
        bStatus.textContent = myLibrary[i].status;
        bRemove.textContent = 'Remove'

        div.append(pAuthor, pTitle, pPages, bStatus, bRemove);
        cardContainer.append(div)
    };
    // cardContainer.replaceChildren(newCard)
};

function removeCard(listName) {
    let indexNo = parseInt(listName.slice(-1));
    myLibrary = myLibrary.filter((el, index) => index !== indexNo);
    addNewCard()
}

function changeStatus(e, status) {
    let indexNo = parseInt(status.slice(-1));

    const statusButton = document.getElementsByClassName(`${status}`)[0];
    // change status on dom and array
    let statusValue = '';
    e.target.innerHTML == 'Read' ? statusValue = 'Not Read' : statusValue = 'Read';
    
    myLibrary[indexNo].status = statusValue;
    
    const bStatus = document.createElement('button');
    bStatus.classList.add(`status`);
    bStatus.classList.add(`no${indexNo}`);
    bStatus.innerHTML = statusValue;
    
    statusButton.parentNode.replaceChild(bStatus, statusButton);
}


// Remove and Change status of the Book Handler
cardContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
        removeCard(e.target.classList.value)
    } else if (e.target.classList.contains('status')) {
        changeStatus(e, e.target.classList.value)
    };
})