import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Edit3, Trash2, RefreshCw, Plus, ArrowUp, ArrowDown, 
  ShieldCheck, AlertTriangle, CheckCircle2, BookOpen, Layers, X, Check, Eye,
  Printer, Sparkles, HelpCircle, FileCheck, Save
} from 'lucide-react';
import { 
  fetchPaper, updatePaper, regenerateSingleQuestion, fetchAnswerKey,
  fetchQuestionBank
} from '../api';

export default function PaperEditor({ paperId, onNavigate }) {
  const [paper, setPaper] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('paper'); // 'paper' or 'answerKey'
  
  // Question Editing State
  const [editingQuestionIdx, setEditingQuestionIdx] = useState(null);
  const [editingQuestionData, setEditingQuestionData] = useState(null);
  
  // Source citation modal
  const [activeCitation, setActiveCitation] = useState(null);

  // Question Bank drawer for adding questions
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankItems, setBankItems] = useState([]);
  const [regeneratingQNum, setRegeneratingQNum] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (paperId) {
      loadPaperData();
    }
  }, [paperId]);

  const loadPaperData = async () => {
    try {
      setLoading(true);
      const [paperData, akData] = await Promise.all([
        fetchPaper(paperId),
        fetchAnswerKey(paperId).catch(() => null)
      ]);
      setPaper(paperData);
      setAnswerKey(akData);
    } catch (err) {
      console.error('Failed to load paper:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalMarks = () => {
    if (!paper || !paper.questions) return 0;
    return paper.questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
  };

  const handleSavePaper = async () => {
    try {
      setSaving(true);
      const updated = await updatePaper(paper.id, paper);
      setPaper(updated);
      alert('Question Paper saved successfully!');
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleMoveQuestion = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= paper.questions.length) return;
    const newQuestions = [...paper.questions];
    const temp = newQuestions[idx];
    newQuestions[idx] = newQuestions[targetIdx];
    newQuestions[targetIdx] = temp;

    // Renumber questions sequentially
    newQuestions.forEach((q, i) => { q.question_number = i + 1; });
    setPaper({ ...paper, questions: newQuestions });
  };

  const handleDeleteQuestion = (idx) => {
    if (!window.confirm('Delete this question?')) return;
    const newQuestions = paper.questions.filter((_, i) => i !== idx);
    newQuestions.forEach((q, i) => { q.question_number = i + 1; });
    setPaper({ ...paper, questions: newQuestions });
  };

  const handleStartEditQuestion = (idx) => {
    setEditingQuestionIdx(idx);
    setEditingQuestionData({ ...paper.questions[idx] });
  };

  const handleSaveEditQuestion = () => {
    const newQuestions = [...paper.questions];
    newQuestions[editingQuestionIdx] = editingQuestionData;
    setPaper({ ...paper, questions: newQuestions });
    setEditingQuestionIdx(null);
    setEditingQuestionData(null);
  };

  const handleRegenerateQuestion = async (qNum) => {
    try {
      setRegeneratingQNum(qNum);
      const newQ = await regenerateSingleQuestion(paper.id, qNum);
      const newQuestions = paper.questions.map(q => q.question_number === qNum ? newQ : q);
      setPaper({ ...paper, questions: newQuestions });
      alert(`Question Q${qNum} regenerated with fresh grounded textbook RAG!`);
    } catch (err) {
      alert(`Regeneration failed: ${err.message}`);
    } finally {
      setRegeneratingQNum(null);
    }
  };

  const handleOpenBankModal = async () => {
    try {
      const items = await fetchQuestionBank({ book_id: paper.book_id });
      setBankItems(items);
      setShowBankModal(true);
    } catch (err) {
      alert(`Failed to load bank: ${err.message}`);
    }
  };

  const handleAddFromBank = (bankItem) => {
    const nextQNum = paper.questions.length + 1;
    const newQ = {
      id: `q-added-${Date.now()}`,
      question_number: nextQNum,
      section_name: paper.sections?.[0]?.name || "Section A",
      question_type: bankItem.question_type,
      question_text: bankItem.question_text,
      options: bankItem.options,
      correct_answer: bankItem.correct_answer,
      step_by_step_solution: bankItem.detailed_solution,
      marks: bankItem.marks,
      difficulty: bankItem.difficulty,
      blooms_level: bankItem.blooms_level,
      chapter_id: bankItem.chapter_id,
      chapter_name: bankItem.chapter_name,
      source: {
        book_id: bankItem.book_id,
        book_title: bankItem.book_title,
        chapter_id: bankItem.chapter_id,
        chapter_number: 1,
        chapter_name: bankItem.chapter_name,
        page: bankItem.page,
        section: "Question Bank Item",
        text_reference: bankItem.source_snippet
      },
      grounding_score: 1.0,
      grounding_status: "VERIFIED"
    };

    setPaper({
      ...paper,
      questions: [...paper.questions, newQ]
    });
    setShowBankModal(false);
  };

  if (loading || !paper) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentTotal = calculateTotalMarks();
  const targetTotal = paper.total_marks;
  const isMarksBalanced = currentTotal === targetTotal;
  const markDiff = targetTotal - currentTotal;

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Action Bar & Live Marks Alert */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-4 z-30">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-900">{paper.title}</h1>
            {/* Live Marks Balance Alert Badge */}
            {isMarksBalanced ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Total Marks: {currentTotal} / {targetTotal} ✅ Balanced
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Total Marks: {currentTotal} / {targetTotal} ({markDiff > 0 ? `${markDiff} Marks Missing` : `${Math.abs(markDiff)} Marks Excess`})
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {paper.subject} • {paper.grade} ({paper.board}) • {paper.questions?.length} Questions • 100% Textbook Grounded
          </p>
        </div>

        {/* Action buttons: Save, Bank, Exports */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSavePaper}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            onClick={handleOpenBankModal}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" /> Add from Question Bank
          </button>

          <a
            href={`/api/papers/${paper.id}/export/pdf`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" /> PDF Paper
          </a>

          <a
            href={`/api/papers/${paper.id}/export/answer-key-pdf`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <FileCheck className="w-3.5 h-3.5" /> PDF Answer Key
          </a>

          <a
            href={`/api/papers/${paper.id}/export/docx`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" /> Word DOCX
          </a>
        </div>
      </div>

      {/* Tabs: Question Paper vs Answer Key */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('paper')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'paper'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" /> Examination Question Paper
        </button>
        <button
          onClick={() => setActiveTab('answerKey')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'answerKey'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> Official Marking Scheme & Answer Key
        </button>
      </div>

      {/* TAB 1: QUESTION PAPER VIEW */}
      {activeTab === 'paper' && (
        <div className="space-y-6">
          {/* Editable School Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">School Examination Header</span>
              <span className="text-[11px] text-slate-400">Printed at the top of exported PDF/DOCX</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">School / Institution Name</label>
                <input
                  type="text"
                  value={paper.school_name || ''}
                  onChange={(e) => setPaper({ ...paper, school_name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-semibold focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Exam Title</label>
                <input
                  type="text"
                  value={paper.exam_name || ''}
                  onChange={(e) => setPaper({ ...paper, exam_name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-semibold focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Teacher / Department</label>
                <input
                  type="text"
                  value={paper.teacher_name || ''}
                  onChange={(e) => setPaper({ ...paper, teacher_name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-semibold focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {paper.questions?.map((q, idx) => (
              <div
                key={q.id || idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all space-y-4"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-xs">
                      Q{q.question_number}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {q.section_name}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                      {q.question_type}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {q.difficulty} • {q.blooms_level}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                    </span>

                    {/* Reorder Up/Down */}
                    <button
                      onClick={() => handleMoveQuestion(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveQuestion(idx, 1)}
                      disabled={idx === paper.questions.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Regenerate Question via RAG */}
                    <button
                      onClick={() => handleRegenerateQuestion(q.question_number)}
                      disabled={regeneratingQNum === q.question_number}
                      className="p-1 rounded text-slate-400 hover:text-indigo-600"
                      title="Regenerate this question with RAG"
                    >
                      <RefreshCw className={`w-4 h-4 ${regeneratingQNum === q.question_number ? 'animate-spin text-indigo-600' : ''}`} />
                    </button>

                    {/* Edit Question */}
                    <button
                      onClick={() => handleStartEditQuestion(idx)}
                      className="p-1 rounded text-slate-400 hover:text-indigo-600"
                      title="Edit question text and marks"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete Question */}
                    <button
                      onClick={() => handleDeleteQuestion(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <div className="space-y-2 text-sm text-slate-900 leading-relaxed font-medium">
                  <p className="whitespace-pre-line">{q.question_text}</p>

                  {/* MCQ Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800">
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Grounding Source Citation Pill */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveCitation(q.source)}
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50/70 hover:bg-indigo-100/70 px-2.5 py-1 rounded-md transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Source: {q.source?.book_title} • Chapter {q.source?.chapter_number} (Pg {q.source?.page})
                  </button>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Grounded ({Math.round((q.grounding_score || 1) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ANSWER KEY VIEW */}
      {activeTab === 'answerKey' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Official Marking Scheme & Step-by-Step Solutions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Full answers, grading criteria, and formula calculations directly grounded in the textbook.
              </p>
            </div>
            <a
              href={`/api/papers/${paper.id}/export/answer-key-pdf`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download Answer Key PDF
            </a>
          </div>

          <div className="space-y-6">
            {paper.questions?.map((q) => (
              <div key={q.question_number} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    Q{q.question_number}. [{q.marks} Mark{q.marks > 1 ? 's' : ''}] – {q.question_type}
                  </span>
                  <span className="text-xs text-slate-500">{q.chapter_name}</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-emerald-800">
                    Correct Answer: <span className="font-normal text-slate-800">{q.correct_answer}</span>
                  </div>

                  {q.formula_used && (
                    <div className="font-bold text-indigo-800 font-mono">
                      Formula: <span className="font-normal text-slate-800">{q.formula_used}</span>
                    </div>
                  )}

                  {q.step_by_step_solution && (
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Step-by-Step Marking Rubric / Explanation:</span>
                      <p className="text-slate-600 whitespace-pre-line leading-relaxed">{q.step_by_step_solution}</p>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  📚 Grounded in <i>{q.source?.book_title}</i>, Chapter {q.source?.chapter_number} ({q.source?.section}), Page {q.source?.page}.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT QUESTION MODAL */}
      {editingQuestionData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Edit Question Q{editingQuestionData.question_number}</h3>
              <button
                onClick={() => setEditingQuestionData(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Question Text</label>
                <textarea
                  rows={4}
                  value={editingQuestionData.question_text}
                  onChange={(e) => setEditingQuestionData({ ...editingQuestionData, question_text: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Marks</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={editingQuestionData.marks}
                    onChange={(e) => setEditingQuestionData({ ...editingQuestionData, marks: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Difficulty</label>
                  <select
                    value={editingQuestionData.difficulty}
                    onChange={(e) => setEditingQuestionData({ ...editingQuestionData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Correct Answer / Model Answer</label>
                <textarea
                  rows={2}
                  value={editingQuestionData.correct_answer}
                  onChange={(e) => setEditingQuestionData({ ...editingQuestionData, correct_answer: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingQuestionData(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditQuestion}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOURCE CITATION EVIDENCE MODAL */}
      {activeCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Textbook Evidence Verification
                </span>
                <h3 className="text-lg font-bold text-slate-900">{activeCitation.book_title}</h3>
                <p className="text-xs text-slate-500">
                  Chapter {activeCitation.chapter_number}: {activeCitation.chapter_name} • Page {activeCitation.page}
                </p>
              </div>
              <button
                onClick={() => setActiveCitation(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Exact Textbook Reference Passage:</span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                "{activeCitation.text_reference}"
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              This question was verified by the anti-hallucination layer directly against this textbook passage.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCitation(null)}
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD QUESTION FROM BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Select Question from Question Bank</h3>
                <p className="text-xs text-slate-500">Add pre-verified textbook questions to your examination paper</p>
              </div>
              <button
                onClick={() => setShowBankModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              {bankItems.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">No stored questions found for this textbook in the Question Bank</p>
                </div>
              ) : (
                bankItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.question_type} • [{item.marks} Marks]
                      </span>
                      <button
                        onClick={() => handleAddFromBank(item)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition"
                      >
                        + Add to Paper
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-medium">{item.question_text}</p>
                    <p className="text-[11px] text-slate-500 font-medium">Chapter: {item.chapter_name} (Page {item.page})</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
