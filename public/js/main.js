console.log('JavaScript file loaded form external');

document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
          const result = await response.json();
          alert('Form submitted successfully', result);
      } else {
          const error = await response.json();
          alert(error.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred. Please try again.');
    }
  })