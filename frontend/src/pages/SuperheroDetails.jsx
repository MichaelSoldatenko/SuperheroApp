import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleDelete } from "../actions/handleDelete";

const SuperheroDetails = () => {
  const [hero, setHero] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/superheroes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHero(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!hero) return <div>Loading...</div>;

  return (
    <div className="container">
      <button onClick={() => (window.location.href = "/")}>
        Back to heroes
      </button>
      <div className="details">
        <h2>
          {hero.nickname} ({hero.real_name})
        </h2>
        <p>
          <strong>Origin:</strong> {hero.origin_description}
        </p>
        <p>
          <strong>Powers:</strong> {hero.superpowers}
        </p>
        <p>
          <em>"{hero.catch_phrase}"</em>
        </p>
        <div className="gallery">
          {hero.images.map((img) => (
            <img
              key={img.id}
              src={`http://localhost:5000/uploads/${img.image_path}`}
            />
          ))}
        </div>
        <Link to={`/edit/${hero.id}`} className="btn-edit">
          Edit
        </Link>
        <button onClick={() => handleDelete(hero.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SuperheroDetails;
