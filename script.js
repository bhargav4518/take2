function showSecondScreen() {
    document.querySelector('.first-screen').style.display = 'none'; // Hide first screen
    document.querySelector('.second-screen').style.display = 'flex'; // Show second screen
  }
  
  function showFinalScreen() {
    document.querySelector('.second-screen').style.display = 'none'; // Hide second screen
    document.querySelector('.final-screen').style.display = 'flex'; // Show final screen
  
    // Change background color to pastel
    document.querySelector('.final-screen').style.backgroundColor = "#f8c8d3"; 
  
    // Play the song after 2 seconds delay
    var song = document.getElementById('birthday-song');
    song.currentTime = 2; // Skip the first 2 seconds
    song.play();
  
    // Trigger the fireworks (crackers) animation
    showFireworks();
  }
  
  // Fireworks Animation
  function showFireworks() {
    var canvas = document.getElementById('fireworksCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    var fireworks = [];
    var particles = [];
  
    function Firework(x, y) {
      this.x = x;
      this.y = y;
      this.alpha = 1;
      this.size = Math.random() * 5 + 3;
      this.speed = Math.random() * 4 + 1;
      this.angle = Math.random() * Math.PI * 2;
      this.life = 0;
    }
  
    Firework.prototype.update = function() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.02;
      this.size -= 0.05;
      this.life += 1;
      if (this.life > 50) {
        this.alpha = 0;
      }
    };
  
    Firework.prototype.draw = function() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`; // More colorful fireworks
      ctx.fill();
      ctx.restore();
    };
  
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (Math.random() < 0.1) {  // Increased probability for more fireworks
        fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
      }
  
      fireworks.forEach(function(firework) {
        firework.update();
        firework.draw();
      });
  
      // Continue the fireworks loop to make them always appear
      requestAnimationFrame(loop);
    }
  
    loop();  // Start the loop for continuous fireworks
  }
  