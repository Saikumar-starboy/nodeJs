const axios = require("axios");

const express = require("express");
const app = express();
const port = 3000;

app.get("/api/books", (req, res) => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9781234567890",
      reviews: [
        { userId: 1, rating: 4, comment: "Enjoyed the story!" },
        { userId: 2, rating: 5, comment: "A classic masterpiece!" },
      ],
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780987654321",
      reviews: [
        { userId: 3, rating: 5, comment: "Powerful and thought-provoking." },
        { userId: 4, rating: 4, comment: "Recommended for everyone." },
      ],
    },
    // ... (other books)
  ];

  res.json(books);
});

app.post("/api/register", async (req, res) => {
    try {
      const userInfo = req.body; // assuming user information is sent in the request body
      const response = await registerNewUser(userInfo);
      console.log("User registration successful:", response);
      res.send(response); // Send a response back to the client
    } catch (error) {
      console.error("Error registering new user:", error.message);
      res.status(500).send("Internal Server Error"); // Adjust the status code as needed
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function getBookList() {
  try {
    const response = await axios.get("http://localhost:3000/api/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching book list:", error.message);
    throw error;
  }
}

async function getBooksByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:3000/api/books?isbn=${isbn}`);
    const allBooks = response.data;
    const bookWithISBN = allBooks.find(book => book.isbn === isbn);
    return bookWithISBN ? [bookWithISBN] : [];
  } catch (error) {
    console.error(`Error fetching books by ISBN (${isbn}):`, error.message);
    throw error;
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:3000/api/books?author=${author}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by Author (${author}):`, error.message);
    throw error;
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:3000/api/books?title=${title}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by Title (${title}):`, error.message);
    throw error;
  }
}

async function getBookReview(bookId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/book-review/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching review for book (${bookId}):`, error.message);
    throw error;
  }
}


async function loginAsUser(credentials) {
  try {
    const response = await axios.post("http://localhost:3000/api/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in as user:", error.message);
    throw error;
  }
}

async function addModifyBookReview(bookId, review) {
  try {
    const response = await axios.post(`http://localhost:3000/api/add-modify-review/${bookId}`, { review });
    return response.data;
  } catch (error) {
    console.error(`Error adding/modifying review for book (${bookId}):`, error.message);
    throw error;
  }
}

async function deleteUserReview(bookId) {
  try {
    const response = await axios.delete(`http://localhost:3000/api/delete-review/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting review for book (${bookId}):`, error.message);
    throw error;
  }
}

async function getAllBooksAsync() {
  try {
    const books = await getBookList();
    console.log("All Books (Async):", books);
  } catch (error) {
    console.error("Error fetching all books (Async):", error.message);
  }
}

// Task Functions

// Task 1: Get the book list available in the shop.
async function task1GetBookList() {
  try {
    const books = await getBookList();
    console.log("Book List:", books);
  } catch (error) {
    console.error("Error fetching book list:", error.message);
  }
}

// Task 2: Get the books based on ISBN.
async function task2GetBooksByISBN(isbn) {
  try {
    const books = await getBooksByISBN(isbn);
    console.log("Books by ISBN:", books);
  } catch (error) {
    console.error(`Error fetching books by ISBN (${isbn}):`, error.message);
  }
}

// Task 3: Get all books by Author.
async function task3GetBooksByAuthor(author) {
  try {
    const books = await getBooksByAuthor(author);
    console.log(`Books by Author (${author}):`, books);
  } catch (error) {
    console.error(`Error fetching books by Author (${author}):`, error.message);
  }
}

// Task 4: Get all books based on Title
async function task4GetBooksByTitle(title) {
  try {
    const books = await getBooksByTitle(title);
    console.log(`Books by Title (${title}):`, books);
  } catch (error) {
    console.error(`Error fetching books by Title (${title}):`, error.message);
  }
}

// Task 5: Get book Review
async function task5GetBookReview(bookId) {
  try {
    const review = await getBookReview(bookId);
    console.log(`Review for book (${bookId}):`, review);
  } catch (error) {
    console.error(`Error fetching review for book (${bookId}):`, error.message);
  }
}


  
async function deleteBook(bookId) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      console.log('Book deleted successfully:', response.data);
    } catch (error) {
      console.error(`Error deleting book (${bookId}):`, error.message);
    }
  }

  app.delete("/api/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    // Implement the logic to delete the book with the specified ID
    // For example, you can filter out the book from the array
    books = books.filter(book => book.id !== bookId);
    res.json(books);
  });

// Task 6: Register New user
async function registerNewUser(userInfo) {
    try {
      const response = await axios.post("http://localhost:3000/api/register", userInfo);
      return response.data;
    } catch (error) {
      console.error("Error registering new user:", error.message);
      console.error("Full error:", error);
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }
  }
  
  
