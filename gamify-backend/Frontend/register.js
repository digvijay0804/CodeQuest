document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registration successful!');
      window.location.href = 'login.html'; // redirect to login
    } else {
      alert(data.message || 'Registration failed');
      console.log(data);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong.');
  }
});
