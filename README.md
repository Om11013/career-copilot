# AI Career Copilot

AI Career Copilot is a production-grade, agentic application designed to help professionals optimize their resumes, match with jobs, and navigate their career paths using autonomous AI reasoning.

## Why is it "Agentic"?
Unlike standard AI apps that follow a linear path, this system implements a **ReAct (Reasoning + Acting)** loop:
- **Autonomous Tool Selection:** The LLM dynamically decides which tool to use (`resume_analyzer`, `jd_parser`, `job_matcher`) based on your query.
- **Iterative Decision Making:** The system runs in a multi-step loop. After a tool runs, the AI observes the output and decides if it needs to call another tool or if it has enough information to finish.
- **State-Aware Reasoning:** The orchestrator maintains a context state, allowing the agent to remember your resume even as you ask multiple follow-up questions.

## Key Features
- **🕵️ Agentic Orchestrator:** A multi-step ReAct loop that handles complex queries like "Am I a good fit for this job?" by autonomously parsing both your resume and the job description.
- **📄 Advanced Resume Analysis:** Extracts structured data (skills, strengths, weaknesses) while preserving context from PDF uploads.
- **🎯 Intelligent Job Matching:** Calculates precise match scores and provides actionable "AI Insights" on how to bridge the gap.
- **💬 Career Agent Chat:** A unified chat interface where you can talk to your resume data and get career advice.
- **⚡ Dual-LLM Resilience:** Uses **Groq (Llama 3.3 70B)** as the primary engine for lightning-fast reasoning, with a seamless fallback to **Google Gemini Flash**.

---

## Tech Stack & Core Libraries

### Frontend
- **Framework:** React (`^19.2.4`) + TypeScript (`~6.0.2`)
- **Build Tool:** Vite (`^8.0.4`)
- **Styling:** Tailwind CSS (`^4.2.4`)
- **UI Components:** `shadcn/ui` & `lucide-react`
- **Routing:** `react-router-dom`

### Backend
- **Framework:** FastAPI (`0.135.3`) with Uvicorn
- **AI Engines:** Groq SDK & Google GenAI SDK (`google-genai`)
- **PDF Extraction:** `pdfplumber`
- **Code Quality:** `black`, `isort`, `flake8`, `mypy` (Strict Linting)

---

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory, set up your virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Environment Variables:**
Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
```

Start the server:
```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.
