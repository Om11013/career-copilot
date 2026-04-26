# AI Career Copilot

AI Career Copilot is a full-stack application designed to help professionals optimize their resumes and navigate their career paths using the power of AI. 

The current Phase 1 release features a robust **Resume Analyzer** that parses PDF uploads while preserving formatting, queries Gemini AI for structured insights, and presents actionable feedback (including categorized skills, strengths, weaknesses, and a resume score out of 10) in a beautiful, responsive dashboard.

## Features (Phase 1)
- **Advanced Resume Parsing:** Upload a PDF and automatically extract text while preserving layout using `pdfplumber`.
- **Structured AI Insights:** Get granular feedback on Strengths, Weaknesses, Experience Analysis, and Extracted Skills using Google's Gemini Flash model.
- **Ask AI:** A built-in AI assistant for any quick career-related queries.
- **Modern UI:** Built with React 19, Tailwind CSS 4, and `shadcn/ui` for a premium, responsive user experience.

---

## Tech Stack & Core Libraries

### Frontend
- **Framework:** React (`^19.2.4`) + TypeScript (`~6.0.2`)
- **Build Tool:** Vite (`^8.0.4`)
- **Styling:** Tailwind CSS (`^4.2.4`)
- **UI Components:** `shadcn/ui` (`^4.5.0`)
- **Icons:** `lucide-react` (`^1.11.0`)
- **Routing:** `react-router-dom` (`^7.13.2`)
- **Networking:** `axios` (`^1.15.0`)

### Backend
- **Framework:** FastAPI (`0.135.3`) with Uvicorn (`0.44.0`)
- **AI Integration:** `google-generativeai` (`0.8.6`)
- **PDF Extraction:** `pdfplumber` (`0.11.9`)
- **File Uploads:** `python-multipart` (`0.0.26`)
- **Environment:** `python-dotenv` (`1.2.2`)
- **Code Quality:** `black`, `isort`, `flake8`, `mypy`

---

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory, set up your virtual environment, and run the FastAPI server:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
*Make sure to create a `.env` file in the `backend` directory with your `GEMINI_API_KEY`.*

Start the backend server:
```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
In a new terminal, navigate to the `frontend` directory and start the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.
