import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Plus, Search, Trash2, RefreshCw, Sparkles, MessageSquare, 
  Layers, FileText, CheckCircle2, ChevronRight, X, UploadCloud, Eye, Tag
} from 'lucide-react';
import { fetchBooks, uploadBook, deleteBook, reindexBook } from '../api';

export default function BookLibrary({ onNavigate, onSelectBookForChat, onSelectBookForPaper }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  
  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: 'Science',
    grade: 'Class 10',
    board: 'CBSE',
    author: 'NCERT',
    academic_year: '2025-2026',
    file: null,
  });

  // Active book drawer state
  const [selectedBook, setSelectedBook] = useState(null);
  const [reindexingId, setReindexingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadForm({
        ...uploadForm,
        file,
        title: uploadForm.title || file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
      });
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) return alert('Please choose a PDF file');
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.title);
      formData.append('subject', uploadForm.subject);
      formData.append('grade', uploadForm.grade);
      formData.append('board', uploadForm.board);
      formData.append('author', uploadForm.author);
      formData.append('academic_year', uploadForm.academic_year);

      await uploadBook(formData);
      setShowUploadModal(false);
      setUploadForm({
        title: '',
        subject: 'Science',
        grade: 'Class 10',
        board: 'CBSE',
        author: 'NCERT',
        academic_year: '2025-2026',
        file: null,
      });
      await loadBooks();
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bookId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteBook(bookId);
      if (selectedBook?.id === bookId) setSelectedBook(null);
      await loadBooks();
    } catch (err) {
      alert(`Failed to delete book: ${err.message}`);
    }
  };

  const handleReindex = async (bookId) => {
    try {
      setReindexingId(bookId);
      await reindexBook(bookId);
      await loadBooks();
      alert('Book successfully re-indexed and updated in the RAG vector store!');
    } catch (err) {
      alert(`Re-indexing failed: ${err.message}`);
    } finally {
      setReindexingId(null);
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || b.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = ['All', ...new Set(books.map(b => b.subject))];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Book Library</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage curriculum textbooks. All uploaded books are chunked, tagged by chapter and indexed into the anti-hallucination vector store.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          Upload New Textbook (PDF)
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by book name, subject, or grade..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Subject:</span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No textbooks found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Upload your PDF textbook to begin generating grounded question papers and chatting with your curriculum.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" /> Upload Textbook
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {book.board} • {book.grade}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{book.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">Subject: {book.subject} • {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(book.id, book.title)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition"
                    title="Delete Book"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      Detected Chapters:
                    </span>
                    <span className="font-bold text-slate-900">{book.chapters?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      Total Pages / Chunks:
                    </span>
                    <span className="font-bold text-slate-900">{book.total_pages} pgs ({book.indexed_chunks} chunks)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" /> Open Chapters
                </button>
                <button
                  onClick={() => {
                    onSelectBookForPaper(book.id);
                    onNavigate('generate');
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Generate Paper
                </button>
                <button
                  onClick={() => {
                    onSelectBookForChat(book.id);
                    onNavigate('chat');
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center gap-1.5 shadow-sm"
                  title="Chat with this Book"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chapter Inspector Drawer Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {selectedBook.board} • {selectedBook.grade}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedBook.title}</h3>
                <p className="text-xs text-slate-500">
                  {selectedBook.chapters?.length} Chapters Detected • {selectedBook.indexed_chunks} Indexed Chunks
                </p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Detected Chapters & Page Allocations</h4>
                <button
                  onClick={() => handleReindex(selectedBook.id)}
                  disabled={reindexingId === selectedBook.id}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${reindexingId === selectedBook.id ? 'animate-spin' : ''}`} />
                  Re-process / Re-index Book
                </button>
              </div>

              <div className="space-y-3">
                {selectedBook.chapters?.map((ch, idx) => (
                  <div
                    key={ch.id || idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">
                        Chapter {ch.chapter_number}: {ch.title}
                      </span>
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Pages {ch.start_page} – {ch.end_page}
                      </span>
                    </div>
                    {ch.summary && (
                      <p className="text-xs text-slate-600 leading-relaxed">{ch.summary}</p>
                    )}
                    {ch.sections?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ch.sections.map((sec, sIdx) => (
                          <span key={sIdx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            {sec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onSelectBookForPaper(selectedBook.id);
                  setSelectedBook(null);
                  onNavigate('generate');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Sparkles className="w-4 h-4" /> Generate Paper from this Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Book Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Upload Textbook (PDF)</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select PDF File *</label>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-slate-200 rounded-xl p-1"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Name / Title *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. NCERT Science Class 10"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                    placeholder="e.g. Science, Mathematics"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.grade}
                    onChange={(e) => setUploadForm({ ...uploadForm, grade: e.target.value })}
                    placeholder="e.g. Class 10, Class 8"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Board</label>
                  <input
                    type="text"
                    value={uploadForm.board}
                    onChange={(e) => setUploadForm({ ...uploadForm, board: e.target.value })}
                    placeholder="CBSE / ICSE / State"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={uploadForm.academic_year}
                    onChange={(e) => setUploadForm({ ...uploadForm, academic_year: e.target.value })}
                    placeholder="2025-2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                ✨ <strong>Automatic Pipeline:</strong> On upload, our PyMuPDF engine extracts structured text, detects chapter headings, sections, and indexes chunks into the RAG vector store for instant grounded paper generation.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Extracting & Indexing...
                    </>
                  ) : (
                    'Upload & Index Textbook'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
