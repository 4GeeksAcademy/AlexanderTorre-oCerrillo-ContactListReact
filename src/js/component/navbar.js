import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddContact from "../views/AddContact";

export const Navbar = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <nav className="navbar navbar-light bg-white mb-3">
      <Link to="/" style={{textDecoration: "none" }}>
        <span
          className="navbar-brand mb-0 h1 ml-3"
          style={{ color: "black", marginLeft: "20px" }}
        >
          <i class="fa-solid fa-address-book m-2"></i>Contact List with React
        </span>
      </Link>
      <div className="ml-auto" style={{ marginRight: "10px" }}>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addContactModal"
          onClick={() => setSelectedContact(null)}
        >
          Add Contact
        </button>
      </div>
      <div
        className="modal fade"
        id="addContactModal"
        tabIndex="-1"
        aria-labelledby="addContactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addContactModalLabel">
                {selectedContact ? "Edit Contact" : "Add Contact"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddContact
                contact={selectedContact}
                onCloseModal={() => setSelectedContact(null)}
                onContactUpdated={() => setSelectedContact(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
