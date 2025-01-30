const category = "technology";
const apiUrl = `https://api.api-ninjas.com/v1/randomimage?category=${category}`;
const numberOfPosts = 15;
const randomUsers = [
  { id: 1, username: "SkyWalkerX" },
  { id: 2, username: "PixelPirate22" },
  { id: 3, username: "CryptoKnight45" },
  { id: 4, username: "FlameDragon99" },
  { id: 5, username: "NebulaWanderer" },
  { id: 6, username: "EchoStar54" },
  { id: 7, username: "ShadowHunter88" },
  { id: 8, username: "QuantumPanda7" },
  { id: 9, username: "SolarFlareX" },
  { id: 10, username: "ElectricStorm42" },
  { id: 11, username: "LunarPhoenix33" },
  { id: 12, username: "MysticVortex14" },
  { id: 13, username: "DarkKnight88" },
  { id: 14, username: "TurboVolt99" },
  { id: 15, username: "GlitchMaster5" }
];

// Function to create a post with an image and set a unique id
function createPost(imageUrl, index) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  // Create the image element
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.alt = "Post Image";
  imgElement.id = `postImage_${index}`; // Set a unique ID like "postImage_0", "postImage_1", etc.

  // Create the username element
  const userNameElement = document.createElement("div");
  userNameElement.classList.add("username");

  // Randomly select a user from the users array
  const randomUser =
    randomUsers[Math.floor(Math.random() * randomUsers.length)]; // Generate a random user
  userNameElement.innerHTML = randomUser.username; // Display the username

  // Append image and username to the post div
  postDiv.appendChild(imgElement);
  postDiv.appendChild(userNameElement);

  // Append the post to the feed container
  document.getElementById("feedD").appendChild(postDiv);
}

// Fetch 10 images and display them in the feed
async function fetchAndDisplayImages() {
  const promises = [];

  for (let i = 0; i < numberOfPosts; i++) {
    // Inline the fetch call directly in promises.push()
    promises.push(
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": "cLr26bZQ3etn6mmntKT68Q==lpF3LNhFsdQxosmZ",
          Accept: "image/jpg"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.blob(); // Get the image as a Blob
          } else {
            throw new Error(
              "Error: " + response.status + " " + response.statusText
            );
          }
        })
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        })
        .catch(error => {
          console.error("Error fetching image:", error);
          return null;
        })
    );
  }

  // Wait for all the images to be fetched
  const imageUrls = await Promise.all(promises);

  // Display each image in the feed
  imageUrls.forEach(imageUrl => {
    if (imageUrl) {
      createPost(imageUrl);
    }
  });
}

// Fetch and display the images when the page loads
fetchAndDisplayImages();

//trying to get the header to vanish or shrink on scroll
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.fontSize = "30px";
  } else {
    document.getElementById("header").style.fontSize = "90px";
  }
}

function showPage(page) {
  // Hide all sections
  const sections = document.querySelectorAll(".page-section");
  sections.forEach(section => section.classList.remove("active"));

  // Show the selected section
  document.getElementById(page).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  let but = document.getElementById("but");
  let video = document.getElementById("vid");
  let mediaDevices = navigator.mediaDevices;
  vid.muted = true;

  // Accessing the user camera and video.
  mediaDevices
    .getUserMedia({
      video: true,
      audio: true
    })
    .then(stream => {
      // Changing the source of video to current stream.
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    })
    .catch(alert);
});
const record = document.querySelector("#takePhoto");
const stop = document.querySelector(".stop");
const soundClips = document.querySelector(".sound-clips");
const canvas = document.querySelector(".visualizer");
const mainSection = document.querySelector(".main-controls");

// Disable stop button while not recording
stop.disabled = true;

// Visualiser setup - create web audio api context and canvas
let audioCtx;
const canvasCtx = canvas.getContext("2d");

// Main block for doing the audio recording
if (navigator.mediaDevices.getUserMedia) {
  console.log("The mediaDevices.getUserMedia() method is supported.");

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    visualize(stream);

    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("Recorder started.");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    };

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("Recorder stopped.");
      record.style.background = "";
      record.style.color = "";

      stop.disabled = true;
      record.disabled = false;
    };

    mediaRecorder.onstop = function(e) {
      console.log("Last data to read (after MediaRecorder.stop() called).");

      const clipName = prompt(
        "Enter a name for your sound clip?",
        "My unnamed clip"
      );

      const clipContainer = document.createElement("article");
      const clipLabel = document.createElement("p");
      const audio = document.createElement("audio");
      const deleteButton = document.createElement("button");

      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";

      if (clipName === null) {
        clipLabel.textContent = "My unnamed clip";
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        e.target.closest(".clip").remove();
      };

      clipLabel.onclick = function() {
        //code refactored from mdn web docs
        const existingName = clipLabel.textContent;
        const newClipName = prompt("Enter name for");
        if (newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      };
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  };

  // Define an error handler function
  let onError = function(err) {
    console.log("The following error occurred: " + err); // Log the error to the console
  };

  // Request access to the user's media devices (e.g., microphone)
  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  // If getUserMedia is not supported by the browser, log a message
} else {
  console.log("MediaDevices.getUserMedia() not supported on your browser!");
}

// Function to visualize the audio stream
function visualize(stream) {
  // Create an AudioContext if it doesn't already exist
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  // Create a media stream source from the audio stream
  const source = audioCtx.createMediaStreamSource(stream);

  // Define the buffer length for the audio data
  const bufferLength = 2048;
  // Create an analyser node to process the audio data
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = bufferLength; // Set the FFT size for the analyser
  // Create a Uint8Array to store the audio data
  const dataArray = new Uint8Array(bufferLength);

  // Connect the source to the analyser
  source.connect(analyser);

  // Call the draw function to start visualizing the audio
  draw();

  // Function to draw the audio waveform
  function draw() {
    const WIDTH = canvas.width; // Get the width of the canvas
    const HEIGHT = canvas.height; // Get the height of the canvas

    // Request the next animation frame to create a smooth animation
    requestAnimationFrame(draw);

    // Get the time-domain data from the analyser and store it in dataArray
    analyser.getByteTimeDomainData(dataArray);

    // Fill the canvas with a light gray background
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // Set the line width and color for the waveform
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    // Begin drawing the waveform path
    canvasCtx.beginPath();

    // Calculate the width of each slice of the waveform
    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0; // Initialize the x-coordinate

    // Loop through the audio data and draw the waveform
    for (let i = 0; i < bufferLength; i++) {
      // Normalize the audio data to a range of -1 to 1
      let v = dataArray[i] / 128.0;
      // Calculate the y-coordinate for the waveform
      let y = (v * HEIGHT) / 2;

      // Move to the starting point if it's the first data point
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        // Draw a line to the next point
        canvasCtx.lineTo(x, y);
      }

      // Increment the x-coordinate for the next slice
      x += sliceWidth;
    }

    // Draw a line to the end of the canvas
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    // Stroke the path to render the waveform
    canvasCtx.stroke();
  }
}

// Resize the canvas when the window is resized
window.onresize = function() {
  canvas.width = mainSection.offsetWidth; // Set the canvas width to match the main section's width
};

window.onresize();


const navBar = document.getElementById('lowerBar'); 

// Variables to track scroll behavior
let isScrolling;
let lastScrollTop = 0;

// Function to handle the scroll event
window.addEventListener('scroll', function () {
  // Clear the timeout to reset the fade-out delay
  clearTimeout(isScrolling);

  // Get the current scroll position
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Check scroll direction (up or down)
  if (scrollTop > lastScrollTop) {
    // Scrolling down: fade out the bar
    navBar.style.opacity = '0';
    navBar.style.transition = 'opacity 0.3s ease';
  } else {
    // Scrolling up: show the bar
    navBar.style.opacity = '1';
    navBar.style.transition = 'opacity 0.3s ease';
  }

  // Update the last scroll position
  lastScrollTop = scrollTop;

  // Set a timeout to hide the bar after scrolling stops
  isScrolling = setTimeout(function () {
    navBar.style.opacity = '1'; // Show the bar when scrolling stops
    navBar.style.transition = 'opacity 0.3s ease';
  }, 300); 
});
