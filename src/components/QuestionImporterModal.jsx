import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Check, 
  AlertCircle, 
  Download, 
  Plus, 
  Trash2, 
  BookOpen, 
  HelpCircle,
  FileCode
} from 'lucide-react';
import { parseQuestionsFromText, parseQuestionsFromDocx } from '../services/questionParser';

export default function QuestionImporterModal({ 
  isOpen, 
  onClose, 
  questions, 
  onAddQuestions, 
  onDeleteQuestion, 
  onResetToDefaults 
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste' | 'manual' | 'list'
  const [pasteText, setPasteText] = useState('');
  const [targetSection, setTargetSection] = useState('Scriptural Knowledge');
  const [isParsing, setIsParsing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Manual Question State
  const [manualType, setManualType] = useState('objective');
  const [manualPrompt, setManualPrompt] = useState('');
  const [manualSection, setManualSection] = useState('AFC Heritage & History');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [manualAns, setManualAns] = useState('A');
  const [manualRef, setManualRef] = useState('');
  const [manualPoints, setManualPoints] = useState(20);

  if (!isOpen) return null;

  // Handle File Upload (.docx or .txt)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setStatusMsg({ type: 'info', text: `Reading file: ${file.name}...` });

    try {
      let parsed = [];
      if (file.name.endsWith('.docx')) {
        parsed = await parseQuestionsFromDocx(file, targetSection);
      } else {
        const text = await file.text();
        parsed = parseQuestionsFromText(text, targetSection);
      }

      if (parsed.length === 0) {
        setStatusMsg({ type: 'error', text: 'No questions could be identified. Please ensure questions follow the formatting guidelines.' });
      } else {
        onAddQuestions(parsed);
        setStatusMsg({ type: 'success', text: `Successfully imported ${parsed.length} questions from ${file.name}!` });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Failed to parse file: ' + err.message });
    } finally {
      setIsParsing(false);
    }
  };

  // Handle Raw Text Parse
  const handleParseText = () => {
    if (!pasteText.trim()) return;
    setIsParsing(true);
    try {
      const parsed = parseQuestionsFromText(pasteText, targetSection);
      if (parsed.length === 0) {
        setStatusMsg({ type: 'error', text: 'Could not detect any valid questions in the pasted text.' });
      } else {
        onAddQuestions(parsed);
        setStatusMsg({ type: 'success', text: `Successfully imported ${parsed.length} questions!` });
        setPasteText('');
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setIsParsing(false);
    }
  };

  // Handle Add Manual Question
  const handleAddManual = (e) => {
    e.preventDefault();
    if (!manualPrompt.trim()) return;

    const newQ = {
      id: `manual-${Date.now()}`,
      section: manualSection,
      category: manualType.toUpperCase(),
      type: manualType,
      prompt: manualPrompt.trim(),
      options: manualType === 'objective' ? { A: optA, B: optB, C: optC, D: optD } : null,
      answer: manualAns.trim(),
      scriptureRef: manualRef.trim() || 'Scripture Reference',
      explanation: 'Added manually by Quizmaster',
      points: Number(manualPoints) || 20,
      bonusPoints: Math.round((Number(manualPoints) || 20) / 2),
      timeLimit: manualType === 'theory' ? 60 : (manualType === 'german' ? 20 : 30),
    };

    onAddQuestions([newQ]);
    setStatusMsg({ type: 'success', text: 'Question added successfully!' });
    setManualPrompt('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setManualRef('');
  };

  // Download Sample Questions Template
  const downloadSampleTemplate = () => {
    const templateText = `SECTION: AFC Heritage & History

1. In what year was the Apostolic Faith Church founded in Portland, Oregon following the Azusa Street revival?
A. 1906
B. 1914
C. 1920
D. 1901
Answer: A
Scripture: Acts 2:1-4
Explanation: Founded in 1906 by Florence Crawford.

2. Who was the pioneering leader who spearheaded the "Africa for Christ" crusades across Nigeria?
A. Rev. Timothy G. Oshokoya (Brother T)
B. Rev. Paul Akazue
C. Rev. Josiah Soyinka
D. Rev. Emmanuel Adebayo
Answer: A
Scripture: Mark 16:15

SECTION: German Speed Round

GERMAN: Who was the oldest man in the Bible, and how old was he?
Answer: Methuselah, 969 years old
Scripture: Genesis 5:27

SECTION: Theory & Recital

THEORY: Recite the Apostolic Faith Church motto from John 8:12 verbatim.
Answer: "Then spake Jesus again unto them, saying, I am the light of the world..."
Scripture: John 8:12
`;
    const blob = new Blob([templateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AFC_Bible_Giant_Questions_Template.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-afc-navy border-2 border-afc-gold/50 rounded-2xl shadow-gold-glow-lg flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-afc-navy-surface border-b border-afc-gold/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-afc-gold/20 text-afc-gold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-afc-gold-light">
                Question Ingestion & Tournament Bank
              </h3>
              <p className="text-xs text-gray-300">
                Total Loaded Questions: <strong className="text-afc-gold">{questions.length}</strong> (Objective, German & Theory)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-afc-gold/20 bg-afc-navy-surface/50 px-6 pt-2">
          {[
            { id: 'upload', label: 'Import Word (.docx) / File', icon: Upload },
            { id: 'paste', label: 'Copy & Paste Text', icon: FileText },
            { id: 'manual', label: 'Create Question Manually', icon: Plus },
            { id: 'list', label: `Manage Questions (${questions.length})`, icon: FileCode },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setStatusMsg(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-afc-gold text-afc-gold-light bg-afc-navy/50'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`mx-6 mt-4 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
            statusMsg.type === 'success' ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40' :
            statusMsg.type === 'error' ? 'bg-rose-950/40 text-rose-300 border border-rose-500/40' :
            'bg-blue-950/40 text-blue-300 border border-blue-500/40'
          }`}>
            {statusMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: WORD DOCX UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-afc-gold/40 rounded-xl p-8 text-center hover:border-afc-gold hover:bg-afc-gold/5 transition-all">
                <Upload className="w-12 h-12 text-afc-gold mx-auto mb-3 animate-bounce-gentle" />
                <h4 className="text-base font-bold text-gray-100 mb-1">
                  Upload Word Document (.docx) or Text file (.txt)
                </h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto mb-4">
                  Easily import hundreds of questions from your committee's Microsoft Word or Google Docs files.
                </p>

                <div className="flex justify-center items-center gap-4">
                  <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-afc-gold text-afc-navy font-bold text-xs hover:brightness-110 shadow-gold-glow">
                    <span>{isParsing ? 'Extracting Questions...' : 'Select .docx / .txt File'}</span>
                    <input 
                      type="file" 
                      accept=".docx,.txt" 
                      className="hidden" 
                      onChange={handleFileUpload} 
                      disabled={isParsing} 
                    />
                  </label>

                  <button
                    onClick={downloadSampleTemplate}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-afc-gold/40 text-afc-gold text-xs font-semibold hover:bg-afc-gold/10"
                  >
                    <Download className="w-3.5 h-3.5" /> Sample Format Template
                  </button>
                </div>
              </div>

              <div className="bg-afc-navy-surface p-4 rounded-xl border border-afc-gold/20 text-xs space-y-2">
                <h5 className="font-bold text-afc-gold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Formatting Guidelines:
                </h5>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-[11px]">
                  <li>Number each question (e.g. <code>1. What is...?</code>)</li>
                  <li>Provide options <code>A.</code>, <code>B.</code>, <code>C.</code>, <code>D.</code> on separate lines.</li>
                  <li>Include an <code>Answer: B</code> line below each question.</li>
                  <li>For rapid recall questions without options, prefix with <code>GERMAN:</code></li>
                  <li>For recitation or doctrinal questions, prefix with <code>THEORY:</code></li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: COPY & PASTE TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-300">
                  Paste Question Text:
                </label>
                <button
                  onClick={downloadSampleTemplate}
                  className="text-xs text-afc-gold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download Example Template
                </button>
              </div>

              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={`1. What is the official motto of The Apostolic Faith Church?
A. Jesus, The Light of the World
B. Faith of our Fathers
C. Holiness unto the Lord
D. Africa for Christ
Answer: A
Scripture: John 8:12

GERMAN: Who was the pioneering overseer of the Apostolic Faith Church in Africa?
Answer: Rev. Timothy G. Oshokoya (Brother T)`}
                rows={10}
                className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-xl p-3 text-xs text-gray-100 font-mono focus:outline-none focus:border-afc-gold"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setPasteText('')}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white"
                >
                  Clear
                </button>
                <button
                  onClick={handleParseText}
                  disabled={!pasteText.trim() || isParsing}
                  className="px-6 py-2 rounded-xl bg-afc-gold text-afc-navy font-bold text-xs hover:brightness-110 shadow-gold-glow disabled:opacity-50"
                >
                  {isParsing ? 'Parsing...' : 'Parse & Import Questions'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CREATE MANUALLY */}
          {activeTab === 'manual' && (
            <form onSubmit={handleAddManual} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Question Type:</label>
                  <select
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value)}
                    className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                  >
                    <option value="objective">Objective (Multiple Choice A-D)</option>
                    <option value="german">German Question (Direct Recall / No Options)</option>
                    <option value="theory">Theory / Recital (Judges Rubric)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Section / Round:</label>
                  <input
                    type="text"
                    value={manualSection}
                    onChange={(e) => setManualSection(e.target.value)}
                    placeholder="e.g. AFC Heritage & History"
                    className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Points Value:</label>
                  <input
                    type="number"
                    value={manualPoints}
                    onChange={(e) => setManualPoints(e.target.value)}
                    className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Question Prompt:</label>
                <textarea
                  rows={3}
                  required
                  value={manualPrompt}
                  onChange={(e) => setManualPrompt(e.target.value)}
                  placeholder="Enter the full question prompt..."
                  className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2.5 text-gray-100"
                />
              </div>

              {manualType === 'objective' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-afc-navy-surface/60 p-4 rounded-xl border border-afc-gold/20">
                  <div>
                    <label className="text-afc-gold font-bold">Option A:</label>
                    <input
                      type="text"
                      required
                      value={optA}
                      onChange={(e) => setOptA(e.target.value)}
                      className="w-full bg-afc-navy border border-gray-700 rounded p-1.5 mt-1 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-afc-gold font-bold">Option B:</label>
                    <input
                      type="text"
                      required
                      value={optB}
                      onChange={(e) => setOptB(e.target.value)}
                      className="w-full bg-afc-navy border border-gray-700 rounded p-1.5 mt-1 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-afc-gold font-bold">Option C:</label>
                    <input
                      type="text"
                      value={optC}
                      onChange={(e) => setOptC(e.target.value)}
                      className="w-full bg-afc-navy border border-gray-700 rounded p-1.5 mt-1 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-afc-gold font-bold">Option D:</label>
                    <input
                      type="text"
                      value={optD}
                      onChange={(e) => setOptD(e.target.value)}
                      className="w-full bg-afc-navy border border-gray-700 rounded p-1.5 mt-1 text-gray-100"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">
                    {manualType === 'objective' ? 'Correct Option Letter:' : 'Correct Answer / Rubric:'}
                  </label>
                  {manualType === 'objective' ? (
                    <select
                      value={manualAns}
                      onChange={(e) => setManualAns(e.target.value)}
                      className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      value={manualAns}
                      onChange={(e) => setManualAns(e.target.value)}
                      placeholder="e.g. Methuselah, 969 years old"
                      className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Scripture / Church Reference:</label>
                  <input
                    type="text"
                    value={manualRef}
                    onChange={(e) => setManualRef(e.target.value)}
                    placeholder="e.g. Genesis 5:27"
                    className="w-full bg-afc-navy-surface border border-afc-gold/30 rounded-lg p-2 text-gray-100"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-afc-gold text-afc-navy font-bold text-xs hover:brightness-110 shadow-gold-glow"
                >
                  Save to Tournament Bank
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: LIST & MANAGE QUESTIONS */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  Reviewing all {questions.length} active questions in current tournament session.
                </p>
                <button
                  onClick={onResetToDefaults}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Reset to Pre-loaded Official AFC Bank
                </button>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {questions.map((q, idx) => (
                  <div 
                    key={q.id || idx}
                    className="p-3.5 rounded-xl bg-afc-navy-surface border border-afc-gold/20 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-afc-gold text-xs">#{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-afc-navy border border-afc-gold/40 text-afc-gold-light">
                          {q.type}
                        </span>
                        <span className="text-[11px] text-gray-400">{q.section}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-gray-100">{q.prompt}</h5>
                      
                      {q.options && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-gray-300 pt-1">
                          {Object.entries(q.options).map(([k, v]) => (
                            <span key={k} className={k === q.answer ? 'text-emerald-400 font-bold' : ''}>
                              <strong>{k}:</strong> {v}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-[11px] text-gray-400 pt-1 flex items-center gap-3">
                        <span className="text-afc-gold-light">Ans: <strong>{q.answer}</strong></span>
                        <span>•</span>
                        <span>Ref: {q.scriptureRef}</span>
                        <span>•</span>
                        <span>Points: {q.points} (Bonus: {q.bonusPoints})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteQuestion(idx)}
                      title="Delete Question"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-afc-navy-surface border-t border-afc-gold/20 flex justify-between items-center text-xs">
          <span className="text-gray-400">
            Apostolic Faith Church Ekiti Area • Question Bank Engine
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-afc-gold text-afc-navy font-bold hover:brightness-110"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
