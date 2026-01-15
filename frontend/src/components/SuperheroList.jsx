import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleDelete } from "../actions/handleDelete";

const SuperheroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchHeroes() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/superheroes?page=${page}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHeroes(data.superheroes);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  }

  useEffect(() => {
    fetchHeroes();
  }, [page]);

  return (
    <div className="container">
      <h1>Superhero Database</h1>
      <div className="grid">
        {heroes.map((hero) => (
          <div key={hero.id} className="card">
            {hero.images?.[0] && (
              <img
                src={`http://localhost:5000/uploads/${hero.images[0].image_path}`}
                alt={hero.nickname}
              />
            )}
            <h3>{hero.nickname}</h3>
            <Link to={`/hero/${hero.id}`}>View Details</Link>
            <button
              onClick={() => handleDelete(hero.id)}
              className="btn-delete"
            >
              Delete
            </button>
            <Link to={`/edit/${hero.id}`} className="btn-edit">
              Edit
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SuperheroList;
