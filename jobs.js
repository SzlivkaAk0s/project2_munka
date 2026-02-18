
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jobs oldal betöltődött');
    

    const isLoggedIn = () => {
        return localStorage.getItem('currentUser') !== null;
    };
    
    if (!isLoggedIn()) {
        console.log('Nincs bejelentkezve, átirányítás index.html-re');
        window.location.href = 'index.html';
        return;
    }
    
    console.log('Felhasználó bejelentkezve, oldal betöltése...');
    

  const profileCircle = document.querySelector('.jobs-profile-circle');
  if (profileCircle) {
      const username = localStorage.getItem('currentUser');
      if (username) {
          profileCircle.style.background = '#35bd5b';
          profileCircle.style.display = 'flex';
          profileCircle.style.alignItems = 'center';
          profileCircle.style.justifyContent = 'center';
          profileCircle.style.color = 'white';
          profileCircle.style.fontWeight = 'bold';
          profileCircle.style.fontSize = '18px';
          profileCircle.textContent = username.charAt(0).toUpperCase();
          profileCircle.title = `${username} - Kattints a profil megtekintéséhez`;
          

          profileCircle.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              console.log('Profil gombra kattintottak, átirányítás profile.html-re');
              window.location.href = 'profile.html';
          });
          

          profileCircle.style.cursor = 'pointer';
          profileCircle.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
          

          profileCircle.addEventListener('mouseenter', function() {
              this.style.transform = 'scale(1.1)';
              this.style.boxShadow = '0 0 15px rgba(53, 189, 91, 0.7)';
   
              this.style.position = 'fixed'; 
              this.style.right = '30px';
              this.style.top = '12px';
          });
          
          profileCircle.addEventListener('mouseleave', function() {
              this.style.transform = 'scale(1)';
              this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.25)';
          });
      }
  }
    
  
    startTimer();
    

    const hamburger = document.querySelector('.jobs-hamburger');
    const sidebar = document.querySelector('.sidebar-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                sidebar.classList.remove('open');
            });
        }
    }
    
  
    const sidebarMenu = document.querySelector('.sidebar-menu ul');
    if (sidebarMenu) {

        let profileLinkExists = false;
        sidebarMenu.querySelectorAll('a').forEach(link => {
            if (link.textContent.includes('Profil') || link.href.includes('profile.html')) {
                profileLinkExists = true;
            }
        });
        

        if (!profileLinkExists) {
            const profileLi = document.createElement('li');
            profileLi.innerHTML = '<a href="profile.html">Profil</a>';
            
      
            const menuItems = sidebarMenu.querySelectorAll('li');
            let settingsIndex = -1;
            
            menuItems.forEach((item, index) => {
                if (item.textContent.includes('Beállítások') || 
                    item.querySelector('a[href*="beallitasok"]')) {
                    settingsIndex = index;
                }
            });
            
  
            if (settingsIndex !== -1 && settingsIndex + 1 < menuItems.length) {
                sidebarMenu.insertBefore(profileLi, menuItems[settingsIndex + 1]);
            } else {

                sidebarMenu.appendChild(profileLi);
            }
        }
    }
    
  
    const modal = document.getElementById('jobModal');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const jobCards = document.querySelectorAll('.job-card');
    const applyBtn = document.querySelector('.modal-apply-btn');
    
    const jobData = {
        1: {
            title: "Frontend fejlesztő",
            location: "Budapest • Full-time",
            description: "Keresünk kreatív frontend fejlesztőt, aki csatlakozna csapatunkhoz. Feladatod lesz modern webalkalmazások fejlesztése és karbantartása.",
            requirements: [
                "3+ év tapasztalat frontend fejlesztésben",
                "React vagy hasonló keretrendszer ismerete",
                "CSS/SCSS haladó szintű ismerete",
                "Git verziókezelő rendszer ismerete"
            ],
            benefits: [
                "Home office lehetőség",
                "Bérszámfejtés félévente",
                "Szép kártya",
                "Bővülő szabadság napok"
            ],
            tags: ["React", "JavaScript", "CSS", "TypeScript", "Webpack"]
        },
        2: {
            title: "Backend fejlesztő",
            location: "Remote • Junior",
            description: "Junior backend fejlesztőt keresünk, aki szeretne tanulni és fejlődni. Kiemelt figyelmet fordítunk a mentorálásra.",
            requirements: [
                "Alapvető programozási ismeretek",
                "Node.js vagy Python alapok",
                "Adatbázisok alapvető ismerete",
                "Angol nyelv középfok"
            ],
            benefits: [
                "Teljesen remote munkavégzés",
                "Mentor program",
                "Szakképzési lehetőségek",
                "Rugalmas munkaidő"
            ],
            tags: ["Node.js", "Python", "MongoDB", "Express", "REST API"]
        },
        3: {
            title: "UI / UX Designer",
            location: "Szeged • Hybrid",
            description: "Kreatív UI/UX designer pozíció hibrid munkavégzéssel. Feladatod lesz felhasználóbarát interfészek tervezése és prototípusok készítése.",
            requirements: [
                "2+ év tapasztalat UI/UX tervezésben",
                "Figma vagy Adobe XD haladó ismerete",
                "Design rendszerek és komponenskönyvtárak ismerete",
                "Reszponzív design tapasztalat"
            ],
            benefits: [
                "Hibrid munkavégzés",
                "Modern iroda Szeged belvárosában",
                "Design eszközök biztosítása",
                "Konferenciákra utazási lehetőség"
            ],
            tags: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"]
        }
    };

    if (jobCards.length > 0) {
        jobCards.forEach(card => {
            card.addEventListener('click', function() {
                const jobId = this.getAttribute('data-job');
                const data = jobData[jobId];
                
                if (data && modal) {
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-location').textContent = data.location;
                    document.getElementById('modal-description').textContent = data.description;
                    
                    const reqList = document.getElementById('modal-requirements');
                    reqList.innerHTML = '';
                    data.requirements.forEach(req => {
                        const li = document.createElement('li');
                        li.textContent = req;
                        reqList.appendChild(li);
                    });
                    
                    const benList = document.getElementById('modal-benefits');
                    benList.innerHTML = '';
                    data.benefits.forEach(ben => {
                        const li = document.createElement('li');
                        li.textContent = ben;
                        benList.appendChild(li);
                    });
                    
                    const tagsContainer = document.getElementById('modal-tags');
                    tagsContainer.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag;
                        tagsContainer.appendChild(span);
                    });
                    
                    modal.classList.add('open');
                    document.body.classList.add('modal-open');
                }
            });
        });
    }
    
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    /*if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            alert('Köszönjük a jelentkezésed! Hamarosan visszajelzünk.');
            if (modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }*/
    

    const timerElement = document.querySelector('.jobs-timer');
    if (timerElement) {
        timerElement.addEventListener('click', function() {
            timeLeft = 300;
            startTimer();
        });
    }
    

    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterCards);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
                checkbox.checked = true;
            });
            filterCards();
        });
    }
    
    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterCards);
        });
    }
    

    document.querySelectorAll('.filter-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.closest('.filter-section');
            section.classList.toggle('collapsed');
        });
    });
});


let timerInterval = null;
let timeLeft = 300;

function startTimer() {
    const timerElement = document.querySelector('.jobs-timer');
    if (!timerElement) return;
    
    const textElement = timerElement.querySelector('.timer-text') || timerElement;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        textElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
  
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userType');
            window.location.href = 'index.html';
        }
    }, 1000);
}


function filterCards() {
    const jobCards = document.querySelectorAll('.job-card');
    const locationCheckboxes = document.querySelectorAll('.filter-section:nth-child(2) input:checked');
    const typeCheckboxes = document.querySelectorAll('.filter-section:nth-child(3) input:checked');
    const techCheckboxes = document.querySelectorAll('.filter-section:nth-child(4) input:checked');
    
    const selectedLocations = Array.from(locationCheckboxes).map(cb => cb.value);
    const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
    const selectedTechs = Array.from(techCheckboxes).map(cb => cb.value);
    
    jobCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        let showCard = true;
        
  
        if (selectedLocations.length > 0) {
            const hasLocation = selectedLocations.some(loc => 
                cardText.includes(loc.toLowerCase())
            );
            if (!hasLocation) showCard = false;
        }
        
    
        if (selectedTypes.length > 0 && showCard) {
            const hasType = selectedTypes.some(type => 
                cardText.includes(type.toLowerCase())
            );
            if (!hasType) showCard = false;
        }
        
   
        if (selectedTechs.length > 0 && showCard) {
            const hasTech = selectedTechs.some(tech => 
                cardText.includes(tech.toLowerCase())
            );
            if (!hasTech) showCard = false;
        }
        
 
        if (showCard) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}
