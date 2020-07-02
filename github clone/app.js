document.querySelectorAll(".grid .item").forEach((item) => {
  let rand = Math.floor(Math.random() * 5) + 1;
  item.setAttribute("title", "Lorem ipsum");
  switch (rand) {
    case 1: {
      return item.classList.add("darker-green");
    }
    case 2: {
      return item.classList.add("lighter-green");
    }
    default: {
      return;
    }
  }
});
