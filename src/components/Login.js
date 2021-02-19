import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: login the user
    // POST /login
    fetch(`${process.env.REACT_APP_RAILS_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          // set errors to show errors in the form
          setErrors(data.errors);
        } else {
          // use the response to set state
          const { user, token } = data;

          localStorage.setItem("token", token);

          setCurrentUser(user);
          history.push("/profile");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.map((error) => {
          return <p key={error}>{error}</p>;
        })}
        <input type="submit" value="Login" />
        <a href={`${process.env.REACT_APP_RAILS_URL}/login/spotify`}>
          Login with spotify
        </a>
      </form>
    </div>
  );
}

export default Login;
