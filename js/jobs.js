
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
                checkbox.checked = false; 
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

    renderDynamicJobs();
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
    
    const customLoc = document.getElementById('custom-location-search').value.toLowerCase().trim();
    const customTech = document.getElementById('custom-tech-search').value.toLowerCase().trim(); // ÚJ


    
    const selectedLocations = Array.from(document.querySelectorAll('.filter-section:nth-child(2) input:checked')).map(cb => cb.value.toLowerCase());
    const selectedTypes = Array.from(document.querySelectorAll('.filter-section:nth-child(3) input:checked')).map(cb => cb.value.toLowerCase());
    const selectedTechs = Array.from(document.querySelectorAll('.filter-section:nth-child(4) input:checked')).map(cb => cb.value.toLowerCase());

    let visibleCount = 0;

    jobCards.forEach(card => {
        const cardLoc = (card.getAttribute('data-location') || "").toLowerCase();
        const cardType = (card.getAttribute('data-type') || "").toLowerCase();
        const cardTechStr = (card.getAttribute('data-tech') || "").toLowerCase(); // Ez a pozíció neve

        // Helyszín szűrés
        const matchLoc = (selectedLocations.length === 0 && customLoc === "") || 
                         selectedLocations.includes(cardLoc) || 
                         (customLoc !== "" && cardLoc.includes(customLoc));

        // Típus szűrés
        const matchType = selectedTypes.length === 0 || selectedTypes.includes(cardType);

        
        const matchTech = (selectedTechs.length === 0 || selectedTechs.some(t => cardTechStr.includes(t))) &&
                          (customTech === "" || cardTechStr.includes(customTech));

        if (matchLoc && matchType && matchTech) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const noResultMsg = document.getElementById('no-results-message');
    if (visibleCount === 0) {
        if (!noResultMsg) {
            const msg = document.createElement('p');
            msg.id = 'no-results-message';
            msg.style.cssText = "color: white; text-align: center; width: 100%; margin-top: 20px;";
            msg.textContent = 'Sajnos nincs a keresésnek megfelelő hirdetés.';
            document.getElementById('jobsList').appendChild(msg);
        }
    } else if (noResultMsg) {
        noResultMsg.remove();
    }
    document.getElementById('custom-location-search').addEventListener('input', filterCards);
    document.getElementById('custom-tech-search').addEventListener('input', filterCards); // ÚJ
}




function renderDynamicJobs() {
    const jobsList = document.getElementById("jobsList");
    if (!jobsList) return;

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const favorites = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    
    // RENDEZÉS: A kedvencek kerüljenek az elejére
    jobs.sort((a, b) => {
        const aFav = favorites.includes(a.id.toString());
        const bFav = favorites.includes(b.id.toString());
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
    });

    jobsList.innerHTML = "";

    if (jobs.length === 0) {
        jobsList.innerHTML = "<p style='color:white; text-align:center;'>Még nincs feltöltött álláshirdetés.</p>";
        return;
    }

    jobs.forEach(job => {
        const isFavorite = favorites.includes(job.id.toString());
        const card = document.createElement("div");
        card.className = "job-card";
        
        // Adatok a szűréshez
        card.setAttribute('data-location', job.location || "");
        card.setAttribute('data-type', job.type || "full-time");
        const techSearchStr = (job.position + " " + (job.tech || "")).toLowerCase();
        card.setAttribute('data-tech', techSearchStr);

        card.innerHTML = `
            <span class="favorite-star ${isFavorite ? 'active' : ''}" data-id="${job.id}">★</span>
            ${job.image ? `<img class="job-image" src="${job.image}" alt="">` : ""}
            <div class="job-content">
                <h3>${job.position}</h3>
                <p>${job.company} • ${job.location}</p>
                <div class="job-tags">
                    <span class="tag">${job.position}</span>
                </div>
            </div>
        `;

        // CSILLAG KATTINTÁS
        const star = card.querySelector('.favorite-star');
        star.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Ez nagyon fontos, hogy ne nyíljon meg a modal!
            toggleFavorite(job.id.toString());
        });

        // KÁRTYA KATTINTÁS (Modal megnyitása)
        card.addEventListener('click', function() {
            openJobModal(job);
        });

        jobsList.appendChild(card);
    });
}

// Segédfüggvény a modalhoz, hogy ne legyen hiba
function openJobModal(job) {
    const modal = document.getElementById('jobModal');
    if (!modal) return;
    
    localStorage.setItem("selectedJobId", job.id);
    document.getElementById('modal-title').textContent = job.position;
    document.getElementById('modal-location').textContent = `${job.company} • ${job.location}`;
    document.getElementById('modal-description').textContent = job.description || "Nincs leírás.";
    
    modal.classList.add('open');
    document.body.classList.add('modal-open');
}

// Kedvencek váltó funkció
function toggleFavorite(jobId) {
    let favorites = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    const card = document.querySelector(`.job-card [data-id="${jobId}"]`).closest('.job-card');
    
    // 1. Megjegyezzük a kártya jelenlegi pozícióját (ahonnan indul a lift)
    const oldRect = card.getBoundingClientRect();

    if (favorites.includes(jobId)) {
        favorites = favorites.filter(id => id !== jobId);
    } else {
        favorites.push(jobId);
        
        // 2. LIFT EFFEKT: Csak akkor csináljuk, ha épp kedvenccé tesszük
        card.classList.add('lifting');
        
        // Egy kis vizuális trükk: picit megemeljük a kártyát
        card.style.transform = "scale(1.05) translateY(-5px)";
    }
    
    localStorage.setItem("favoriteJobs", JSON.stringify(favorites));

    // Várunk egy picit, hogy a felhasználó lássa a csillag sárgulását
    setTimeout(() => {
        // 3. Újrarajzoljuk a listát (ekkor a kártya már az új helyén lesz a DOM-ban)
        renderDynamicJobs();

        // 4. Megkeressük az új helyét a kártyának
        const newCard = document.querySelector(`.job-card [data-id="${jobId}"]`).closest('.job-card');
        const newRect = newCard.getBoundingClientRect();

        // 5. Kiszámoljuk a különbséget (mennyit kell "lifteznie")
        const invertY = oldRect.top - newRect.top;

        // 6. Azonnal visszatesszük az eredeti helyére, majd simán felúsztatjuk
        newCard.style.transform = `translateY(${invertY}px)`;
        newCard.style.transition = 'none'; // Rögtön az elejére ugrik láthatatlanul

        requestAnimationFrame(() => {
            newCard.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            newCard.style.transform = ''; // Elindul a lift felfelé az 0-hoz (az új helyére)
        });

        // Takarítás az animáció végén
        setTimeout(() => {
            newCard.classList.remove('lifting');
        }, 600);
        
    }, 200);
}
