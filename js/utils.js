

export const isEmpty = (value) => value == '' ? true : false ;

/**
 * @desc To show errors
 * @param {HTMLInputElement} input 
 * @param {string} message 
 */
export const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement ;
    // show the error message
    const error = formField.querySelector('small') ;
    error.textContent = message ;
    // add indicator
    const el = formField.querySelector('span') ; 
    el.classList.remove('green-valid') ;
    el.classList.add('red-required') ;
    el.innerText = '*' ;
};

/**
 * @desc To show success
 * @param {HTMLInputElement} input 
 * @param {string} message 
 */
export const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement ;
    // hide the error message
    const error = formField.querySelector('small') ;
    error.textContent = '' ;
    // add indicator
    const el = formField.querySelector('span') ; 
    el.classList.remove('red-required') ;
    el.classList.add('green-valid') ;
    el.innerText = '✓' ;
}

/**
 * @desc shows skill bar values 
 * @param {HTMLInputElement} input 
 */
export const updateValue = (input) => {
    if (input.id.includes('skill')) {
        const formField = input.parentElement ;
        const output = formField.querySelector('output') ; 
        output.textContent = input.value ;
    }
}