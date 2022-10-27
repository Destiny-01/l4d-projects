let showInp = true;
const fetchData = async () => {
  const res = await fetch("https://yts.mx/api/v2/list_movies.json?quality=3D");
  const data = await res.json();
  return data.data.movies;
};
window.addEventListener("load", async () => {
  let movies = await fetchData();
  console.log(movies);
  localStorage.setItem("movies", JSON.stringify(movies));
  inputEl(movies);
});
const run = () => {
  document.getElementById("input").addEventListener("keyup", (e) => {
    let movies = JSON.parse(localStorage.getItem("movies"));
    let regex = new RegExp(e.target.value);
    let returned = movies.filter((movie) => {
      return movie.title.toLowerCase().match(regex);
    });
    if (e.currentTarget.value) {
      inputEl(returned);
    } else {
      inputEl(movies);
    }
    console.log(returned);
  });
};
run();

document.getElementById("filter").addEventListener("click", (ev) => {
  showInp = !showInp;
  if (!showInp) {
    document
      .getElementById("input")
      .removeEventListener("keyup", (e) => console.log(e));
    ev.currentTarget.innerHTML = `
    Search by Name
    <img src="./icons/left.svg" height="16px" alt="dropdown" />`;
    document.getElementById("input").placeholder = "Enter year hear";
    document.getElementById("input").focus();
    document.getElementById("input").id = "input-year";
    document.getElementById("input-year").addEventListener("keyup", (e) => {
      let movies = JSON.parse(localStorage.getItem("movies"));
      let returned = movies.filter((movie) => {
        return (
          movie.year === parseInt(e.target.value) ||
          String(movie.year).includes(e.target.value)
        );
      });
      if (e.currentTarget.value) {
        inputEl(returned);
      } else {
        inputEl(movies);
      }
    });
  } else {
    document.getElementById("input-year").id = "input";
    document.getElementById("input").focus();
    document.getElementById("input").placeholder = "Search Name Of Movie";
    ev.currentTarget.innerHTML = `
    Search by Year
    <img src="./icons/dropdown.svg" height="16px" alt="dropdown" />`;
    run();
  }
});

const inputEl = (movies) => {
  let main = document.getElementById("main");
  main.innerHTML = "";
  let i = 0;
  while (i <= movies.length) {
    if (!movies[i]) {
      return;
    }
    let a = document.createElement("a");
    a.href = `/single.html?id=${movies[i].id}`;
    a.innerHTML = `
      <div class="movie-img"><img src = ${movies[i].large_cover_image} alt="img" /></div>
      <div class="text">
          <h3>${movies[i].title}</h3>
          <p>${movies[i].year}</p>
      </div>
      `;
    main.appendChild(a);
    i++;
  }
  document.getElementById("main").innerHTML = main.innerHTML;
};
