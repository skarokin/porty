const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "is", "are", "was", 
    "were", "be", "been", "being", "in", "on", "at", "to", 
    "for", "with", "by", "like", "that", "this"
]);

// note commandValue is the thing we are matching on
export function customFilter(commandValue: string, search: string, commandKeywords?: string[]): number {  
    let position: number | undefined = undefined;
    let actualValue = commandValue;

    // if starts with pos, then remove it and extract the positional encoding
    if (commandValue.startsWith("pos=")) {
        position = parseInt(commandValue[4], 10);
        actualValue = commandValue.substring(5);    // split at 5 not 4 to skip the '-' character
    }

    return fullTextSearch(actualValue, search, commandKeywords, position)
}

// FTS implementation with character-level typo tolerance
function fullTextSearch(document: string, query: string, keywords?: string[], position?: number): number {
    // empty query? early exit (return 1)
    if (!query || !query.trim()) return 1;

    // normalize to lowercase
    const documentText = document.toLowerCase();
    const queryText = query.toLowerCase();
    
    // if keywords provided, append to document text
    const fullDocument = keywords && keywords.length > 0 
        ? `${documentText} ${keywords.join(" ").toLowerCase()}`
        : documentText;

    // tokenize query and doc text
    const queryTokens = tokenize(queryText);
    const docTokens = tokenize(fullDocument);
    
    // if query is empty after tokenization (eg. all stop words) just return all results
    if (queryTokens.length === 0) return 1;
    
    const uniqueDocTokens = new Set(docTokens);

    let exactMatchScore = 0;
    let prefixMatchScore = 0;
    let substringMatchScore = 0;
    let typoMatchScore = 0;
    
    // 1. score individual term matches
    for (const token of queryTokens) {
        // max score for exact matches
        if (uniqueDocTokens.has(token)) {
            exactMatchScore += 5.0 * Math.min(1, token.length / 4); // higher score for longer tokens
        }
        
        // high score for prefix matches
        for (const docToken of uniqueDocTokens) {
            if (docToken !== token && docToken.startsWith(token)) {
                prefixMatchScore += 3.0;
            }
        }
        
        // decent score for substring matches
        for (const docToken of uniqueDocTokens) {
            if (docToken !== token && !docToken.startsWith(token) && docToken.includes(token)) {
                substringMatchScore += 2.0;
            }
        }
        
        // small score for typo matches (levenshtein distance <= 2 only; if more typos skip)
        for (const docToken of uniqueDocTokens) {
            if (docToken !== token && 
                !docToken.includes(token) && 
                !docToken.startsWith(token) &&
                levenshteinDistance(token, docToken) <= 2)
            {
                typoMatchScore += 2.5;
            }
        }
    }

    // 2. position preservation factor
    const positionPreservation = position !== undefined ? (1 - (position * 0.0001)) : 0;

    const totalScore = 
        (exactMatchScore * 0.30) + 
        (prefixMatchScore * 0.15) + 
        (substringMatchScore * 0.10) +
        (typoMatchScore * 0.05) +
        (positionPreservation * 0.01);  // very small weight when scores are nearly equal

    // this is most important for the case of positional encoding: the encoding forces every token
    // with positional encoding to have > 0 score, so we need to make sure that score is not too high.
    // this protects from too many false positives too as well, significantly better than default fuzzy search implementation.
    if (totalScore < 0.2) return 0.0;
    
    // normalized to 0-1
    return Math.min(1, totalScore / Math.max(1, queryTokens.length * 2));
}

// for typo tolerance
function levenshteinDistance(a: string, b: string): number {
    // skip strings that are too long
    if (a.length > 16 || b.length > 16) {
        return 100; // Return a large number
    }
    
    const matrix: number[][] = [];
    
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    
    for (let i = 0; i <= a.length; i++) {
        matrix[0][i] = i;
    }
    
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) === a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i-1][j-1] + 1, // substitution
                    matrix[i][j-1] + 1,   // insertion
                    matrix[i-1][j] + 1    // deletion
                );
            }
        }
    }
    
    return matrix[b.length][a.length];
}

function tokenize(text: string): string[] {
    return text
        .replace(/[^\w\s]/g, " ")  
        .replace(/\s+/g, " ")      
        .trim()
        .split(" ")
        .filter(token => token.length > 0 && !STOP_WORDS.has(token));
}