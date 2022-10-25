const fetchData = async () => {
  const res = await fetch("https://yts.mx/api/v2/list_movies.json?quality=3D");
  const data = await res.json();
  return data.data.movies;
};
window.addEventListener("load", async () => {
  let movies = await fetchData();
  localStorage.setItem("movies", JSON.stringify(movies));
  const classes = document.getElementsByTagName("a");
  let arr = Array.from(classes);
  arr.forEach((clas, i) => {
    clas.href = `/single.html?id=${movies[i].id}`;
    clas.innerHTML = `
    <div class="movie-img"><img src = ${movies[i].background_image} alt="img" /></div>
    <div class="text">
        <h3>${movies[i].title}</h3>
        <p>${movies[i].year}</p>
    </div>
    `;
  });
});
