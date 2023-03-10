console.log("Display all product is connected, right? right?!")

let containerElement = document.getElementById("container");

const getData = async () =>{
    let data = await fetch('/all_products');
    data.json().then((parsedData) => {
        console.log(parsedData);

        parsedData.forEach(object => {
            //red if inventory is under 5 items left


            let mainDiv = document.createElement("div")
            mainDiv.style.cssText ="display: flex; justify-content: center; background-color: pink; border: 2px"

            let quantityPTag = document.createElement("p");
                quantityPTag.textContent = `${object.inventory} remaining`

            let PricePTag = document.createElement("p");
                PricePTag.textContent = `Price: $${object.price}`
                PricePTag.style.fontWeight = 'bold'

            let img = document.createElement("img")
                img.src = object.photo
                img.databaseId = object._id

            let pTag = document.createElement("p");
                pTag.textContent = object.name;
                
            let lineTag = document.createElement("br")
                lineTag.textContent = ``
            
                


            if(object.inventory <= 5){
                pTag.style.color = "red"
            }else if(object.inventory <= 0){
                //make the buy button disapear
            }else {
                pTag.style.color = "green"

            }
            //when image is clicked
            img.addEventListener('click', async (event) => {
                let productId = event.target.databaseId;
                console.log(productId);

                    //go to single product page and add a querry to id of the specific product
                window.location.href = `../single_product?idInQuery=${productId}` 

            })

            containerElement.appendChild(pTag);
            containerElement.appendChild(img)
            containerElement.appendChild(PricePTag)
            containerElement.appendChild(lineTag)
    
         
            // containerElement.appendChild(quantityPTag)
        });


    //search button

let searchButton = document.getElementById("search-btn")


searchButton.addEventListener('click', () => {
    let searchValue = document.getElementById("search").value;
    
    console.log(searchValue);
    let unavailableContainer = document.getElementById("container-unavailable-item-on-search")
    let unavailableItemTag = document.createElement("p")
    

    parsedData.forEach(product  => {

        if(product.name.toLowerCase() == searchValue.toLowerCase()){
            window.location.href = `../single_product?idInQuery=${product._id}` 
        }else{
            unavailableItemTag.textContent = `${searchValue} is not available in our store`
            unavailableContainer.appendChild(unavailableItemTag)

        }

    })
    


})
    })


}
getData()

//update product
let updateProductBtn = document.getElementById("update-product");
updateProductBtn.addEventListener('click', async(event) => {
    let productId = event.target.databaseId;
    console.log(productId)
    window.location.href = `../update_product`

})

//go back home
let addNewProducts = document.getElementById("add-new-products");
addNewProducts.addEventListener('click', async() => {
    window.location.href = '/'
})
//to about
let aboutBtn = document.getElementById("about")
aboutBtn.addEventListener('click', () => {
    window.location.href = '/about'
})


