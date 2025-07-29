document.addEventListener('DOMContentLoaded', () => {
  const userImage = document.getElementById('userImage');
  const avatarPreview = document.getElementById('avatar-preview');
  const avatarPreviewArea = document.getElementById('avatar-preview-area');
  const dragAndDropSection = document.getElementById('drag-drop-section');
  const removeAndChangeBtn = document.getElementById('remove-change-buttons');
  const removeButton = document.getElementById('remove-btn');
  const changeButton = document.getElementById('change-btn');
  const uploadInstruction = document.querySelector('.upload-instruction');
  const uploadError = document.querySelector('.instruction-error');
  const emailError = document.getElementById('email-error');
  const generateBtn = document.getElementById('generate-ticket-btn');
  const ticketForm = document.getElementById('ticket-form');

  //Remove Image Button
  removeButton.addEventListener('click', () => {
    userImage.value = "";
    avatarPreview.src = './assets/images/icon-upload.svg';
    avatarPreview.classList.remove('w-full', 'h-full', 'border', 'border-[hsl(0,0%,88%,0.4)]', 'rounded-md', 'object-cover');
    avatarPreview.classList.add('w-10', 'h-10');
    dragAndDropSection.classList.remove('hidden');
    removeAndChangeBtn.classList.add('hidden');
  });

  // Change Image Button
  changeButton.addEventListener('click', () => {
    userImage.click();
  });

  // Upload Image
  userImage.addEventListener('change', uploadImage);
  function uploadImage() {
    const file = userImage.files[0];
    const fileSizeKB = Math.round(file.size / 1024);

    if (fileSizeKB > 500) {
      uploadError.classList.remove('hidden');
      uploadInstruction.classList.add('hidden');
      return;
    } else {
      uploadError.classList.add('hidden');
      uploadInstruction.classList.remove('hidden');
    }

    avatarPreview.src = URL.createObjectURL(file);
    avatarPreview.classList.add('w-full', 'h-full', 'border', 'border-[hsl(0,0%,88%,0.4)]', 'rounded-md', 'object-cover');
    dragAndDropSection.classList.add('hidden');
    removeAndChangeBtn.classList.remove('hidden');
  }

  avatarPreviewArea.addEventListener('dragover', (e) => e.preventDefault());
  avatarPreviewArea.addEventListener('drop', (e) => {
    e.preventDefault();
    userImage.files = e.dataTransfer.files;
    uploadImage();
  });

  // Form Validation and Submission
  ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmail = document.getElementById('userEmail');
    const ticketFormData = new FormData(ticketForm);

    const userFullName = ticketFormData.get('fullName');
    const userEmailValue = ticketFormData.get('email');
    const userGithubUserName = ticketFormData.get('githubUserName');

    const userEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    const validEmail = userEmailRegex.test(userEmailValue.trim());

    let formIsValid = true;

    if (!validEmail) {
      userEmail.classList.remove('border-white');
      userEmail.classList.add('border-red-500');
      emailError.classList.remove('hidden');
      formIsValid = false;
    } else {
      userEmail.classList.remove('border-red-500');
      userEmail.classList.add('border-white');
      emailError.classList.add('hidden');
    }

    if (!userImage.files || userImage.files.length !== 1) {
      uploadError.classList.remove('hidden');
      uploadInstruction.classList.add('hidden');
      formIsValid = false;
    }

    if (!formIsValid) return;
    
    //saving user details to a local storage
    const imageReader = new FileReader();
    imageReader.onload = function () {
        const userTicketDetails = {
        fullName: userFullName,
        email:userEmailValue,
        githubUserName: userGithubUserName,
        image: imageReader.result
        };


        localStorage.setItem('TicketData', JSON.stringify(userTicketDetails));

        //move to ticket page
        window.location.href = 'ticket.html';

    };

    imageReader.readAsDataURL(userImage.files[0]);

  });

});
