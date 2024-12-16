import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const location = useLocation();
  const { book } = location.state;

  const [title, setTitle] = useState(book.title);
  const [status, setStatus] = useState(book.status);
  const [note, setNote] = useState(book.note);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const imageInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${title
        .replace(/\s+/g, "-")
        .toLowerCase()}.${fileExtension}`;
      setImage(newFileName); // Set the image name
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append only the fields that have been updated
    if (title) formData.append("title", title);
    if (author) formData.append("author", author);
    if (genre) formData.append("genre", genre);
    if (status) formData.append("status", status);
    if (note) formData.append("note", note);
    if (imageInputRef.current.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
      formData.append("fileName", image);
    }
    console.log(book.user_id);
    // Explicitly append user_id
    formData.append("user_id", book.user_id); // Ensure this is the correct ID

    axios
      .post(`http://127.0.0.1:8000/api/books/${book.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setSuccess("Book updated successfully!");
        setError(null);
        navigate("/books");
        console.log(response.data);
      })
      .catch((error) => {
        setError("Failed to update book. Please check the input fields.");
        setSuccess(null);
        console.error(error.response.data);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center text-lg-start py-5">
      <h1 className="mb-5">Editer un livre</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} style={{ width: "30rem" }}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="title">
            Titre de livre
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Titre de livre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="author">
            Auteur
          </label>
          <input
            type="text"
            id="author"
            className="form-control"
            placeholder="Auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            className="form-control"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="à lire">A lire</option>
            <option value="en cours">En cours</option>
            <option value="lu">Lu</option>
          </select>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="note">
            Note
          </label>
          <textarea
            className="form-control"
            id="note"
            rows="4"
            placeholder="Ajouter une note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          {book.image && !image && (
            <div className="mt-3">
              <img
                src={`http://127.0.0.1:8000/storage/${book.image}`}
                alt="Book"
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBook;
