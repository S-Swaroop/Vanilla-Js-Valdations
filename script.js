
const UNIVERSITIES_API = 'http://universities.hipolabs.com/search?country=India' ;

const textRegex = new RegExp('^[A-Za-z]+$') ;
const numberRegex = new RegExp('^[0-9]+$') ;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

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
const form = document.getElementById('registration-form') ;

//------------------- FIELD DATA PRE-POPULATION -----------------//

/**
 * @desc utility function to pre-populate universities list
 */
const populateCollegeList = async () => {
    // get select field
    const collegelist = document.getElementById('college-list') ; 

    // get list of colleges from API and extract college names from it
    const data = await fetch(UNIVERSITIES_API)
                .then(response => response.json()) 
                .then(response => response.map(college => college.name)) ;

    // create options
    for (let college of data) { 
        // create option element
        let option = document.createElement("option") ; 
        option.setAttribute('value', college) ;
        let optionText = document.createTextNode(college) ;
        option.appendChild(optionText) ;
        // add option to select field options
        collegelist.appendChild(option) ;
    }
}

populateCollegeList().then(() => {
    new TomSelect('#college-list', {
        create: false , 
        maxItems: 1 ,
        maxOptions: 8 ,
        closeAfterSelect: true , 
        placeholder: "Select a college/university" , 
        hidePlaceholder: true
    }) ;
}) ;

//------------UTITLITY FUNCTIONS-------------------------//

const isEmpty = (value) => value == '' ? true : false ;

/**
 * @desc To show errors
 * @param {HTMLInputElement} input 
 * @param {string} message 
 */
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement ;
    
    // show the error message
    const error = formField.querySelector('small') ;
    error.textContent = message ;
};

/**
 * @desc To show success
 * @param {HTMLInputElement} input 
 * @param {string} message 
 */
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement ;

    // hide the error message
    const error = formField.querySelector('small') ;
    error.textContent = '' ;
}

//--------------VALIDATORS---------------------//

/**
 * @desc function to validate email
 * @returns {boolean}
 */ 
const isEmailValid = () => {
    if (isEmpty(emailEl.value)) {
        showError(emailEl , 'Email cannot be empty!') ;
        return false ;
    } else if (!emailRegex.test(emailEl.value)) {
        showError(emailEl , 'Email format not valid!') ;
        return false ;
    } else {
        showSuccess(emailEl) ;
        return true ;
    }
} ;

/**
 * @desc funtion to validate first name
 * @returns {boolean}
 */
const isFirstNameValid = () => {
    if (isEmpty(firstNameEl.value)) {
        showError(firstNameEl , 'First Name cannot be empty!') ;
        return false ;
    } else if (!textRegex.test(firstNameEl.value)) {
        showError(firstNameEl , 'Email format not valid!') ;
        return false ;
    } else {
        showSuccess(firstNameEl) ;
        return true ;
    }
}

/**
 * @desc function to validate mobile number
 * @returns {boolean}
 */
const isMobileNumberValid = () => {
    if (isEmpty(mobileNumberEl.value)) {
        showError(mobileNumberEl , 'Mobile Number cannot be empty!') ;
        return false ;
    } else if (mobileNumberEl.value.length > 10) {
        showError(mobileNumberEl , 'Mobile Number length cannot be greater than 10!') ;
        return false ;
    } else if (!numberRegex.test(mobileNumberEl.value)) {
        showError(mobileNumberEl , 'Mobile Number cannot be empty!') ;
        return false ;
    } else {
        showSuccess(mobileNumberEl) ;
        return true ;
    }
}

/**
 * @desc function to validate current location
 * @returns {boolean}
 */
const isLocationValid = () => {
    if (isEmpty(currentLocationEl.value)) {
        showError(currentLocationEl , 'Current Location cannot be empty!') ;
        return false ;
    } else {
        showSuccess(currentLocationEl) ;
        return true ;
    }
}

/**
 * @desc function to validate gender
 * @returns {boolean}
 */
const isGenderSelected = () => {
    if (isEmpty(genderEl.value)) {
        showError(genderEl , 'Please Select a gender!') ;
        return false ;
    } else {
        showSuccess(genderEl) ;
        return true ;
    }
}

/**
 * @desc function to validate college/university
 * @returns {boolean}
 */
const isCollegeSelected = () => {
    if (isEmpty(collegeEl.value)) {
        showError(collegeEl , 'Please Select a college/university!') ;
        return false ;
    } else {
        showSuccess(collegeEl) ;
        return true ;
    }
}

/**
 * @desc function to validate date of birth
 * @returns {boolean}
 */
const isDOBValid = () => {
    if (isEmpty(dobEl.value)) {
        showError(dobEl , 'Please Select a date!') ;
        return false ;
    } else {
        showSuccess(dobEl) ;
        return true ;
    }
}

//-------------- FORM VALIDATION -----------------------------//

/**
 * @desc Global Field Validator Object to map element id to validator
 */

const validators = {
    'first-name' : isFirstNameValid , 
    'last-name' : (el) => { return true } ,
    'email' : isEmailValid ,
    'mobile-number' : isMobileNumberValid ,
    'current-location' : isLocationValid , 
    'gender' : isGenderSelected ,
    'college-list' : isCollegeSelected , 
    'dob' : isDOBValid 
} ;

const values = {
    'first-name' : firstNameEl.value , 
    'last-name' : lastNameEl.value ,
    'email' : emailEl.value ,
    'mobile-number' : mobileNumberEl.value ,
    'current-location' : currentLocationEl.value , 
    'gender' : genderEl.value ,
    'college-list' : collegeEl.value , 
    'dob' : dobEl.value
}

/**
 *  Adding Event Listener to trigger form validation
 */
form.addEventListener('submit', function (event) {
    // prevent the form from submitting
    event.preventDefault();
    const formData = {} ;
    let isFormValid = true ;
    for (let [key , value] of Object.entries(validators)) {
        isFormValid &&= value() ;
        formData[`${key}`] = values[`${key}`] ;
    }
    // submit to the server if the form is valid
    if (isFormValid) {
        console.log(formData) ;
    } else {
        console.log('error') ;   
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (event) {
    console.log(event.target.parentNode)
    validators[`${event.target.id}`]() ;
}));