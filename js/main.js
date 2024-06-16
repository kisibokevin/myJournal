
document.addEventListener('DOMContentLoaded', () => {
    
    const app = document.getElementById('app');

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                app.innerHTML = data;
                if (page === 'login') {
                    document.getElementById('loginPage').addEventListener('submit', handleLogin);
                } else {
                    setupNavigation();
                }
            })
            .catch(error => {
                app.innerHTML = '<h1>Error loading page</h1>';
                console.error('Error loading page:', error);
            });
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication logic for demonstration
        if (username === 'user' && password === 'password') {
            loadPage('dashboard');
        } else {
            alert('Invalid credentials');
        }
    }

    function setupNavigation() {
        document.querySelectorAll('navLink').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const page = this.getAttribute('data-page');
                if (page) {
                    loadDashboardContent(page);
                }
                if (this.id === 'logout') {
                    loadPage('login');
                }
            });
        });
    }

    function loadDashboardContent(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('main').innerHTML = data;
            })
            .catch(error => {
                document.getElementById('content').innerHTML = '<h1>Error loading page</h1>';
                console.error('Error loading page:', error);
            });
    }

    // Load login page initially
    loadPage('login');
});