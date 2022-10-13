import { openModal } from './modal.js' ;
import { 
    showError , 
    showSuccess ,
    isEmpty
} from './utils.js';

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
    if (isEmpty(document.forms[0]['gender'].value)) {
        //passing it's parent because the radio elements are inside another div tag 
        showError(genderEl.parentElement , 'Please Select a gender!') ;
        return false ;
    } else {
        showSuccess(genderEl.parentElement) ;
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

/**
 * @desc function to validate all fields on submit
 * @param {keyof DocumentEventMap} event 
 */

export const validate = (event) => {
    // prevent the form from submitting
    event.preventDefault();
    const formData = {} ;
    let isFormValid = true ;
    for (let [elementId , validator] of Object.entries(validators)) {
        isFormValid = isFormValid & validator() ;
    }
    // submit to the server if the form is valid
    if (isFormValid) {
        openModal() ;
        console.log(formData) ;
    } else {
        console.log('error') ;   
    }
}
/**
 * 
 * @param {function} fn function to repeat 
 * @param {number} delay dealy
 * @returns 
 */
export const debounce = (fn, delay = 500) => {
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

export const check = (event) => {
    if (!(event.target.id).includes('skill')) { //ignore skill bar events
        validators[`${event.target.id}`]() ;    
    }
}