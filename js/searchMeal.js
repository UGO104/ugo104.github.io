window.onload = function() {
    const modal = document.getElementById("modal-id");
    const span = document.getElementsByClassName("close")[0];
    const searchBox = document.getElementById('searchbox');
    const searchBtn = document.getElementById('searchBtn');
    const section_2 = document.getElementById('section-2');
    const m_view_recipe = document.getElementsByClassName("m-view-recipe")[0];
    const searchFormContainer = document.getElementById("header-right-main-id");
     
    var getRecipe = function( e ){
        // prevent the default action of <input type='submit'> inside the <form>
        // which submits the form, reloads the page and aborts the fetch request.
        if( e !== undefined ) e.preventDefault( );
        // get searchBox value  
        var mySearch = searchBox.value; 
        // check if search-box is empty
        if( mySearch.trim().length === 0 ) e.stopPropagation( ); 
        // Look-up item using Fetch( ) api
        else
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`, { mode: 'cors'} )
            // Handle status code here
            .then( ( response ) => {
                if( response.ok ) return response;
                // throw response error
                else throw new Error( response.statusText + " @ Status code");
            })
            // JSON format
            .then( ( read )  => {
                return read.json( );
            } )
            // Show data on UI
            .then( ( data ) => displayResult( data ) )
            // clear default text
            .then( searchBox.value = '' )
            // catch error messages ~ like 404 errors  
            .catch( ( error ) =>{
                errorMsg( error );
            })
            .finally( function( ){
                // TODO
            }); 
            
    }

    var displayResult = function( data ){
        // Check if search was found...
        if( data.meals === null )  noSearchFound( 'Search not Found' );
        // loop and display data...
        else {
            // clear previous search before applying new search
            section_2.innerHTML = ' ';

            data.meals.forEach( ( element ) => {

               let tag=`<div class ='recipe-container' >

                            <div class ='right' >

                                <span class='r-title' >${element.strMeal}</span> <br>

                                <img src = '${element.strMealThumb}' alt ='${element.strMeal}'/>

                                <button class='m-view-recipe' onclick='viewDetails( ${ JSON.stringify( element ) } )' > View Recipe </button>
                                
                            </div>

                            <div class ='left' >

                                <span class='r-title' >${element.strMeal}</span> <br>
                                
                                <span class='r-title r-size' >Recipe </span>

                                <p  class='p-value'>
                                    ${element.strInstructions}
                                </p>

                            </div>
                            
                        </div >`;

                section_2.innerHTML += tag;
            } );
        }
        
    }

    var noSearchFound = function( msg ){
        alert( msg ); // TODO
    }

    var errorMsg = function( errMsg ){
        alert(errMsg); // TODO
    }

    /**
        call getRecipe for default search...
    **/
    getRecipe( undefined );

    /**
        add event listeners
    **/
    searchBtn.addEventListener('click', getRecipe);

    /** 
        add onscroll listener to stick search
        form while scrolling on mobile devices 
    **/ 
    window.onscroll = function( ){
    
        if( window.pageYOffset > searchFormContainer.offsetTop ) 
                                searchFormContainer.classList.add("sticky");

        else searchFormContainer.classList.remove("sticky");
    }

}

/** 
    Handle the way you display all details and recipe
**/ 
var viewDetails = function( meal_data ) {
   alert( meal_data.strInstructions ); // TODO
}


