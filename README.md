
- `paginate`: Number of rows per page (default: 5).
- `search`: Search query string to filter results.
- `page`: Current page number.
# React Paginated Table with Search Functionality

This is a React application that displays paginated table data fetched from an API. The application supports searching, sorting, and pagination, with the search functionality integrated with an API that handles filtering on the server side.

## Features
- Fetches paginated data from an API.
- Search functionality integrated with the API (`https://api.razzakfashion.com`).
- Displays paginated data with adjustable rows per page.
- Dynamic "Serial Number (S/N)" column.
- Simple and responsive UI.

---

## API Endpoint
The project uses the following API endpoint:



---

## Prerequisites
To run the project locally, ensure the following are installed on your system:
- **Node.js** (v14 or later)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>


Folder Structure
```bash
.
├── src/
│   ├── App.css           # Styling for the application
│   ├── App.jsx           # Main application component
│   ├── index.js          # React entry point
│   └── ...
├── public/
│   ├── index.html        # HTML entry point
│   └── ...
├── package.json          # Project configuration and dependencies
└── README.md             # Project documentation
