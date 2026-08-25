import React, { useState, useEffect } from 'react';
import { 
  Layers, Search, Trash2, Edit3, Plus, BookOpen, Download, 
  ShieldCheck, Check, X, Filter, Sparkles
} from 'lucide-react';
import { fetchQuestionBank, deleteQuestionBankItem, saveQuestionBankItem, fetchBooks } from '../api';

const QUESTION_TYPES = [
  "All",
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Numerical",
  "Case Study"
];

export default function QuestionBank({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookFilter, setSelectedBookFilter] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [selectedDiffFilter, setSelectedDiffFilter] = useState('All');

  // New Question Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    question_text: '',
    correct_answer: '',
    detailed_solution: '',
    question_type: 'Short Answer',
    marks: 2,
    difficulty: 'Medium',
    blooms_level: 'Understand',
    book_id: '',
    book_title: '',
    chapter_id: 'chap-custom',
    chapter_name: 'General Concepts',
    page: 1,
    source_snippet: 'Manual entry verified by teacher'
  });

  useEffect(() => {
    loadData();
  }, [selectedBookFilter, selectedTypeFilter, selectedDiffFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bankData, booksData] = await Promise.all([
        fetchQuestionBank({
          book_id: selectedBookFilter || undefined,
          question_type: selectedTypeFilter !== 'All' ? selectedTypeFilter : undefined,
          difficulty: selectedDiffFilter !== 'All' ? selectedDiffFilter : undefined,
          query: searchQuery || undefined
        }),
        fetchBooks()
      ]);
      setItems(bankData);
      setBooks(booksData);
      if (booksData.length > 0 && !newItem.book_id) {
        setNewItem(prev => ({ ...prev, book_id: booksData[0].id, book_title: booksData[0].title }));
      }
    } catch (err) {
      console.error('Failed to load Question Bank:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question from the Question Bank?')) return;
    try {
      await deleteQuestionBankItem(id);
      await loadData();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedB = books.find(b => b.id === newItem.book_id);
      const toSave = {
        ...newItem,
        id: `qb-${Date.now()}`,
        book_title: selectedB ? selectedB.title : 'General Textbook',
        tags: [newItem.difficulty, newItem.blooms_level]
      };
      await saveQuestionBankItem(toSave);
      setShowAddModal(false);
      await loadData();
      alert('Question added to Question Bank!');
    } catch (err) {
      alert(`Failed to add question: ${err.message}`);
    }
  };

  const exportBankJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Question_Bank_Export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Question Bank Repository</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and reuse all AI-generated, verified, and textbook-grounded examination questions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportBankJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 text-xs transition"
          >
            <Download className="w-4 h-4 text-slate-600" /> Export JSON
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md text-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Custom Question
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by concept, formula, answer..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </form>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={selectedBookFilter}
            onChange={(e) => setSelectedBookFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
          >
            <option value="">All Books</option>
            {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
          >
            {QUESTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            value={selectedDiffFilter}
            onChange={(e) => setSelectedDiffFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No questions found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Questions generated during paper creation are automatically verified and saved here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
                    {item.question_type}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    [{item.marks} Mark{item.marks > 1 ? 's' : ''}]
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                    {item.difficulty} • {item.blooms_level}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    📚 {item.book_title} &gt; {item.chapter_name} (Page {item.page})
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                {item.question_text}
              </p>

              {item.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {item.options.map((opt, oIdx) => (
                    <div key={oIdx} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-slate-800 space-y-1">
                <span className="font-bold text-emerald-800 block">Model Answer / Key:</span>
                <p className="whitespace-pre-line text-slate-700">{item.correct_answer}</p>
                {item.detailed_solution && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-emerald-100">{item.detailed_solution}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Question to Question Bank</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Textbook *</label>
                <select
                  value={newItem.book_id}
                  onChange={(e) => setNewItem({ ...newItem, book_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Question Text *</label>
                <textarea
                  rows={3}
                  required
                  value={newItem.question_text}
                  onChange={(e) => setNewItem({ ...newItem, question_text: e.target.value })}
                  placeholder="Enter the question..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Type</label>
                  <select
                    value={newItem.question_type}
                    onChange={(e) => setNewItem({ ...newItem, question_type: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="Long Answer">Long Answer</option>
                    <option value="Numerical">Numerical</option>
                    <option value="Case Study">Case Study</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Marks</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newItem.marks}
                    onChange={(e) => setNewItem({ ...newItem, marks: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Difficulty</label>
                  <select
                    value={newItem.difficulty}
                    onChange={(e) => setNewItem({ ...newItem, difficulty: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Model Answer / Key *</label>
                <textarea
                  rows={2}
                  required
                  value={newItem.correct_answer}
                  onChange={(e) => setNewItem({ ...newItem, correct_answer: e.target.value })}
                  placeholder="Enter the correct answer..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
