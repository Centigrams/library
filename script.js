let myLibrary = [
    {
        author: "Goodrich and Tamassia",
        pages: 924,
        read: "Read",
        title: "Data Structures and Algorithms in Java",
    },

    {
        author: "Pearl and Rosenbaum",
        pages: 272,
        read: "Read",
        title: "Investment Banking: Valuation, Leveraged Buyouts, and Mergers and Acquisitions",
    },

    {
        author: "Harper Lee",
        pages: 281,
        read: "Not yet read",
        title: "To Kill a Mockingbird",
    },
];

function Book(title, author, pages, read) {
    return {
    title, author, pages, read
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

if (localStorage.getItem('book') === null) {
    myLibrary = [];
} else {
    myLibrary = JSON.parse(localStorage.getItem('book'));
}

function displayBooks() {
    localStorage.setItem('book', JSON.stringify(myLibrary));
    const tableBody = document.querySelector('.table-body');
    /*Emptying the textContent of tableBody avoids the table to 
    duplicate itself everytime the add book button is pressed.*/
    tableBody.textContent = '';
    for (let book = 0; book < myLibrary.length; book += 1) {
        const tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        // Delete Button
        const deleteButton = document.createElement('td');
        tableRow.appendChild(deleteButton);
        deleteButton.classList.add('delete-button-cell');

        const addDeleteButton = function () {
            const button = document.createElement('img');
            button.src = "Images/delete-button.png";
            deleteButton.appendChild(button);
            button.classList.add('delete-button');
        }

        addDeleteButton();

        // Edit Button
        const editButton = document.createElement('td');
        tableRow.appendChild(editButton);
        editButton.classList.add('edit-button-cell');

        const addEditButton = function () {
            const img = document.createElement('img');
            img.src = 'Images/edit-button-colored.png';
            editButton.appendChild(img);
            img.classList.add('edit-button');
        }
        addEditButton();

        // Title
        const bookTitle = document.createElement('td');
        bookTitle.textContent = myLibrary[book].title;
        tableRow.appendChild(bookTitle);
        bookTitle.classList.add('book-title');

        //Author
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = myLibrary[book].author;
        tableRow.appendChild(bookAuthor);
        bookAuthor.classList.add('bookAuthor');

        //Pages
        const bookPages = document.createElement('td');
        bookPages.textContent = myLibrary[book].pages;
        tableRow.appendChild(bookPages);
        bookPages.classList.add('book-pages');

        //Status
        const bookStatus = document.createElement('td');
        bookStatus.textContent = myLibrary[book].read;
        tableRow.appendChild(bookStatus);
        bookStatus.classList.add('book-status');
    }
    hideTableIfEmpty();
}

const bookForm = document.querySelector('.book-form');

const bookTitleInput = document.querySelector('#title');
const bookAuthorInput = document.querySelector('#author');
const bookPagesInput = document.querySelector('#pages');

const checkBox = document.querySelector('#checkbox');

const addBook = document.querySelector('#add-book');
const cancelButton = document.querySelector('#cancel-book');

addBook.addEventListener('click', addBookInput);
checkBox.addEventListener('click', changeStatusMessage);
cancelButton.addEventListener('click', () => {
    bookForm.reset();
    editMode = false;
});

let editMode = false;
let tableRowToEdit = null;

function addBookInput() {

    function bookStatus() {
        if (checkBox.checked === true) {
            checkBox.value = "Read";
            return 'Read'
        } else {
            checkBox.value = "Not yet read";
            return 'Not yet read';
        }
    }

    if (editMode === true) {
        bookStatus();
        myLibrary[tableRowToEdit].author = bookAuthorInput.value;
        myLibrary[tableRowToEdit].title = bookTitleInput.value;
        myLibrary[tableRowToEdit].pages = bookPagesInput.value;
        myLibrary[tableRowToEdit].read = checkBox.value;
        editMode = false;
        displayBooks();
        bookForm.reset();
        changeStatusMessage();
    } else {
        //If all inputs are missing, don't do anything
        if (bookTitleInput.value === "") return;
        if (bookAuthorInput.value === "") bookAuthorInput.value = 'n/a';
        if (bookPagesInput.value === "" || bookPagesInput.value === 0) bookPagesInput.value = 0;
        addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookStatus());
        bookForm.reset();
        changeStatusMessage();
    }
}

function changeStatusMessage() {
    const readStatusMessage = document.querySelector('#read-status-message');
    if (checkBox.checked === true) {
        readStatusMessage.textContent = 'Read';
        readStatusMessage.setAttribute('class', 'read-status-read');
    } else {
        readStatusMessage.textContent = 'Not yet read';
        readStatusMessage.setAttribute('class', 'read-status-not');
    }
}

const tableBody = document.querySelector('.table-body');
tableBody.addEventListener('click', deleteBook); // Delete Button
tableBody.addEventListener('click', editBookInfo); // Edit Button

function editBookInfo(e) {
    if (!e.target.matches('.edit-button')) return;
    editMode = true;
    const { target } = e;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    const bookTitle = myLibrary[tr].title;
    const bookAuthor = myLibrary[tr].author;
    const bookPages = myLibrary[tr].pages;
    const bookStatus = myLibrary[tr].read;
    bookTitleInput.value = bookTitle;
    bookAuthorInput.value = bookAuthor;
    bookPagesInput.value = bookPages;

    function matchBookStatusToSwitch() {
        if (bookStatus === 'Read') {
            checkBox.checked = true;
            changeStatusMessage();
        } else {
            checkBox.checked = false;
            changeStatusMessage();
        }
    }
    matchBookStatusToSwitch();

    /* The tableRowToEdit variable will be used when the book 
    is in edit mode(refer to addBookInput function). It returns 
    what row must be edited without the need to append a new   
    row in the table.*/

    tableRowToEdit = tr;
}

function deleteBook(e) {
    if (!e.target.matches('.delete-button')) return;
    const { target } = e;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    myLibrary.splice(tr, 1);
    displayBooks();
}

function hideTableIfEmpty() {
    let table = document.querySelector('table');
    if (myLibrary.length === 0 || localStorage.getItem('book') === null) {
        table.style.display = "none";
    } else {
        table.style.display = 'table';
    }
}

displayBooks();