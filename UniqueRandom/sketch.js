let weatherData; 
let circles = [];

function preload() {
  // Load the CSV file
  weatherData = loadTable('weather_dataset.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);
  noStroke();
  for (let i = 0; i < weatherData.getRowCount(); i++) {
    let city = weatherData.getString(i, 'City');
    let temp = parseFloat(weatherData.getString(i, 'Temperature (°C)'));
    let humidity = parseFloat(weatherData.getString(i, 'Humidity (%)'));
    let windSpeed = parseFloat(weatherData.getString(i, 'Wind Speed (m/s)'));


    circles.push(new Circle(random(width), random(height), temp, humidity, windSpeed, city));
  }
}

function draw() {
  background(20, 30, 50); 

  // Update and display all circles
  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}


class Circle {
  constructor(x, y, temp, humidity, windSpeed, city) {
    this.x = x;
    this.y = y;
    this.temp = temp;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.city = city;
    this.size = map(temp, -10, 40, 10, 80); 
    this.alpha = map(humidity, 0, 100, 50, 255); 
    this.color = color(random(100, 255), random(100, 255), random(100, 255)); // pusedo Random color
  }
// the jitterness off the windspeed of each city
  update() {
    this.x += random(-this.windSpeed, this.windSpeed);
    this.y += random(-this.windSpeed, this.windSpeed);

    // making sure the color stays within ground
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    // Draw the circles
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);

    // display city name if hovered over (glitchy on the parts that are near the edge or the parts that overlap eachother)
    if (dist(mouseX, mouseY, this.x, this.y) < this.size / 2) {
      fill(255);
      textSize(12);
      textAlign(CENTER);
      text(this.city, this.x, this.y - this.size / 2 - 5);
    }
  }
}
