import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light rounded-pill custom-navbar ">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav text-center">
            <Link
              className={`nav-link mx-4 ${
                location.pathname === "/books"
                  ? "active font-bold bg-primary text-white rounded-pill px-4"
                  : "rounded-pill"
              }`}
              aria-current="page"
              to="/books"
            >
              Liste des livres
            </Link>
            {location.pathname.startsWith("/books/edit") && (
              <button
                className="btn btn-primary  rounded-pill p-2 d-flex justify-content-center align-items-center "
                disabled
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
            )}
            <Link
              className={`nav-link mx-4 ${
                location.pathname === "/books/add"
                  ? "active font-bold bg-primary text-white rounded-pill px-4"
                  : "rounded-pill"
              }`}
              to="/books/add"
            >
              Ajouter un livre
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
