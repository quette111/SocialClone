# SocialClone

In this project, I use the Random Image API from API-Ninjas to fetch photos to populate on the "feed". The API key (client ID) is embedded in the frontend JavaScript to demonstrate how to make API requests.

However, this is not a secure implementation for production purposes because the API keys are exposed in the frontend. If this project were to be deployed for production, I would move the API request to a backend server (e.g., Node.js) and securely store the API keys using environment variables.

Important:
This is an educational project and meant to demonstrate working with APIs on the frontend.
For real applications, API keys should never be exposed in frontend code. Instead, you should use a backend to handle API calls and securely store API keys.

A work-in-progress Social Media Clone built with Vanilla JavaScript, HTML, and CSS. This app showcases a dynamic feed that uses an API to fetch random photos, allows users to record audio and take photos for posts, and dynamically displays a profile page using an array of objects.

Note: This project is still in progress and features may be incomplete or subject to change.

Features
Dynamic Feed: Fetches random photos using an external API to populate the feed.
Audio & Photo Posts: Users can record audio and take photos to create posts in the post section.
Profile Page: Displays user information (name, bio, etc.) using an array of objects for easy data management.
Responsive Design: The layout is mobile-friendly, designed to work seamlessly on various devices.
Interactive User Interface: Built with JavaScript to allow interactions like audio recording, photo capturing, and posting.
Tech Stack
HTML: Structure and layout of the social media clone.
CSS: Styling for the user interface, ensuring a sleek and modern look.
JavaScript: Handles fetching random photos from an API, recording audio, and managing the profile data using arrays.
Features Breakdown
1. Random Photo Feed
The "Feed" section dynamically fetches random images from an external API (such as Unsplash API) and displays them in a scrollable feed layout.

2. Post Section: Camera and Audio Access
Audio Recording: Users can record audio directly within the app using the browser's media capabilities.
Camera Access: Users can take photos using their device's camera to create media posts.
3. Profile Page
The profile page displays a user’s name, bio, and profile picture. This data is dynamically managed via an array of objects, which can be easily modified to update user details.


