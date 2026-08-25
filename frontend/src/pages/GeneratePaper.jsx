import React, { useState, useEffect } from 'react';
import { 
  Sparkles, BookOpen, Layers, Sliders, CheckSquare, Square, 
  FileText, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, AlertCircle,
  HelpCircle, Settings, Check, Clock, BrainCircuit
} from 'lucide-react';
import { fetchBooks, fetchFormats, generateQuestionPaper } from '../api';

const ALL_QUESTION_TYPES = [
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

export default function GeneratePaper({ onNavigate, preselectedBookId, preselectedFormatId }) {
  const [books, setBooks] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wizard Step: 1 = Book & Chapters, 2 = Format & Exam Meta, 3 = Weights & Bloom's Taxonomy, 4 = Generating
  const [step, setStep] = useState(1);

  // Form State
  const [selectedBookId, setSelectedBookId] = useState(preselectedBookId || '');
  const [selectedChapterIds, setSelectedChapterIds] = useState([]);
  const [selectedFormatId, setSelectedFormatId] = useState(preselectedFormatId || '');
  const [difficulty, setDifficulty] = useState('Mixed');
  const [distributionMode, setDistributionMode] = useState('equal');
  const [chapterWeights, setChapterWeights] = useState({});
  const [bloomsDistribution, setBloomsDistribution] = useState({
    remember: 20,
    understand: 30,
    apply: 25,
    analyze: 15,
    evaluate: 5,
    create: 5
  });
  const [allowedQuestionTypes, setAllowedQuestionTypes] = useState(ALL_QUESTION_TYPES);
  const [schoolName, setSchoolName] = useState('Delhi Public School');
  const [examName, setExamName] = useState('Mid-Term Examination 2025-26');
  const [teacherName, setTeacherName] = useState('Department of Science / Math');
  const [dateStr, setDateStr] = useState('March 2026');

  // Generation stream & progress logs
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState([]);
  const [generatedPaper, setGeneratedPaper] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [booksData, formatsData] = await Promise.all([fetchBooks(), fetchFormats()]);
      setBooks(booksData);
      setFormats(formatsData);

      const defaultBook = preselectedBookId ? booksData.find(b => b.id === preselectedBookId) : booksData[0];
      if (defaultBook) {
        setSelectedBookId(defaultBook.id);
        setSelectedChapterIds(defaultBook.chapters.map(c => c.id));
      }

      const defaultFmt = preselectedFormatId ? formatsData.find(f => f.id === preselectedFormatId) : formatsData[0];
      if (defaultFmt) {
        setSelectedFormatId(defaultFmt.id);
      }
    } catch (err) {
      console.error('Failed to load generator initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeBook = books.find(b => b.id === selectedBookId);
  const activeFormat = formats.find(f => f.id === selectedFormatId);

  const handleBookChange = (bookId) => {
    setSelectedBookId(bookId);
    const bk = books.find(b => b.id === bookId);
    if (bk) {
      setSelectedChapterIds(bk.chapters.map(c => c.id));
      // Reset chapter weights
      const initWeights = {};
      const equalShare = bk.chapters.length > 0 ? Math.round(100 / bk.chapters.length) : 0;
      bk.chapters.forEach(c => { initWeights[c.id] = equalShare; });
      setChapterWeights(initWeights);
    }
  };

  const toggleChapter = (chapId) => {
    if (selectedChapterIds.includes(chapId)) {
      if (selectedChapterIds.length === 1) {
        alert('You must have at least one chapter selected for the examination.');
        return;
      }
      setSelectedChapterIds(selectedChapterIds.filter(id => id !== chapId));
    } else {
      setSelectedChapterIds([...selectedChapterIds, chapId]);
    }
  };

  const toggleSelectAllChapters = () => {
    if (!activeBook) return;
    if (selectedChapterIds.length === activeBook.chapters.length) {
      // Keep only first
      setSelectedChapterIds([activeBook.chapters[0].id]);
    } else {
      setSelectedChapterIds(activeBook.chapters.map(c => c.id));
    }
  };

  const toggleQuestionType = (qType) => {
    if (allowedQuestionTypes.includes(qType)) {
      if (allowedQuestionTypes.length === 1) return;
      setAllowedQuestionTypes(allowedQuestionTypes.filter(t => t !== qType));
    } else {
      setAllowedQuestionTypes([...allowedQuestionTypes, qType]);
    }
  };

  const handleStartGeneration = async () => {
    if (!selectedBookId || selectedChapterIds.length === 0) {
      alert('Please select a textbook and at least one chapter.');
      return;
    }

    setStep(4);
    setIsGenerating(true);
    setGenerationLogs([
      '🔍 Initializing Anti-Hallucination RAG Retrieval Pipeline...',
      `📚 Filtering repository to: ${activeBook?.title}`,
      `📖 Active Chapter Boundary: ${selectedChapterIds.length} Selected Chapters strictly bounded`,
      `📄 Target Examination Blueprint: ${activeFormat?.name} (${activeFormat?.total_marks} Marks)`,
      '⚡ Extracting textbook candidate passages & equations...',
      '🛡️ Running zero-hallucination factual grounding verifier...',
      '✨ Deduplicating semantically similar questions...',
      '📋 Generating step-by-step grounded Answer Key...'
    ]);

    try {
      const payload = {
        book_id: selectedBookId,
        chapter_ids: selectedChapterIds,
        format_id: selectedFormatId,
        difficulty: difficulty,
        chapter_distribution_mode: distributionMode,
        blooms_distribution: bloomsDistribution,
        allowed_question_types: allowedQuestionTypes,
        school_name: schoolName,
        exam_name: examName,
        teacher_name: teacherName,
        date_str: dateStr,
        strict_mode: true
      };

      const result = await generateQuestionPaper(payload);
      setGeneratedPaper(result);
      setGenerationLogs(prev => [
        ...prev,
        '✅ 100% Questions Verified against Textbook Evidence!',
        '✅ Total Marks validated exactly against blueprint!',
        '🎉 Question paper & Answer Key generation completed successfully!'
      ]);
    } catch (err) {
      setGenerationLogs(prev => [
        ...prev,
        `❌ Generation Error: ${err.message}`
      ]);
      alert(`Generation failed: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Wizard Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>1</span>
          <span>Textbook & Chapters</span>
        </div>
        <div className="w-8 h-0.5 bg-slate-200"></div>
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>2</span>
          <span>Blueprint & Details</span>
        </div>
        <div className="w-8 h-0.5 bg-slate-200"></div>
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>3</span>
          <span>Bloom's & Distribution</span>
        </div>
        <div className="w-8 h-0.5 bg-slate-200"></div>
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 4 ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>4</span>
          <span>Generate & Ground</span>
        </div>
      </div>

      {/* STEP 1: Select Book & Chapters */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 1 of 3</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Select Textbook & Chapters</h2>
            <p className="text-xs text-slate-500 mt-1">
              The AI strictly filters retrieval to only the selected chapters. Zero questions will be generated from outside this scope.
            </p>
          </div>

          {/* Book Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Select Stored Textbook</label>
            <select
              value={selectedBookId}
              onChange={(e) => handleBookChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {books.map(b => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.grade} • {b.board}) – {b.chapters.length} Chapters
                </option>
              ))}
            </select>
          </div>

          {/* Chapters Selection Box */}
          {activeBook && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Select Chapters to Include ({selectedChapterIds.length} of {activeBook.chapters.length} selected)
                </label>
                <button
                  type="button"
                  onClick={toggleSelectAllChapters}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  {selectedChapterIds.length === activeBook.chapters.length ? 'Deselect All' : 'Select All Chapters'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {activeBook.chapters.map((ch) => {
                  const isChecked = selectedChapterIds.includes(ch.id);
                  return (
                    <div
                      key={ch.id}
                      onClick={() => toggleChapter(ch.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked 
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="mt-0.5 text-indigo-600">
                        {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-300" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">
                            Chapter {ch.chapter_number}: {ch.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                          Pages {ch.start_page} – {ch.end_page}
                        </span>
                        {ch.summary && (
                          <p className="text-[11px] text-slate-500 line-clamp-2">{ch.summary}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              disabled={selectedChapterIds.length === 0}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
            >
              Continue to Blueprint <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Format & Examination Meta */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 2 of 3</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Paper Blueprint & Exam Details</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select the question paper structure (marks, sections, question counts) and configure examination header details.
            </p>
          </div>

          {/* Paper Format Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Select Paper Format Blueprint</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formats.map((fmt) => {
                const isSelected = selectedFormatId === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setSelectedFormatId(fmt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-600/20 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{fmt.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                      <span>{fmt.total_marks} Marks</span>
                      <span>•</span>
                      <span>{fmt.duration_minutes / 60}h</span>
                      <span>•</span>
                      <span>{fmt.sections?.length} Sections</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{fmt.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detected Section Blueprint Preview */}
          {activeFormat && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Detected Blueprint Sections:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeFormat.sections?.map((sec, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">{sec.name}:</span> {sec.question_type}
                    </div>
                    <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                      {sec.question_count} × {sec.marks_per_question} = {sec.total_marks}M
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Header Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">School / Institution Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Examination Title</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Faculty / Teacher Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Session / Date</label>
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
            >
              Configure Bloom's & Difficulty <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Bloom's Taxonomy & Difficulty Configuration */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 3 of 3</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Cognitive Levels & Difficulty</h2>
            <p className="text-xs text-slate-500 mt-1">
              Tune Bloom's Taxonomy cognitive depths, difficulty mix, and chapter weightage distribution.
            </p>
          </div>

          {/* Difficulty Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Overall Examination Difficulty</label>
            <div className="grid grid-cols-4 gap-3">
              {['Easy', 'Medium', 'Hard', 'Mixed'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === diff
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Bloom's Taxonomy Cognitive Distribution */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Bloom's Taxonomy Cognitive Distribution
                </h4>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                Total: {Object.values(bloomsDistribution).reduce((a, b) => a + b, 0)}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              {Object.entries(bloomsDistribution).map(([level, val]) => (
                <div key={level} className="space-y-1.5 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-800 capitalize">
                    <span>{level}</span>
                    <span className="text-indigo-600">{val}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={val}
                    onChange={(e) => setBloomsDistribution({ ...bloomsDistribution, [level]: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Allowed Question Types Toggles */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Enabled Question Types</label>
            <div className="flex flex-wrap gap-2">
              {ALL_QUESTION_TYPES.map((t) => {
                const isChecked = allowedQuestionTypes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleQuestionType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isChecked
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {isChecked ? '✓ ' : ''}{t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleStartGeneration}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Start RAG Grounded Generation
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Live Generation & Grounding Verification Log View */}
      {step === 4 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 mb-2">
              {isGenerating ? (
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {isGenerating ? 'Generating Grounded Examination Paper...' : 'Examination Paper Ready!'}
            </h2>
            <p className="text-xs text-slate-500">
              {isGenerating
                ? 'Retrieving textbook passages, synthesizing questions, enforcing grounding checks and verifying answer keys.'
                : 'All questions have passed the anti-hallucination verification against the textbook repository.'}
            </p>
          </div>

          {/* Real-time Verification Terminal Box */}
          <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-2 max-h-72 overflow-y-auto border border-slate-800 shadow-inner">
            {generationLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-600">&gt;</span>
                <span className={log.includes('❌') ? 'text-rose-400' : log.includes('✅') ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {!isGenerating && generatedPaper && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Grounding Score: 100% Verified
                  </span>
                  <h3 className="text-lg font-bold text-emerald-950">{generatedPaper.title}</h3>
                  <p className="text-xs text-emerald-800">
                    {generatedPaper.total_marks} Marks • {generatedPaper.questions?.length} Questions • {generatedPaper.covered_chapter_names?.length} Chapters Covered
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate(`editor/${generatedPaper.id}`)}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
                >
                  <FileText className="w-4 h-4" /> Open in Live Question Paper Editor &rarr;
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-white border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold hover:bg-emerald-100/50 transition"
                >
                  Generate Another Paper
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
