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
    #haveRead;
    
    constructor(title, author, pages, haveRead = false) {
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

    set bookReadStatus(status) {
        this.#haveRead = status;
    }
}

let myLibrary = new Library();

let hyperion = new Book('Hyperion', 'Dan Simmons', 623, true);
let redRising = new Book('Red Rising', 'Pierce Brown', 560, true);
let dune = new Book('Dune', 'Frank Herbert', 670);

myLibrary.addBook(hyperion);
myLibrary.addBook(redRising);
myLibrary.addBook(dune);

let DisplayLibrary = (function() {

    //const library = libraryObj;

    // Cache the DOM
    const libraryContainer = document.querySelector('.library-container');

    // Render the library
    function render() {

        for(let i = 0; i < myLibrary.getBooks.length; ++i) {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-id', i);
            libraryContainer.appendChild(bookCard);
            const cardHeadings = document.createElement('div');
            const cardData = document.createElement('div');
            cardHeadings.classList.add('card-heading');
            cardData.classList.add('card-data');
            bookCard.appendChild(cardHeadings);
            bookCard.appendChild(cardData);
            const readStatus = document.createElement('div');
            const removeBook = document.createElement('div');
            readStatus.classList.add('card-btn-container');
            removeBook.classList.add('card-btn-container');
            bookCard.appendChild(readStatus);
            bookCard.appendChild(removeBook);
            const readStatusBtn = document.createElement('button');
            readStatusBtn.classList.add('read-status-button');
            const removeBookBtn = document.createElement('button');
            removeBookBtn.classList.add('remove-book-button')
            removeBookBtn.innerText = 'Remove';
            readStatus.appendChild(readStatusBtn);
            removeBook.appendChild(removeBookBtn);

            const bookTitleHeading = document.createElement('p');
            bookTitleHeading.innerHTML = `Title:`;
            const bookAuthorHeading = document.createElement('p');
            bookAuthorHeading.innerHTML = `Author:`;
            const bookPagesHeading = document.createElement('p');
            bookPagesHeading.innerHTML = `Pages:`;
            const haveReadHeading = document.createElement('p');
            haveReadHeading.innerHTML = `Have read:`;

            const bookTitleData = document.createElement('p');
            bookTitleData.innerHTML = `<i>${myLibrary.getBooks[i].bookTitle}</i>`;
            const bookAuthorData = document.createElement('p');
            bookAuthorData.innerHTML = `<i>${myLibrary.getBooks[i].bookAuthor}</i>`;
            const bookPagesData = document.createElement('p');
            bookPagesData.innerHTML = `<i>${myLibrary.getBooks[i].bookPages}</i>`;
           
            if(myLibrary.getBooks[i].bookReadStatus) {
                readStatusBtn.innerText = 'Read';
                readStatusBtn.classList.toggle('read');
            }
            else {readStatusBtn.innerText = 'Not read';}

            cardHeadings.appendChild(bookTitleHeading);
            cardHeadings.appendChild(bookAuthorHeading);
            cardHeadings.appendChild(bookPagesHeading);
            cardData.appendChild(bookTitleData);
            cardData.appendChild(bookAuthorData);
            cardData.appendChild(bookPagesData);

            // Bind card buttons
            readStatusBtn.addEventListener('click', () => {
                readStatusBtn.classList.toggle('read');
                if(myLibrary.getBooks[i].bookReadStatus) {
                    myLibrary.getBooks[i].bookReadStatus = false;
                    readStatusBtn.innerText = 'Not read';
                } else {
                    myLibrary.getBooks[i].bookReadStatus = true;
                    readStatusBtn.innerText = 'Read';
                }
                console.log(myLibrary.getBooks);
            });

            removeBookBtn.addEventListener('click', () => {
                libraryContainer.removeChild(bookCard);
                myLibrary.getBooks.splice(i, 1);
                libraryContainer.innerHTML = "";
                render();
                console.log(myLibrary);
            });
        }
    }

    render();

    return({render});

})(myLibrary);

let AddBook = (function() {
    // Cache the DOM
    const libraryContainer = document.querySelector('.library-container');
    const addBookBtn = document.querySelector('.add-book-btn');
    const formContainer = document.querySelector('.form-container');
    const inputTitle = document.querySelector('#title');
    const inputAuthor = document.querySelector('#author');
    const inputPages = document.querySelector('#pages');
    const inputIsRead = document.querySelector('#is-read');
    const submitBookBtn = document.querySelector('.submit-book-btn');

    // Bind events
    addBookBtn.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
    })

    submitBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(inputIsRead.value);
        const title = inputTitle.value;
        const author = inputAuthor.value;
        const pages = inputPages.value;
        const isRead = (inputIsRead.checked) ? true : false;

        let newBook = new Book(title, author, pages, isRead);
        myLibrary.getBooks.push(newBook);
        libraryContainer.innerHTML = "";
        DisplayLibrary.render();
        console.log(myLibrary);
        formContainer.classList.toggle('hidden');
    })

})();