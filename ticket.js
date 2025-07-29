document.addEventListener('DOMContentLoaded', () => {
    const ticketData = JSON.parse(localStorage.getItem('TicketData'));

    if(!ticketData) {
        window.location.href = 'index.html';
        return;
    }

    const ticketEmail = document.getElementById('user-email');
    const ticketImage = document.getElementById('user-image');
    const ticketNameIntro = document.getElementById('user-name-intro');
    const ticketNameMain = document.getElementById('user-name-main');
    const ticketGithubUserName = document.getElementById('user-github');

    ticketImage.src = ticketData.image;
    ticketNameIntro.textContent = ticketData.fullName;
    ticketNameMain.textContent = ticketData.fullName;
    ticketEmail.textContent = ticketData.email;
    ticketGithubUserName.textContent = ticketData.githubUserName;
})