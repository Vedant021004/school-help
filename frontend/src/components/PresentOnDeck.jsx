import React, { useState, useEffect } from 'react';
import {
  Presentation, Download, Play, ChevronLeft, ChevronRight,
  Maximize2, Minimize2, Palette, Sparkles, Copy, Check,
  Volume2, HelpCircle, Layers, FileText, CheckCircle2,
  RefreshCw, Info, Edit3, Eye, ArrowRight, Clock, Award,
  Plus, Trash2, ArrowLeft, MoveLeft, MoveRight
} from 'lucide-react';
import { downloadPresentOnPptx, fetchPresentOnThemes } from '../api';

export default function PresentOnDeck({ deck: initialDeck, onUpdateDeck, onRegenerate, loading = false }) {
  const [deck, setDeck] = useState(initialDeck);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTheme, setActiveTheme] = useState(initialDeck?.theme || 'modern_indigo');
  const [themes, setThemes] = useState({});
  const [revealedQuiz, setRevealedQuiz] = useState({});
  const [presenterTimerSeconds, setPresenterTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    setDeck(initialDeck);
    if (initialDeck?.theme) {
      setActiveTheme(initialDeck.theme);
    }
  }, [initialDeck]);

  useEffect(() => {
    loadThemes();
  }, []);

  // Presenter mode timer
  useEffect(() => {
    let interval = null;
    if (isFullscreen && timerRunning) {
      interval = setInterval(() => {
        setPresenterTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFullscreen, timerRunning]);

  // Keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!deck || !deck.slides || deck.slides.length === 0) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(deck.slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
        setTimerRunning(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck]);

  const loadThemes = async () => {
    try {
      const data = await fetchPresentOnThemes();
      setThemes(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPptx = async () => {
    if (!deck) return;
    try {
      showToast('Generating 16:9 PresentOn PowerPoint (.pptx) deck...');
      const blob = await downloadPresentOnPptx({ ...deck, theme: activeTheme });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PresentOn_${(deck.chapter_name || 'Presentation').replace(/\s+/g, '_')}.pptx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('PowerPoint (.pptx) Downloaded Successfully!');
    } catch (e) {
      console.error(e);
      showToast('Failed to download presentation');
    }
  };

  // Slide Modification Helpers
  const updateCurrentSlide = (fields) => {
    if (!deck || !deck.slides) return;
    const newSlides = [...deck.slides];
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], ...fields };
    const updatedDeck = { ...deck, slides: newSlides };
    setDeck(updatedDeck);
    if (onUpdateDeck) onUpdateDeck(updatedDeck);
  };

  const handleAddSlide = (layout = 'concept_split') => {
    if (!deck) return;
    const newSlide = {
      id: `slide-${Date.now()}`,
      slide_number: (deck.slides?.length || 0) + 1,
      layout: layout,
      title: 'New Slide Title',
      subtitle: 'Slide Subtitle',
      bullet_points: ['Key presentation point 1', 'Key presentation point 2'],
      key_definition: layout === 'concept_split' ? 'Standard core concept definition' : undefined,
      formula: layout === 'formula_card' ? 'E = mc^2' : undefined,
      formula_name: layout === 'formula_card' ? 'Mass-Energy Equivalence' : undefined,
      speaker_notes: 'Speaker notes and lecture delivery instructions.'
    };
    const newSlides = [...(deck.slides || []), newSlide];
    const updatedDeck = { ...deck, slides: newSlides, total_slides: newSlides.length };
    setDeck(updatedDeck);
    setCurrentSlideIndex(newSlides.length - 1);
    if (onUpdateDeck) onUpdateDeck(updatedDeck);
    showToast('New slide added!');
  };

  const handleDeleteSlide = (idx) => {
    if (!deck || deck.slides.length <= 1) {
      showToast('Cannot delete the last remaining slide');
      return;
    }
    const newSlides = deck.slides.filter((_, i) => i !== idx).map((s, i) => ({ ...s, slide_number: i + 1 }));
    const updatedDeck = { ...deck, slides: newSlides, total_slides: newSlides.length };
    setDeck(updatedDeck);
    setCurrentSlideIndex(Math.max(0, idx - 1));
    if (onUpdateDeck) onUpdateDeck(updatedDeck);
    showToast('Slide deleted');
  };

  const handleDuplicateSlide = (idx) => {
    if (!deck) return;
    const slideToCopy = deck.slides[idx];
    const newSlide = { ...slideToCopy, id: `slide-${Date.now()}`, title: `${slideToCopy.title} (Copy)` };
    const newSlides = [...deck.slides.slice(0, idx + 1), newSlide, ...deck.slides.slice(idx + 1)].map((s, i) => ({ ...s, slide_number: i + 1 }));
    const updatedDeck = { ...deck, slides: newSlides, total_slides: newSlides.length };
    setDeck(updatedDeck);
    setCurrentSlideIndex(idx + 1);
    if (onUpdateDeck) onUpdateDeck(updatedDeck);
    showToast('Slide duplicated!');
  };

  const handleMoveSlide = (idx, direction) => {
    if (!deck) return;
    const newIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= deck.slides.length) return;
    const newSlides = [...deck.slides];
    const temp = newSlides[idx];
    newSlides[idx] = newSlides[newIdx];
    newSlides[newIdx] = temp;
    const renumbered = newSlides.map((s, i) => ({ ...s, slide_number: i + 1 }));
    const updatedDeck = { ...deck, slides: renumbered };
    setDeck(updatedDeck);
    setCurrentSlideIndex(newIdx);
    if (onUpdateDeck) onUpdateDeck(updatedDeck);
  };

  if (!deck || !deck.slides || deck.slides.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
        <Presentation className="w-12 h-12 text-indigo-400 mx-auto animate-pulse" />
        <h3 className="text-base font-black text-slate-800">No PresentOn Slide Deck Generated</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Click the generate button above to create an AI presentation with custom layouts and speaker notes.
        </p>
      </div>
    );
  }

  const curSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const themeClasses = {
    modern_indigo: {
      canvas: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white',
      accentBadge: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200',
      card: 'bg-indigo-900/40 border-indigo-700/50 text-indigo-100',
      highlightText: 'text-amber-400',
      stepBox: 'bg-indigo-800/50 border-indigo-600/40',
      formulaBox: 'bg-indigo-950 border-indigo-500/40 text-amber-300',
    },
    academic_emerald: {
      canvas: 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white',
      accentBadge: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200',
      card: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-100',
      highlightText: 'text-emerald-400',
      stepBox: 'bg-emerald-800/50 border-emerald-600/40',
      formulaBox: 'bg-emerald-950 border-emerald-500/40 text-emerald-300',
    },
    corporate_slate: {
      canvas: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white',
      accentBadge: 'bg-slate-700/50 border-slate-600/40 text-slate-200',
      card: 'bg-slate-800/60 border-slate-700/60 text-slate-100',
      highlightText: 'text-sky-400',
      stepBox: 'bg-slate-800/80 border-slate-600/40',
      formulaBox: 'bg-slate-950 border-slate-700 text-sky-300',
    },
    warm_amber: {
      canvas: 'bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 text-white',
      accentBadge: 'bg-amber-500/20 border-amber-400/30 text-amber-200',
      card: 'bg-amber-900/30 border-amber-700/40 text-amber-100',
      highlightText: 'text-amber-400',
      stepBox: 'bg-amber-900/40 border-amber-700/40',
      formulaBox: 'bg-stone-950 border-amber-600/40 text-amber-300',
    },
    midnight_cyber: {
      canvas: 'bg-gradient-to-br from-black via-cyan-950 to-slate-950 text-white',
      accentBadge: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300',
      card: 'bg-cyan-950/40 border-cyan-800/50 text-cyan-100',
      highlightText: 'text-cyan-400',
      stepBox: 'bg-cyan-900/30 border-cyan-700/40',
      formulaBox: 'bg-black border-cyan-500/50 text-cyan-300',
    },
  };

  const currentTheme = themeClasses[activeTheme] || themeClasses.modern_indigo;

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-black flex flex-col justify-between p-6' : ''}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Control Header Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-base font-black text-slate-900 leading-tight">
              {deck.chapter_name || deck.title}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {deck.grade} • {deck.subject} • {deck.slides.length} Widescreen 16:9 Slides
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Theme Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Palette className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none pr-2 py-1"
            >
              <option value="modern_indigo">🔮 Modern Indigo</option>
              <option value="academic_emerald">🌿 Academic Emerald</option>
              <option value="corporate_slate">🏢 Corporate Slate</option>
              <option value="warm_amber">☀️ Warm Amber</option>
              <option value="midnight_cyber">🌌 Midnight Cyber</option>
            </select>
          </div>

          {/* Edit Slide Toggle */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isEditing ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Toggle Slide In-Place Editor"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Slide'}</span>
          </button>

          {/* Add Slide Dropdown */}
          <div className="relative group">
            <button
              onClick={() => handleAddSlide('concept_split')}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>

          {/* Fullscreen Presenter Mode */}
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimerRunning(true);
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Live Present'}</span>
          </button>

          {/* Download PowerPoint PPTX */}
          <button
            onClick={handleDownloadPptx}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-100 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .pptx</span>
          </button>
        </div>
      </div>

      {/* Main 16:9 Slide Stage */}
      <div className={`relative w-full aspect-video rounded-3xl border border-slate-700/40 p-8 lg:p-12 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${currentTheme.canvas}`}>
        {/* Top Header of Slide */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentTheme.accentBadge}`}>
              <Presentation className="w-3.5 h-3.5 text-amber-300" />
              <span>Slide {curSlide.slide_number} of {deck.slides.length} • {curSlide.layout.replace('_', ' ')}</span>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={curSlide.title}
                onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                className="w-full bg-black/40 border border-white/30 rounded-xl px-3 py-1 text-2xl lg:text-3xl font-black text-white focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl lg:text-4xl font-black tracking-tight drop-shadow-md">
                {curSlide.title}
              </h1>
            )}

            {curSlide.subtitle && (
              isEditing ? (
                <input
                  type="text"
                  value={curSlide.subtitle}
                  onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-2 py-0.5 text-sm text-slate-200 mt-1 focus:outline-none"
                />
              ) : (
                <p className={`text-xs lg:text-sm font-semibold ${currentTheme.highlightText}`}>
                  {curSlide.subtitle}
                </p>
              )
            )}
          </div>

          {/* Slide Actions (Delete / Duplicate / Move) */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => handleMoveSlide(currentSlideIndex, 'left')}
              disabled={currentSlideIndex === 0}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white disabled:opacity-30"
              title="Move Slide Left"
            >
              <MoveLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleMoveSlide(currentSlideIndex, 'right')}
              disabled={currentSlideIndex === deck.slides.length - 1}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white disabled:opacity-30"
              title="Move Slide Right"
            >
              <MoveRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDuplicateSlide(currentSlideIndex)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white"
              title="Duplicate Slide"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDeleteSlide(currentSlideIndex)}
              className="p-1.5 hover:bg-rose-500/20 text-rose-300 rounded-lg"
              title="Delete Slide"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Slide Content Body by Layout */}
        <div className="my-auto py-4">
          {curSlide.layout === 'title' && (
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                {curSlide.title}
              </h2>
              <p className="text-base lg:text-xl font-medium text-slate-300">
                {curSlide.subtitle || `${deck.grade} • ${deck.subject} • NCERT Master Class`}
              </p>
              {curSlide.bullet_points && curSlide.bullet_points.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {curSlide.bullet_points.map((bp, i) => (
                    <span key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${currentTheme.accentBadge}`}>
                      {bp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {curSlide.layout === 'concept_split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                {curSlide.bullet_points?.map((bp, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm lg:text-base font-medium text-slate-200">
                    <span className={`text-lg font-bold ${currentTheme.highlightText}`}>•</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>

              {curSlide.key_definition && (
                <div className={`p-6 rounded-2xl border-2 backdrop-blur-md space-y-2 shadow-xl ${currentTheme.card}`}>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                    📌 Core Definition & Takeaway
                  </span>
                  <p className="text-sm lg:text-base font-medium leading-relaxed font-serif">
                    {curSlide.key_definition}
                  </p>
                </div>
              )}
            </div>
          )}

          {curSlide.layout === 'step_flow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(curSlide.steps || [
                { step: '1', title: 'Reactants', desc: 'Initial state input' },
                { step: '2', title: 'Transition', desc: 'Bond breaking & energy transformation' },
                { step: '3', title: 'Products', desc: 'Stable output formation' }
              ]).map((st, i) => (
                <div key={i} className={`p-5 rounded-2xl border backdrop-blur-md space-y-2 relative overflow-hidden ${currentTheme.stepBox}`}>
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-black text-sm">
                    {st.step || i + 1}
                  </div>
                  <h3 className="font-bold text-sm lg:text-base text-white">{st.title}</h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          )}

          {curSlide.layout === 'formula_card' && (
            <div className="space-y-4 max-w-2xl mx-auto text-center">
              <div className={`p-6 rounded-2xl border-2 shadow-2xl space-y-2 ${currentTheme.formulaBox}`}>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {curSlide.formula_name || 'Governing Formula'}
                </span>
                <code className="text-2xl lg:text-4xl font-mono font-black text-amber-300 block py-2">
                  {curSlide.formula || 'A + B -> C + D'}
                </code>
              </div>

              {curSlide.bullet_points && (
                <div className="space-y-2 text-left bg-black/30 p-4 rounded-xl border border-white/10 text-xs text-slate-200">
                  {curSlide.bullet_points.map((bp, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {curSlide.layout === 'activity_box' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-6 rounded-2xl border bg-amber-500/10 border-amber-400/30 text-amber-100 space-y-2">
                <span className="text-xs font-black uppercase text-amber-300 block">
                  ⚡ Classroom Experiment / Activity
                </span>
                <p className="text-sm font-medium leading-relaxed font-serif">
                  {curSlide.activity_box || 'Conduct laboratory test and record observations.'}
                </p>
              </div>

              <div className="space-y-2">
                {curSlide.bullet_points?.map((bp, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs lg:text-sm text-slate-200">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {curSlide.layout === 'comparison' && curSlide.comparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border bg-indigo-900/30 border-indigo-600/40 space-y-3">
                <h3 className="font-black text-sm lg:text-base text-indigo-300 border-b border-indigo-700/50 pb-2">
                  {curSlide.comparison.left_title || 'Category A'}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-200">
                  {curSlide.comparison.left_items?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border bg-emerald-900/30 border-emerald-600/40 space-y-3">
                <h3 className="font-black text-sm lg:text-base text-emerald-300 border-b border-emerald-700/50 pb-2">
                  {curSlide.comparison.right_title || 'Category B'}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-200">
                  {curSlide.comparison.right_items?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {curSlide.layout === 'stats_grid' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(curSlide.stats_items || [
                { label: 'Board Marks', value: '7-9' },
                { label: 'Core Laws', value: '4' },
                { label: 'Equations', value: '12' },
                { label: 'Exemplars', value: '25' }
              ]).map((st, i) => (
                <div key={i} className="p-5 rounded-2xl border bg-black/40 border-white/10 text-center space-y-1">
                  <span className="text-2xl lg:text-4xl font-black text-amber-400 block">{st.value}</span>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{st.label}</span>
                </div>
              ))}
            </div>
          )}

          {curSlide.layout === 'quiz_diagnostic' && curSlide.quiz_question && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="p-5 rounded-2xl border bg-indigo-950/60 border-indigo-500/40 space-y-3">
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                  Interactive Class Diagnostic Quiz
                </span>
                <p className="text-sm lg:text-base font-bold text-white leading-relaxed">
                  {curSlide.quiz_question.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {curSlide.quiz_question.options?.map((opt, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/10 text-xs font-medium text-slate-200">
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setRevealedQuiz({ ...revealedQuiz, [curSlide.slide_number]: !revealedQuiz[curSlide.slide_number] })}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
                  >
                    {revealedQuiz[curSlide.slide_number] ? 'Hide Answer' : 'Reveal Answer & Explanation'}
                  </button>

                  {revealedQuiz[curSlide.slide_number] && (
                    <span className="text-xs font-bold text-emerald-400 animate-in fade-in">
                      Correct: Option {curSlide.quiz_question.correct}
                    </span>
                  )}
                </div>

                {revealedQuiz[curSlide.slide_number] && curSlide.quiz_question.explanation && (
                  <p className="text-xs text-slate-300 border-t border-white/10 pt-2 font-serif">
                    💡 {curSlide.quiz_question.explanation}
                  </p>
                )}
              </div>
            </div>
          )}

          {curSlide.layout === 'summary_roadmap' && (
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 block text-center">
                Lecture Milestones & Homework Assignment
              </span>
              <div className="space-y-2">
                {curSlide.bullet_points?.map((bp, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs lg:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(deck.slides.length - 1, prev + 1))}
              disabled={currentSlideIndex === deck.slides.length - 1}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span>Slide {currentSlideIndex + 1} / {deck.slides.length}</span>
          </div>

          {isFullscreen && (
            <div className="flex items-center gap-2 font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/20">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{Math.floor(presenterTimerSeconds / 60)}:{(presenterTimerSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition"
            >
              {showSpeakerNotes ? 'Hide Notes' : 'Show Speaker Notes'}
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && curSlide.speaker_notes && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-xs space-y-1 text-amber-950">
          <div className="flex items-center gap-2 font-black uppercase text-[10px] text-amber-800">
            <Award className="w-3.5 h-3.5" />
            <span>Teacher Delivery Cue & Speaker Notes (Slide {currentSlideIndex + 1}):</span>
          </div>
          {isEditing ? (
            <textarea
              value={curSlide.speaker_notes}
              onChange={(e) => updateCurrentSlide({ speaker_notes: e.target.value })}
              rows={2}
              className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-800 focus:outline-none"
            />
          ) : (
            <p className="font-medium font-serif leading-relaxed">
              {curSlide.speaker_notes}
            </p>
          )}
        </div>
      )}

      {/* Slide Thumbnails Filmstrip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[11px] font-black uppercase text-slate-500">Slide Deck Filmstrip</span>
          <span className="text-xs text-slate-400 font-bold">{deck.slides.length} Slides</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {deck.slides.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-36 h-20 shrink-0 rounded-xl border-2 p-2 text-left transition-all flex flex-col justify-between ${
                currentSlideIndex === idx
                  ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-400/30'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-slate-400">Slide {idx + 1}</span>
                <span className="text-[8px] font-bold px-1 rounded bg-slate-200 text-slate-700">{s.layout}</span>
              </div>
              <p className="text-[10px] font-bold truncate leading-tight">{s.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
