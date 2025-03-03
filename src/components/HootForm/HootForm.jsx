// src/components/HootForm/HootForm.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as hootService from "../../services/hootService";

const isLowerCase = (str) => str === str.toLowerCase();

const HootForm = ({ handleAddHoot, handleUpdateHoot }) => {
  const { hootId } = useParams();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData);
    };
    console.log("running");
    if (hootId) {
      fetchHoot();
    }

    //* return a function from useEffect -> fire just before the next run of the useEffect
    return () => {
      setFormData({ title: "", text: "", category: "News" });
    };
  }, [hootId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    if (isLowerCase(formData.title[0])) {
      setMessage("capital");
    } else {
      setMessage("");
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // if (isLowerCase(formData.title[0])) {
    //   setMessage("capital");
    //   return;
    // }
    try {
      if (hootId) {
        handleUpdateHoot(hootId, formData);
      } else {
        const newHoot = await hootService.create(formData);
        handleAddHoot(newHoot);
      }
    } catch (err) {
      console.log(err);
      setMessage("Oops");
    }
  };

  return (
    <main>
      <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          // pattern="[A-Z]\w+"
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
