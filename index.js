
const blueBurst = new mojs.Burst({
    radius: { 0: 100 },
    count: 20,
    children : {
      shape: 'cross',
      stroke: 'teal',
      strokeWidth: { 6: 0},
      angle: { 360: 0},
      radius: { 30 : 5 },
      duration: 3000
    }
  })
  
  const burst = new mojs.Burst({
    radius: { 0: 100 },
    count: 20,
    children : {
      shape: 'cross',
      stroke: 'teal',
      strokeWidth: { 6: 0},
      angle: { 360: 0},
      radius: { 30 : 5 },
      duration: 3000
    }
  });
  
  const burst2 = new mojs.Burst({
    radius: { 0: 200 },
    count: 12,
    children : {
      shape: 'zigzag',
      points: 7,
      stroke: {'magenta' : 'pink'},
      fill: 'none',
      strokeWidth: { 6: 0},
      angle: { '-360': 0},
      radius: { 30 : 5 },
      opacity: { 1: 0},
      duration: 3000
    }
  });
  
  const burst3 = new mojs.Burst({
    radius: { 0: 200 },
    count: 5,
    children : {
      color: 'purple',
      points: 7,
      angle: { '-360': 0},
      radius: { 10 : 5 },
      opacity: { 1: 0},
      duration: 3000
    }
  });
  
  const circ_opt = {
    radius: {0: 200},
    fill: 'none',
    stroke: 'yellow',
    opacity: {1: 0},
    duration: 3500
  };
  
  const circ = new mojs.Shape({
    ...circ_opt
  });
  
  const circ2 = new mojs.Shape({
    ...circ_opt,
    delay: 500
  });
  
  const circ_opt1 = {
    radius: {200: 0},
    fill: 'none',
    stroke: 'orange',
    opacity: {1: 0},
    duration: 3500
  };
  
  const circ3 = new mojs.Shape({
    ...circ_opt1,
    delay: 500
  });
  
  const timeline = new mojs.Timeline({
    repeat: 999
  })
    .add(blueBurst, burst, burst2, burst3, circ, circ2, circ3)
    .play();

    const particles = [];
    function setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        
        const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
        for(let i=0; i<particlesLength; i++) {
            particles.push(new Particle());
        }
    }
    
    function draw() {
        background(20);
        
        particles.forEach((particle, idx) => {
            particle.update();
            particle.draw();
            particle.checkParticles(particles.slice(idx));
        });
    }
    
    class Particle {
        constructor() {
            this.pos = createVector(random(width), random(height));
            this.vel = createVector(random(-2, 2), random(-2, 2));
            this.size = 5;
        }
        
        update() {
            this.pos.add(this.vel);
            this.edges();
        }
        
        draw() {
            noStroke();
            fill('rgba(255, 255, 255, 0.5)');
            circle(this.pos.x, this.pos.y, this.size * 2);
        }
        
        edges() {
            if(this.pos.x < 0 || this.pos.x > width) {
                this.vel.x *= -1;
            }
            
            if(this.pos.y < 0 || this.pos.y > height) {
                this.vel.y *= -1;
            }
            
        }
        
        checkParticles(particles) {
            particles.forEach(particle => {
                const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                if(d < 120) {
                    const alpha = map(d, 0, 120, 0, 0.25)
                    stroke(`rgba(255, 255, 255, ${alpha})`);
                    line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
                }
            });
        }
    }
    