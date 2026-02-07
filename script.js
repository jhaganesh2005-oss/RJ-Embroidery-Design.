/* =====================================
   PRODUCTS — MANUAL UPLOAD SECTION
   RJ adds designs here
===================================== */
const products = [
    {
        name: "Floral Hand Embroidery",
        price: "₹499",
        creator: "RJ Embroidery",
        description: "Elegant floral hand embroidery design.",
        contact: "https://wa.me/918170972225?text=Hi, I want Floral Hand Embroidery design",
        images: ["p2.jpg"]
    }
];

/* =====================================
   COLLAGE LAYOUT HELPER
===================================== */
function setCollageLayout(container, images) {
    const count = images.length;
    if(count === 1) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr";
        container.querySelectorAll('img')[0].style.gridColumn = "1 / span 2";
        container.querySelectorAll('img')[0].style.gridRow = "1 / span 2";
    } else if(count === 2) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr";
        container.querySelectorAll('img')[0].style.gridColumn = "1 / span 1";
        container.querySelectorAll('img')[0].style.gridRow = "1 / span 2";
        container.querySelectorAll('img')[1].style.gridColumn = "2 / span 1";
        container.querySelectorAll('img')[1].style.gridRow = "1 / span 2";
    } else if(count === 3) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr";
        container.querySelectorAll('img')[0].style.gridColumn = "1 / span 1";
        container.querySelectorAll('img')[0].style.gridRow = "1 / span 1";
        container.querySelectorAll('img')[1].style.gridColumn = "2 / span 1";
        container.querySelectorAll('img')[1].style.gridRow = "1 / span 2";
        container.querySelectorAll('img')[2].style.gridColumn = "1 / span 1";
        container.querySelectorAll('img')[2].style.gridRow = "2 / span 1";
    } else if(count === 4) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr";
        container.querySelectorAll('img').forEach((img, i)=>{
            img.style.gridColumn = (i%2)+1 + " / span 1";
            img.style.gridRow = Math.floor(i/2)+1 + " / span 1";
        });
    }
}

/* =====================================
   LOAD PRODUCTS INTO GRID
===================================== */
const grid = document.getElementById("productGrid");
if(grid && products.length > 0){
    products.forEach((product, index)=>{
        const card = document.createElement("div");
        card.className = "product";

        const imagesHTML = product.images.map(img=>`<img src="${img}" alt="${product.name}" onclick="zoomImage('${img}')" style="cursor: zoom-in;">`).join('');

        card.innerHTML = `
            <div class="product-image">
                ${imagesHTML}
                ${product.images.length>1?'<div class="zoom-text">Click to Zoom</div>':''}
            </div>

            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <p>Creator: ${product.creator}</p>

            <button onclick="openProductDetail(${index})">View Details</button>
        `;

        grid.appendChild(card);

        setCollageLayout(card.querySelector('.product-image'), product.images);
    });
}

/* =====================================
   PRODUCT DETAIL POPUP
===================================== */
function openProductDetail(index){
    const product = products[index];
    if(!product) return;

    let currentImage = 0;
    const overlay = document.createElement("div");
    overlay.id = "productOverlay";

    overlay.innerHTML = `
        <div class="popup">
            <span class="closeBtn" onclick="closePopup()">&times;</span>

            <img id="popupImage" src="${product.images[currentImage]}" alt="${product.name}" style="cursor: zoom-in;" onclick="zoomImage('${product.images[currentImage]}')">

            <div style="margin:10px;">
                <button id="prevBtn">Prev</button>
                <button id="nextBtn">Next</button>
            </div>

            <h2>${product.name}</h2>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Creator:</strong> ${product.creator}</p>
            <p>${product.description}</p>

            <a href="${product.contact}" target="_blank">Contact Creator</a>
        </div>
    `;

    document.body.appendChild(overlay);

    const popupImage = document.getElementById("popupImage");
    document.getElementById("prevBtn").onclick = ()=>{
        currentImage = (currentImage-1+product.images.length)%product.images.length;
        popupImage.src = product.images[currentImage];
    };
    document.getElementById("nextBtn").onclick = ()=>{
        currentImage = (currentImage+1)%product.images.length;
        popupImage.src = product.images[currentImage];
    };
}

/* =====================================
   CLOSE POPUP
===================================== */
function closePopup(){
    const overlay = document.getElementById("productOverlay");
    if(overlay) overlay.remove();
}

document.addEventListener("click", function(e){
    const overlay = document.getElementById("productOverlay");
    if(overlay && e.target === overlay) overlay.remove();
});

/* =====================================
   IMAGE ZOOM FUNCTION
===================================== */
function zoomImage(src){
    const zoom = document.createElement("div");
    zoom.id = "zoomOverlay";
    zoom.innerHTML = `<img src="${src}">`;
    zoom.onclick = ()=>{ zoom.remove(); };
    document.body.appendChild(zoom);
}


