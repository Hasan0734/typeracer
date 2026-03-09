
/** Word pools categorized by difficulty */

const easyWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
    "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
    "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know",
    "take", "people", "into", "year", "your", "good", "some", "could",
    "them", "see", "other", "than", "then", "now", "look", "only", "come",
    "its", "over", "think", "also", "back", "after", "use", "two", "how",
    "our", "work", "first", "well", "way", "even", "new", "want", "day",
    "find", "give", "more", "hand", "high", "long", "big", "small", "home",
];

const mediumWords = [
    "about", "after", "again", "air", "also", "animal", "another", "answer",
    "around", "because", "before", "began", "between", "book", "change",
    "children", "city", "close", "country", "different", "earth", "enough",
    "every", "example", "family", "follow", "found", "great", "group",
    "house", "important", "keep", "large", "learn", "letter", "light",
    "might", "mountain", "never", "number", "often", "paper", "picture",
    "place", "plant", "point", "problem", "question", "quite", "really",
    "river", "school", "sentence", "should", "something", "sometimes",
    "start", "story", "study", "thought", "together", "under", "until",
    "water", "while", "without", "world", "write", "young", "develop",
    "position", "consider", "complete", "special", "difficult", "increase",
    "remember", "continue", "experience", "possible", "understand",
    "determine", "establish", "condition", "knowledge", "performance",
];

const hardWords = [
    "acknowledge", "administration", "approximately", "characteristic",
    "communication", "comprehensive", "concentration", "consciousness",
    "consequently", "consideration", "contemporary", "controversial",
    "determination", "discrimination", "electromagnetic", "entertainment",
    "environmental", "extraordinary", "fundamentally", "identification",
    "implementation", "infrastructure", "interpretation", "investigation",
    "manufacturing", "Mediterranean", "miscellaneous", "organizational",
    "pharmaceutical", "philosophical", "predominantly", "psychological",
    "recommendation", "rehabilitation", "representative", "responsibility",
    "simultaneously", "sophisticated", "transformation", "unprecedented",
    "vulnerability", "administration", "circumstance", "collaboration",
    "configuration", "demonstration", "differentiate", "entrepreneurial",
    "functionality", "globalization", "hospitalization", "individualism",
    "justification", "knowledgeable", "legitimately", "mathematician",
];


export type Difficulty = "easy" | "medium" | "hard";


export function generateParagraph(wordCount: number = 50, difficulty: Difficulty = "medium"): string {

    const pool = difficulty === "easy" ? easyWords : difficulty === "hard" ? hardWords : mediumWords;
    const words: string[] = [];

    for (let i = 0; i < wordCount; i++) {
        words.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    
    return words.join(" ")

}