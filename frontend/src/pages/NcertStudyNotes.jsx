import React, { useState, useEffect } from 'react';
import {
  BookOpen, Search, Download, Copy, Volume2, Sparkles,
  Layers, CheckCircle2, Bookmark, ExternalLink, RefreshCw,
  Award, Compass, Brain, FileText, Check, ArrowRight,
  ShieldCheck, Info, ChevronRight, BookMarked, Globe,
  Home, Eye, ChevronDown, Share2, VolumeX, Maximize2, Minimize2,
  File, Presentation
} from 'lucide-react';
import { fetchNcertStudyClasses, fetchNcertStudyNotes } from '../api';

export default function NcertStudyNotes({ onNavigate }) {
  // Navigation states
  const [classesSummary, setClassesSummary] = useState([]);
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('Science');
  const [selectedChapter, setSelectedChapter] = useState('Chemical Reactions and Equations');
  const [selectedMedium, setSelectedMedium] = useState('english');
  const [searchQuery, setSearchQuery] = useState('');

  // View Mode: 'pdf' (Real PDF Document Preview) | 'notes' (On-Screen Interactive Notes)
  const [viewMode, setViewMode] = useState('pdf');

  // Note Content State
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    loadClassesCatalog();
  }, []);

  useEffect(() => {
    loadNotes();
  }, [selectedClass, selectedSubject, selectedChapter, selectedMedium]);

  const loadClassesCatalog = async () => {
    try {
      const data = await fetchNcertStudyClasses();
      setClassesSummary(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const res = await fetchNcertStudyNotes({
        class_grade: selectedClass,
        subject: selectedSubject,
        chapter_title: selectedChapter,
        chapter_number: 1,
      });
      setNoteData(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to load NCERT study notes');
    } finally {
      setLoading(false);
    }
  };

  const pdfStreamUrl = `/api/ncertstudy/pdf?class_grade=${encodeURIComponent(selectedClass)}&subject=${encodeURIComponent(selectedSubject)}&chapter_title=${encodeURIComponent(selectedChapter)}`;

  // Audio speech synthesis
  const toggleAudioRead = () => {
    if (!window.speechSynthesis) {
      showToast('Speech synthesis is not supported on this device');
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      showToast('Audio paused');
    } else if (noteData) {
      window.speechSynthesis.cancel();
      const textToRead = `${noteData.chapter_title}. ${noteData.executive_summary}. ` +
        noteData.sections.map((s) => `${s.title}. ${s.summary}. ${s.bullet_points.join('. ')}`).join('. ');
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      showToast('🔊 Reading NCERT Study Notes Aloud...');
    }
  };

  const handleCopyNotes = () => {
    if (!noteData) return;
    let fullText = `# ${noteData.chapter_title} (${noteData.class_grade} ${noteData.subject} - NCERTStudy.com)\n\n`;
    fullText += `## Executive Summary\n${noteData.executive_summary}\n\n`;
    noteData.sections.forEach((sec, idx) => {
      fullText += `### ${idx + 1}. ${sec.title}\n${sec.summary}\n\n${sec.content_paragraphs.join('\n\n')}\n\n`;
      sec.bullet_points.forEach((bp) => { fullText += `- ${bp}\n`; });
      if (sec.important_notes) fullText += `\n> **Exam Tip:** ${sec.important_notes}\n`;
      fullText += '\n';
    });
    navigator.clipboard.writeText(fullText);
    showToast('Complete Chapter Study Notes Copied to Clipboard!');
  };

  // Fallback subjects & chapters map
  const subjectsMap = {
    'Class 12': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Social Science', 'English'],
    'Class 11': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Social Science', 'English'],
    'Class 10': ['Science', 'Mathematics', 'Social Science', 'English Communicative'],
    'Class 9': ['Science', 'Mathematics', 'Social Science', 'English'],
    'Class 8': ['Science', 'Mathematics', 'Social Science', 'English'],
    'Class 7': ['Science', 'Mathematics', 'Social Science', 'English'],
    'Class 6': ['Science', 'Mathematics', 'Social Science', 'English'],
  };

  const chaptersMap = {
    'Science': [
      'Chemical Reactions and Equations', 'Acids, Bases and Salts',
      'Metals and Non-metals', 'Carbon and its Compounds',
      'Periodic Classification of Elements', 'Life Processes',
      'Control and Coordination', 'Diversity in living Organisms',
      'How do Organisms Reproduce?', 'Heredity and Evolution',
      'Light – Reflection and Refraction', 'Human Eye and Colourful World',
      'Electricity', 'Magnetic Effects of Electric Current',
      'Sources of Energy', 'Our Environment', 'Management of Natural Resources'
    ],
    'Mathematics': [
      'Real Numbers', 'Polynomials',
      'Pair of Linear Equations in Two Variables', 'Quadratic Equations',
      'Arithmetic Progressions', 'Triangles',
      'Coordinate Geometry', 'Introduction to Trigonometry',
      'Some Applications of Trigonometry', 'Circles',
      'Constructions', 'Areas Related to Circles',
      'Surface Areas and Volumes', 'Statistics', 'Probability'
    ],
    'Social Science': [
      'The Rise of Nationalism in Europe', 'Nationalism in India',
      'The Making of a Global World', 'The Age of Industrialisation',
      'Print Culture and the Modern World', 'Resources and Development',
      'Forest and Wildlife Resources', 'Water Resources',
      'Agriculture', 'Minerals and Energy Resources',
      'Power Sharing', 'Federalism', 'Gender, Religion and Caste',
      'Political Parties', 'Outcomes of Democracy',
      'Development', 'Sectors of the Indian Economy', 'Money and Credit'
    ],
    'Physics': [
      'Electric Charges and Fields', 'Electrostatic Potential and Capacitance',
      'Current Electricity', 'Moving Charges and Magnetism',
      'Magnetism and Matter', 'Electromagnetic Induction',
      'Alternating Current', 'Electromagnetic Waves',
      'Ray Optics and Optical Instruments', 'Wave Optics',
      'Dual Nature of Radiation and Matter', 'Atoms', 'Nuclei', 'Semiconductor Electronics'
    ],
    'Chemistry': [
      'Solutions', 'Electrochemistry', 'Chemical Kinetics',
      'd and f Block Elements', 'Coordination Compounds',
      'Haloalkanes and Haloarenes', 'Alcohols, Phenols and Ethers',
      'Aldehydes, Ketones and Carboxylic Acids', 'Amines', 'Biomolecules'
    ],
    'Biology': [
      'Sexual Reproduction in Flowering Plants', 'Human Reproduction',
      'Reproductive Health', 'Principles of Inheritance and Variation',
      'Molecular Basis of Inheritance', 'Evolution',
      'Human Health and Disease', 'Microbes in Human Welfare',
      'Biotechnology - Principles and Processes', 'Ecosystem', 'Biodiversity and Conservation'
    ],
    'English Communicative': [
      'A Letter to God', 'Nelson Mandela: Long Walk to Freedom',
      'Two Stories About Flying', 'From the Diary of Anne Frank',
      'Glimpses of India', 'Mijbil the Otter', 'Madam Rides the Bus',
      'The Sermon at Benares', 'The Proposal', 'Dust of Snow', 'Fire and Ice'
    ],
    'English': [
      'The Last Lesson', 'Lost Spring', 'Deep Water', 'The Rattrap',
      'Indigo', 'Poets and Pancakes', 'The Interview', 'Going Places',
      'My Mother at Sixty-Six', 'Keeping Quiet', 'A Thing of Beauty'
    ]
  };

  const currentAvailableSubjects = subjectsMap[selectedClass] || ['Science', 'Mathematics', 'Social Science', 'English'];
  const currentAvailableChapters = chaptersMap[selectedSubject] || chaptersMap['Science'];
  const filteredChapters = currentAvailableChapters.filter((ch) => ch.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`space-y-6 ${isDistractionFree ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : ''}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-red-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* NCERTStudy Breadcrumb Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </button>
          <span>&gt;&gt;</span>
          <span className="text-slate-700 font-bold">
            NCERT Notes <span className="text-red-600 font-bold">( {selectedMedium} )</span>
          </span>
          <span>&gt;&gt;</span>
          <span className="text-slate-900 font-black">{selectedClass}</span>
          <span>&gt;&gt;</span>
          <span className="text-indigo-700 font-bold">{selectedSubject}</span>
          <span>&gt;&gt;</span>
          <span className="text-slate-900 font-black">{selectedChapter}</span>
        </div>

        {/* Medium Selector & External Link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black uppercase text-slate-400">Medium:</span>
            <button
              onClick={() => setSelectedMedium('english')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedMedium === 'english'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => setSelectedMedium('hindi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedMedium === 'hindi'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🇮🇳 Hindi
            </button>
          </div>

          <a
            href="https://ncertstudy.com/notes#english"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1"
          >
            <span>ncertstudy.com</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* NCERTStudy Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-indigo-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            Official NCERT Notes for All Classes 6 to 12 PDF Download & Real Preview
          </div>
          <h1 className="text-2xl lg:text-4xl font-black tracking-tight leading-tight">
            Download NCERT Notes PDF Free • Real PDF Document Preview
          </h1>
          <p className="text-xs lg:text-sm text-red-100 max-w-2xl font-medium">
            Authentic NCERT revision notes from ncertstudy.com covering Classes 6 to 12 across all subjects. Read on screen or preview the complete official PDF with 1-click download.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('presenton')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 border border-white/20"
          >
            <Presentation className="w-4 h-4 text-amber-300" />
            <span>PresentOn Studio</span>
          </button>
          <button
            onClick={() => onNavigate('copilot')}
            className="px-4 py-3 rounded-2xl bg-white hover:bg-red-50 text-red-700 font-black text-xs shadow-lg transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Teacher Copilot</span>
          </button>
        </div>
      </div>

      {/* Class Tiles (Exact ncertstudy.com Class Cards) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-600" />
            Select Class (English Medium)
          </h2>
          <span className="text-xs font-bold text-slate-400">Class 6 to Class 12</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {['Class 12', 'Class 11', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'].map((cls) => {
            const isSelected = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClass(cls);
                  const subjs = subjectsMap[cls] || ['Science', 'Mathematics'];
                  if (!subjs.includes(selectedSubject)) {
                    setSelectedSubject(subjs[0]);
                    const chs = chaptersMap[subjs[0]] || chaptersMap['Science'];
                    setSelectedChapter(chs[0]);
                  }
                }}
                className={`p-4 rounded-2xl text-center border-2 transition-all flex flex-col justify-center items-center gap-1 ${
                  isSelected
                    ? 'border-red-600 bg-red-50/70 text-red-900 shadow-md ring-2 ring-red-400/30'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <b className="text-lg lg:text-xl font-black block">{cls}</b>
                <span className="text-[10px] font-bold text-slate-500">
                  {cls === 'Class 12' || cls === 'Class 11' ? 'Sr. Secondary' : cls === 'Class 10' ? 'Board Level' : 'Secondary'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Selector Cards (Matching exact NCERTStudy layout) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-red-600" />
            Select Subject for {selectedClass} ({selectedMedium} medium):
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentAvailableSubjects.map((sub, idx) => {
            const isSelected = selectedSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubject(sub);
                  const chs = chaptersMap[sub] || chaptersMap['Science'];
                  setSelectedChapter(chs[0]);
                }}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-red-600 bg-red-600 text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase block ${isSelected ? 'text-red-200' : 'text-slate-400'}`}>
                    Subject {idx + 1}
                  </span>
                  <b className="text-sm lg:text-base font-black leading-tight block">{idx + 1}. {sub}</b>
                </div>
                <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Index & Notes Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Chapter List */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 max-h-[850px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                {selectedClass} • {selectedSubject}
              </span>
              <h3 className="font-black text-slate-900 text-sm">
                Chapters ({filteredChapters.length})
              </h3>
            </div>
          </div>

          {/* Chapter Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Chapter Buttons List */}
          <div className="space-y-2">
            {filteredChapters.map((ch, idx) => {
              const isSelected = ch === selectedChapter;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedChapter(ch)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white font-black shadow-md shadow-red-200/50'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200/60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-bold uppercase block ${isSelected ? 'text-red-200' : 'text-slate-400'}`}>
                      Chapter {idx + 1}
                    </span>
                    <p className="leading-snug">{ch}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: PDF Preview / Notes Stage */}
        <div className="lg:col-span-3 space-y-6">
          {/* Action Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {selectedClass} • {selectedSubject}
                </span>
                <span className="text-[10px] font-bold text-slate-400">NCERTStudy.com Notes</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-slate-900 pt-1">{selectedChapter}</h2>
            </div>

            {/* View Mode Toggle: Real PDF Preview vs On-Screen Notes */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'pdf'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <File className="w-3.5 h-3.5" />
                  <span>Real PDF Preview</span>
                </button>
                <button
                  onClick={() => setViewMode('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'notes'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>On-Screen Notes</span>
                </button>
              </div>

              {viewMode === 'notes' && (
                <>
                  <button
                    onClick={toggleAudioRead}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isPlayingAudio ? 'Pause Audio' : 'Read Aloud'}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isPlayingAudio ? 'Playing' : 'Audio'}</span>
                  </button>

                  <button
                    onClick={handleCopyNotes}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                    title="Copy Full Notes"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </>
              )}

              <a
                href={pdfStreamUrl}
                download
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-100 flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <a
                href={pdfStreamUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                title="Open PDF in Full Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {viewMode === 'pdf' ? (
            /* REAL PDF EMBED PREVIEW */
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-black text-slate-900">
                    Real PDF Preview: {selectedClass} {selectedSubject} • {selectedChapter}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfStreamUrl}
                    download
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="w-full h-[780px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  src={`${pdfStreamUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  title="NCERTStudy Notes PDF Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          ) : noteData ? (
            /* ON-SCREEN STRUCTURED NOTES */
            <div className="space-y-6">
              {/* Executive Summary Card */}
              <div className="bg-gradient-to-br from-red-50 via-white to-red-50/30 border-2 border-red-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-black text-xs uppercase tracking-wider">
                  <Brain className="w-4 h-4 text-red-600" />
                  <span>Executive Chapter Summary & Exam Importance</span>
                </div>
                <p className="text-sm lg:text-base font-medium text-slate-800 leading-relaxed font-serif">
                  {noteData.executive_summary}
                </p>
              </div>

              {/* Subtopic Sections */}
              <div className="space-y-5">
                {noteData.sections?.map((sec, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm shadow-red-200">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg lg:text-xl font-black text-slate-900">{sec.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      {sec.summary}
                    </p>

                    {/* Paragraphs */}
                    {sec.content_paragraphs?.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm text-slate-800 leading-relaxed font-serif">
                        {p}
                      </p>
                    ))}

                    {/* Bullet Points */}
                    {sec.bullet_points && sec.bullet_points.length > 0 && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                          Key Concept Bullet Points:
                        </span>
                        <div className="space-y-1.5">
                          {sec.bullet_points.map((bp, bpIdx) => (
                            <div key={bpIdx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                              <span className="text-red-600 font-bold">•</span>
                              <span>{bp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Important Notes */}
                    {sec.important_notes && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-bold text-amber-950 flex items-start gap-2.5">
                        <span className="text-base">📌</span>
                        <div>
                          <span className="block text-[10px] font-black uppercase text-amber-800">High-Yield Exam Cue:</span>
                          <p className="font-semibold">{sec.important_notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Diagram Description */}
                    {sec.diagram_description && (
                      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                        <span className="font-black block uppercase text-[10px] text-indigo-800">
                          🎨 Textbook Diagram & Observation Guide:
                        </span>
                        <p className="font-medium">{sec.diagram_description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Definitions Glossary */}
              {noteData.definitions && noteData.definitions.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-600" />
                    Essential NCERT Definitions & Glossary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {noteData.definitions.map((d, dIdx) => (
                      <div key={dIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="font-black text-xs text-red-900 block">{d.term}</span>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{d.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Governing Formulas & Reactions */}
              {noteData.formulas && noteData.formulas.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    Governing Formulas, Chemical Reactions & SI Units
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {noteData.formulas.map((f, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{f.name}</span>
                        <code className="text-xs font-mono font-bold text-red-900 block">{f.formula}</code>
                        {f.units && <span className="text-[10px] text-slate-400 font-medium">SI Units: {f.units}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes vs Facts */}
              {noteData.common_mistakes_to_avoid && noteData.common_mistakes_to_avoid.length > 0 && (
                <div className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-4">
                  <h3 className="font-black text-rose-900 text-base flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    Common Student Mistakes vs Scientific Facts
                  </h3>
                  <div className="space-y-3">
                    {noteData.common_mistakes_to_avoid.map((m, mIdx) => (
                      <div key={mIdx} className="p-4 bg-white rounded-2xl border border-rose-100 space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-rose-600 font-bold">
                          <span>❌ Common Mistake:</span>
                          <span className="text-slate-800 font-medium">{m.mistake}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                          <span>✓ Scientific Fact:</span>
                          <span className="text-slate-800 font-medium">{m.fact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* High-Yield Checkpoints */}
              {noteData.high_yield_revision_checkpoints && noteData.high_yield_revision_checkpoints.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    High-Yield Exam Revision Checkpoints
                  </h3>
                  <div className="space-y-2">
                    {noteData.high_yield_revision_checkpoints.map((cp, cpIdx) => (
                      <div key={cpIdx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expected Board Questions with Solutions */}
              {noteData.expected_board_questions && noteData.expected_board_questions.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Expected Board Examination Questions with Model Solutions
                  </h3>
                  <div className="space-y-4">
                    {noteData.expected_board_questions.map((q, qIdx) => (
                      <div key={qIdx} className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-amber-900">
                            Expected Question {qIdx + 1} [{q.marks || 3} Marks]
                          </span>
                        </div>
                        <p className="font-bold text-slate-900 leading-relaxed text-sm">{q.question}</p>
                        <div className="p-4 rounded-xl bg-white border border-amber-200 text-slate-800 space-y-1">
                          <span className="font-black text-emerald-700 block uppercase text-[10px]">
                            Model Solution & Step-by-Step Working:
                          </span>
                          <p className="whitespace-pre-line font-medium leading-relaxed">{q.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
