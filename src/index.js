function getDogData() {
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    const dogBarDiv = document.getElementById('dog-bar');
    data.map(dog => {
      const span = document.createElement('span');
      span.textContent = dog.name;
      dogBarDiv.append(span);
    })
    showDogInfo(data);
    filterDoggos(data);
  })
}

function showDogInfo(data) {
  const dogSpans = document.getElementById('dog-bar').childNodes;
  const dogInfoDiv = document.getElementById('dog-info');
  
  for (let i = 1; i < dogSpans.length; i++) {
    
    let dogSpan = dogSpans[i];
    dogSpan.addEventListener('click', (e) => {
      const div = document.createElement('div')
      dogInfoDiv.innerHTML = '';
      console.log(e);
      console.log(data[i - 1].name);
      
      const img = document.createElement('img');
      const h2 = document.createElement('h2');
      const btn = document.createElement('button');

      img.src = data[i - 1].image;
      h2.textContent = data[i - 1].name;
      btn.textContent = data[i - 1].isGoodDog ? "Good Dog!" : "Bad Dog!";
      btn.id = "dog-type";
      div.append(img, h2, btn);
      dogInfoDiv.append(div)
      handleGoodDog(data[i - 1]);
    })
  }
}

function filterDoggos(data) {
  const filterBtn = document.getElementById('good-dog-filter');
  let dogBarDiv = document.getElementById('dog-bar');
  filterBtn.addEventListener('click', (e) => {
    console.log(data);
    console.log(dogBarDiv);
    const goodDogArray = data.filter(dog => dog.isGoodDog)
    console.log('array', goodDogArray);
    if (filterBtn.textContent === 'Filter good dogs: OFF') {
      filterBtn.textContent = 'Filter good dogs: ON';
      dogBarDiv.innerHTML = '';
      goodDogArray.forEach(dog => {
        const span = document.createElement('span');
        span.textContent = dog.name;
        console.log(dog.name);
        dogBarDiv.append(span);
      })
    } else {
      filterBtn.textContent = 'Filter good dogs: OFF';
      dogBarDiv.innerHTML = '';
      data.forEach(dog => {
        const span = document.createElement('span');
        span.textContent = dog.name;
        dogBarDiv.append(span);
      })
    }
    showDogInfo(data);
  })
}

function patchGoodDog(id, dogType) {
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dogType
    })
  })
  .then(response => response.json())
  .then(data => {
  })
}

function isDogGood(dogObj, btn) {
  if (dogObj.isGoodDog) {
    btn.textContent = 'Bad Dog!';
    dogObj.isGoodDog = false;
  } else {
    btn.textContent = 'Good Dog!';
    dogObj.isGoodDog = true;
  }
}

function handleGoodDog(dogObj) {
  let btn = document.getElementById('dog-type');
  btn.addEventListener('click', (e) => {
    isDogGood(dogObj, btn);
    patchGoodDog(dogObj.id, dogObj.isGoodDog);
  })
}


document.addEventListener('DOMContentLoaded', () => {
  getDogData();
})


// When a user clicks on the Filter Good Dogs button, two things should happen:

// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).