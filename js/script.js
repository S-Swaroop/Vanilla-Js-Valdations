import { 
    validate ,
    check , 
    debounce 
} from "./validation.js" ;
import { populateCollegeList } from "./populate.js" ;
import { closeModal , outSideClick } from './modal.js'
import { updateValue } from "./utils.js" ;

const closeButton = document.getElementsByClassName('modal-close')[0] ;
const form = document.getElementById('registration-form') ;

populateCollegeList() ;

closeButton.addEventListener('click' , closeModal) ;

window.addEventListener('click' , outSideClick) ; 

form.addEventListener('submit' , validate) ;

document.addEventListener('input' , debounce(check))

document.addEventListener('input' , (event) => updateValue(event.target)) ; // for updating skill bar values