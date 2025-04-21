document.getElementById('checkForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const websiteURL = document.getElementById('websiteURL').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch(`http://localhost:3000/check?url=${encodeURIComponent(websiteURL)}`);
    const data = await response.json();

    resultDiv.innerHTML = `<p>${data.message}</p>`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});