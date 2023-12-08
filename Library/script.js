const showButton = document.querySelector('#showdialog');
const inputDialog = document.querySelector('#input-dialog');
const formData = document.querySelector('.input-book');
const formSelect = formData.querySelector('select');

//for add new card
const cardContainer = document.querySelector('.card-container');




showButton.addEventListener('click', () => {
    inputDialog.showModal();
})

// all data in input on showModal store the value to the submit button
formData.addEventListener("submit", function (event) {
    event.preventDefault();
    let authorValue = document.getElementById('author').value;
    let titleValue = document.getElementById('title').value;
    let pagesValue = document.getElementById('pages').value;
    let statusValue = document.getElementById('status').value;

    function addBooktoLibrary() {
        let newBook = new Book(authorValue, titleValue, pagesValue, statusValue)
        myLibrary.push(newBook);
    }
    addBooktoLibrary()
    addNewCard()
    
    console.log(myLibrary)
    clearForm()
})

const myLibrary = [
    {
    'author': 'tolkien',
    'title': 'Hobbit',
    'pages': 695,
    'status': 'Not Read'
    }
];

function Book (author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

function addNewCard () {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }

    for (let i = 0; i < myLibrary.length; i++) {
        // create a card
        const div = document.createElement('div');
        div.classList.add('card');
        cardContainer.appendChild(div);
        // create card-data
        const pAuthor = document.createElement('p');
        const pTitle = document.createElement('p');
        const pPages = document.createElement('p');
        const bStatus = document.createElement('button');
        const bRemove = document.createElement('button');

        pAuthor.textContent = myLibrary[i].author;
        pTitle.textContent = myLibrary[i].title;
        pPages.textContent = `${myLibrary[i].pages} pages`;
        bStatus.textContent = myLibrary[i].status;
        bRemove.textContent = 'Remove'

        div.append(pAuthor, pTitle, pPages, bStatus, bRemove);
    }
}

function clearForm() {
    authorValue = ""
};