
const menubarEl = document.getElementById('navbar')

const toggle = () => {//toggle the navbar compoment
  console.log('toglge is called')
  menubarEl.classList.toggle('active')
}


const menuController = document.getElementsByClassName('controller')
var MealList = [];//creatin empty array to store the list o meals


const LoadingPage = async (event) => {
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=b`//on the loading of the page this will send as url to fetch the meal list
  if (event) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${event.target.value}`//if the user search then this url will be fetch
  }
  const response = await fetch(url);
  const data = await response.json();//convertint eh json string to object 
  MealList = data.meals;



  const cartcontainer1 = document.getElementById('cartContainer');
  cartcontainer1.innerHTML = ''//making the cartcontainer empty 
  for (let i = 0; i < MealList.length; i++) {
    const cartcontainer = document.getElementById('cartContainer');
    const newEl = document.createElement('div')
    newEl.className = 'cartitem'
    newEl.id = `${MealList[i].idMeal}`                                         //making the each cart by javascript and adding the data to it
    newEl.innerHTML = `  <div class="cartheader">
        <span>${i + 1}</span> <span>${MealList[i].strCategory}</span>
      </div>
      <div class="cartbody">
        <img src="${MealList[i].strMealThumb
      }" alt="">
      </div>
      <div class="productName"><span>Name:${MealList[i].strMeal}<span></div>
      <div class="carfooter">
         <span>Origin:${MealList[i].strArea}</span><span><i class="fa-sharp fa-solid fa-heart addFav " id=${MealList[i].idMeal} ></i></span>
      </div>`
    cartcontainer.appendChild(newEl);
  }



  clickevent()//calling everytime to clickevent for loading to work properly 
  moreinfo()//handling the event to load every time

}

LoadingPage(null);





const clickevent = () => {
  const favEl = document.querySelectorAll('.addFav');
  favEl.forEach(elemen => {
    elemen.addEventListener('click', function (event) {
      console.log(event.target.id);
      var fav = event.target;
      fav.style = "color:red";//making red after adding the meal to fav
      event.stopPropagation();//stoping the propoagation to the parent element 
      addToFav(event.target.id);//sending the id of meal to fav function

    })
  })
}




const moreinfo = () => {
  const moreinfoEl = document.querySelectorAll(".cartitem");
  moreinfoEl.forEach(element => {
      element.addEventListener('click', function (event) {
      event.preventDefault();
      const data = { id: `${element.id}` };
      const queryString = new URLSearchParams(data).toString();
      const url = `/info.html?${queryString}`;
      window.location.href = url;//apending the url of moreinfo page to window ann sending the data into params
    })
  })
}



const addToFav = (id) => {
  console.log('your id is', id)
  const myMeal = localStorage.getItem("MyMeal");
  var MealArray = JSON.parse(myMeal);
  if (MealArray) {    
    MealArray.push()
    console.log('you favmeal aarray from local is', MealArray);
    let newfav = MealList.find(element => element.idMeal == id)
    MealArray.push(newfav);
    const setarray = JSON.stringify(MealArray);
    localStorage.setItem('MyMeal', setarray);//adding the fav list to local storage 
  } else {
    console.log('you  dont have meal in array')
    let newfav = MealList.find(element => element.idMeal == id)
    console.log('your new fav is', newfav);
    var newarray = [];
    newarray.push(newfav);
    const setarray = JSON.stringify(newarray);
    localStorage.setItem("MyMeal", setarray);

  }
}

