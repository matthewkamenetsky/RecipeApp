document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);
    const data = {
      id: formData.get('id'),
      password: formData.get('password'),
    };

    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      sessionStorage.setItem('user', JSON.stringify(result.safeUser));
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
