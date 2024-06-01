// Book Class
class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.id = ISBN;
    this.borrowed = false;
  }

  isBorrowed() {
    return this.borrowed;
  }
}

// User Class
class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.borrowedBooks = [];
  }

  borrowBook(book) {
    if (this.borrowedBooks.length >= 3) {
      return false;
    }
    this.borrowedBooks.push(book);
    book.borrowed = true;
    return true;
  }

  returnBook(ISBN) {
    const bookIndex = this.borrowedBooks.findIndex(
      (book) => book.ISBN === ISBN
    );
    if (bookIndex === -1) {
      return false;
    }
    const book = this.borrowedBooks[bookIndex];
    book.borrowed = false;
    this.borrowedBooks.splice(bookIndex, 1);
    return true;
  }

  peekBook(ISBN) {
    return this.borrowedBooks.find((book) => book.ISBN === ISBN);
  }
}

// Library Class
class Library {
  constructor() {
    this.books = [];
    this.members = [];
  }

  addNewBook(book) {
    this.books.push(book);
  }

  registerMember(user) {
    this.members.push(user);
  }

  borrowBook(userId, ISBN) {
    const user = this.members.find((member) => member.id === userId);
    if (!user) {
      return "User not found";
    }

    const book = this.books.find((b) => b.ISBN === ISBN);
    if (!book) {
      return "Book not found";
    }

    if (book.borrowed) {
      return "Book already borrowed";
    }

    return user.borrowBook(book);
  }

  returnBook(userId, ISBN) {
    const user = this.members.find((member) => member.id === userId);
    if (!user) {
      return "User not found";
    }

    return user.returnBook(ISBN);
  }
}

// Example Usage

// Creating books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "1234567890");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "0987654321");
const book3 = new Book("1984", "George Orwell", "1122334455");
const book4 = new Book("Pride and Prejudice", "Jane Austen", "6677889900");

// Creating users
const user1 = new User("Alice", "u1");
const user2 = new User("Bob", "u2");

// Creating library and adding books and users
const library = new Library();
library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);
library.addNewBook(book4);

library.registerMember(user1);
library.registerMember(user2);

// Borrowing and returning books
console.log(library.borrowBook("u1", "1234567890"));
console.log(library.borrowBook("u1", "0987654321"));
console.log(library.borrowBook("u1", "1122334455"));
console.log(library.borrowBook("u1", "6677889900"));

console.log(library.returnBook("u1", "1234567890"));
console.log(library.borrowBook("u1", "6677889900"));
console.log(library.returnBook("u1", "9999999999"));
