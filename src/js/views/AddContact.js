import React, { useState, useEffect } from "react";

const AddContact = ({ idContact }) => {
  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (idContact) {
      fetch(`https://assets.breatheco.de/apis/fake/contact/${idContact}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener contacto");
          }
          return response.json();
        })
        .then((data) => {
          setContact(data);
          setIsEditing(true);
        })
        .catch((error) => console.error(error));
    }
  }, [idContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `https://assets.breatheco.de/apis/fake/contact/${idContact}`
      : "https://assets.breatheco.de/apis/fake/contact/";

    fetch(url, {
      method: method,
      body: JSON.stringify({
        ...contact,
        agenda_slug: "fluxfeint-agenda",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al ${isEditing ? "actualizar" : "agregar"} contacto`
          );
        }
        setSuccessMessage(
          `Contacto ${contact.full_name} ${
            isEditing ? "actualizado" : "agregado"
          } con éxito`
        );
        setContact({
          full_name: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="full_name">Nombre completo:</label>
      <input
        type="text"
        className="form-control"
        id="full_name"
        name="full_name"
        value={contact.full_name}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={contact.email}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Teléfono:</label>
      <input
        type="tel"
        className="form-control"
        id="phone"
        name="phone"
        value={contact.phone}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="address">Dirección:</label>
      <textarea
        className="form-control"
        id="address"
        name="address"
        rows="3"
        value={contact.address}
        onChange={handleInputChange}
      ></textarea>
    </div>
    {successMessage && (
      <div className="alert alert-success mt-3" role="alert">
      {successMessage}
    </div>
  )}

  <div className="d-flex justify-content-end mt-3">
    <button
      type="button"
      className="btn btn-secondary me-2"
      data-bs-dismiss="modal"
    >
      Cerrar
    </button>
    <button type="submit" className="btn btn-primary">
      {isEditing ? "Actualizar contacto" : "Agregar contacto"}
    </button>
  </div>
</form>
  );
};

export default AddContact;