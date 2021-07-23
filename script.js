let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let title =  prompt();
    let author = prompt();
    let pages = prompt();
    let read = prompt();
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}