
const menubarEl = document.getElementById('navbar')

const toggle = () => {
  console.log('toglge is called')
  menubarEl.classList.toggle('active')//toggling the navbar 
}







const myMeal = localStorage.getItem("MyMeal");
var MealArray = JSON.parse(myMeal);

function LoadingFav() {

  if (MealArray.length > 0) {//checking wheather the Meal array is empty or not

    const cartcontainer1 = document.getElementById('cartContainer');
    cartcontainer1.innerHTML = '';

    for (let i = 0; i < MealArray.length; i++) {
      if (MealArray[i] == null) {
        continue;
      }
      console.log('you are in for');
      const cartcontainer = document.getElementById('cartContainer');
      const newEl = document.createElement('div');
      newEl.id = `${MealArray[i].idMeal}`
      newEl.className = 'cartitem'
      newEl.innerHTML = `  <div class="cartheader">
            <span>${i + 1}</span> <span>${MealArray[i].strCategory}</span>
          </div>
          <div class="cartbody">
            <img src="${MealArray[i].strMealThumb
        }" alt="">
          </div>
          <div class="productName">Name:${MealArray[i].strMeal}</div>
          <div class="carfooter">
          <span>Origin:${MealArray[i].strArea}</span><span><i class="fa-sharp fa-solid fa-heart  toAddFav " id=${MealArray[i].idMeal}  onclick="removeFav()"></i></span>
          </div>`
      cartcontainer.appendChild(newEl);
    }


    const favEl = document.querySelectorAll(".toAddFav");
    console.log('called in function to remove');
    console.log(favEl);
    favEl.forEach(element => {
      element.addEventListener('click', function (event) {//addint eventlisner to remove the fav
        event.target.style = 'color:white'
        event.stopPropagation();
        removeFav(event.target.id);//removing the particular element from fav list

      })


    })


  } else {
    const cartcontainer1 = document.getElementById('cartContainer');
    cartcontainer1.innerHTML = '<h1>Add fav meals here</h4>';
  }

}
LoadingFav();




const moreinfo = () => {
  console.log('more info is called');
  const moreinfoEl = document.querySelectorAll(".cartitem");
  moreinfoEl.forEach(element => {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('you have click on cartiem',);
      const data = { id: `${element.id}` };
      const queryString = new URLSearchParams(data).toString();
      const url = `/info.html?${queryString}`;
      window.location.href = url;//apending the url to window loaction 

    })
  })

}

moreinfo()

function removeFav(id) {
  var newMealArray = MealArray.filter(function (element) {
    return element.idMeal !== id;//filtering the meal to remove the meal from the fav
  })

  MealArray = newMealArray;
  localStorage.setItem('MyMeal', JSON.stringify(MealArray));//after filtering the meal setting the updated meal to local storage
  LoadingFav();//after removing the meal from the fav list rerendering the list on ui

}




