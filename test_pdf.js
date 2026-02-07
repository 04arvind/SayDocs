// Test script for PDF export functionality
import { downloadAsPDF } from './src/utils/downloadUtils.js';

// Test cases for different languages
const testCases = [
  { language: 'en-US', text: 'Hello World' },
  { language: 'es-ES', text: 'Hola Mundo' },
  { language: 'fr-FR', text: 'Bonjour le monde' },
  { language: 'de-DE', text: 'Hallo Welt' },
  { language: 'pt-PT', text: 'Olá Mundo' }
];

console.log('Testing PDF export functionality...\n');

testCases.forEach(({ language, text }) => {
  console.log(`Testing ${language}: "${text}"`);
  try {
    downloadAsPDF(text, language);
    console.log(`✓ ${language} test passed\n`);
  } catch (error) {
    console.log(`✗ ${language} test failed: ${error.message}\n`);
  }
});

console.log('Test completed.');
