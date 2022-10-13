const modal = document.getElementById('modal') ; 
const closeButton = document.getElementsByClassName('modal-close')[0] ;
const modalContainer = document.getElementsByClassName('modal-container')[0] ;

const firstNameEl = document.getElementById('first-name') ;
const lastNameEl = document.getElementById('last-name') ;
const emailEl = document.getElementById('email') ;
const mobileNumberEl = document.getElementById('mobile-number') ;
const currentLocationEl = document.getElementById('current-location') ;
const genderEl = document.getElementById('gender') ;
const collegeEl = document.getElementById('college-list') ;
const dobEl = document.getElementById('dob') ;
const skillHtmlEl = document.getElementById('skill-html') ;
const skillCssEl = document.getElementById('skill-css') ;
const skillJavascriptEl = document.getElementById('skill-javascript') ;

//------------------- MODAL UTILITIES --------------------------//

const addFormDataToModal = () => {
    const fieldsValues = [
        `First Name: ${firstNameEl.value}` ,
        `Last Name: ${lastNameEl.value}` ,
        `Email: ${emailEl.value}` ,
        `Mobile Number: ${mobileNumberEl.value}` ,
        `Current Location: ${currentLocationEl.value}` ,
        `Gender: ${genderEl.value}` ,
        `College/University: ${collegeEl.value}` ,
        `Date of Birth: ${dobEl.value}` ,
        `HTML: ${skillHtmlEl.value}` ,
        `CSS: ${skillCssEl.value}` ,
        `Javascript: ${skillJavascriptEl.value}` ,
    ] ;
    for (let i = 0 ; i < 8 ; i = i + 2) {
        const row = document.createElement('div') ; 
        row.classList.add('row') ;
        for (let j = 0 ; j < 2 ; j++) {
            const col = document.createElement('div') ;
            col.classList.add('column') ;
            col.innerText = fieldsValues[i + j] ;
            row.appendChild(col) ;
        }
        modalContainer.appendChild(row) ;
    }
    const row = document.createElement('div') ; 
    row.classList.add('row') ;
    for (let i = 8 ; i < 11 ; i++) {
        const col = document.createElement('div') ;
        col.classList.add('column') ;
        col.innerText = fieldsValues[i] ;
        row.appendChild(col) ;
    }
    modalContainer.appendChild(row) ;
}

export const openModal = () => {
    addFormDataToModal() ;
    modal.classList.add('open') ;
}

export const closeModal = () => {
    modal.classList.remove('open') ;
    location.reload() ;
}

export const outSideClick = (event) => {
    if (event.target == modal) {
        closeModal() ;
        location.reload() ;
    }
}
