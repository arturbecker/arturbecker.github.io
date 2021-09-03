function openCard(event) {
  const tileId = event.target.id;
  const card = document.getElementById(tileId + "Card");
  const tile = event.target;
  const graph = document.getElementById("graph");

  console.log(event.target.id);

  tile.style.overflow = "visible";

  tile.appendChild(card);

  cardRect = card.getBoundingClientRect();
  tileRect = tile.getBoundingClientRect();
  graphRect = graph.getBoundingClientRect();

  cardHeight = cardRect.height;
  cardWidth = cardRect.width;

  availableHorizontalSpace = graphRect.right - tileRect.left;
  availableVerticalSpace = graphRect.bottom - tileRect.top;

  console.log(graphRect.bottom)

  card.style.position = "relative";
  card.style.transform = "none";

  cardTop = Math.min(0, availableVerticalSpace - cardHeight);
  cardLeft = Math.min(0, availableHorizontalSpace - cardWidth);

  card.style.top = cardTop + "px";
  card.style.left = cardLeft + "px";

  card.classList.toggle("closed");
  tile.style.zIndex = "100";
}

function closeCard(event) {
  const tileId = event.target.id;
  const card = document.getElementById(tileId + "Card");
  const tile = event.target;
  const main = document.getElementsByTagName("main")[0];

  main.appendChild(card);

  card.style.position = "absolute";
  card.style.transform = "translate(-50%, -50%)";
  card.style.left = "50%";
  card.style.top = "50%";

  tile.style.overflow = "hidden";

  card.classList.toggle("closed");
  tile.style.zIndex = "1";
}
