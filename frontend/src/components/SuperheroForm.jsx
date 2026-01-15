import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SuperheroForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:5000/api/superheroes/${id}`)
        .then((res) => res.json())
        .then((data) => setHero(data));
    }
  }, [isEdit, id]);

  const deleteExistingImage = async (imageId) => {
    if (window.confirm("Delete this photo?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/superheroes/images/${imageId}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setHero({
            ...hero,
            images: hero.images.filter((img) => img.id !== imageId),
          });
        }
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(hero).forEach((key) => {
      if (key !== "images") {
        formData.append(key, hero[key]);
      }
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const url = isEdit
      ? `http://localhost:5000/api/superheroes/${id}`
      : "http://localhost:5000/api/superheroes";

    const method = isEdit ? "PATCH" : "POST";

    try {
      const response = await fetch(url, { method, body: formData });
      if (response.ok) {
        alert(isEdit ? "Updated!" : "Created!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="superhero-form">
      <h2>{isEdit ? "Edit Hero" : "Add New Hero"}</h2>

      <input
        value={hero.nickname}
        onChange={(e) => setHero({ ...hero, nickname: e.target.value })}
        placeholder="Nickname"
        required
      />

      <input
        value={hero.real_name || ""}
        placeholder="Real Name"
        onChange={(e) => setHero({ ...hero, real_name: e.target.value })}
      />

      <textarea
        value={hero.origin_description || ""}
        placeholder="Origin Description"
        onChange={(e) =>
          setHero({ ...hero, origin_description: e.target.value })
        }
      />

      <textarea
        value={hero.superpowers || ""}
        placeholder="Superpowers"
        onChange={(e) => setHero({ ...hero, superpowers: e.target.value })}
      />

      <input
        value={hero.catch_phrase || ""}
        placeholder="Catch Phrase"
        onChange={(e) => setHero({ ...hero, catch_phrase: e.target.value })}
      />

      <div className="image-management-section">
        {isEdit && hero.images && hero.images.length > 0 && (
          <div className="existing-images-container">
            <p>Current images:</p>
            <div className="images-preview-grid">
              {hero.images.map((img) => (
                <div key={img.id} className="preview-item">
                  <img
                    src={`http://localhost:5000/uploads/${img.image_path}`}
                    alt="hero"
                  />
                  <button
                    type="button"
                    className="delete-img-btn"
                    onClick={() => deleteExistingImage(img.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="file-input-label">
            {isEdit ? "Add more images:" : "Upload images:"}
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />
          {images.length > 0 && (
            <p className="file-count">Selected {images.length} new files</p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-submit">
        {isEdit ? "Save Changes" : "Create Hero"}
      </button>
    </form>
  );
};

export default SuperheroForm;
