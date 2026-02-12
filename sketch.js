let table;
let genres = [];
let maxCount = 0;

function preload() {
  table = loadTable("movies.csv", "csv", "header");
}

function setup() {
  createCanvas(900, 600);
  noLoop();
  textAlign(CENTER, CENTER);

  // Count genres
  let counts = {};

  for (let r = 0; r < table.getRowCount(); r++) {
    let genreStr = table.getString(r, "genres");
    let splitGenres = genreStr.split("|");

    for (let g of splitGenres) {
      if (g === "(no genres listed)") continue;
      counts[g] = (counts[g] || 0) + 1;
    }
  }

  // Convert to array
  for (let g in counts) {
    genres.push({
      name: g,
      count: counts[g]
    });

    if (counts[g] > maxCount) {
      maxCount = counts[g];
    }
  }

  // Sort largest → smallest
  genres.sort((a, b) => b.count - a.count);
}

function draw() {
  background(20);

  let cols = 5;
  let spacingX = width / (cols + 1);
  let spacingY = 120;

  for (let i = 0; i < genres.length; i++) {
    let g = genres[i];

    let col = i % cols;
    let row = Math.floor(i / cols);

    let x = spacingX * (col + 1);
    let y = 100 + row * spacingY;

    let size = map(g.count, 0, maxCount, 30, 140);

    // Bubble
    fill(100, 200, 255, 180);
    noStroke();
    circle(x, y, size);

    // Labels
    fill(255);
    textSize(12);
    text(g.name, x, y);

    textSize(10);
    text(g.count, x, y + size / 2 + 12);
  }

  // Title
  textSize(18);
  fill(255);
  text("Movie Genre Distribution", width / 2, 30);
}


