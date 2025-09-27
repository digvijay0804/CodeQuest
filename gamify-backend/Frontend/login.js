document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      console.log('User:', data);
      // Optionally store token or user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      // Redirect to dashboard or question page
      window.location.href = 'index.html';
    } else {
      alert(data.msg || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
});
