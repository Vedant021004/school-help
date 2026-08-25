import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, Plus, Upload, Trash2, Edit3, Check, X, 
  Layers, Clock, Award, FileText, Sparkles, ChevronRight, HelpCircle
} from 'lucide-react';
import { fetchFormats, saveFormat, uploadFormatFile, deleteFormat } from '../api';

const QUESTION_TYPES = [
  "MCQ",
  "Fill in the blanks",
  "True/False",
  "Very Short Answer",
  "Short Answer",
  "Long Answer",
  "Case Study",
  "Assertion & Reason",
  "Numerical",
  "Application-based",
  "Competency-based"
];

export default function PaperFormats({ onNavigate, onSelectFormatForPaper }) {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingFormat, setEditingFormat] = useState(null);
  const [isNewFormat, setIsNewFormat] = useState(false);

  useEffect(() => {
    loadFormats();
  }, []);

  const loadFormats = async () => {
    try {
      setLoading(true);
      const data = await fetchFormats();
      setFormats(data);
    } catch (err) {
      console.error('Failed to load paper formats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const parsed = await uploadFormatFile(formData);
      await loadFormats();
      setEditingFormat(parsed);
      alert(`Format parsed successfully! Detected ${parsed.sections?.length} sections with ${parsed.total_marks} total marks.`);
    } catch (err) {
      alert(`Format upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCreateNewFormat = () => {
    const newFmt = {
      id: `fmt-custom-${Date.now()}`,
      name: 'New Custom Paper Blueprint',
      description: 'Custom question paper section and mark allocation structure',
      subject: 'All Subjects',
      grade: 'All Grades',
      total_marks: 50,
      duration_minutes: 120,
      instructions: [
        'All questions are compulsory.',
        'The question paper consists of designated sections.',
        'Marks are indicated against each question.'
      ],
      sections: [
        {
          id: 'sec-a-new',
          name: 'Section A',
          title: 'Multiple Choice Questions',
          question_count: 10,
          marks_per_question: 1,
          total_marks: 10,
          question_type: 'MCQ',
          internal_choices_count: 0,
          instructions: 'Choose the correct alternative.'
        },
        {
          id: 'sec-b-new',
          name: 'Section B',
          title: 'Short Answer Type',
          question_count: 5,
          marks_per_question: 2,
          total_marks: 10,
          question_type: 'Short Answer',
          internal_choices_count: 1,
          instructions: 'Answer in 30-50 words.'
        },
        {
          id: 'sec-c-new',
          name: 'Section C',
          title: 'Long Answer / Numerical',
          question_count: 5,
          marks_per_question: 3,
          total_marks: 15,
          question_type: 'Numerical',
          internal_choices_count: 2,
          instructions: 'Show calculations and diagrams.'
        },
        {
          id: 'sec-d-new',
          name: 'Section D',
          title: 'Case Study & Competency',
          question_count: 3,
          marks_per_question: 5,
          total_marks: 15,
          question_type: 'Case Study',
          internal_choices_count: 1,
          instructions: 'Integrated case analysis.'
        }
      ],
      is_template: false
    };
    setEditingFormat(newFmt);
    setIsNewFormat(true);
  };

  const handleSaveFormat = async () => {
    if (!editingFormat.name.trim()) return alert('Please enter a format name');
    if (!editingFormat.sections || editingFormat.sections.length === 0) {
      return alert('Format must have at least one section');
    }

    try {
      await saveFormat(editingFormat);
      setEditingFormat(null);
      setIsNewFormat(false);
      await loadFormats();
      alert('Paper format blueprint saved successfully!');
    } catch (err) {
      alert(`Failed to save format: ${err.message}`);
    }
  };

  const handleDeleteFormat = async (id, name) => {
    if (!window.confirm(`Delete format blueprint "${name}"?`)) return;
    try {
      await deleteFormat(id);
      await loadFormats();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // Section manipulation helpers in format editor
  const updateSection = (idx, field, value) => {
    const updated = { ...editingFormat };
    const sec = { ...updated.sections[idx], [field]: value };
    if (field === 'question_count' || field === 'marks_per_question') {
      sec.total_marks = Number(sec.question_count) * Number(sec.marks_per_question);
    }
    updated.sections[idx] = sec;
    updated.total_marks = updated.sections.reduce((sum, s) => sum + (s.total_marks || 0), 0);
    setEditingFormat(updated);
  };

  const addSection = () => {
    const updated = { ...editingFormat };
    const nextLetter = String.fromCharCode(65 + (updated.sections?.length || 0));
    updated.sections = [
      ...(updated.sections || []),
      {
        id: `sec-${nextLetter.toLowerCase()}-${Date.now()}`,
        name: `Section ${nextLetter}`,
        title: 'New Section',
        question_count: 5,
        marks_per_question: 2,
        total_marks: 10,
        question_type: 'Short Answer',
        internal_choices_count: 0,
        instructions: ''
      }
    ];
    updated.total_marks = updated.sections.reduce((sum, s) => sum + (s.total_marks || 0), 0);
    setEditingFormat(updated);
  };

  const removeSection = (idx) => {
    const updated = { ...editingFormat };
    updated.sections.splice(idx, 1);
    updated.total_marks = updated.sections.reduce((sum, s) => sum + (s.total_marks || 0), 0);
    setEditingFormat(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Paper Formats & Blueprints</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure examination structures, sections, question counts, marks, and cognitive distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 cursor-pointer text-xs transition">
            <Upload className="w-4 h-4 text-indigo-600" />
            {uploading ? 'Analyzing Format...' : 'Upload Format (PDF/DOCX)'}
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <button
            onClick={handleCreateNewFormat}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md text-xs transition"
          >
            <Plus className="w-4 h-4" />
            Create Custom Blueprint
          </button>
        </div>
      </div>

      {/* Formats Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((fmt) => (
            <div
              key={fmt.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {fmt.is_template ? (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        Official Template
                      </span>
                    ) : (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
                        Custom Blueprint
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{fmt.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{fmt.description || 'Standard examination format'}</p>
                  </div>
                  {!fmt.is_template && (
                    <button
                      onClick={() => handleDeleteFormat(fmt.id, fmt.name)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                      title="Delete format"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Badges: Total Marks, Duration, Sections */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Total Marks</span>
                    <span className="text-sm font-extrabold text-slate-900">{fmt.total_marks}M</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Duration</span>
                    <span className="text-sm font-extrabold text-slate-900">{fmt.duration_minutes / 60}h</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Sections</span>
                    <span className="text-sm font-extrabold text-slate-900">{fmt.sections?.length || 0}</span>
                  </div>
                </div>

                {/* Section Breakdown Mini List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Section Breakdown:</span>
                  {fmt.sections?.map((sec, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                      <span className="font-semibold text-slate-700">{sec.name}: {sec.question_type}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{sec.question_count} × {sec.marks_per_question} = {sec.total_marks}M</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setEditingFormat(fmt)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Structure
                </button>
                <button
                  onClick={() => {
                    onSelectFormatForPaper(fmt.id);
                    onNavigate('generate');
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Use in Generator
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visual Format Builder Modal */}
      {editingFormat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Visual Paper Blueprint Editor</span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {editingFormat.name || 'Custom Examination Format'}
                </h3>
              </div>
              <button
                onClick={() => setEditingFormat(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Basic Meta fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Format Name *</label>
                  <input
                    type="text"
                    value={editingFormat.name}
                    onChange={(e) => setEditingFormat({ ...editingFormat, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingFormat.duration_minutes}
                    onChange={(e) => setEditingFormat({ ...editingFormat, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Total Marks Banner */}
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="text-xs font-bold text-indigo-900">Total Calculated Marks</span>
                    <p className="text-xs text-indigo-700">Sum of (Question Count × Marks per Question) across all sections</p>
                  </div>
                </div>
                <div className="text-2xl font-black text-indigo-900">{editingFormat.total_marks} Marks</div>
              </div>

              {/* Section Editor List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Examination Sections</h4>
                  <button
                    onClick={addSection}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Section
                  </button>
                </div>

                <div className="space-y-3">
                  {editingFormat.sections?.map((sec, idx) => (
                    <div
                      key={sec.id || idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {sec.name}
                          </span>
                          <input
                            type="text"
                            value={sec.title || ''}
                            onChange={(e) => updateSection(idx, 'title', e.target.value)}
                            placeholder="Section Title (e.g. Multiple Choice Questions)"
                            className="text-xs font-semibold px-2 py-1 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold font-mono text-slate-700">
                            {sec.question_count} × {sec.marks_per_question} = {sec.total_marks} Marks
                          </span>
                          <button
                            onClick={() => removeSection(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                            title="Remove section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Section parameters */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-500 font-bold mb-1">Question Type</label>
                          <select
                            value={sec.question_type}
                            onChange={(e) => updateSection(idx, 'question_type', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium focus:ring-1 focus:ring-indigo-500"
                          >
                            {QUESTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-500 font-bold mb-1">Number of Questions</label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={sec.question_count}
                            onChange={(e) => updateSection(idx, 'question_count', Math.max(1, Number(e.target.value)))}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-500 font-bold mb-1">Marks per Question</label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={sec.marks_per_question}
                            onChange={(e) => updateSection(idx, 'marks_per_question', Math.max(1, Number(e.target.value)))}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-500 font-bold mb-1">Internal Choices ("OR")</label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={sec.internal_choices_count || 0}
                            onChange={(e) => updateSection(idx, 'internal_choices_count', Math.max(0, Number(e.target.value)))}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {editingFormat.sections?.length} Sections • {editingFormat.total_marks} Total Marks
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingFormat(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFormat}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save Blueprint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
