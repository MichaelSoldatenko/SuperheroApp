export const handleDelete = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/superheroes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      window.location.href = "/";
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
};
