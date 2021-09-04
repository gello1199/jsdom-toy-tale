let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById(`toy-collection`);

  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(toyList) //callback function

  // function toyList(toys){
  //   toys.forEach((toy)=> {
  //   toyCollection.innerHTML += `<div class="card">
  //     <h2>${toy.name}</h2>
  //     <img src=${toy.image} class="toy-avatar" />
  //     <p>${toy.likes} Likes </p>
  //     <button class="like-btn" id=${toy.id}>Like <3</button>
  //     <button class="delete-btn" id=${toy.id}>DELETE</button>
  //   </div>`

  //   })

  // function toyList(toys) {
    
    // toys.forEach((toy)=> {
    //   const card = document.createElement('div')
    //   const h2 = document.createElement('h2')
    //   const image = document.createElement('img')
    //   const par = document.createElement('p')
    //   par.innerText = `${toy.likes} Likes`
    //   image.className = 'toy-avatar'
    //   image.src = toy.image
    //   card.className = 'card'
    //   h2.innerHTML = toy.name
    //   toyCollection.appendChild(card)
    //   card.appendChild(h2)
    //   card.appendChild(image)
    //   card.appendChild(par)
    // })  
    // debugger
    function toyList(toys) {
    toys.forEach((toy)=> {
      toyCollection.innerHTML += ` <div class="card">
      <h2>${toy.name}</h2>
      <img src= ${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
      <button class="delete-btn" id=${toy.id}>Delete <3</button>
    </div>`
    })

    toyFormContainer.addEventListener(`submit`, (e)=>{
      e.preventDefault();
      const toyName = e.target.name.value;
      const toyImage = e.target.image.value;
      // debugger
      fetch(`http://localhost:3000/toys`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: toyName, 
          image: toyImage, 
          likes: 100
        })
      })
      .then(resp => resp.json())
      .then(newToy => {
        toyCollection.innerHTML += ` <div class="card">
      <h2>${newToy.name}</h2>
      <img src= ${newToy.image}class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button class="like-btn" id=${newToy.id}>Like <3</button>
      <button class="delete-btn" id=${newToy.id}>Delete <3</button>
    </div>`
        e.target.reset();
      })
    })

    toyCollection.addEventListener(`click`, (e)=> {
      if(e.target.className === `like-btn`) {
        let currentLikes = parseInt(e.target.previousElementSibling.innerText);
        let  newLikes = currentLikes + 1;
        fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: `PATCH`,
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            likes: newLikes
          })
        })
        .then(resp => resp.json())
        .then(toy => {
          // debugger
          e.target.previousElementSibling.innerText = `${toy.likes} Likes`
        })
      }
      if(e.target.className === `delete-btn`) {
        fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: `DELETE`
        })
        .then(resp => {
          e.target.parentElement.remove()
        })
      }
    })

  }




  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
