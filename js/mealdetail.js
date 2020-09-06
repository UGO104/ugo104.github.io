window.onload = function() {
    const meal_container = document.getElementById("r-container-value");
    const u_tube_container = document.getElementById("u-tube-container");
    const meal_name = document.getElementById('r-container-title');
    const r_name = document.getElementById('r-name');
    const r_area = document.getElementById('r-area');
    const r_tags = document.getElementById('r-tags');
    const r_class = document.getElementById('r-class');
    /**
        Get meal-data
    */
    var meal_data = JSON.parse( window.localStorage.getItem('meal_data'));
    /**
        Get meal-data
    */
    meal_name.innerHTML = meal_data.strMeal;

    meal_container.innerHTML += meal_data.strInstructions;

    r_name.innerHTML += meal_data.strMeal;

    r_area.innerHTML += meal_data.strArea.replaceAll(',',', ');

    r_class.innerHTML += meal_data.strCategory.replaceAll(',',', ');

    r_tags.innerHTML += meal_data.strTags.replaceAll(',',', ');

    u_tube_container.innerHTML +=    `<iframe
                                        src='${meal_data.strYoutube.replace('watch?v=','embed/').concat('?autoplay=1')}'>
                                    </iframe>`
    
}     

var show = function ( ){
    
    
}