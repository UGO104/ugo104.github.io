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
        if( mySearch.trim().length === 0 ){ 
            if( e !== undefined ) e.stopPropagation( );
        } 
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

               let tag=`<div class ='recipe-container'>

                            <div style = 'background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.0),rgba(0,0,0,0.0)),
                                                            url("${element.strMealThumb}") no-repeat center top;
                                                            background-size: cover;' class ='m-display' >

                                <span class='r-title' >${element.strMeal}</span> <br>

                                <button class='m-view-recipe' onclick='viewDetails( ${ JSON.stringify( element ) } )' > View Recipe >> </button>
                                
                            </div>

                            <div class ='left' >

                                <div class = 'r-value'>
                                    
                                    <span class='r-title' > ${element.strMeal} </span>
                                    
                                    <div> 
                                        <p> ${element.strInstructions} </p>  
                                        <button class='m-view-recipe' onclick='viewDetails( ${ JSON.stringify( element ) } )' > View Details >> </button>
                                    </div> 

                                    <span class='u-tube' >
                                        Check our YouTube Channel
                                        <a href = '${element.strYoutube}' >GreatRecipe@${element.strMeal}</a>
                                        and dont forget to click the subscribe button 
                                    </span>

                                </div>

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
   window.localStorage.setItem( "meal_data", JSON.stringify( meal_data ) );
   window.location.href = 'mealdetail.html';
}


