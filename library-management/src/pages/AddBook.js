import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("à lire");
  const [note, setNote] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.id : null;

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
    if (!image) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("status", status);
    formData.append("note", note);
    formData.append("fileName", image);
    formData.append("image", imageInputRef.current.files[0]);
    formData.append("user_id", userId);

    axios
      .post("http://127.0.0.1:8000/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setSuccess("Book created successfully!");
        setError(null);
        navigate("/books");
        console.log(response.data);
      })
      .catch((error) => {
        setError("Failed to create book. Please check the input fields.");
        setSuccess(null);
        console.error(error.response.data);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center text-lg-start py-5">
      <h1 className="mb-5">Ajouter un livre</h1>
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
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
