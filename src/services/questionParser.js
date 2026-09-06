import mammoth from 'mammoth';

/**
 * Parses raw text into structured question objects.
 * Supports:
 * - Multiple choice (Objective)
 * - German questions (Rapid recall, no options)
 * - Theory / recitation questions
 */
export function parseQuestionsFromText(rawText, defaultSection = 'General') {
  if (!rawText || !rawText.trim()) return [];

  const normalized = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Split into question blocks by double newlines or numbered patterns (e.g. 1., 2., Q1:)
  const lines = normalized.split('\n');
  const blocks = [];
  let currentBlock = [];

  const isQuestionStart = (line) => {
    const trimmed = line.trim();
    return /^(?:Q(?:uestion)?\s*\d+[:.]|\d+[\.\)]|(?:GERMAN|THEORY|OBJECTIVE)\s*(?:Q(?:uestion)?|\d+)?[:.])/i.test(trimmed);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isQuestionStart(line) && currentBlock.length > 0) {
      blocks.push(currentBlock.join('\n'));
      currentBlock = [line];
    } else {
      currentBlock.push(line);
    }
  }
  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n'));
  }

  const parsedQuestions = [];

  blocks.forEach((blockText, idx) => {
    const trimmedBlock = blockText.trim();
    if (!trimmedBlock) return;

    const blockLines = trimmedBlock.split('\n').map(l => l.trim()).filter(Boolean);
    if (blockLines.length === 0) return;

    let questionPrompt = '';
    let questionType = 'objective';
    let options = {};
    let answer = '';
    let scriptureRef = '';
    let explanation = '';
    let points = 20;
    let bonusPoints = 10;
    let section = defaultSection;

    // Detect section or type from header
    const firstLine = blockLines[0];
    if (/german/i.test(firstLine)) {
      questionType = 'german';
    } else if (/theory/i.test(firstLine)) {
      questionType = 'theory';
    }

    // Clean question prompt from leading numbering (e.g. "1. ", "Q1: ")
    questionPrompt = firstLine.replace(/^(?:Q(?:uestion)?\s*\d+[:.]|\d+[\.\)]|(?:GERMAN|THEORY|OBJECTIVE)\s*(?:Q(?:uestion)?|\d+)?[:.]\s*)/i, '').trim();

    for (let j = 1; j < blockLines.length; j++) {
      const line = blockLines[j];

      // Detect Options (A., B., C., D. or A), B), etc.)
      const optMatch = line.match(/^([A-Da-d])[\.\)]\s*(.+)$/);
      if (optMatch && questionType === 'objective') {
        const key = optMatch[1].toUpperCase();
        options[key] = optMatch[2].trim();
        continue;
      }

      // Detect Answer line
      const ansMatch = line.match(/^(?:Answer|Ans|Key)[:.]?\s*(.+)$/i);
      if (ansMatch) {
        answer = ansMatch[1].trim();
        // If objective and answer contains single letter like "B" or "(B)"
        if (questionType === 'objective') {
          const letterMatch = answer.match(/^([A-Da-d])/);
          if (letterMatch) {
            answer = letterMatch[1].toUpperCase();
          }
        }
        continue;
      }

      // Detect Scripture Reference
      const refMatch = line.match(/^(?:Scripture|Ref|Bible|Reference)[:.]?\s*(.+)$/i);
      if (refMatch) {
        scriptureRef = refMatch[1].trim();
        continue;
      }

      // Detect Section / Category
      const secMatch = line.match(/^(?:Section|Category)[:.]?\s*(.+)$/i);
      if (secMatch) {
        section = secMatch[1].trim();
        continue;
      }

      // Detect Explanation / Rubric
      const expMatch = line.match(/^(?:Explanation|Rubric|Criteria)[:.]?\s*(.+)$/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
        continue;
      }

      // If line is continuation of prompt (before any options or answers)
      if (Object.keys(options).length === 0 && !answer && !scriptureRef) {
        questionPrompt += ' ' + line;
      }
    }

    // If options were detected, it's definitely objective
    if (Object.keys(options).length >= 2) {
      questionType = 'objective';
    } else if (questionType === 'objective' && Object.keys(options).length === 0) {
      // If no options found, categorize as german or theory
      if (/recite|explain|describe|rubric/i.test(questionPrompt)) {
        questionType = 'theory';
      } else {
        questionType = 'german';
      }
    }

    if (questionType === 'german') {
      points = 25;
      bonusPoints = 15;
    } else if (questionType === 'theory') {
      points = 30;
      bonusPoints = 15;
    }

    if (questionPrompt) {
      parsedQuestions.push({
        id: `import-${Date.now()}-${idx + 1}`,
        section: section || defaultSection,
        category: questionType.toUpperCase(),
        type: questionType,
        prompt: questionPrompt,
        options: questionType === 'objective' ? options : null,
        answer: answer || (questionType === 'objective' ? 'A' : 'Direct Recall'),
        scriptureRef: scriptureRef || 'Scripture Heritage',
        explanation: explanation || 'Apostolic Faith Church Bible Quiz',
        points: points,
        bonusPoints: bonusPoints,
        timeLimit: questionType === 'theory' ? 60 : (questionType === 'german' ? 20 : 30),
      });
    }
  });

  return parsedQuestions;
}

/**
 * Extracts text from a Word (.docx) file and parses questions.
 * @param {File} file
 * @returns {Promise<Array>} Array of parsed questions
 */
export async function parseQuestionsFromDocx(file, defaultSection = 'Word Import') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const rawText = result.value;
        const questions = parseQuestionsFromText(rawText, defaultSection);
        resolve(questions);
      } catch (err) {
        reject(new Error('Failed to parse Word (.docx) file: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
}
