
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

// TIMER KÖD - GLOBÁLIS SCOPE-BAN
let timerInterval = null;
let timeLeft = 300; // 5 perc = 300 másodperc

const startTimer = () => {
    // MÓDOSÍTVA: .jobs-timer elemet keresünk, mert az a konténer
    const timerElement = document.querySelector('.jobs-timer');
    console.log('Timer elem keresés (.jobs-timer):', timerElement);
    
    if (!timerElement) {
        console.error('HIBA: .jobs-timer elem nem található!');
        return;
    }
    
    // Ha van .timer-text elem a .jobs-timer-en belül, azt használjuk
    // Ha nincs, magát a .jobs-timer elemet használjuk
    const textElement = timerElement.querySelector('.timer-text') || timerElement;
    
    console.log('Szöveg elem:', textElement);
    console.log('Kezdeti tartalom:', textElement.textContent);
    
    // Tisztítás, ha már fut egy timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        console.log('Hátralévő idő:', timeLeft, 'másodperc');
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Frissítjük a szöveget
        textElement.textContent = timeString;
        
        // Stílus frissítés - direkt a .jobs-timer elemre
        timerElement.classList.remove('timer-warning', 'timer-critical');
        if (timeLeft <= 60) {
            timerElement.classList.add('timer-critical');
            console.log('CRITICAL stílus hozzáadva');
        } else if (timeLeft <= 120) {
            timerElement.classList.add('timer-warning');
            console.log('WARNING stílus hozzáadva');
        }
        
        // Idő lejárt
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Az idő lejárt! Visszairányítjuk a főoldalra.');
            window.location.href = 'index.html';
        }
    }, 1000);
};

// Alap timer indítása
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== TIMER INICIALIZÁLÁS ===');
    
    // Timer indítása
    startTimer();
    
    // Timer reset - kattintás a timer magára
    const timerButton = document.querySelector('.jobs-timer');
    if (timerButton) {
        timerButton.addEventListener('click', (e) => {
            console.log('Timer reset kattintás');
            timeLeft = 300;
            startTimer();
            e.stopPropagation();
        });
    }
    
    // Timer szüneteltetése modal nyitáskor
    const modal = document.getElementById('jobModal');
    if (modal) {
        const observer = new MutationObserver(() => {
            if (modal.classList.contains('open')) {
                // Modal nyitva: timer szüneteltetése
                console.log('Modal nyitva - timer PAUSE');
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
            } else {
                // Modal zárva: timer újraindítása
                console.log('Modal zárva - timer RESUME');
                if (!timerInterval && timeLeft > 0) {
                    startTimer();
                }
            }
        });
        
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
    
    // DEBUG: manuális tesztelés a konzolból
    window.debugTimer = {
        reset: () => {
            timeLeft = 300;
            startTimer();
        },
        setTime: (seconds) => {
            timeLeft = seconds;
            startTimer();
        },
        stop: () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        },
        status: () => {
            return {
                timeLeft,
                timerInterval,
                element: document.querySelector('.jobs-timer')
            };
        }
    };
    
    console.log('Timer debug parancsok:');
    console.log('- debugTimer.reset() - újraindítás');
    console.log('- debugTimer.setTime(30) - 30 másodpercre állítás');
    console.log('- debugTimer.stop() - megállítás');
    console.log('- debugTimer.status() - státusz információk');
});