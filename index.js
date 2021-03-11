

//console.log("running")
makeRequest = () => {
  return new Promise((resolve, reject) => {
                 //////To make an HTTP call in Ajax, you need to initialize a new XMLHttpRequest()////
     let apiRequest = new XMLHttpRequest();
               ///////we use the open() method to tie the HTTP method and URL 
              ////endpoint together and call the send() method to fire off the request.
     apiRequest.open('GET' , 'http://Localhost:3000/api/cameras/');
             //// We log the HTTP response to the console by using the XMLHTTPRequest.onreadystatechange
            // property which contains the event handler to be called when the readystatechanged event is fired.
     apiRequest.send();
     apiRequest.onreadystatechange = () => {
          //// The onreadystatechange property has two methods, readyState 
         ///and status which allow us to check the state of our request.
      if (apiRequest.readyState === 4) { 
        ////  If readyState is equal to 4, it means the request is done.
        

       ////Apart from directly making an Ajax call with JavaScript, there are other more powerful 
       ////methods of making an HTTP call such as
          if (apiRequest.status === 200) {
              resolve(JSON.parse(apiRequest.response));
           }       
      else{
          reject('Server down !!! ');
      }
    }
   }
  });
}


createCard = (response) => {
  const main = document.querySelector ('main');
  for( let i in response) {
      /////creat elements for the card
  const card = document.createElement('Article');
  const img = response[i].imageUrl;
  const newImg = document.createElement('img');
  const newA = document.createElement('a');
    ///add the bootsrap classes and arttributes.
  card.classList.add ('col-12' , 'col-sm-6', 'card' , 'p-3' , 'm-o'  );
   ///id passed in a querystring
  newA.setAttribute('href', 'item.html?id=' + response[i]._id);
  newA.textContent = 'View More Details';
  newImg.classList.add('img');
  newImg.setAttribute ('width' , '100%');
  newImg.setAttribute ('src' , img);
   /////item description added
  card.innerHTML += '<h2>' +response[i].name + '</h2>';
  card.innerHTML += '<p>' + response[i].description + '</p>';
  card.innerHTML += '<p>' +'$' + response[i].price / 100 + '</p>';
  /////append the completed elemnts to the card
  card.appendChild(newImg);
  card.appendChild(newA);
  main.appendChild(card);
 
}
}
  init = async () => {
      try{
          // call makeRequest for api request and await respose 
          const requestPromise = makeRequest();
          const response = await requestPromise;
          //pass response to createCard function to display results
          createCard(response);
      } catch (error) {
          //error message displayed if request fails
          document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
      }
      }
  
   init();
