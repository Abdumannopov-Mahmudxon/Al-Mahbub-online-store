let household_items = [
    {
        pass: 'MEGA',
        forename: "Go'sht maydalagich Mega",
        price: 600000
    },
    {
        pass: 'Rossiya',
        forename: "Choynak 3.5 litrli",
        price: 110000
    },
    {
        pass: 'Chinni idishlar',
        forename: "Oshin choynak",
        price: 65000
    },
    {
        pass: 'Bekobod sirli',
        forename: "Choynak sirli 2 litrli",
        price: 600000
    },
    {
        pass: 'ARSHIA',
        forename: "Sharbat chiqargich",
        price: 400000
    },
    {
        pass: 'Oshxona jihozlari',
        forename: "Tort qolip",
        price: 85000
    },
    {
        pass: 'Plastmassa',
        forename: "Chelak. 10 litrli",
        price: 17000
    },
    {
        pass: 'Oshxona jihozlari',
        forename: "Oshin choynak 1.5 l",
        price: 65000
    },
    {
        pass: 'Chinni idishlar',
        forename: "Martinka",
        price: 200000
    },
    {
        pass: 'Oshxona jihozlari',
        forename: "Pichoq nabor",
        price: 250000
    }
]

// household_items = household_items.map((item) => ({ ...item, id: Date.now() + Math.floor(Math.random() * 1000)}));
household_items = household_items.map((item, index) => ({ ...item, id: index + 1 }));

let list = document.getElementById('list');

household_items.map((item)=>{
    list.innerHTML +=`
    <li class="card">
        <div class="item_img">
            <img src="./images/noimage.jpg" class="card-img-top" alt="...">
            <img class="heart" id="heart" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ53HKLdNWx2ifBiqzuwBhLX-Rz09P9Cgd6w&usqp=CAU">
        </div>
            <div class="card-body">
                <h5 class="card-title">${item.pass}</h5>
                <p class="card-text">${item.forename}</p>
                <p class="card-price">${item.price} so'm</p>
                <button class="btn-cart" onclick="addCart(${item.id})">
                    <img src="../images/cart-icon.svg">
                </button>
            </div>
        </li>
    `;
})

const addCart = (ID) =>{
    let cartArr = JSON.parse(localStorage.getItem('cart')) || [];
    let newItem = household_items.find((item) => item.id == ID);
    cartArr.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartArr));
}

let favourite_list = document.getElementById('favourite_list');
let heart = document.querySelectorAll('#heart');
let favArr = JSON.parse(localStorage.getItem('fav')) || [];

heart.forEach((heartElement, i) => {
    heartElement.addEventListener('click', function () {
        const ID = household_items[i].id;
        let newItem = household_items.find((item) => item.id == ID);
        let test = favArr.find((item) => newItem.id == item.id) || false;
        !test 
            ? (favArr.push(newItem), localStorage.setItem('fav', JSON.stringify(favArr)))
            : (favArr = favArr.filter((item) => item.id !== ID), localStorage.setItem('fav', JSON.stringify(favArr)));
        localStorage.setItem('fav', JSON.stringify(favArr));
        
        heartElement.src === "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/512px-Love_Heart_symbol.svg.png"
            ? heartElement.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ53HKLdNWx2ifBiqzuwBhLX-Rz09P9Cgd6w&usqp=CAU"
            : heartElement.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/512px-Love_Heart_symbol.svg.png";

        console.log(heartElement.src);
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heartElements = Array.from(document.querySelectorAll('.heart'));
    const favArr = JSON.parse(localStorage.getItem('fav')) || [];
    
    heartElements.forEach((heartElement, index) => {
        const ID = index + 1;
        const isFavourited = favArr.some(item => item.id === ID);
        if (isFavourited) {
            heartElement.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/512px-Love_Heart_symbol.svg.png';
        }
    });
});
