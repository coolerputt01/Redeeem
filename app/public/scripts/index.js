const navButton = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const img = document.querySelector('.ham-button');
navButton.addEventListener('click', (e) => {
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
        img.src = '../cancel.svg';
    } else {
        img.src = '../menu.svg'; 
    }
});
