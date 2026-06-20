import assert from 'node:assert/strict';
import { answerChatQuestion } from '../src/lib/chat';

type Expectation = {
  question: string;
  includes: string[];
};

const expectations: Expectation[] = [
  { question: 'combien coute la formation vtc', includes: ['1600 € tout inclus'] },
  { question: 'prix vtc', includes: ['1600 € tout inclus'] },
  { question: 'tarif chauffeur vtc', includes: ['1600 € tout inclus'] },
  { question: 'les frais d’examen sont inclus ?', includes: ['221 €', 'inclus'] },
  { question: 'durée formation vtc', includes: ['105 heures', '100 heures', '5 heures'] },
  { question: 'où se passe la pratique vtc', includes: ['Nice'] },
];

async function main() {
  for (const expectation of expectations) {
    const result = await answerChatQuestion([{ role: 'user', content: expectation.question }]);
    const answer = result.structuredAnswer.answerText;

    for (const expectedText of expectation.includes) {
      assert.ok(
        answer.includes(expectedText),
        `Question "${expectation.question}" should include "${expectedText}". Actual answer: ${answer}`,
      );
    }
  }

  console.log(`Chat VTC tests passed (${expectations.length} questions).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
