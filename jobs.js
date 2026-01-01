
document.addEventListener('DOMContentLoaded', function() {

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
        
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                e.target !== hamburger) {
                sidebar.classList.remove('open');
            }
        });
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
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            alert('Köszönjük a jelentkezésed! Hamarosan visszajelzünk.');
            if (modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }
});


const filterCards = () => {
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
};


document.querySelector('.apply-filters')?.addEventListener('click', filterCards);
document.querySelector('.reset-filters')?.addEventListener('click', () => {

    document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
        checkbox.checked = true;
    });
    filterCards();
});


document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', filterCards);
});


document.addEventListener('DOMContentLoaded', function() {

    

    document.querySelectorAll('.filter-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.closest('.filter-section');
            section.classList.toggle('collapsed');
        });
    });
});


let timerInterval = null;
let timeLeft = 300; // 5 perc = 300 másodperc

const startTimer = () => {
    // .jobs-timer elemet keresünk
    const timerElement = document.querySelector('.jobs-timer');
    
    if (!timerElement) {
        console.warn('.jobs-timer elem nem található');
        return;
    }
    
    // Szöveg elem keresése
    const textElement = timerElement.querySelector('.timer-text') || timerElement;
    
    // Ha már fut timer, állítsuk le
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Régi stílusok eltávolítása
    timerElement.classList.remove('timer-warning', 'timer-critical', 'timer-expired');
    
    // Normál gradient visszaállítása
    timerElement.style.background = 'linear-gradient(to right, #4f5e94 0%, #4f5e94 50%, #3f4f85 50%, #3f4f85 100%)';
    
    // Timer indítása
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Idő formázása
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Szöveg frissítése
        textElement.textContent = timeString;
        
        // Régi stílusok eltávolítása
        timerElement.classList.remove('timer-warning', 'timer-critical', 'timer-expired');
        
        // Új stílusok hozzáadása idő alapján
        if (timeLeft <= 60) {
            // Kritikus: 1 percnél kevesebb - piros gradient
            timerElement.classList.add('timer-critical');
        } else if (timeLeft <= 120) {
            // Figyelmeztetés: 2 percnél kevesebb - narancs gradient
            timerElement.classList.add('timer-warning');
        } else {
            // Normál állapot - eredeti gradient
            timerElement.style.background = 'linear-gradient(to right, #4f5e94 0%, #4f5e94 50%, #3f4f85 50%, #3f4f85 100%)';
        }
        
        // Idő lejárt
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            // Idő lejárt stílus
            timerElement.classList.remove('timer-warning', 'timer-critical');
            timerElement.classList.add('timer-expired');
            textElement.textContent = '00:00';
            
            // Üzenet és átirányítás
            setTimeout(() => {
                alert('Az idő lejárt! Visszairányítjuk a főoldalra.');
                window.location.href = 'index.html';
            }, 1000);
        }
    }, 1000);
};

// Oldal betöltésekor timer indítása
document.addEventListener('DOMContentLoaded', function() {
    console.log('Timer inicializálása...');
    
    // Timer indítása
    startTimer();
    
    // Kattintás a timer-re - idő visszaállítása
    const timerElement = document.querySelector('.jobs-timer');
    if (timerElement) {
        timerElement.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Részecske effektus
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Idő visszaállítása
            timeLeft = 300;
            startTimer();
            
            // Visszajelzés
            const originalTitle = this.title;
            this.title = "Idő visszaállítva!";
            setTimeout(() => {
                this.title = originalTitle || "Kattints az idő visszaállításához!";
            }, 1500);
        });
        
        // Alapértelmezett tooltip
        if (!timerElement.title) {
            timerElement.title = "Kattints az idő visszaállításához!";
        }
    }
    
    // Modal kezelése - timer szüneteltetése
    const modal = document.getElementById('jobModal');
    if (modal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('open')) {
                        // Modal nyitva: timer szüneteltetése
                        if (timerInterval) {
                            console.log('Modal nyitva - timer szüneteltetve');
                            clearInterval(timerInterval);
                            timerInterval = null;
                        }
                    } else {
                        // Modal zárva: timer újraindítása
                        if (!timerInterval && timeLeft > 0) {
                            console.log('Modal zárva - timer újraindítva');
                            startTimer();
                        }
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Tab váltás kezelése
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Lap elrejtve - timer szüneteltetése
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        } else if (!timerInterval && timeLeft > 0) {
            // Lap újra látható - timer újraindítása
            startTimer();
        }
    });
    
    // Oldal elhagyásakor figyelmeztetés
    window.addEventListener('beforeunload', function(e) {
        if (timeLeft > 0 && timeLeft < 300) {
            // Opcionális: felhasználó értesítése, hogy idő fut
            // return "Az időzítő még fut. Biztosan el akarod hagyni az oldalt?";
        }
    });
});

// Helper funkció az idő formázásához
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Globális timer vezérlés (opcionális)
window.timerController = {
    reset: function() {
        timeLeft = 300;
        startTimer();
        return 'Timer visszaállítva 5 percre';
    },
    addTime: function(seconds) {
        timeLeft += seconds;
        startTimer();
        return `${seconds} másodperc hozzáadva`;
    },
    getStatus: function() {
        return {
            timeLeft: timeLeft,
            formatted: formatTime(timeLeft),
            isRunning: timerInterval !== null
        };
    }
};