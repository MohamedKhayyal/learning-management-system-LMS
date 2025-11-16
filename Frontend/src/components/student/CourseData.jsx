const courses = [
  {
    id: 1,
    image: "/src/assets/course_1.png",
    title: "Build Text to Image SaaS App in React JS",
    author: "Richard James",
    rating: 4.7,
    reviews: 412,
    students: 3200,
    price: "$12.99",
    oldPrice: "$49.99",
    discount: 74,
    badge: "Full Stack",
    youtubeId: "DSGFZb8KiO8",
    subtitle:
      "Build a full-stack AI text-to-image SaaS using React, Node, MongoDB and Stripe from scratch.",
    description:
      "In this course you will learn how to design, build and deploy a production-ready SaaS platform that converts text prompts into images using modern React, Node.js, Express and MongoDB. We cover authentication, payments, image generation flows and best practices for structuring a scalable app.",
    totalSections: 12,
    totalLectures: 85,
    totalMinutes: 18 * 60 + 30,
    curriculum: [
      {
        id: "1-1",
        title: "Introduction & Project Overview",
        meta: { lectures: 4 },
        items: [
          { id: "1-1-1", title: "Welcome to the course", minutes: 5 },
          { id: "1-1-2", title: "App demo & features", minutes: 10 },
          { id: "1-1-3", title: "Tech stack breakdown", minutes: 12 },
          { id: "1-1-4", title: "Project structure overview", minutes: 8 },
        ],
      },
      {
        id: "1-2",
        title: "Environment & Project Setup",
        meta: { lectures: 5 },
        items: [
          { id: "1-2-1", title: "Installing Node, Git & VS Code", minutes: 10 },
          { id: "1-2-2", title: "Initializing React project", minutes: 12 },
          { id: "1-2-3", title: "Tailwind CSS setup", minutes: 15 },
          { id: "1-2-4", title: "Basic layout & pages", minutes: 18 },
          { id: "1-2-5", title: "Connecting to backend API", minutes: 20 },
        ],
      },
      {
        id: "1-3",
        title: "Building the Core Text-to-Image Flow",
        meta: { lectures: 6 },
        items: [
          { id: "1-3-1", title: "Prompt input UI", minutes: 14 },
          { id: "1-3-2", title: "Calling AI image API", minutes: 20 },
          { id: "1-3-3", title: "Handling loading & errors", minutes: 12 },
          { id: "1-3-4", title: "Gallery & history page", minutes: 18 },
          { id: "1-3-5", title: "Saving generations to DB", minutes: 22 },
          { id: "1-3-6", title: "Refactoring & cleanup", minutes: 15 },
        ],
      },
    ],
  },

  {
    id: 2,
    image: "/src/assets/course_2.png",
    title: "AI Background Remover SaaS App (React + Node)",
    author: "Sarah Mitchell",
    rating: 4.6,
    reviews: 389,
    students: 2800,
    price: "$11.99",
    oldPrice: "$39.99",
    discount: 70,
    badge: "AI/ML",
    youtubeId: "tCxj8PwBYjc",
    subtitle:
      "Create a SaaS app that removes image backgrounds automatically using AI and a modern MERN stack.",
    description:
      "Learn how to build a subscription-based AI background remover application with React, Node.js and cloud image processing APIs. We will cover file uploads, async processing, job queues and a polished user experience.",
    totalSections: 10,
    totalLectures: 72,
    totalMinutes: 14 * 60 + 45,
    curriculum: [
      {
        id: "2-1",
        title: "Getting Started",
        meta: { lectures: 3 },
        items: [
          { id: "2-1-1", title: "Course overview & goals", minutes: 7 },
          { id: "2-1-2", title: "Background removal concepts", minutes: 12 },
          { id: "2-1-3", title: "Project planning", minutes: 10 },
        ],
      },
      {
        id: "2-2",
        title: "Backend for Image Processing",
        meta: { lectures: 4 },
        items: [
          { id: "2-2-1", title: "Express API setup", minutes: 15 },
          { id: "2-2-2", title: "Integrating AI removal service", minutes: 20 },
          { id: "2-2-3", title: "Handling uploads & storage", minutes: 22 },
          { id: "2-2-4", title: "Optimizing performance", minutes: 18 },
        ],
      },
    ],
  },

  {
    id: 3,
    image: "/src/assets/course_3.png",
    title: "React Router v6 Complete Guide",
    author: "Daniel Carter",
    rating: 4.8,
    reviews: 520,
    students: 4100,
    price: "$9.99",
    oldPrice: "$34.99",
    discount: 71,
    badge: "Frontend",
    youtubeId: "943D7U74_sQ",
    subtitle:
      "Master navigation and routing in modern React apps using React Router v6.",
    description:
      "This course teaches you everything you need to know about React Router v6: nested routes, loaders, actions, protected routes, modals, and more. Perfect if you want to build production-ready SPAs.",
    totalSections: 8,
    totalLectures: 55,
    totalMinutes: 9 * 60 + 20,
    curriculum: [
      {
        id: "3-1",
        title: "Fundamentals of Routing",
        meta: { lectures: 4 },
        items: [
          { id: "3-1-1", title: "What is a router?", minutes: 8 },
          { id: "3-1-2", title: "Basic route setup", minutes: 14 },
          { id: "3-1-3", title: "Link vs NavLink", minutes: 10 },
          { id: "3-1-4", title: "URL params & search", minutes: 12 },
        ],
      },
    ],
  },

  {
    id: 4,
    image: "/src/assets/course_4.png",
    title: "Full Stack E-Commerce App (MERN + Stripe)",
    author: "Richard James",
    rating: 4.7,
    reviews: 460,
    students: 3500,
    price: "$14.99",
    oldPrice: "$59.99",
    discount: 75,
    badge: "Full Stack",
    youtubeId: "7E6um7NGmeE",
    subtitle:
      "Build a complete MERN E-Commerce application with payments, admin dashboard and more.",
    description:
      "From product listing and carts to checkouts and admin dashboards, this course covers building a full-featured e-commerce platform with the MERN stack and Stripe payments integration.",
    totalSections: 14,
    totalLectures: 96,
    totalMinutes: 21 * 60 + 10,
    curriculum: [
      {
        id: "4-1",
        title: "Project Setup & UI",
        meta: { lectures: 5 },
        items: [
          { id: "4-1-1", title: "E-commerce overview", minutes: 10 },
          { id: "4-1-2", title: "Designing the layout", minutes: 20 },
          { id: "4-1-3", title: "Building product cards", minutes: 18 },
          { id: "4-1-4", title: "Global state for cart", minutes: 22 },
          { id: "4-1-5", title: "Connecting to backend", minutes: 20 },
        ],
      },
    ],
  },

  {
    id: 5,
    image: "/src/assets/course_1.png",
    title: "Mastering React + Firebase Authentication",
    author: "Kevin Brooks",
    rating: 4.6,
    reviews: 270,
    students: 1900,
    price: "$10.99",
    oldPrice: "$39.99",
    discount: 72,
    badge: "Frontend",
    youtubeId: "WpIDez53SK4",
    subtitle:
      "Implement modern authentication flows in React apps using Firebase Authentication.",
    description:
      "Learn how to add secure authentication to your React applications with Firebase. We cover email/password, social providers, protected routes, and role-based access.",
    totalSections: 7,
    totalLectures: 48,
    totalMinutes: 8 * 60 + 40,
    curriculum: [
      {
        id: "5-1",
        title: "Firebase Basics",
        meta: { lectures: 3 },
        items: [
          { id: "5-1-1", title: "Firebase console overview", minutes: 12 },
          { id: "5-1-2", title: "Creating a project", minutes: 10 },
          { id: "5-1-3", title: "Connecting React app", minutes: 15 },
        ],
      },
    ],
  },

  {
    id: 6,
    image: "/src/assets/course_2.png",
    title: "AI Smart Chatbot using OpenAI API and React",
    author: "Sarah Mitchell",
    rating: 4.5,
    reviews: 210,
    students: 1500,
    price: "$13.99",
    oldPrice: "$44.99",
    discount: 69,
    badge: "AI/ML",
    youtubeId: "RkYIWg5XAnI",
    subtitle:
      "Build an intelligent chatbot for the web using React and the OpenAI API.",
    description:
      "Learn how to integrate the OpenAI API with React to build an intelligent chatbot UI, manage conversational state, streaming responses and handle rate limits.",
    totalSections: 9,
    totalLectures: 60,
    totalMinutes: 11 * 60 + 15,
    curriculum: [
      {
        id: "6-1",
        title: "Intro to OpenAI API",
        meta: { lectures: 4 },
        items: [
          { id: "6-1-1", title: "API keys & pricing", minutes: 10 },
          { id: "6-1-2", title: "Making your first request", minutes: 15 },
          { id: "6-1-3", title: "Handling responses", minutes: 12 },
          { id: "6-1-4", title: "Error handling", minutes: 10 },
        ],
      },
    ],
  },

  {
    id: 7,
    image: "/src/assets/course_3.png",
    title: "React Performance Optimization Techniques",
    author: "Daniel Carter",
    rating: 4.4,
    reviews: 180,
    students: 1200,
    price: "$9.99",
    oldPrice: "$29.99",
    discount: 67,
    badge: "Frontend",
    youtubeId: "LuQ8VWh6eYE",
    subtitle:
      "Make your React apps faster and more responsive with real-world optimization strategies.",
    description:
      "This course dives into performance bottlenecks in React apps and how to fix them using memoization, code-splitting, virtualization, and proper state management.",
    totalSections: 6,
    totalLectures: 40,
    totalMinutes: 7 * 60 + 55,
    curriculum: [
      {
        id: "7-1",
        title: "Profiling React Apps",
        meta: { lectures: 3 },
        items: [
          { id: "7-1-1", title: "Using React Profiler", minutes: 15 },
          { id: "7-1-2", title: "Measuring renders", minutes: 12 },
          { id: "7-1-3", title: "Spotting bottlenecks", minutes: 14 },
        ],
      },
    ],
  },

  {
    id: 8,
    image: "/src/assets/course_4.png",
    title: "MERN Admin Dashboard with Charts",
    author: "Richard James",
    rating: 4.7,
    reviews: 305,
    students: 2500,
    price: "$12.99",
    oldPrice: "$39.99",
    discount: 68,
    badge: "Full Stack",
    youtubeId: "0cPCMIuDk2I",
    subtitle:
      "Create a modern admin dashboard using MERN stack and chart libraries.",
    description:
      "Build a dynamic admin dashboard application with authentication, role-based access, data tables, filters and interactive charts using the MERN stack.",
    totalSections: 9,
    totalLectures: 58,
    totalMinutes: 10 * 60 + 30,
    curriculum: [
      {
        id: "8-1",
        title: "Dashboard Layout & Design",
        meta: { lectures: 4 },
        items: [
          { id: "8-1-1", title: "Designing the sidebar", minutes: 18 },
          { id: "8-1-2", title: "Topbar & widgets", minutes: 20 },
          { id: "8-1-3", title: "Responsive layout", minutes: 16 },
          { id: "8-1-4", title: "Dark mode support", minutes: 14 },
        ],
      },
    ],
  },

  {
    id: 9,
    image: "/src/assets/course_1.png",
    title: "React + Tailwind CSS Complete Course",
    author: "Kevin Brooks",
    rating: 4.6,
    reviews: 332,
    students: 2800,
    price: "$10.99",
    oldPrice: "$34.99",
    discount: 69,
    badge: "Frontend",
    youtubeId: "6biMWgD6_JY",
    subtitle:
      "Build modern, responsive React interfaces quickly using Tailwind CSS.",
    description:
      "Learn how to combine React and Tailwind CSS to build beautiful, responsive interfaces. We'll cover layout, theming, components and real-world UI patterns.",
    totalSections: 8,
    totalLectures: 52,
    totalMinutes: 9 * 60,
    curriculum: [
      {
        id: "9-1",
        title: "Tailwind Fundamentals",
        meta: { lectures: 4 },
        items: [
          { id: "9-1-1", title: "Utility-first workflow", minutes: 12 },
          { id: "9-1-2", title: "Spacing & typography", minutes: 15 },
          { id: "9-1-3", title: "Responsive design", minutes: 18 },
          { id: "9-1-4", title: "Customizing config", minutes: 16 },
        ],
      },
    ],
  },

  {
    id: 10,
    image: "/src/assets/course_2.png",
    title: "AI Image Generation App using Stable Diffusion",
    author: "Sarah Mitchell",
    rating: 4.3,
    reviews: 198,
    students: 1700,
    price: "$11.99",
    oldPrice: "$39.99",
    discount: 70,
    badge: "AI/ML",
    youtubeId: "PZG2MvOjud0",
    subtitle:
      "Build an AI-powered image generation web app using Stable Diffusion and React.",
    description:
      "Learn how to connect Stable Diffusion models to a React front-end to generate images from text prompts, manage history, and handle server-side processing.",
    totalSections: 7,
    totalLectures: 45,
    totalMinutes: 8 * 60 + 20,
    curriculum: [
      {
        id: "10-1",
        title: "Stable Diffusion Basics",
        meta: { lectures: 3 },
        items: [
          { id: "10-1-1", title: "How image generation works", minutes: 14 },
          { id: "10-1-2", title: "Choosing a model provider", minutes: 16 },
          { id: "10-1-3", title: "Prompt engineering basics", minutes: 20 },
        ],
      },
    ],
  },
];

export default courses;
