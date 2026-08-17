document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').innerHTML = data;
    })
    .finally(() => {
        const float = document.querySelector('.float-container');
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                float.classList.remove('hidden');
            }, 10000);
        });
        
    });
})
