document.addEventListener('DOMContentLoaded', function() {

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
        

        registerUser: function(username, password, userType = 'employee') {
            const users = this.getUsers();
            

            if (users[username]) {
                return { success: false, message: 'Ez a felhasználónév már foglalt!' };
            }
            

            users[username] = {
                password: password, 
                userType: userType,
                createdAt: new Date().toISOString()
            };
            
            this.saveUsers(users);
            return { success: true, message: 'Sikeres regisztráció!' };
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
            
            return { 
                success: true, 
                message: 'Sikeres bejelentkezés!', 
                userType: user.userType 
            };
        },
        
 
        logoutUser: function() {
            localStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem(USER_TYPE_KEY);
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
        }
    };
    

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                showMessage(loginMessage, 'Kérlek töltsd ki minden mezőt!', 'error');
                return;
            }
            
            const result = authManager.loginUser(username, password);
            
            if (result.success) {
                showMessage(loginMessage, result.message, 'success');
                

                setTimeout(() => {
                    window.location.href = 'jobs.html';
                }, 1500);
            } else {
                showMessage(loginMessage, result.message, 'error');
            }
        });
    }
    

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            

            if (!username || !password || !confirmPassword) {
                showMessage(registerMessage, 'Kérlek töltsd ki minden mezőt!', 'error');
                return;
            }
            
            if (username.length < 3) {
                showMessage(registerMessage, 'A felhasználónév minimum 3 karakter hosszú legyen!', 'error');
                return;
            }
            
            if (password.length < 4) {
                showMessage(registerMessage, 'A jelszó minimum 4 karakter hosszú legyen!', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage(registerMessage, 'A jelszavak nem egyeznek!', 'error');
                return;
            }
            

            const userType = localStorage.getItem('selectedUserType') || 'employee';
            

            const result = authManager.registerUser(username, password, userType);
            
            if (result.success) {
                showMessage(registerMessage, result.message + ' Most már bejelentkezhetsz!', 'success');
                

                setTimeout(() => {
                    registerForm.reset();
                    registerForm.classList.remove('active');
                    loginForm.classList.add('active');
                    loginMessage.innerHTML = '<div class="message success">Sikeres regisztráció! Most már bejelentkezhetsz.</div>';
                }, 1500);
            } else {
                showMessage(registerMessage, result.message, 'error');
            }
        });
    }
    

    function showMessage(element, text, type = 'info') {
        if (!element) return;
        
        element.innerHTML = `<div class="message ${type}">${text}</div>`;
        

        if (type === 'success') {
            setTimeout(() => {
                element.innerHTML = '';
            }, 5000);
        }
    }
    

    window.authManager = authManager;
    

    console.log('Mentett felhasználók:', authManager.getUsers());
    console.log('Bejelentkezett felhasználó:', authManager.getCurrentUser());
});


function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {

        window.location.href = 'index.html';
        return false;
    }
    return true;
}