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

export async function saveSettings(settingsData) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
}
