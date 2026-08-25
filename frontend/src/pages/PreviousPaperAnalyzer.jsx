import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, Sparkles, BarChart2, PieChart, Layers, 
  CheckCircle2, ArrowRight, Clock, Award, ShieldCheck, Check
} from 'lucide-react';
import { uploadPastPaper, fetchPastPaperAnalyses } from '../api';

export default function PreviousPaperAnalyzer({ onNavigate, onSelectFormatForPaper }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await fetchPastPaperAnalyses();
      setAnalyses(data);
      if (data.length > 0) setActiveAnalysis(data[0]);
    } catch (err) {
      console.error('Failed to load past paper analyses:', err);
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
      const res = await uploadPastPaper(formData);
      setActiveAnalysis(res);
      await loadHistory();
      alert(`Past paper analyzed! Extracted ${res.extracted_concepts?.length || 0} core concepts and generated matching blueprint.`);
    } catch (err) {
      alert(`Analysis failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Past Examination Paper Analyzer</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload previous examination papers to analyze concept coverage, question types, and generate aligned new blueprints without repeating questions.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md text-xs cursor-pointer transition">
          <Upload className="w-4 h-4" />
          {uploading ? 'Analyzing Blueprint...' : 'Upload Past Exam Paper (PDF/DOCX)'}
          <input
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : activeAnalysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analysis Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    Blueprint Analysis
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">{activeAnalysis.filename}</h3>
                  <p className="text-xs text-slate-500">
                    Detected Total Marks: {activeAnalysis.detected_total_marks}M • Estimated Duration: {activeAnalysis.detected_duration_minutes} Mins
                  </p>
                </div>
              </div>

              {/* Extracted Core Concepts */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Frequently Assessed Concepts & Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {activeAnalysis.extracted_concepts?.map((concept, cIdx) => (
                    <span key={cIdx} className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                      🎯 {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Question Type Distribution */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Question Type Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(activeAnalysis.question_type_distribution || {}).map(([type, count]) => (
                    <div key={type} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                      <span className="font-bold text-slate-700">{type}</span>
                      <span className="font-extrabold text-indigo-600 font-mono">{count} Qs</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Estimation */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Estimated Cognitive Difficulty Ratio</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="block text-[10px] font-bold text-emerald-700 uppercase">Easy</span>
                    <span className="text-lg font-black text-emerald-900">{activeAnalysis.difficulty_estimation?.Easy || 30}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="block text-[10px] font-bold text-amber-700 uppercase">Medium</span>
                    <span className="text-lg font-black text-amber-900">{activeAnalysis.difficulty_estimation?.Medium || 50}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="block text-[10px] font-bold text-rose-700 uppercase">Hard</span>
                    <span className="text-lg font-black text-rose-900">{activeAnalysis.difficulty_estimation?.Hard || 20}%</span>
                  </div>
                </div>
              </div>

              {/* Suggested Generated Blueprint */}
              {activeAnalysis.suggested_format && (
                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <span className="font-extrabold text-sm text-indigo-950">
                        Generated Matching Blueprint Format ({activeAnalysis.suggested_format.total_marks} Marks)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-indigo-800 leading-relaxed">
                    Generate a fresh examination paper that preserves the cognitive structure, sections, and concept weightage of this past year exam while generating brand new textbook-grounded questions.
                  </p>

                  <button
                    onClick={() => {
                      onSelectFormatForPaper(activeAnalysis.suggested_format.id);
                      onNavigate('generate');
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" /> Generate Fresh Paper Matching this Blueprint &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Past Analyses Sidebar History */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Analysis History</h4>
              <div className="space-y-2">
                {analyses.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveAnalysis(item)}
                    className={`w-full p-3 rounded-xl border text-left transition text-xs font-medium space-y-1 block ${
                      activeAnalysis.id === item.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold line-clamp-1">{item.filename}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.detected_total_marks}M • {item.extracted_concepts?.length} Concepts
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No past year examination papers uploaded</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Upload your previous exam question papers (PDF or DOCX) to extract weightage and generate equivalent grounded tests.
          </p>
        </div>
      )}
    </div>
  );
}
