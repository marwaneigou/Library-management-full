import React, { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [error, setError] = useState(null);
  const statusColors = {
    "à lire": "btn btn-outline-primary",
    "en cours": "btn btn-outline-warning",
    lu: "btn btn-outline-success",
  };
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.id : null;
  useEffect(() => {
    // Fetch books from the API
    axios
      .get("http://127.0.0.1:8000/api/books?user_id=" + userId)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Initialize filteredBooks
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books");
      });
  }, []);

  const handleSearch = () => {
    const filtered = books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusSearch ? book.status === statusSearch : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredBooks(filtered);
  };
  const handleDelete = (id) => {
    // Confirm before deletion
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/books/${id}`)
        .then(() => {
          // Update state to remove the deleted book
          const updatedBooks = books.filter((book) => book.id !== id);
          setBooks(updatedBooks);
          setFilteredBooks(updatedBooks);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          setError("Failed to delete book");
        });
    }
  };
  return (
    <div className="container my-5 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-5">Liste des livres</h1>
      {error && <h5 className="text-center text-danger">{error}</h5>}
      <div className="mb-4 d-flex justify-content-center align-items-center w-50 px-2 ">
        <input
          type="text"
          className="form-control mb-2 me-2"
          placeholder="Rechrcher un livre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select mb-2 w-25 me-2"
          value={statusSearch}
          onChange={(e) => setStatusSearch(e.target.value)}
        >
          <option value="">Aucun</option>
          <option value="à lire">A lire</option>
          <option value="en cours">En cours</option>
          <option value="lu">Lu</option>
        </select>
        <button className="btn btn-secondary mb-2" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </div>
      <div className="row g-4 w-100">
        {filteredBooks.length === 0 ? (
          <h5 className="text-center ">Aucun livre trouvé</h5>
        ) : (
          filteredBooks.map((book) => (
            <div className="col-md-6" key={book.id}>
              <div className="card h-100 d-flex flex-row">
                <div>
                  <img
                    src={`http://127.0.0.1:8000/storage/${book.image}`}
                    className="card-img-left img-fluid rounded-start"
                    alt={book.title}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "250px",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      <strong>Auteur:</strong> {book.author}
                    </p>
                    <p
                      className={`card-text rounded-pill py-1 d-inline-block ${
                        statusColors[book.status]
                      }`}
                      style={{ width: "100px" }}
                    >
                      {book.status}
                    </p>
                    <p className="card-text">
                      <strong>Genre:</strong> {book.genre}
                    </p>
                    <p className="card-text">
                      <strong>Note:</strong> {book.note}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <Link
                      to={`/books/edit/${book.id}`}
                      className="btn btn-primary me-2 rounded-pill py-2 px-3 d-flex justify-content-center align-items-center"
                      state={{ book }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                        className="me-2"
                      >
                        <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger rounded-pill py-2 px-3 d-flex justify-content-center align-items-center"
                      onClick={() => handleDelete(book.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                        className="me-2"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
