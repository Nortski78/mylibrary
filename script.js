class Library {
    #books;

    constructor() {
        this.#books = [];
    }

    addBook(newBook) {
        this.#books.push(newBook);
    }

    get getBooks() {
        return this.#books;
    }

    get size() {
        return this.#books.length;
    }
}

class Book {
    #title;
    #author;
    #pages;
    #haveRead = false;
    
    constructor(title, author, pages, haveRead) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#haveRead = haveRead;
    }

    get bookTitle() {
        return this.#title;
    }

    get bookAuthor() {
        return this.#author;
    }

    get bookPages() {
        return this.#pages;
    }

    get bookReadStatus() {
        return this.#haveRead;
    }
}

let myLibrary = new Library();

let hyperion = new Book('Hyperion', 'Dan Simmons', 623, true);
let redRising = new Book('Red Rising', 'Pierce Brown', 560, true);
let dune = new Book('Dune', 'Frank Herbert', 670);

myLibrary.addBook(hyperion);
myLibrary.addBook(redRising);
myLibrary.addBook(dune);

let DisplayLibrary = (function(libraryObj) {

    const library = libraryObj;

    // Cache the DOM
    const libraryContainer = document.querySelector('.library-container');

    // Render the library
    function render() {

        for(let i = 0; i < library.size; ++i) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-id', i);
            libraryContainer.appendChild(bookCard);

            const bookTitle = document.createElement('p');
            bookTitle.innerHTML = `Title: <i>${library.getBooks[i].bookTitle}</i>`;
            bookCard.appendChild(bookTitle);
        }
    }

    render();

    return({render});

})(myLibrary);