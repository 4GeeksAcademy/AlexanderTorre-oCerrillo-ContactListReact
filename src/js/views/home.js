import React, { useState, useEffect } from "react";
import AddContact from "../views/AddContact";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/contact/agenda/fluxfeint-agenda")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error(error));
  }, []);
  
  const fetchContacts = () => {
    fetch("https://assets.breatheco.de/apis/fake/contact/agenda/fluxfeint-agenda")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting contact");
        }
        setContacts(contacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (contact) => {
    setContactToEdit(contact.id);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setContactToEdit(null);
  };

  return (
    <div className="container">
      <div className="row">
        {contacts.map((contact, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card contact-card">
              <div className="card-body">
                <h2 className="card-title">{contact.full_name}</h2>
                <p className="card-text">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {contact.address}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEdit(contact)}
                >
                  <i className="fa fa-pencil"></i> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(contact.id)}
                >
                  <i className="fa fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showEditModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={closeModal}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
              <AddContact idContact={contactToEdit} onActionComplete={fetchContacts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Home };