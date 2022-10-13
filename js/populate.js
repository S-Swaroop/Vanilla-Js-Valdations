const UNIVERSITIES_API = 'http://universities.hipolabs.com/search?country=India' ;


//------------------- FIELD DATA PRE-POPULATION -----------------//

/**
 * @desc utility function to pre-populate universities list
 */
export const populateCollegeList = async () => {
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
    // adding search bar to college select field
    new TomSelect('#college-list', {
        create: false , 
        maxItems: 1 ,
        maxOptions: 8 ,
        closeAfterSelect: true , 
        placeholder: "Select a college/university" , 
        hidePlaceholder: true
    }) ;
}
