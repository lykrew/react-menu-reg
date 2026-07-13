# PhotoGallery App

A React-based web application featuring authentication, a profile page, a gallery, and a detailed photo view.

## Features Implemented

- Home page with a gallery
- Detailed photo view
- User profile page
- Authentication and registration UI with code verification
- Mocked API requests with asynchronous handling
- Loading and error states
- Global state management using Zustand
- Navigation via React Router
- Responsive layout (desktop/tablet/mobile)
- Local data storage using localStorage

## Technologies

- React (functional components)
- JavaScript (ES6+)
- HTML5, CSS3
- React Router
- Zustand
- Vite

## Starting the project

```bash
npm install
npm run dev
```

Building the production version:

```bash
npm run build
```

## Key scenarios

1. Open the home page and view the cards in the gallery.
2. Navigate to the photo details page using the "Details" button.
3. Log in or sign up via the modal window.
4. Go to the profile, change your name, and upload a photo.
5. Add a photo from the gallery to your profile.

## Structure

```text
src/
  api/
  components/
  data/
  socket/
  store/
```

## Note

The project uses mock data and localStorage instead of a real backend API.
