# Flowers Detector

## Overview

Flowers detector is an elegant, interactive web application that allows users to upload images and view the results of an AI-powered flower detection algorithm. This application provides a user-friendly interface for managing and visualizing flower detection data, complete with beautiful animations and a responsive design.


## Features

- **Image Upload**: Users can upload multiple images (up to 50) at once via drag-and-drop or file selection.
- **AI-Powered Flower Detection**: Uploaded images are processed by a backend AI model that detects and counts flowers in each image.
- **Interactive Gallery**: Displays processed images in a responsive masonry layout with smooth animations.
- **Image Details**: Each image card shows the file name, upload date, and number of flowers detected.
- **Statistics Dashboard**: Provides an overview of total images, total flowers detected, and the most recent upload.
- **Lightbox View**: Users can click on any image to view it in a full-screen lightbox.
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices.

## Screenshots


#### Home Page
![Home Page](https://res.cloudinary.com/dluyrdk80/image/upload/v1726468166/flowerdectorhome_yh2a9f.png)

#### Image Upload
![Image Upload](https://res.cloudinary.com/dluyrdk80/image/upload/v1726468132/uploading_gx0mkz.png)


#### Lightbox View
![Lightbox View](https://res.cloudinary.com/dluyrdk80/image/upload/v1726468142/lightbox_alrk8l.png)


## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Framer Motion**: Used for creating smooth animations and transitions.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making API calls.
- **Lucide React**: Icon library for UI elements.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/KIBUTI-SOFTWARE/flowers_detector.git
   ```

2. Navigate to the project directory:
   ```
   cd flowers-detector
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Create a `.env` file in the root directory and add your backend API URL:
   ```
   REACT_APP_API_URL=http://backend-api-url
   ```

5. Start the development server:
   ```
   npm run dev
   ```
   

6. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Usage

1. **Uploading Images**: 
   - Click the "Choose Images" button or drag and drop images onto the designated area.
   - Select up to 50 images at once.
   - Wait for the upload and processing to complete.

2. **Viewing the Gallery**:
   - Scroll through the masonry layout to view all uploaded images.
   - Each image card displays the file name, upload date, and number of flowers detected.

3. **Image Details**:
   - Click on any image to view it in a full-screen lightbox.
   - Click anywhere outside the image to close the lightbox.

4. **Statistics**:
   - View the total number of images, total flowers detected, and date of the last upload at the top of the page.

## API Integration

The application integrates with a backend API for image processing and flower detection. The API endpoints used are:

- `GET /api/images/all`: Fetches all processed images.
- `POST /api/images/upload`: Uploads and processes new images.

Ensure that your backend API is set up and running with these endpoints.

## Customization

- To modify the styling, edit the Tailwind classes in the component files or update the `tailwind.config.js` file.
- To change the maximum number of uploadable images, update the `MAX_IMAGES` constant in the `ImageUploader` component.


## Acknowledgements

- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
