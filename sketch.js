let table;
let genreCounts = [];
let maxCount = 0;

function preload() {
  table = loadTable("movies.csv", "csv", "header");
}

function setup() {
  createCanvas(900, 500);
  noLoop();

  // Step 1: Count genres
  let counts = {};

  for (let r = 0; r < table.getRowCount(); r++) {
    let genres = table.getString(r, "genres").split("|");

    for (let g of genres) {
      if (g === "(no genres listed)") continue;

      if (counts[g]) {
        counts[g]++;
      } else {
        counts[g] = 1;
      }
    }
  }

  // Step 2: Convert object → array for sorting
  for (let genre in counts) {
    genreCounts.push({
      genre: genre,
      count: counts[genre]
    });

    if (counts[genre] > maxCount) {
      maxCount = counts[genre];
    }
  }

  // Step 3: Sort descending by frequency
  genreCounts.sort((a, b) => b.count - a.count);
}

function draw() {
  background(20);

  let margin = 60;
  let chartWidth = width - margin * 2;
  let chartHeight = height - margin * 2;

  let barWidth = chartWidth / genreCounts.length;

  // Axes
  stroke(150);
  line(margin, height - margin, width - margin, height - margin);
  line(margin, margin, margin, height - margin);

  noStroke();
  textAlign(CENTER);
  textSize(10);

  for (let i = 0; i < genreCounts.length; i++) {
    let g = genreCounts[i];

    let x = margin + i * barWidth;
    let h = map(g.count, 0, maxCount, 0, chartHeight);
    let y = height - margin - h;

    fill(100, 180, 255);
    rect(x, y, barWidth - 2, h);

    // Rotate labels so they fit
    push();
    translate(x + barWidth / 2, height - margin + 12);
    rotate(-PI / 4);
    fill(255);
    text(g.genre, 0, 0);
    pop();
  }

  // Title
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Movie Count by Genre", width / 2, 30);
}
