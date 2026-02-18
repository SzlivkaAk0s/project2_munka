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
            
 
            users[username] = {
                password,
                userType,
                companyName: extra.companyName || null,
                companyEmail: extra.companyEmail || null,
                createdAt: new Date().toISOString()
            };
            
            this.saveUsers(users);
            

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
                createdAt: user.createdAt
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
            
            const username = document.getElementById('registerUsername').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            
            if (!username || !password || !confirmPassword) {
                showMessage('registerMessage', 'Kérlek töltsd ki minden mezőt!', 'error');
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
            
            if (password !== confirmPassword) {
                showMessage('registerMessage', 'A jelszavak nem egyeznek!', 'error');
                return;
            }
            
         
            const userType = localStorage.getItem('selectedUserType') || 'employee';
            
     
            const extra = {
                companyName: document.getElementById('companyName')?.value || '',
                companyEmail: document.getElementById('companyEmail')?.value || ''
            };

            const result = authManager.registerUser(username, password, userType, extra);
            
            if (result.success) {
                // AUTOMATIKUS BEJELENTKEZÉS ÉS ÁTIRÁNYÍTÁS
                const loginResult = authManager.loginUser(username, password);
                
                if (loginResult.success) {
                    showMessage('registerMessage', 'Sikeres regisztráció! Automatikusan bejelentkeztél. Átirányítás...', 'success');
                    
                    // Azonnal átirányítás jobs.html-re
                    setTimeout(() => {
                        if (userType === 'employer') {
                            window.location.href = 'allashirdet.html';
                        } else {
                            window.location.href = 'jobs.html';
                        }
                    }, 1500);
                } else {
                    showMessage('registerMessage', 'Sikeres regisztráció! Most már bejelentkezhetsz.', 'success');
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