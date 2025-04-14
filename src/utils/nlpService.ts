
// NLP service for grammar correction and sentence formation

// Simple ISL grammar correction patterns
const grammarPatterns: Record<string, string> = {
  'i go school': 'I am going to school',
  'me want food': 'I want food',
  'he not come': 'He is not coming',
  'yesterday i went market': 'Yesterday I went to the market',
  'me happy': 'I am happy',
  'you angry why': 'Why are you angry?',
  'name what': 'What is your name?',
  'help please': 'Please help me',
  'thank you': 'Thank you',
  'hello': 'Hello',
  'yes': 'Yes',
  'no': 'No',
  'stop': 'Stop',
  'attention': 'May I have your attention',
  'peace': 'Peace',
  'i love you': 'I love you'
};

// Function to correct ISL grammar
export const correctGrammar = (text: string): string => {
  // Convert to lowercase for matching
  const lowerText = text.toLowerCase().trim();
  
  // Check for exact matches in grammar patterns
  if (grammarPatterns[lowerText]) {
    return grammarPatterns[lowerText];
  }
  
  // Basic grammar rules for ISL to English
  let correctedText = lowerText;
  
  // Add missing articles
  correctedText = correctedText
    .replace(/(\s|^)(go|went)(\s|$)/, ' $2 to ')
    .replace(/(\s|^)(me|i)(\s|$)/, ' I ');
  
  // Add missing verbs
  if (correctedText.includes('i') && !correctedText.includes('am') && !correctedText.includes('is') && 
      !correctedText.includes('are') && !correctedText.includes('went') && !correctedText.includes('go')) {
    correctedText = correctedText.replace(/(\s|^)i(\s|$)/, ' I am ');
  }
  
  // Proper sentence structure
  correctedText = correctedText.trim();
  correctedText = correctedText.charAt(0).toUpperCase() + correctedText.slice(1);
  
  // Add period if missing
  if (!correctedText.endsWith('.') && !correctedText.endsWith('?') && !correctedText.endsWith('!')) {
    correctedText += '.';
  }
  
  return correctedText;
};

// Function to combine multiple gestures into meaningful sentences
export const combineGestures = (gestures: string[]): string => {
  if (gestures.length === 0) return '';
  
  // Join gestures with spaces
  const rawSentence = gestures.join(' ');
  
  // Apply grammar correction
  return correctGrammar(rawSentence);
};

// Function to detect sentiment in the text
export const detectSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['happy', 'good', 'love', 'like', 'thank', 'yes', 'please', 'peace'];
  const negativeWords = ['sad', 'bad', 'hate', 'no', 'stop', 'angry', 'not'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};
