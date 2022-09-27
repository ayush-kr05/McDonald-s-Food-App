let foodList = [
  {
    name: "Beverages",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/drinks_300x300:menu-category-desktop",
    id: 1,
  },
  {
    name: "Breakfast",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/breakfast_300x300:menu-category-desktop",
    id: 2,
  },
  {
    name: "Burgers",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/burgers_300x300:menu-category-desktop",
    id: 3,
  },
  {
    name: "Chicken & Sandwiches",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/chicken_sandwiches_300x300:menu-category-desktop",
    id: 4,
  },
  {
    name: "Combo Meal",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/nav_combo_meal_160x160_:menu-category-desktop",
    id: 5,
  },
  {
    name: "Desserts & Shakes",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/desserts_shakes_300x300:menu-category-desktop",
    id: 6,
  },
  {
    name: "McCafé® Drinks",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/mccafe_300x300:menu-category-desktop",
    id: 7,
  },
  {
    name: "McCafé® Bakery",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/Menu_LeftRail_mcd-160x160:menu-category-desktop",
    id: 8,
  },
  {
    name: "Snacks & Sides",
    image_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/snacks_sides_300x300:menu-category-desktop",
    id: 9,
  },
];
// For SlideShow

var img_Url = [
    "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_CampMcDonalds_1168x520_v1.jpg",
    "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_McDelivery_v4_1168x520.jpg",
    "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1pub_FreeNugv4_1168x520.jpg",
    "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_Desktop_Deals-v1_1168x520.jpg",
  ];

  var slideshow = document.getElementById("slideshow");


  var image=document.createElement("img");
   

  var i=0;
  var x= setInterval(function(){
   if(i==img_Url.length){
       i=0;
   }
   image.src=img_Url[i];
   i++;
  },2000);
  slideshow.append(image);




// For Showing PopUp Order menu

  document.getElementById("orderBtn").addEventListener("click",displayPop);

  function displayPop(){
    document.getElementById("PopupOrderMenu").style.display="flex";
  }


// For Close PopUp Menu

  document.getElementById("closepopUp").addEventListener("click",closePop);

  function closePop(){
    document.getElementById("PopupOrderMenu").style.display="none";
  }

//Display Menu Items

DisplayFoodItems(foodList);

function DisplayFoodItems(foodItems) {

  document.getElementById("orderMenu").innerHTML = "";

  foodItems.map(function (item) {

    var itemDetails =`
                <input type="checkbox" onclick="AddorRemoveinOrderList(${item.id})">
                <img src="${item.image_url}" alt="">
                <h5>${item.name}</h5>`;

    var div = document.createElement("div");
    div.innerHTML = itemDetails ;

    document.getElementById("orderMenu").append(div);
    
  });
}

// Save Selected Food Items In Local Storage

var OrderedItem = JSON.parse(localStorage.getItem("orderedItems"))||[];
function AddorRemoveinOrderList(foodId){
  var filterItem = foodList.filter(function(item){
    return item.id==foodId;
  })
  var presentList = OrderedItem.filter(function(item){
    return item.id==foodId;
  })

  if(presentList.length==0){
    OrderedItem.push(filterItem[0]);
    // console.log(OrderedItem); 
    localStorage.setItem("orderedItems",JSON.stringify(OrderedItem));
  }else{
    filterItem = OrderedItem.filter(function(item){
      return item.id!=foodId;
    })
    localStorage.setItem("orderedItems",JSON.stringify(filterItem));
  }

}




// For Placing Order  

 document.getElementById("placeOrder").addEventListener("click",PromisePlaceOrder);

 function PlaceOrder(){
  document.getElementById("PopupOrderMenu").style.display="none";


  setTimeout(function(){
    document.getElementById("FinalOrder").style.display="flex";
  },4000);
  

  var randomId= document.getElementById("randomId");
  randomId.innerText =Date.now();


  var OrderedItem = JSON.parse(localStorage.getItem("orderedItems"))||[];
  DisplayOrderedItems(OrderedItem);
  function DisplayOrderedItems(foodItems) {

  document.getElementById("myOrders").innerHTML = "";

      foodItems.map(function (item) {

        var itemDetails =`
                    <img src="${item.image_url}" alt="">
                    <h5>${item.name}</h5>`;

        var div = document.createElement("div");
        div.innerHTML = itemDetails ;

        document.getElementById("myOrders").append(div);
        
      });
    }
      
 }

 // USING ASYNC promice function for PlaceOrder button

 async function PromisePlaceOrder(){
    try{
      let resolve = await PlaceOrder();
    }catch{
      console.log("Error");
    } 
 }



 // Ok And Thanku For clear Local Storage;

 document.getElementById("OrderDone").addEventListener("click",ThankuClearLocal);

 function ThankuClearLocal(){
  document.getElementById("FinalOrder").style.display="none";
  // document.getElementById("PopupOrderMenu").style.display="none";
  localStorage.setItem("orderedItems",JSON.stringify([]));
  location.reload();
  
 }






