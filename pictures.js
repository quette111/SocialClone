let pictures = [
    {
        'photo': 'ij.png',
        'caption': 'Fun with Kyle!',
        'date': 'January 21, 2025'
    },
     {
        'photo': 'hh.png',
        'caption':'Team bonfire',
        'date':'April 14, 2024'
    },
    {
        'photo': 'oj.png',
        'caption':'👍',
        'date':'November 16, 2023'
    },
    {
        'photo': 'po.png',
        'caption': 'The moon was so bright last night!',
        'date': 'May 14, 2023'
    },
    {
        'photo': 'martin.png',
        'caption':'First time running a mile under four minutes, checking 10 year long goals off the list! #onwards',
        'date': 'March 20, 2023'
    },
    {
        'photo': 'uu.png',
        'caption':'friends!',
        'date': 'December 7, 2022'
    },
    {
        'photo': 'mizzou.webp',
        'caption':'Punched my ticket to the NCAA Championships!',
        'date': 'September 15, 2022'
    },
    {
        'photo': 'pp.png',
        'caption':'me and speedysprag!',
        'date': 'June 29, 2022'
    },
    {
        'photo': 'hg.png',
        'caption':'nature!🌲',
        'date': 'April 12, 2022'
    }
];

const myContent = document.querySelector('.myContent');
const searchInput = document.querySelector("[data-search]");

// Function to enlarge the image and dim the background
function enlargeDiv(imgCard) {
    // Create an overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dimmed background
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.cursor = 'pointer';

    // Clone the clicked image
    const enlargedImg = imgCard.cloneNode(true);
    enlargedImg.style.width = '80%'; // Enlarge the image
    enlargedImg.style.height = 'auto';
    enlargedImg.style.maxWidth = '800px'; // Limit maximum size
    enlargedImg.style.maxHeight = '80vh';
    enlargedImg.style.objectFit = 'contain';
    enlargedImg.style.cursor = 'default';

    // Append the enlarged image to the overlay
    overlay.appendChild(enlargedImg);

    // Add the overlay to the body
    document.body.appendChild(overlay);

    // Close the overlay when clicked
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // Close the overlay when the Esc key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
        }
    });
}

// Event delegation for dynamically added images
myContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        enlargeDiv(e.target);
    }
});

// Search input event listener
searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    console.log(users);
});

// Load images on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    const users = pictures.map((project) => {
        return `
        <div class='col' style='margin-top:10%;'>
            <div class="card-body" style='border: single 5px white;padding-bottom:0px; margin-bottom:3%;margin-top:0%;'>
                <img src="${project.photo}" style='border:single 5px white; transition: width 0.3s; cursor: pointer; width:400px; height:400px;' class='card-img-top'>
                <div class="card" style="width: 25rem; height: 100vp; background-color:rgba(130, 130, 130, 0); border: single 5px black;">
                    <h5 class="card-title" style='color:white;width:100%;font-size:15px;'><strong>quette111</strong> ${project.caption}</h5>
                    <p class="card-text" style='color:white;'>${project.date}</p>
                </div>
            </div>
        </div>
        `;
    }).join('');

    myContent.innerHTML = users;
});