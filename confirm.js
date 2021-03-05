//////////Running//////////////////////////////////////////////////// 

    console.log("running");

//////////Get orderId From local storage entires Method/////////////////////////////

let MyOrderIdA = localStorage.getItem("MyOrderId");
 MyOrderIdA = JSON.parse(MyOrderIdA);
    console.log(MyOrderIdA);
  let entries = Object.entries(MyOrderIdA);
    console.log( 'Entries' , entries);
    console.log( entries[2]);
    
   
      
///////// Get item from local storage from cart Page ////////////////

let confirm = localStorage.getItem("cart");
confirm = JSON.parse(confirm);
    console.log(confirm);

///////// Get total cost /////////////////////////

let cartCost = localStorage.getItem('totalCost');
    console.log("here is" , cartCost);
   
///////// Display Total cost and ORDER number ////////////////////////

document.querySelector("#app4").innerHTML =

`   <p>
        "THANK YOU"
    </p>
    <p>
         Your Order Has Been Placed!
    </p>
    <p>
         Total Basket: 
    </p>
    <p>
        $${cartCost / 100}
    </p>
    <p>
        Your Order Number: 
    </p>
    <p>    
          ${ entries[2][1]}
    </p> 
  `

///////////////////////////////END CONFIRM JS PAGE/////////////////////