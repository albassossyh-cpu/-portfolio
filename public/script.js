document.addEventListener('DOMContentLoaded', () => {

    // --- Employee Page Logic ---
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const messageBox = document.getElementById('message-box');

    // Toggle Forms
    window.showForm = (formType) => {
        if (!loginForm || !registerForm) return;

        // Clear messages
        if (messageBox) {
            messageBox.textContent = '';
            messageBox.className = '';
            messageBox.style.color = 'inherit';
        }

        if (formType === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            showLoginBtn.classList.remove('active');
            showRegisterBtn.classList.add('active');
        }
    };

    // Helper to show messages
    function showMessage(msg, type) {
        if (!messageBox) return;
        messageBox.textContent = msg;
        if (type === 'success') {
            messageBox.style.color = '#27ae60'; // Green
        } else {
            messageBox.style.color = '#c0392b'; // Red
        }
    }

    // Helper to toggle button loading state
    function setLoading(btn, isLoading, defaultText) {
        if (isLoading) {
            btn.disabled = true;
            btn.textContent = 'جاري التحميل...';
            btn.style.opacity = '0.7';
        } else {
            btn.disabled = false;
            btn.textContent = defaultText;
            btn.style.opacity = '1';
        }
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = registerForm.querySelector('button');
            setLoading(btn, true, 'تسجيل جديد');

            const fullName = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const nationalId = document.getElementById('reg-national-id').value;
            const phone = document.getElementById('reg-phone').value;
            const jobDepartment = document.getElementById('reg-job').value;

            try {
                const response = await fetch('/api/employees/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, password, nationalId, phone, jobDepartment })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.', 'success');
                    registerForm.reset();
                    // Scroll to top or message
                    setTimeout(() => showForm('login'), 2000);
                } else {
                    showMessage(data.message || 'حدث خطأ أثناء التسجيل', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('حدث خطأ في الاتصال بالخادم', 'error');
            } finally {
                setLoading(btn, false, 'تسجيل جديد');
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            setLoading(btn, true, 'دخول');

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch('/api/employees/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('employee', JSON.stringify(data.employee));
                    showMessage(`مرحباً بك، ${data.employee.fullName}`, 'success');

                    // Simple Redirect logic
                    setTimeout(() => {
                        alert('تم تسجيل الدخول بنجاح! (سيتم تحويلك للصفحة الرئيسية)');
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    showMessage(data.message || 'بيانات الدخول غير صحيحة', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('حدث خطأ في الاتصال بالخادم', 'error');
            } finally {
                setLoading(btn, false, 'دخول');
            }
        });
    }

    // --- Contact Form Logic (Mock) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            setLoading(btn, true, originalText);

            // Simulate API call
            setTimeout(() => {
                alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
                contactForm.reset();
                setLoading(btn, false, originalText);
            }, 1000);
        });
    }
});
