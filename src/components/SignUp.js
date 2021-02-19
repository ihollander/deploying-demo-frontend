import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    image: "",
    bio: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  console.log(errors);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // POST /signup
    fetch(`${process.env.REACT_APP_RAILS_URL}/signup`, {
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

  const { username, image, bio, password } = formData;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />

      <label>Profile Image</label>
      <input type="text" name="image" value={image} onChange={handleChange} />
      <img
        src={
          image.length
            ? image
            : "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png"
        }
        alt={username}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange}
      />

      {errors.map((error) => {
        return <p key={error}>{error}</p>;
      })}
      <input type="submit" value="Signup" />
    </form>
  );
}

export default SignUp;
