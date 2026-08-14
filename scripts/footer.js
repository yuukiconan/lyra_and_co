document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').innerHTML = data;
    })
})
