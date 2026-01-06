// Update checkSpelling function to call your Flask API
async function checkSpelling() {
    const textInput = document.getElementById('textInput').value;
    
    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput })
        });
        
        const data = await response.json();
        
        // Update statistics
        document.getElementById('correctCount').textContent = data.correct.length;
        document.getElementById('wrongCount').textContent = data.wrong.length;
        
        // Display correct words
        const correctWordsContainer = document.getElementById('correctWords');
        correctWordsContainer.innerHTML = '';
        data.correct.forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word-tag correct-word';
            wordElement.textContent = word;
            correctWordsContainer.appendChild(wordElement);
        });
        
        // Display wrong words
        const wrongWordsContainer = document.getElementById('wrongWords');
        wrongWordsContainer.innerHTML = '';
        data.wrong.forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word-tag wrong-word';
            wordElement.textContent = word;
            wrongWordsContainer.appendChild(wordElement);
        });
        
        // Display suggestions
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';
        
        if (data.wrong.length === 0) {
            const noErrors = document.createElement('div');
            noErrors.className = 'suggestion-item';
            noErrors.innerHTML = '<p style="color: #28a745; font-weight: bold;">✅ Great job! No spelling errors found!</p>';
            suggestionsContainer.appendChild(noErrors);
        } else {
            data.wrong.forEach(word => {
                const suggestions = data.suggestions[word] || [];
                if (suggestions.length > 0) {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    
                    const wordHeader = document.createElement('div');
                    wordHeader.className = 'word-header';
                    
                    const misspelledWord = document.createElement('span');
                    misspelledWord.className = 'misspelled-word';
                    misspelledWord.textContent = word;
                    
                    const didYouMean = document.createElement('span');
                    didYouMean.className = 'did-you-mean';
                    didYouMean.textContent = 'Did you mean:';
                    
                    wordHeader.appendChild(misspelledWord);
                    wordHeader.appendChild(didYouMean);
                    
                    const suggestionsList = document.createElement('div');
                    suggestionsList.className = 'suggestions-list';
                    
                    suggestions.forEach(suggestion => {
                        const suggestionTag = document.createElement('span');
                        suggestionTag.className = 'suggestion-tag';
                        suggestionTag.textContent = suggestion;
                        suggestionTag.onclick = () => {
                            // Replace word in textarea
                            const textarea = document.getElementById('textInput');
                            const regex = new RegExp(`\\b${word}\\b`, 'gi');
                            textarea.value = textarea.value.replace(regex, suggestion);
                            checkSpelling(); // Re-check
                        };
                        suggestionsList.appendChild(suggestionTag);
                    });
                    
                    suggestionItem.appendChild(wordHeader);
                    suggestionItem.appendChild(suggestionsList);
                    suggestionsContainer.appendChild(suggestionItem);
                }
            });
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error checking spelling. Please try again.');
    }
}

// Initialize on page load
window.onload = checkSpelling;

// Add event listener to the button
document.getElementById('checkButton').addEventListener('click', checkSpelling);