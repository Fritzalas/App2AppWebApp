// Grab elements from the DOM
const button = document.getElementById('getTidBtn');
const tidText = document.getElementById('tidText');

// Add click event
button.addEventListener('click', () => {
    tidText.textContent = 'tid:64999976';
});
