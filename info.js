
const menubarEl = document.getElementById('navbar')

const toggle = () => {
  console.log('toglge is called')
  menubarEl.classList.toggle('active')//toggling the navbar 
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id') || "53049"; //acessing the id of meal from url if the url dont have id makind a default meal




async function moreinfo() {

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;//making request to particular meal 
  console.log('your url is', url)
  const response = await fetch(url);
  const gotdata = await response.json();
  var more = gotdata.meals[0]//appending the meal to Meals array at 0 positon



  const cartcontainer = document.getElementById('cartContainer');
  const newEl = document.createElement('div')
  newEl.classINGREDIENT = 'cartitem'
  newEl.id = `${more.idMeal}`

  newEl.innerHTML = ` 
  <img src="${more.strMealThumb
    }" alt="">
<div class="productName">
<span>NAME:${more.strMeal}</span>
<span>ORIGIN:${more.strArea}</span>
<span>CATEGORY:${more.strCategory}</span>
<span>INSTRUCTION:${more.strInstructions}</span>
<span>INGREDIENT:${more.strIngredient1}</span>
<span>INGREDIENT:${more.strIngredient2}</span>
<span>INGREDIENT:${more.strIngredient3}</span>   
<span>INGREDIENT:${more.strIngredient4}</span>
<span>INGREDIENT:${more.strIngredient5}</span>
<span>INGREDIENT:${more.strIngredient6}</span>
<span>INGREDIENT:${more.strIngredient7}</span>
<span>INGREDIENT:${more.strIngredient9}</span>
<span>INGREDIENT:${more.strIngredient10}</span>
</div>`
  cartcontainer.appendChild(newEl);




}
moreinfo();













//https://codeforrevolution.github.io/info.html?id=53060
//https://codeforrevolution.github.io/Meal_F1.github.io/info.html?id=53069