import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import '../CSS/profile.css';

function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [input, setInput] = useState({
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    auth0Id: user.sub,
    role: "Estudiante",
    carrer: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  function handleClick(event) {
    event.preventDefault();
    const newUser = {
      name: input.name,
      nickname: input.nickname,
      email: input.email,
      auth0Id: user.sub,
      role: input.role,
      carrer:input.carrer ,
    };

    axios.post("http://localhost:3001/profile", newUser)
  }

  return (
    <div className="container">
      <h1>Formulario de ususario</h1>
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="name"
            value={user.name}
            autoComplete="off"
            className="form-control"
            placeholder="name"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="nickname"
            value={user.nickname}
            autoComplete="off"
            className="form-control"
            placeholder="nickname"
            disabled
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            autoComplete="off"
            className="form-control"
            placeholder="email"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="role"
            value= "Estudiante"
            autoComplete="off"
            className="form-control"
            placeholder="rolee"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="carrer"
            value={input.carrer}
            autoComplete="off"
            className="form-control"
            placeholder="Carrer"
          />
        </div>
        <button onClick={handleClick} className="btn btn-lg btn-info">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default Profile;