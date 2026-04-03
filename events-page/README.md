# IEEE UOM Student Branch - Events Roadmap

A premium, responsive React application showcasing the Events Roadmap for the IEEE Student Branch, University of Moratuwa.

## Tech Stack
- React 18 (Vite)
- Tailwind CSS v3
- Framer Motion
- React Intersection Observer
- Lucide React

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## How to Manage Events

### Adding New Events
To add or modify events, edit the `src/data/events.js` file.
Follow the existing object structure:
```javascript
{
  id: 15,
  name: "New Event Name",
  date: "Date String",
  year: "Year",
  category: "CATEGORY",
  categoryColor: "#HEX_CODE",
  description: "Description of the event...",
  image: "/images/event.jpg",
  side: "right" // alternatively map this programatically
}
```

### Adding Images
Drop all new images into the `public/images/` directory. Ensure the filenames match exactly what is mapped in `image: "/images/<filename>"` within `events.js`.
