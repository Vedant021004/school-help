const API_BASE = '/api';

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function fetchBook(id) {
  const res = await fetch(`${API_BASE}/books/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
}

export async function fetchBookReaderContent(bookId, chapterId = null) {
  const params = chapterId ? `?chapter_id=${encodeURIComponent(chapterId)}` : '';
  const res = await fetch(`${API_BASE}/books/${bookId}/read${params}`);
  if (!res.ok) throw new Error('Failed to load textbook reader content');
  return res.json();
}

export function getBookPdfUrl(bookId) {
  return `${API_BASE}/books/${bookId}/pdf`;
}

export async function uploadBook(formData) {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload textbook PDF');
  return res.json();
}

export async function reindexBook(id) {
  const res = await fetch(`${API_BASE}/books/${id}/reindex`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to re-index book');
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
}

export async function fetchFormats() {
  const res = await fetch(`${API_BASE}/formats`);
  if (!res.ok) throw new Error('Failed to fetch formats');
  return res.json();
}

export async function saveFormat(formatData) {
  const res = await fetch(`${API_BASE}/formats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formatData),
  });
  if (!res.ok) throw new Error('Failed to save paper format');
  return res.json();
}

export async function uploadFormatFile(formData) {
  const res = await fetch(`${API_BASE}/formats/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload and parse format');
  return res.json();
}

export async function deleteFormat(id) {
  const res = await fetch(`${API_BASE}/formats/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete format');
  return res.json();
}

export async function generateQuestionPaper(payload) {
  const res = await fetch(`${API_BASE}/generate/paper`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Generation failed' }));
    throw new Error(err.detail || 'Failed to generate question paper');
  }
  return res.json();
}

export async function fetchPapers() {
  const res = await fetch(`${API_BASE}/papers`);
  if (!res.ok) throw new Error('Failed to fetch generated papers');
  return res.json();
}

export async function fetchPaper(id) {
  const res = await fetch(`${API_BASE}/papers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch paper');
  return res.json();
}

export async function updatePaper(id, paperData) {
  const res = await fetch(`${API_BASE}/papers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paperData),
  });
  if (!res.ok) throw new Error('Failed to update paper');
  return res.json();
}

export async function regenerateSingleQuestion(paperId, questionNumber, difficulty) {
  const params = new URLSearchParams({ question_number: questionNumber });
  if (difficulty) params.append('difficulty', difficulty);
  const res = await fetch(`${API_BASE}/papers/${paperId}/regenerate-question?${params}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to regenerate question');
  return res.json();
}

export async function deletePaper(id) {
  const res = await fetch(`${API_BASE}/papers/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete paper');
  return res.json();
}

export async function fetchAnswerKey(paperId) {
  const res = await fetch(`${API_BASE}/papers/${paperId}/answer-key`);
  if (!res.ok) throw new Error('Failed to fetch answer key');
  return res.json();
}

export async function sendChatMessage(payload) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to get chat response');
  return res.json();
}

export async function fetchQuestionBank(filters = {}) {
  const params = new URLSearchParams();
  if (filters.book_id) params.append('book_id', filters.book_id);
  if (filters.chapter_id) params.append('chapter_id', filters.chapter_id);
  if (filters.question_type) params.append('question_type', filters.question_type);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.query) params.append('query', filters.query);

  const res = await fetch(`${API_BASE}/bank?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch question bank');
  return res.json();
}

export async function saveQuestionBankItem(item) {
  const res = await fetch(`${API_BASE}/bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save question to bank');
  return res.json();
}

export async function deleteQuestionBankItem(id) {
  const res = await fetch(`${API_BASE}/bank/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete question from bank');
  return res.json();
}

export async function uploadPastPaper(formData) {
  const res = await fetch(`${API_BASE}/analyzer/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to analyze past paper');
  return res.json();
}

export async function fetchPastPaperAnalyses() {
  const res = await fetch(`${API_BASE}/analyzer/history`);
  if (!res.ok) throw new Error('Failed to fetch past paper history');
  return res.json();
}

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}

export async function fetchNcertMeta() {
  const res = await fetch(`${API_BASE}/ncert/meta`);
  if (!res.ok) throw new Error('Failed to fetch NCERT metadata');
  return res.json();
}

export async function fetchNcertCatalog(filters = {}) {
  const params = new URLSearchParams();
  if (filters.query) params.append('query', filters.query);
  if (filters.class_grade) params.append('class_grade', filters.class_grade);
  if (filters.subject) params.append('subject', filters.subject);
  if (filters.medium) params.append('medium', filters.medium);
  if (filters.limit) params.append('limit', filters.limit);

  const res = await fetch(`${API_BASE}/ncert/catalog?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch NCERT catalog');
  return res.json();
}

export async function importNcertBook(bookCode) {
  const res = await fetch(`${API_BASE}/ncert/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: bookCode }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Import failed' }));
    throw new Error(err.detail || 'Failed to import NCERT textbook');
  }
  return res.json();
}

export async function saveSettings(settingsData) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
}

// ==========================================
// AI TEACHER COPILOT API CLIENT
// ==========================================

export async function copilotTeachChapter(bookId, chapterId) {
  const res = await fetch(`${API_BASE}/copilot/teach-chapter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId }),
  });
  if (!res.ok) throw new Error('Failed to generate full teaching suite');
  return res.json();
}

export async function copilotExplain(bookId, chapterId, mode = 'student_friendly') {
  const res = await fetch(`${API_BASE}/copilot/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId, mode }),
  });
  if (!res.ok) throw new Error('Failed to explain chapter');
  return res.json();
}

export async function copilotNotes(bookId, chapterId) {
  const res = await fetch(`${API_BASE}/copilot/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId }),
  });
  if (!res.ok) throw new Error('Failed to generate chapter notes');
  return res.json();
}

export async function copilotDownloadNotesPdf(notesPayload) {
  const res = await fetch(`${API_BASE}/copilot/notes/download-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notesPayload),
  });
  if (!res.ok) throw new Error('Failed to download notes PDF');
  return res.blob();
}

export async function copilotPpt(bookId, chapterId, slideCount = 10) {
  const res = await fetch(`${API_BASE}/copilot/ppt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId, slide_count: slideCount }),
  });
  if (!res.ok) throw new Error('Failed to generate slide presentation');
  return res.json();
}

export async function copilotDownloadPptx(deckPayload) {
  const res = await fetch(`${API_BASE}/copilot/ppt/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deckPayload),
  });
  if (!res.ok) throw new Error('Failed to download PPTX');
  return res.blob();
}

export async function copilotTextbookSolutions(bookId, chapterId) {
  const res = await fetch(`${API_BASE}/copilot/textbook-solutions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId }),
  });
  if (!res.ok) throw new Error('Failed to solve textbook questions');
  return res.json();
}

export async function copilotWorksheet(bookId, chapterId, worksheetType = 'practice', questionCount = 5) {
  const res = await fetch(`${API_BASE}/copilot/worksheet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      book_id: bookId,
      chapter_id: chapterId,
      worksheet_type: worksheetType,
      question_count: questionCount,
    }),
  });
  if (!res.ok) throw new Error('Failed to generate worksheet');
  return res.json();
}

export async function copilotDownloadWorksheetPdf(worksheet, schoolName = 'Central Academy') {
  const res = await fetch(`${API_BASE}/copilot/worksheet/download-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ worksheet, school_name: schoolName }),
  });
  if (!res.ok) throw new Error('Failed to download worksheet PDF');
  return res.blob();
}

export async function copilotTerms(bookId, chapterId) {
  const res = await fetch(`${API_BASE}/copilot/terms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId }),
  });
  if (!res.ok) throw new Error('Failed to extract key terms');
  return res.json();
}

export async function copilotDiagramWorksheet(bookId, chapterId) {
  const res = await fetch(`${API_BASE}/copilot/diagram-worksheet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId }),
  });
  if (!res.ok) throw new Error('Failed to generate diagram worksheet');
  return res.json();
}

export async function copilotLessonPlan(bookId, chapterId, durationMinutes = 45) {
  const res = await fetch(`${API_BASE}/copilot/lesson-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId, duration_minutes: durationMinutes }),
  });
  if (!res.ok) throw new Error('Failed to generate lesson plan');
  return res.json();
}

export async function copilotMindMap(bookId, chapterId, chapterName = 'Chapter') {
  const res = await fetch(`${API_BASE}/copilot/mindmap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId, chapter_name: chapterName }),
  });
  if (!res.ok) throw new Error('Failed to generate mind map');
  return res.json();
}

export async function copilotKnowledgeGraph(bookId, chapterId, chapterName = 'Chapter') {
  const res = await fetch(`${API_BASE}/copilot/knowledge-graph`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book_id: bookId, chapter_id: chapterId, chapter_name: chapterName }),
  });
  if (!res.ok) throw new Error('Failed to fetch knowledge graph');
  return res.json();
}

export async function copilotCreateLiveSession(payload) {
  const res = await fetch(`${API_BASE}/copilot/live/create-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create live session');
  return res.json();
}

export async function copilotGetActiveLiveSessions() {
  const res = await fetch(`${API_BASE}/copilot/live/active-sessions`);
  if (!res.ok) throw new Error('Failed to fetch active live sessions');
  return res.json();
}

export async function copilotGetLiveSession(roomCode) {
  const res = await fetch(`${API_BASE}/copilot/live/session/${roomCode}`);
  if (!res.ok) throw new Error('Live session not found');
  return res.json();
}

export async function copilotCloseLiveSession(roomCode) {
  const res = await fetch(`${API_BASE}/copilot/live/close/${roomCode}`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to close live session');
  return res.json();
}

export async function copilotSubmitLiveAnswer(payload) {
  const res = await fetch(`${API_BASE}/copilot/live/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit live answer');
  return res.json();
}

export async function copilotGetLiveAnalytics(roomCode) {
  const res = await fetch(`${API_BASE}/copilot/live/analytics/${roomCode}`);
  if (!res.ok) throw new Error('Failed to fetch live analytics');
  return res.json();
}

export async function copilotExamPatterns(subject = 'Science', grade = 'Class 10') {
  const res = await fetch(`${API_BASE}/copilot/exam-patterns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, grade }),
  });
  if (!res.ok) throw new Error('Failed to fetch exam patterns');
  return res.json();
}

// PresentOn AI Presentation Engine API
export async function generatePresentOnDeck(payload) {
  const res = await fetch(`${API_BASE}/presenton/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate PresentOn slide deck');
  return res.json();
}

export async function fetchPresentOnThemes() {
  const res = await fetch(`${API_BASE}/presenton/themes`);
  if (!res.ok) throw new Error('Failed to fetch themes');
  return res.json();
}

export async function downloadPresentOnPptx(deckPayload) {
  const res = await fetch(`${API_BASE}/presenton/download-pptx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deckPayload),
  });
  if (!res.ok) throw new Error('Failed to download PresentOn presentation');
  return res.blob();
}

// NCERTStudy Notes API
export async function fetchNcertStudyClasses() {
  const res = await fetch(`${API_BASE}/ncertstudy/classes`);
  if (!res.ok) throw new Error('Failed to fetch NCERT classes');
  return res.json();
}

export async function fetchNcertStudyNotes(payload) {
  const res = await fetch(`${API_BASE}/ncertstudy/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to fetch NCERT study notes');
  return res.json();
}
