function checkStatus() {
  const url = document.getElementById('urlInput').value.trim();
  const result = document.getElementById('result');


  result.className = '';  
  result.innerHTML = '';   


  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    result.textContent = '❌ Please enter a valid URL (must start with http:// or https://)';
    result.classList.add('error');
    return;
  }

 
  result.innerHTML = '<span class="loading">Checking status...</span>';
  result.classList.add('loading');


  fetch(url, { method: 'HEAD', mode: 'no-cors' }) 
    .then(() => {
      result.textContent = '✅ Website is UP!';
      result.classList.add('success');
    })
    .catch(() => {
      result.textContent = '❌ Website might be DOWN or unreachable.';
      result.classList.add('error');
    });
}
