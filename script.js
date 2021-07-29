let myLibrary = [
    {
        author:"Goodrich and Tamassia",
        pages:924,
        read:"Read",
        title:"Data Structures and Algorithms in Java",
    },

    {
        author:"Pearl and Rosenbaum",
        pages:272,
        read:"Read",
        title:"Investment Banking: Valuation, Leveraged Buyouts, and Mergers and Acquisitions",
    },

    {
        author:"Harper Lee",
        pages:281,
        read:"Not yet read",
        title:"To Kill a Mockingbird",
    },
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const tableBody = document.querySelector('.table-body');
    for (let book = 0; book < myLibrary.length; book += 1) {
        const tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        // Image
        const editButton = document.createElement('td');
        tableRow.appendChild(editButton);

        function add_img() { 
            const img = document.createElement('img'); 
            img.src = 'Images/edit-button-colored.png'; 
            editButton.appendChild(img);
            img.classList.add('edit-button');
        }
        add_img();

        // Title
        const bookTitle = document.createElement('td');
        bookTitle.textContent = myLibrary[book].title;
        tableRow.appendChild(bookTitle);

        //Author
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = myLibrary[book].author;
        tableRow.appendChild(bookAuthor);

        //Pages
        const bookPages = document.createElement('td');
        bookPages.textContent = myLibrary[book].pages;
        tableRow.appendChild(bookPages);

        //Status
        const bookStatus = document.createElement('td');
        bookStatus.textContent = myLibrary[book].read;
        tableRow.appendChild(bookStatus);
    }
}

displayBooks();