
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

// Szűrő funkció
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
        
        // Hely szűrés
        if (selectedLocations.length > 0) {
            const hasLocation = selectedLocations.some(loc => 
                cardText.includes(loc.toLowerCase())
            );
            if (!hasLocation) showCard = false;
        }
        
        // Típus szűrés
        if (selectedTypes.length > 0 && showCard) {
            const hasType = selectedTypes.some(type => 
                cardText.includes(type.toLowerCase())
            );
            if (!hasType) showCard = false;
        }
        
        // Tech szűrés
        if (selectedTechs.length > 0 && showCard) {
            const hasTech = selectedTechs.some(tech => 
                cardText.includes(tech.toLowerCase())
            );
            if (!hasTech) showCard = false;
        }
        
        // Megjelenítés/elrejtés
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

// Szűrő section-ok összecsukása/kinyitása
document.addEventListener('DOMContentLoaded', function() {
    // ... az előző kód ...
    
    // Szűrő toggle-ek
    document.querySelectorAll('.filter-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.closest('.filter-section');
            section.classList.toggle('collapsed');
        });
    });
});