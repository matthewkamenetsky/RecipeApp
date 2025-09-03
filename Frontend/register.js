document.getElementById('registerForm').addEventListener('submit', async (e) => {
  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://recipeapp-g8h2.onrender.com';
  e.preventDefault();

  try {
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const res = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      sessionStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = 'index.html';
      alert(result.message);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again later.');
  }
});
