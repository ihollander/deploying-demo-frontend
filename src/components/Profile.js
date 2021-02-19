import React, { useState } from "react";

function Profile({ currentUser, setCurrentUser }) {
  const [formData, setFormData] = useState({
    image: currentUser.image,
    bio: currentUser.bio,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // PATCH /me { image, bio }
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_RAILS_URL}/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((user) => {
        // update the user in state after getting the response
        setCurrentUser(user);
      });
  }

  const { image, bio } = formData;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1>Username's Profile</h1>

      <label>Profile Image</label>
      <input type="text" name="image" value={image} onChange={handleChange} />
      <img
        src={
          image && image.length
            ? image
            : "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png"
        }
        alt={"Username"}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <input type="submit" value="Update" />
    </form>
  );
}

export default Profile;
