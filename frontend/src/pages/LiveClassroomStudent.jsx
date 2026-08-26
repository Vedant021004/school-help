import React, { useState, useEffect } from 'react';
import {
  Flame, CheckCircle2, AlertCircle, ArrowRight, User, Hash,
  Award, RefreshCw, Send, ShieldCheck, Zap, Sparkles, BookOpen,
  Check, Trophy, Layers
} from 'lucide-react';
import {
  copilotGetActiveLiveSessions, copilotGetLiveSession,
  copilotSubmitLiveAnswer
} from '../api';

export default function LiveClassroomStudent({ onNavigate }) {
  const [activeRooms, setActiveRooms] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [studentName, setStudentName] = useState('Student');
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadActiveRooms();
  }, []);

  const loadActiveRooms = async () => {
    try {
      setLoadingRooms(true);
      const rooms = await copilotGetActiveLiveSessions();
      setActiveRooms(rooms || []);
      if (rooms && rooms.length > 0) {
        setRoomCode(rooms[0].room_code);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleQuickJoin = async (targetRoom) => {
    setError('');
    try {
      setLoading(true);
      const s = await copilotGetLiveSession(targetRoom.room_code);
      setSession(s);
      setRoomCode(targetRoom.room_code);
    } catch (err) {
      setError('Live room not found or currently closed.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualJoin = async (e) => {
    if (e) e.preventDefault();
    if (!roomCode.trim()) {
      setError('Please enter a room code or select an active quiz below');
      return;
    }
    setError('');
    try {
      setLoading(true);
      const s = await copilotGetLiveSession(roomCode.trim().toUpperCase());
      setSession(s);
    } catch (err) {
      setError('Live room not found or closed. Please select one of the active quizzes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionNum, optionValue) => {
    setAnswers({
      ...answers,
      [String(questionNum)]: optionValue,
    });
  };

  const handleSubmit = async () => {
    if (!session) return;
    try {
      setLoading(true);
      const res = await copilotSubmitLiveAnswer({
        room_code: session.room_code,
        student_name: studentName.trim() || 'Student',
        answers: answers,
      });
      setSubmissionResult(res);
    } catch (err) {
      setError('Failed to submit responses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!session ? (
        /* Join Room Screen - NO PASSWORD REQUIRED */
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 rounded-3xl p-6 lg:p-8 text-white shadow-xl text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
              <Flame className="w-7 h-7 text-amber-200" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Live Classroom Quiz (No Password Required)
            </h1>
            <p className="text-xs text-orange-100 max-w-md mx-auto">
              Join your teacher's live classroom quiz instantly. Select any active quiz or enter your room code below.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          {/* Student Profile & Quick Join Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Student Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Active Live Quizzes Discovery */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> Active Classroom Quizzes
                  </span>
                  <button
                    onClick={loadActiveRooms}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingRooms ? 'animate-spin' : ''}`} /> Refresh
                  </button>
                </div>

                {loadingRooms ? (
                  <div className="p-8 text-center text-xs text-slate-400">Loading active quizzes...</div>
                ) : activeRooms.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeRooms.map((rm) => (
                      <div
                        key={rm.room_code}
                        className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition flex items-center justify-between gap-4"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-mono font-black text-[11px]">
                              {rm.room_code}
                            </span>
                            <span className="text-xs font-black text-slate-900">{rm.worksheet_title}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            {rm.chapter_name} • {rm.questions?.length || 0} Questions • By {rm.teacher_name}
                          </p>
                        </div>

                        <button
                          onClick={() => handleQuickJoin(rm)}
                          disabled={loading}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-black shadow-md shadow-orange-200 shrink-0 flex items-center gap-1.5 transition"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>1-Click Join</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                    No teacher quiz active right now. Start one in Teacher Copilot or enter code below.
                  </div>
                )}
              </div>

              {/* Manual Room Code Join */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Or Join by Specific Room Code (No Password Required)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. NCERT-101"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    onClick={handleManualJoin}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !submissionResult ? (
        /* Active Live Quiz Canvas */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-6 animate-in fade-in">
          {/* Quiz Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black text-[10px] uppercase border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Assessment Active
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{session.room_code}</span>
              </div>
              <h2 className="text-lg lg:text-xl font-black text-slate-900 pt-1">{session.worksheet_title}</h2>
              <p className="text-xs text-slate-500 font-medium">Chapter: {session.chapter_name}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Candidate</span>
              <b className="text-xs text-slate-900">{studentName || 'Student'}</b>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-6">
            {(session.questions || []).map((q, idx) => {
              const qNum = String(q.question_number || idx + 1);
              const selectedOpt = answers[qNum];
              return (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      Question {idx + 1} [{q.marks || 1} Mark]
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {q.question_text}
                  </p>

                  {/* Options */}
                  {q.options && q.options.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const optLetter = opt.charAt(0);
                        const isChosen = selectedOpt === optLetter || selectedOpt === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(qNum, optLetter)}
                            className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                              isChosen
                                ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm ring-1 ring-amber-400'
                                : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isChosen && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <textarea
                      placeholder="Type your response here..."
                      value={selectedOpt || ''}
                      onChange={(e) => handleSelectOption(qNum, e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Answered {Object.keys(answers).length} of {session.questions?.length || 0} Questions
            </span>

            <button
              onClick={handleSubmit}
              disabled={loading || Object.keys(answers).length === 0}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs shadow-lg shadow-orange-200 flex items-center gap-2 disabled:opacity-50 transition"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Submit My Live Answers</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results & Score Card */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Quiz Completed!</h2>
            <p className="text-xs text-slate-500 font-medium">Great work, {studentName}!</p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Total Score</span>
              <span className="text-2xl font-black text-indigo-700">
                {submissionResult.score} / {submissionResult.total_marks}
              </span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-600">
                {submissionResult.accuracy_percentage}%
              </span>
            </div>
          </div>

          {/* Action to take another quiz */}
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmissionResult(null);
                setSession(null);
                setAnswers({});
                loadActiveRooms();
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              Take Another Live Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
