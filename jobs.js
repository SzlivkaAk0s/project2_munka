
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
let timeLeft = 300; 

const startTimer = () => {
    const timerElement = document.querySelector('.jobs-timer');
    
    if (!timerElement) {
        console.warn('.jobs-timer elem nem található');
        return;
    }
    
    const textElement = timerElement.querySelector('.timer-text') || timerElement;
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timerElement.classList.remove('timer-warning', 'timer-critical', 'timer-expired');
    timerElement.style.background = 'linear-gradient(to right, #4f5e94 0%, #4f5e94 50%, #3f4f85 50%, #3f4f85 100%)';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        textElement.textContent = timeString;
        
        timerElement.classList.remove('timer-warning', 'timer-critical', 'timer-expired');
        
        if (timeLeft <= 60) {
            timerElement.classList.add('timer-critical');
        } else if (timeLeft <= 120) {
            timerElement.classList.add('timer-warning');
        } else {
            timerElement.style.background = 'linear-gradient(to right, #4f5e94 0%, #4f5e94 50%, #3f4f85 50%, #3f4f85 100%)';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            timerElement.classList.remove('timer-warning', 'timer-critical');
            timerElement.classList.add('timer-expired');
            textElement.textContent = '00:00';
            
            setTimeout(() => {
                alert('Az idő lejárt! Visszairányítjuk a főoldalra.');
                window.location.href = 'index.html';
            }, 1000);
        }
    }, 1000);
};


const resetTimerOnInteraction = () => {
    timeLeft = 300;
    startTimer();
    
 
    const timerElement = document.querySelector('.jobs-timer');
    if (timerElement) {
        const textElement = timerElement.querySelector('.timer-text') || timerElement;
        const originalText = textElement.textContent;
        

        textElement.style.color = '#4CAF50';
        timerElement.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
        
        setTimeout(() => {
            textElement.style.color = '';
            timerElement.style.boxShadow = '';
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Timer inicializálása...');
    
    startTimer();
    

    const timerElement = document.querySelector('.jobs-timer');
    if (timerElement) {
        timerElement.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            resetTimerOnInteraction();
        });
        
        if (!timerElement.title) {
            timerElement.title = "Kattints az idő visszaállításához!";
        }
    }
    

    const hamburger = document.querySelector('.jobs-hamburger');
    if (hamburger) {

        const originalHamburgerClick = hamburger.onclick;
        hamburger.addEventListener('click', function(e) {
            resetTimerOnInteraction();
        });
    }
    

    const sidebar = document.querySelector('.sidebar-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    if (sidebar) {

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                resetTimerOnInteraction();
            });
        }
        

        sidebar.addEventListener('click', function(e) {

            if (e.target !== closeBtn && !closeBtn.contains(e.target)) {
                resetTimerOnInteraction();
            }
        });
    }
    

    const jobCards = document.querySelectorAll('.job-card');
    if (jobCards.length > 0) {
        jobCards.forEach(card => {

            const originalClickHandler = card.onclick;
            card.addEventListener('click', function(e) {
                resetTimerOnInteraction();
            });
        });
    }
    

    const modal = document.getElementById('jobModal');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const applyBtn = document.querySelector('.modal-apply-btn');
    
    if (modal) {

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                resetTimerOnInteraction();
            });
        }
        

        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                resetTimerOnInteraction();
            });
        }
        

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                resetTimerOnInteraction();
            }
        });
    }
    

    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    const filterToggles = document.querySelectorAll('.filter-toggle');
    

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            resetTimerOnInteraction();
        });
    }
    

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetTimerOnInteraction();
        });
    }
    

    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                resetTimerOnInteraction();
            });
        });
    }
    

    if (filterToggles.length > 0) {
        filterToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                resetTimerOnInteraction();
            });
        });
    }
    

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('jobModal');
            if (modal && modal.classList.contains('open')) {
                resetTimerOnInteraction();
            }
        }
    });
    
 
    if (modal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('open')) {

                        if (timerInterval) {
                            console.log('Modal nyitva - timer szüneteltetve');
                            clearInterval(timerInterval);
                            timerInterval = null;
                        }
                    } else {

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
    

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {

            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        } else if (!timerInterval && timeLeft > 0) {

            startTimer();
        }
    });
    

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            resetTimerOnInteraction();
        }, 1000); 
    });
});


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

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


const addTimerResetStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .timer-interaction-feedback {
            animation: timerPulse 0.3s ease;
        }
        
        @keyframes timerPulse {
            0% { 
                transform: scale(1);
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
            }
            100% { 
                transform: scale(1);
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            }
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addTimerResetStyles);