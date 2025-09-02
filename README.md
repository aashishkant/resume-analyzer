# AI-Powered Resume Analyzer

A comprehensive full-stack application that analyzes resumes against job descriptions using advanced NLP techniques and AI-powered suggestions. Built with Python Flask backend and React frontend.

## 🚀 Features

- **Multi-format Support**: Upload resumes in PDF, DOCX, or TXT formats
- **Advanced NLP Analysis**: Uses TF-IDF, BERT embeddings, and cosine similarity
- **AI-Powered Suggestions**: Integrated with OpenAI for personalized improvement recommendations
- **Interactive Dashboard**: Clean, professional UI with charts and detailed analysis
- **Keyword Analysis**: Identifies missing keywords and provides insights
- **CLI Support**: Command-line interface for testing and automation
- **Production Ready**: Error handling, input validation, and security features

## 🏗️ Architecture

```
resume-analyzer/
├── backend/                 # Python Flask API
│   ├── app.py              # Main Flask application
│   ├── cli_analyzer.py     # CLI version for testing
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # Temporary file storage
├── frontend/               # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeUpload.js
│   │   │   └── ResultsDashboard.js
│   │   └── App.js
│   └── package.json
├── examples/               # Sample files for testing
│   ├── sample_resume.txt
│   └── sample_job_description.txt
└── README.md
```

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- OpenAI API key (for AI suggestions)

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
python app.py
```

The backend will start on `http://localhost:5000`

### Start Frontend Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 📖 Usage

### Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Upload your resume (PDF, DOCX, or TXT)
3. Paste the job description in the text area
4. Click "Analyze Resume" to get results
5. View detailed analysis including:
   - Match percentage
   - Missing keywords
   - AI-powered suggestions
   - Interactive charts

### CLI Usage

For testing without the web interface:

```bash
cd backend
python cli_analyzer.py path/to/resume.txt path/to/job_description.txt
```

Example:
```bash
python cli_analyzer.py ../examples/sample_resume.txt ../examples/sample_job_description.txt
```

## 🔧 API Endpoints

### POST /api/analyze
Analyze a resume against a job description.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `resume`: File (PDF/DOCX/TXT)
  - `job_description`: Text

**Response:**
```json
{
  "match_percentage": 85.5,
  "basic_similarity": 82.3,
  "missing_keywords": ["kubernetes", "docker", "aws"],
  "ai_suggestions": "Consider adding experience with containerization...",
  "resume_keywords": ["python", "javascript", "react"],
  "jd_keywords": ["python", "javascript", "kubernetes"]
}
```

### GET /api/health
Health check endpoint.

## 📊 Analysis Methods

### Basic Similarity (TF-IDF + Cosine)
- Uses Term Frequency-Inverse Document Frequency
- Calculates cosine similarity between resume and job description vectors
- Fast and lightweight approach

### Advanced Similarity (BERT Embeddings)
- Uses Sentence Transformers with BERT model
- Captures semantic meaning and context
- More accurate but computationally intensive

### Keyword Analysis
- Extracts important keywords from both documents
- Identifies missing keywords in resume
- Provides frequency-based insights

### AI Suggestions
- Leverages OpenAI GPT models
- Provides personalized improvement recommendations
- Considers match score and missing elements

## 🧪 Testing

### Backend Testing

1. Use the CLI tool with sample files:
```bash
cd backend
python cli_analyzer.py ../examples/sample_resume.txt ../examples/sample_job_description.txt
```

2. Test API endpoints with tools like Postman or curl:
```bash
curl -X POST -F "resume=@../examples/sample_resume.txt" \
     -F "job_description=@../examples/sample_job_description.txt" \
     http://localhost:5000/api/analyze
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 🔒 Security Features

- File type validation
- File size limits (16MB max)
- Secure filename handling
- CORS protection
- Input sanitization

## 🚀 Deployment

### Backend Deployment

1. Set environment variables:
```bash
export OPENAI_API_KEY="your-production-api-key"
export FLASK_ENV="production"
```

2. Use a production WSGI server:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Serve static files using nginx or Apache

## 🔮 Future Enhancements

- **Database Integration**: Store analysis history and user data
- **User Authentication**: Secure user accounts and saved analyses
- **Batch Processing**: Analyze multiple resumes simultaneously
- **Advanced ML Models**: Custom-trained models for specific industries
- **Mobile App**: React Native mobile application
- **Real-time Collaboration**: Share analyses with team members
- **Integration APIs**: Connect with ATS systems and job boards
- **Multi-language Support**: Analyze resumes in different languages
- **Voice Analysis**: Audio resume analysis and transcription

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Hugging Face for BERT models
- React and Flask communities
- NLTK and scikit-learn libraries

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@resumeanalyzer.com
- Documentation: [Link to detailed docs]

---

**Made with ❤️ for job seekers and recruiters**
