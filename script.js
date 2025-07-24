const userImage = document.getElementById('userImage');
const avatarPreview = document.getElementById('avatar-preview');
const avatarPreviewArea = document.getElementById('avatar-preview-area');
const dragAndDropSection = document.getElementById('drag-drop-section');
const removeAndChangeBtn = document.getElementById('remove-change-buttons');
const removeButton = document.getElementById('remove-btn');
const changeButton = document.getElementById('change-btn');
const uploadInstruction = document.querySelector('.upload-instruction');
const uploadError = document.querySelector('.instruction-error');
const userEmail = document.getElementById('userEmail');
const emailError = document.getElementById('email-error');
const generateBtn = document.getElementById('generate-ticket-btn');
userImage.addEventListener('change', uploadImage);
function uploadImage(){
    if(!userImage.files || userImage.files.length !== 1){
        return;
    }

    const file = userImage.files[0];
    //getting file size
    const fileSize = file.size;
    //converting to KB
    const fileSizeKB = Math.round((fileSize / 1024));

    if(fileSizeKB > 500){
        uploadError.classList.remove('hidden');
        uploadInstruction.classList.add('hidden');
        return;
        // alert('File too big, please select a file less than 500KB');
    }else{
        uploadError.classList.add('hidden');
        uploadInstruction.classList.remove('hidden');
    }
    avatarPreview.src = URL.createObjectURL(file);
    avatarPreview.classList.add('w-full', 'h-full', 'border', 'border-[hsl(0,0%,88%,0.4)]', 'rounded-md', 'object-cover');
    dragAndDropSection.classList.add('hidden');
    removeAndChangeBtn.classList.remove('hidden');

    removeButton.addEventListener('click', () => {
        userImage.value = "";
        avatarPreview.src = './assets/images/icon-upload.svg';
        avatarPreview.classList.remove('w-full', 'h-full', 'border', 'border-[hsl(0,0%,88%,0.4)]', 'rounded-md', 'object-cover');
        avatarPreview.classList.add('w-10', 'h-10');
        dragAndDropSection.classList.remove('hidden');
        removeAndChangeBtn.classList.add('hidden');

    });

    changeButton.addEventListener('click', () => {
        userImage.click();
    });
}

avatarPreviewArea.addEventListener('dragover', (e) => {
    e.preventDefault();
})
avatarPreviewArea.addEventListener('drop', (e) => {
    e.preventDefault();
    userImage.files = e.dataTransfer.files;
    uploadImage();
})

userEmailRegex = /[a-zA-z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+/
if(!userEmail.value.test(userEmailRegex)){
    userEmail.classList.remove('border-white');
    userEmail.classList.add('border-red-500');
    emailError.classList.remove('hidden');
};

generateBtn.addEventListener('click', () => {
    
})

