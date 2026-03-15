console.log('Auth.js betöltődött - GitHub Pages debug');
console.log('LocalStorage elérhető?', typeof localStorage !== 'undefined');
console.log('Window location:', window.location.href);

const isGitHubPages = window.location.hostname.includes('github.io');
console.log('GitHub Pages?', isGitHubPages);

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js betöltődött');
    

    const USERS_KEY = 'workconnect_users';
    const CURRENT_USER_KEY = 'currentUser';
    const USER_TYPE_KEY = 'userType';
    

    const authManager = {
 
        getUsers: function() {
            const usersJSON = localStorage.getItem(USERS_KEY);
            return usersJSON ? JSON.parse(usersJSON) : {};
        },
        

        saveUsers: function(users) {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        },

        registerUser: function(username, password, userType = 'employee', extra = {}) {
            const users = this.getUsers();
            

            if (users[username]) {
                return { success: false, message: 'Ez a felhasználónév már foglalt!' };
            }
            
            // Alap felhasználói objektum
            const userObject = {
                password,
                userType,
                createdAt: new Date().toISOString()
            };
            
            // Munkavállaló esetén profile objektum
            if (userType === 'employee') {
                userObject.profile = {
                    fullName: extra.fullName || '',
                    birthName: extra.birthName || '',
                    birthDate: extra.birthDate || '',
                    phone: extra.phone || '',
                    email: extra.email || '',
                    address: extra.address || { zipCode: '', city: '', street: '' },
                    education: extra.education || '',
                    experience: extra.experience || 0,
                    preferences: extra.preferences || [],
                    cvFileName: extra.cvFileName || null,
                    profileImageName: extra.profileImageName || null,
                    applications: [],
                    savedJobs: []
                };
            } else {
                // Munkáltató esetén a régi mezők
                userObject.companyName = extra.companyName || null;
                userObject.companyEmail = extra.companyEmail || null;
            }
            
            // Felhasználó mentése
            users[username] = userObject;
            this.saveUsers(users);
            
            // Statisztika inicializálása
            this.initUserStats(username, userType);
            
            return { success: true, message: 'Sikeres regisztráció!' };
        },
        

        initUserStats: function(username, userType) {
            const statsKey = `user_stats_${username}`;
            
            // Ellenőrizzük, hogy létezik-e már statisztika
            const existingStats = localStorage.getItem(statsKey);
            
            if (!existingStats) {
                // Csak akkor hozzuk létre, ha még nem létezik
                const defaultStats = {
                    loginCount: 0,
                    lastLogin: null,
                    jobsApplied: 0,
                    profileViews: 0,
                    jobsPosted: 0,
                    applicationsReceived: 0,
                    memberSince: new Date().toISOString()
                };
                
                localStorage.setItem(statsKey, JSON.stringify(defaultStats));
                console.log('Új statisztika létrehozva:', username);
            } else {
                console.log('Meglévő statisztika megőrizve:', username);
            }
        },
        

        loginUser: function(username, password) {
            const users = this.getUsers();
            const user = users[username];
            
            if (!user) {
                return { success: false, message: 'Hibás felhasználónév vagy jelszó!' };
            }
            
            if (user.password !== password) {
                return { success: false, message: 'Hibás felhasználónév vagy jelszó!' };
            }
            
  
            localStorage.setItem(CURRENT_USER_KEY, username);
            localStorage.setItem(USER_TYPE_KEY, user.userType);
            

            this.updateLoginStats(username);
            
            return { 
                success: true, 
                message: 'Sikeres bejelentkezés!', 
                userType: user.userType 
            };
        },
        

        updateLoginStats: function(username) {
            const statsKey = `user_stats_${username}`;
            const statsJSON = localStorage.getItem(statsKey);
            let stats = statsJSON ? JSON.parse(statsJSON) : {};
            
            stats.loginCount = (stats.loginCount || 0) + 1;
            stats.lastLogin = new Date().toISOString();
            
            localStorage.setItem(statsKey, JSON.stringify(stats));
        },
        

        logoutUser: function() {
            const username = localStorage.getItem(CURRENT_USER_KEY);
            
  
            if (username) {
                this.saveLogoutTime(username);
            }
            
            localStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem(USER_TYPE_KEY);
        },
        
  
        saveLogoutTime: function(username) {
            const logoutKey = `last_logout_${username}`;
            localStorage.setItem(logoutKey, new Date().toISOString());
        },
        
  
        getCurrentUser: function() {
            const username = localStorage.getItem(CURRENT_USER_KEY);
            if (!username) return null;
            
            const users = this.getUsers();
            const user = users[username];
            
            return user ? {
                username: username,
                userType: user.userType,
                createdAt: user.createdAt,
                profile: user.profile || null
            } : null;
        },
        
    
        isLoggedIn: function() {
            return localStorage.getItem(CURRENT_USER_KEY) !== null;
        },
        
   
        getUserType: function() {
            return localStorage.getItem(USER_TYPE_KEY);
        },
        
  
        getUserStats: function(username) {
            const statsKey = `user_stats_${username}`;
            const statsJSON = localStorage.getItem(statsKey);
            return statsJSON ? JSON.parse(statsJSON) : null;
        },
        
        // ÚJ: Felhasználó profiljának lekérése
        getUserProfile: function(username) {
            const users = this.getUsers();
            const user = users[username];
            return user && user.profile ? user.profile : null;
        },
        
        // ÚJ: Profil frissítése
        updateUserProfile: function(username, profileData) {
            const users = this.getUsers();
            if (users[username]) {
                users[username].profile = { ...users[username].profile, ...profileData };
                this.saveUsers(users);
                return true;
            }
            return false;
        }
    };
    
  
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        console.log('Login form található (index.html)');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                showMessage('loginMessage', 'Kérlek töltsd ki minden mezőt!', 'error');
                return;
            }
            
            const result = authManager.loginUser(username, password);
            
            if (result.success) {
                showMessage('loginMessage', result.message, 'success');
                
   
                const userType = authManager.getUserType();

                setTimeout(() => {
                    if (userType === 'employer') {
                        window.location.href = 'allashirdet.html';
                    } else {
                    window.location.href = 'jobs.html';
                    }
                }, 1000);
            } else {
                showMessage('loginMessage', result.message, 'error');
            }
        });
    }
    
  
    if (registerForm) {
        console.log('Register form található (index.html)');
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Alap adatok - .trim() MINDEN szöveges mezőnél!
            const username = document.getElementById('registerUsername').value.trim();
            const password = document.getElementById('registerPassword').value; // Itt NE trim, mert a jelszó tartalmazhat space-t
            const confirmPassword = document.getElementById('confirmPassword').value; // Itt NE trim
            const userType = localStorage.getItem('selectedUserType') || 'employee';
            
            // DEBUG - írassuk ki, hogy látjuk mi a probléma
            console.log('Jelszó:', password);
            console.log('Jelszó megerősítés:', confirmPassword);
            console.log('Hossz - jelszó:', password.length, 'megerősítés:', confirmPassword.length);
            
            // Alap validáció
            if (!username || !password || !confirmPassword) {
                showMessage('registerMessage', 'Kérlek töltsd ki a kötelező mezőket!', 'error');
                return;
            }
            
            if (username.length < 3) {
                showMessage('registerMessage', 'A felhasználónév minimum 3 karakter hosszú legyen!', 'error');
                return;
            }
            
            if (password.length < 4) {
                showMessage('registerMessage', 'A jelszó minimum 4 karakter hosszú legyen!', 'error');
                return;
            }
            
            // JELSZÓ ÖSSZEHASONLÍTÁS - JAVÍTVA
            if (password !== confirmPassword) {
                console.log('Jelszavak NEM egyeznek!');
                console.log('Jelszó:', password);
                console.log('Megerősítés:', confirmPassword);
                showMessage('registerMessage', 'A jelszavak nem egyeznek!', 'error');
                return;
            }
            
            console.log('Jelszavak egyeznek, folytatódik a regisztráció...');
            
            // MUNKAVÁLLALÓ ESETÉN extra validációk
            let extra = {};
            
            if (userType === 'employee') {
                // Kötelező mezők ellenőrzése munkavállalóknál
                const fullName = document.getElementById('fullName')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                
                if (!fullName) {
                    showMessage('registerMessage', 'Kérlek add meg a teljes neved!', 'error');
                    return;
                }
                
                if (!email) {
                    showMessage('registerMessage', 'Kérlek add meg az email címed!', 'error');
                    return;
                }
                
                // Email formátum ellenőrzés
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage('registerMessage', 'Kérlek érvényes email címet adj meg!', 'error');
                    return;
                }
                
                // Telefonszám formátum ellenőrzés (ha meg van adva)
                const phone = document.getElementById('phone')?.value.trim();
                if (phone) {
                    const phoneRegex = /^(\+36|06)[0-9]{1,4}[0-9]{6,7}$/;
                    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                        showMessage('registerMessage', 'Kérlek érvényes telefonszámot adj meg (+36 vagy 06 formátumban)!', 'error');
                        return;
                    }
                }
                
                // Preferenciák összegyűjtése
                const preferences = [];
                document.querySelectorAll('input[name="preferences"]:checked').forEach(cb => {
                    preferences.push(cb.value);
                });
                
                // File-ok kezelése (jelenleg csak a fájlneveket tároljuk)
                const cvFile = document.getElementById('cv')?.files[0];
                const profileImage = document.getElementById('profileImage')?.files[0];
                
                // Munkavállalói adatok összegyűjtése
                extra = {
                    fullName: fullName,
                    birthName: document.getElementById('birthName')?.value.trim() || '',
                    birthDate: document.getElementById('birthDate')?.value || '',
                    phone: phone || '',
                    email: email,
                    address: {
                        zipCode: document.getElementById('zipCode')?.value.trim() || '',
                        city: document.getElementById('city')?.value.trim() || '',
                        street: document.getElementById('street')?.value.trim() || ''
                    },
                    education: document.getElementById('education')?.value || '',
                    experience: document.getElementById('experience')?.value || 0,
                    preferences: preferences,
                    cvFileName: cvFile ? cvFile.name : null,
                    profileImageName: profileImage ? profileImage.name : null
                };
            } else {
                // Munkáltató esetén a régi mezők
                extra = {
                    companyName: document.getElementById('companyName')?.value || '',
                    companyEmail: document.getElementById('companyEmail')?.value || ''
                };
            }
            
            // Regisztráció az authManager-rel
            const result = authManager.registerUser(username, password, userType, extra);
            
            if (result.success) {
                // Automatikus bejelentkezés
                const loginResult = authManager.loginUser(username, password);
                
                if (loginResult.success) {
                    showMessage('registerMessage', 'Sikeres regisztráció! Automatikusan bejelentkeztél. Átirányítás...', 'success');
                    
                    setTimeout(() => {
                        if (userType === 'employer') {
                            window.location.href = 'allashirdet.html';
                        } else {
                            window.location.href = 'jobs.html';
                        }
                    }, 1500);
                }
            } else {
                showMessage('registerMessage', result.message, 'error');
            }
        });
    }
    

    function showMessage(elementId, text, type = 'info') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = `<div class="message ${type}">${text}</div>`;
        
  
        if (type === 'success') {
            setTimeout(() => {
                // Csak akkor töröljük, ha még nem történt meg az átirányítás
                if (element.innerHTML.includes(text)) {
                    element.innerHTML = '';
                }
            }, 5000);
        }
    }
    
  
    window.authManager = authManager;
    
    console.log('AuthManager inicializálva. Bejelentkezve:', authManager.isLoggedIn());
    
   
});


function updateProfileIcon() {
    const profileCircle = document.querySelector('.jobs-profile-circle');
    if (profileCircle && window.authManager && window.authManager.isLoggedIn()) {
        const currentUser = window.authManager.getCurrentUser();
        if (currentUser) {
         
            profileCircle.style.background = '#35bd5b';
            profileCircle.style.display = 'flex';
            profileCircle.style.alignItems = 'center';
            profileCircle.style.justifyContent = 'center';
            profileCircle.style.color = 'white';
            profileCircle.style.fontWeight = 'bold';
            profileCircle.style.fontSize = '18px';
            profileCircle.textContent = currentUser.username.charAt(0).toUpperCase();
            profileCircle.title = `${currentUser.username} (${currentUser.userType === 'employee' ? 'Munkavállaló' : 'Munkáltató'})`;
        }
    }
}