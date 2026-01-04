
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
let warningModalShown = false;

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
        

        if (timeLeft === 30 && !warningModalShown) {
            showWarningModal();
        }
        

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            timerElement.classList.remove('timer-warning', 'timer-critical');
            timerElement.classList.add('timer-expired');
            textElement.textContent = '00:00';
            

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }, 1000);
};


const showWarningModal = () => {
    warningModalShown = true;
    

    let warningModal = document.getElementById('timer-warning-modal');
    
    if (!warningModal) {
        warningModal = document.createElement('div');
        warningModal.id = 'timer-warning-modal';
        warningModal.className = 'timer-warning-modal';
        warningModal.innerHTML = `
            <div class="timer-warning-modal-content">
                <div class="timer-warning-modal-header">
                    <h3>⏰ Idő majdnem lejárt!</h3>
                    <span class="timer-warning-close-btn">&times;</span>
                </div>
                <div class="timer-warning-modal-body">
                    <p>Már csak <strong>30 másodperc</strong> van hátra az oldalon való tartózkodásodhoz.</p>
                    <p>Szeretnél tovább maradni?</p>
                    <div class="timer-warning-countdown">
                        Válaszidő: <span id="warning-countdown">30</span> másodperc
                    </div>
                </div>
                <div class="timer-warning-modal-footer">
                    <button class="timer-warning-btn timer-warning-no">Nem, kilépek</button>
                    <button class="timer-warning-btn timer-warning-yes">Igen, maradok</button>
                </div>
            </div>
        `;
        document.body.appendChild(warningModal);
        
        // CSS hozzáadása
        const style = document.createElement('style');
        style.textContent = `
            .timer-warning-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 9999;
                align-items: center;
                justify-content: center;
            }
            
            .timer-warning-modal.open {
                display: flex;
            }
            
            .timer-warning-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease;
                overflow: hidden;
            }
            
            @keyframes modalSlideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .timer-warning-modal-header {
                background: linear-gradient(to right, #f44336 0%, #f44336 50%, #d32f2f 50%, #d32f2f 100%);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .timer-warning-modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .timer-warning-close-btn {
                font-size: 28px;
                cursor: pointer;
                line-height: 1;
            }
            
            .timer-warning-modal-body {
                padding: 25px;
                font-size: 1.1rem;
                line-height: 1.6;
                color: #333;
            }
            
            .timer-warning-countdown {
                margin-top: 15px;
                padding: 10px;
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                border-radius: 4px;
                font-weight: bold;
            }
            
            #warning-countdown {
                color: #f44336;
                font-size: 1.2rem;
            }
            
            .timer-warning-modal-footer {
                padding: 20px;
                background: #f8f9fa;
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                border-top: 1px solid #dee2e6;
            }
            
            .timer-warning-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .timer-warning-no {
                background: #6c757d;
                color: white;
            }
            
            .timer-warning-no:hover {
                background: #545b62;
            }
            
            .timer-warning-yes {
                background: linear-gradient(to right, #4f5e94 0%, #4f5e94 50%, #3f4f85 50%, #3f4f85 100%);
                color: white;
            }
            
            .timer-warning-yes:hover {
                opacity: 0.9;
            }
            
            .timer-warning-btn:active {
                transform: scale(0.98);
            }
            
            .timer-warning-flash {
                animation: warningFlash 1s infinite;
            }
            
            @keyframes warningFlash {
                0%, 100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
                50% { box-shadow: 0 0 0 10px rgba(244, 67, 54, 0); }
            }
        `;
        document.head.appendChild(style);
    }
    

    warningModal.classList.add('open');
    document.body.classList.add('modal-open');
    

    let warningCountdown = 30;
    const countdownElement = document.getElementById('warning-countdown');
    const countdownInterval = setInterval(() => {
        warningCountdown--;
        if (countdownElement) {
            countdownElement.textContent = warningCountdown;
            

            if (warningCountdown <= 10) {
                countdownElement.style.color = '#f44336';
                countdownElement.style.fontWeight = 'bold';
                countdownElement.parentElement.classList.add('timer-warning-flash');
            }
        }
        

        if (warningCountdown <= 0) {
            clearInterval(countdownInterval);
            closeWarningModal();

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        }
    }, 1000);
    

    const closeWarningModal = () => {
        warningModal.classList.remove('open');
        document.body.classList.remove('modal-open');
        clearInterval(countdownInterval);
        warningModalShown = false;
    };
    

    const closeBtn = warningModal.querySelector('.timer-warning-close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeWarningModal;
    }
    

    const noBtn = warningModal.querySelector('.timer-warning-no');
    if (noBtn) {
        noBtn.onclick = () => {
            closeWarningModal();
            window.location.href = 'index.html';
        };
    }
    

    const yesBtn = warningModal.querySelector('.timer-warning-yes');
    if (yesBtn) {
        yesBtn.onclick = () => {
            closeWarningModal();
            resetTimerOnInteraction();
 
            timeLeft = 300;
            startTimer();
        };
    }
    

    warningModal.onclick = (e) => {
        if (e.target === warningModal) {
            closeWarningModal();
        }
    };
    

    const handleEscape = (e) => {
        if (e.key === 'Escape' && warningModal.classList.contains('open')) {
            closeWarningModal();
        }
    };
    document.addEventListener('keydown', handleEscape);
    

    warningModal.dataset.escapeHandler = 'true';
};


const resetTimerOnInteraction = () => {
    timeLeft = 300;
    warningModalShown = false;
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
    

    const warningModal = document.getElementById('timer-warning-modal');
    if (warningModal) {
        warningModal.classList.remove('open');
        document.body.classList.remove('modal-open');
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
        
        .modal-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addTimerResetStyles);