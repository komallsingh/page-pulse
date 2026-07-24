<div align="center">

# PagePulse

### A Lightweight Website Audit Tool

Analyze any website for essential SEO and content metrics including page title, meta description, heading structure, image accessibility, response time, and content statistics.

**Frontend:** https://page-pulse-cue0j51vj-singhkomal11711-7963s-projects.vercel.app/

**Backend API:** https://page-pulse-48v4.onrender.com

</div>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Cheerio-FFB000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

# Overview

PagePulse is a full-stack website audit tool built using React, Node.js, Express, and TypeScript. The application accepts a website URL, fetches the page, analyzes its HTML, and generates a concise SEO report containing important metrics such as:

- HTTP Status Code
- Response Time
- Page Title
- Meta Description
- Number of H1 Tags
- Images Missing Alt Attributes
- Word Count

The backend follows a layered architecture and uses Cheerio for efficient HTML parsing, while the frontend provides a simple interface for submitting URLs and displaying audit reports. The application is deployed with the frontend on **Vercel** and the backend on **Render**.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Axios
- CSS

## Backend

- Node.js
- Express.js
- TypeScript
- Axios
- Cheerio

---


---

# Setup

## Prerequisites

- Node.js (v18 or above)
- npm

---

## Backend

```bash
cd backend
npm install
npm run dev
```

Default server:

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Default development server:

```
http://localhost:5173
```

---

# API Contract

## POST `/audit`

Fetches a website, analyzes its HTML, and returns an audit report.

### Request

```json
{
  "url": "https://example.com"
}
```

### Success Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "statusCode": 200,
    "responseTime": 215,
    "title": "Example Domain",
    "metaDescription": "N/A",
    "h1Count": 1,
    "imagesWithoutAlt": 0,
    "wordCount": 18
  }
}
```

### Error Responses

| Status Code | Description |
|------------|-------------|
| 400 | Invalid or missing URL |
| 404 | Website not found |
| 408 | Request timed out |
| 415 | Unsupported media type (Non-HTML response) |
| 500 | Internal server error |

---

# Design Decisions

## 1. Layered Backend Architecture

I structured the backend into separate layers consisting of routes, controllers, services, middleware, and utility functions.

This separation keeps each part of the application focused on a single responsibility. Controllers only manage HTTP requests and responses, services contain the business logic, middleware handles cross-cutting concerns such as error handling, and utility functions contain reusable logic. This approach made the project easier to debug, test, and extend as new features were added.

---

## 2. Using Cheerio for HTML Parsing

Instead of using a browser automation tool like Puppeteer, I chose Cheerio to parse website HTML.

The application only needs to inspect the HTML source to extract SEO-related information such as titles, meta descriptions, headings, images, and text content. Since JavaScript rendering is not required for this assignment, Cheerio provides a lightweight and efficient solution with significantly lower memory usage and faster execution, making it well suited for deployment on Render's free tier.

---

## 3. Keeping the Frontend Simple

My primary experience is in Android development using Kotlin and Jetpack Compose, so building the frontend in React was one of the learning experiences in this project.

I intentionally focused on creating a simple and responsive interface rather than adding unnecessary UI elements. The objective was to provide a straightforward workflow where users can enter a URL, submit it, and clearly view either the audit results or an appropriate error message. Building this frontend also helped me become more comfortable with React components, state management, asynchronous API calls using Axios, and integrating a frontend with a TypeScript backend.

---

# Testing

Unit tests were written for the HTML parsing logic.

The test suite covers:

- Successful extraction from valid HTML.
- HTML missing expected SEO elements.
- Invalid or non-HTML input to ensure the parser handles unexpected data gracefully.

---

# AI Usage

I used AI as a learning and productivity tool throughout this assignment rather than as a replacement for development.

This project introduced me to several technologies and concepts that were new to me, so I used ChatGPT to understand them better and accelerate my learning.

Specifically, I used AI to:

- Learn how to use the Cheerio library and understand its selectors for extracting HTML data.
- Learn how to write Jest unit tests, as this was my first experience writing tests in a TypeScript project. AI helped me understand how to identify meaningful test cases and structure test files correctly.
- Help build parts of the React frontend. Since my primary development experience is in Android development with Kotlin and Jetpack Compose, I used AI to understand React concepts such as component composition, state management, event handling, and API integration. I used these explanations as learning material while implementing the frontend myself.

All implementation decisions, code integration, debugging, testing, and final verification were performed by me. I reviewed every AI-generated suggestion, modified it where necessary, and ensured I understood the reasoning before including it in the final project.

---

# If I Had One More Day

The first issue I would address is improving timeout error handling between the backend and frontend.

Currently, the backend correctly throws a custom `AppError` with a **408 Request Timeout** status when a website takes too long to respond. However, after deployment, the frontend still displays a generic **"Something went wrong"** message instead of the timeout-specific error returned by the backend. Since the backend behavior is already correct, my next step would be to investigate how Axios handles the production response and ensure the frontend displays the appropriate error message to users.

Beyond that, I would like to expand the audit by adding additional SEO metrics, accessibility checks, and performance-related insights while continuing to improve the user experience.
