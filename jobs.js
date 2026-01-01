
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