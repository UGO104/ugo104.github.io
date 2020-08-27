window.onload = function() {
    const modal = document.getElementById("modal-id");
    const span = document.getElementsByClassName("close")[0];
    const searchBox = document.getElementById('searchbox');
    const searchBtn = document.getElementById('searchBtn'); //  searchBtn a.k.a 'myBtn'
    const section_2 = document.getElementById('section-2');
        
    var getRecipe = function( e ){
        // prevent the default action of <input type='submit'> inside the <form>
        // which submits the form, reloads the page and aborts the fetch request.
        e.preventDefault( );
        // get searchBox value  
        var mySearch = searchBox.value; 
        // check if search-box is empty
        if( mySearch.trim().length === 0 ) e.stopPropagation( ); 
        // Look-up item using Fetch( ) api
        else
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`, { mode: 'cors'} )
            // Handle status code here, okay
            .then( ( response ) => {
                if( response.ok ) return response;
                // throw response error
                else throw new Error( response.statusText + " @ Status code");
            })
            // // Returning it in JSON format
            .then( ( read )  => {
                return read.json( );
            } )
            // Show data on UI, okay
            .then( ( data ) => displayResult( data ) )
            // catch error messages ~ like 404 errors  
            .catch( ( error ) =>{
                errorMsg( error );
            }); 
            
    }

    var displayResult = function( data ){
        // Check if search was found...
        if( data.meals === null )  noSearchFound( 'Search not Found' );
        // loop and display data...
        else data.meals.forEach( ( element ) => {
            let instructions = JSON.stringify(element.strInstructions);
            let tag =  `<div class ='recipe-container' >

                            <div class ='right' >
                                <img src = '${element.strMealThumb}' width = '250px' height= '250px' alt ='${element.strMeal}'/>
                            </div>

                            <div class ='left' >
                                <span class='r-title' >${element.strMeal}</span> <br>
                                
                                <span class='r-title r-size' >Recipe </span>

                                <p  class='p-value'>
                                    ${instructions}
                                </p>

                            </div>
                            
                        </div >`;
            section_2.innerHTML += tag;
        });
        
    }

    var noSearchFound = function( msg ){
        alert( msg ); // Do other stuffs
    }

    var errorMsg = function( errMsg ){
        alert(errMsg); // Do other stuffs
    }

    let viewDetails = function ( e ){
        alert('typeof(data)');
    }

    //event listener
    searchBtn.addEventListener('click', getRecipe);

    
}
