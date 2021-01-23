
///alert( 'Hello, Hamid Ray !' );

///console.log("running")
makeRequest = () => {
    return new Promise ((resolve, reject) => {
       let apiRequest = new XMLHttpRequest();
       apiRequest.open('GET' , 'http://Localhost:3000/api/cameras/');
       apiRequest.send();
        apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) { 
            if (apiRequest.status === 200) {
                resolve(JSON.parse(apiRequest.response));
             }       
        else{
            reject('Server Down !!!Please Run Node Server ');
        }
      }
     }
    });
}


createCard = (response) => {
    console.log(response);
    const main = document.querySelector ('main');
    for( let i in response) {
    const card = document.createElement('Article');
    const img = response[i].imageUrl;
    const newImg = document.createElement('img');
    const newA = document.createElement('a');

    card.classList.add ('col-12' , 'col-sm-6', 'card' , 'p-3' , 'm-o'  );
    newA.setAttribute('href', 'item.html?id=' + response[i]._id);
    newA.textContent = 'View More Details';
    newImg.classList.add('img');
    newImg.setAttribute ('width' , '100%');
    newImg.setAttribute ('src' , img);

    card.innerHTML += '<h2>' +response[i].name + '</h2>';
    card.innerHTML += '<p>' + response[i].description + '</p>';
    card.innerHTML += '<p>' +'$' + response[i].price / 100 + '</p>';

    card.appendChild(newImg);
    card.appendChild(newA);
    main.appendChild(card);
    

    ///just test var element = document.getElementById('mainpage').appendChild(main);///
}
}
    init = async () => {
        try{
            const requestPromise = makeRequest();
            const response = await requestPromise;

            createCard(response);
        } catch (error) {
            document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
        }
        }
    
     init();