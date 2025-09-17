document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.clients .container');
  if (!container) return;

  const defaultUserIcon = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  const logosData = [
    { img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", review: "This is a fantastic brand. Quality is top-notch!", name: "S. Gupta, Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", review: "Our mission is to deliver excellence always.", name: "L. Mehta, Co-Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", review: "Innovation and creativity drive our company.", name: "R. Khan, CEO" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", review: "We focus on customer happiness above all.", name: "V. Singh, Director" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", review: "Building trust one step at a time.", name: "A. Patel, Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", review: "Customer obsession is our main philosophy.", name: "J. Bezos, Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg", review: "Connecting people around the world.", name: "M. Zuckerberg, Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", review: "Impossible is nothing.", name: "Adi Dassler, Founder" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", review: "Inspire the world, create the future.", name: "Samsung Group" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", review: "Accelerating the world’s transition to sustainable energy.", name: "E. Musk, Founder" }
  ];

  // Create logos dynamically
  logosData.forEach(data => {
    const logo = document.createElement('div');
    logo.className = "logo";
    logo.setAttribute("data-review", data.review);
    logo.setAttribute("data-name", data.name);
    logo.innerHTML = `<img src="${data.img}" alt="logo">`;
    container.appendChild(logo);
  });

  const logos = document.querySelectorAll('.clients .logo');

  // Reset function (size + position + speed assign hota hai yahan)
  function resetLogo(logo){
    const maxH = container.clientHeight;

    // ✅ Har baar right se enter karte waqt naya random size
    const size = Math.floor(Math.random()*70) + 60; 
    logo.style.width = size+"px";
    logo.style.height = size+"px";

    // Random vertical position
    const y = Math.random() * (maxH - size);
    logo.style.top = y+"px";

    // Right se entry (viewport ke bahar se)
    logo.style.left = window.innerWidth + Math.random()*200 + "px";

    // Random speed
    const speed = (Math.random()*2 + 1);
    logo.dataset.currentSpeed = speed;
    logo.dataset.targetSpeed = speed;
  }

  function moveLogo(logo){
    function step(){
      let current = parseFloat(logo.dataset.currentSpeed);
      let target = parseFloat(logo.dataset.targetSpeed);
      current += (target - current) * 0.05;
      logo.dataset.currentSpeed = current;
      const left = parseFloat(logo.style.left);
      const newLeft = left - current;
      logo.style.left = newLeft+"px";
      if(newLeft < -logo.offsetWidth){
        resetLogo(logo); // ✅ Jab left ke bahar nikal jaye to naya size milega
      }
      requestAnimationFrame(step);
    }
    step();
  }

  logos.forEach(logo => {
    resetLogo(logo);
    moveLogo(logo);

    let reviewCard = null;
    logo.addEventListener('mouseenter', () => {
      logo.dataset.targetSpeed = 0;
      if(!reviewCard){
        const reviewText = logo.getAttribute('data-review');
        const founderName = logo.getAttribute('data-name');
        const rect = logo.getBoundingClientRect();

        reviewCard = document.createElement('div');
        reviewCard.className = "review-card";
        reviewCard.innerHTML = `
          <div class="founder-pic"><img src="${defaultUserIcon}" alt="founder"></div>
          ${reviewText}<strong>${founderName}</strong>
        `;
        // Position with scroll offset
        reviewCard.style.left = rect.left + rect.width/2 - 110 + window.scrollX + "px"; 
        reviewCard.style.top = rect.top + window.scrollY - 160 + "px"; 
        document.body.appendChild(reviewCard);
      }
    });

    logo.addEventListener('mouseleave', () => {
      logo.dataset.targetSpeed = (Math.random()*2 + 1);
      if(reviewCard){
        reviewCard.remove();
        reviewCard = null;
      }
    });
  });

  window.addEventListener('resize', () => {
    logos.forEach(logo => resetLogo(logo));
  });
});
