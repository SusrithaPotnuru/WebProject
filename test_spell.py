import re

WORDS = {
    "hello", "world", "test", "spell", "check", "the", "be", "to", "of", "and", "a",
    "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you",
    "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
    "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make",
    "can", "like", "time", "no", "just", "him", "know", "take", "people", "into",
    "year", "your", "good", "some", "could", "them", "see", "other", "than", "then",
    "now", "look", "only", "come", "its", "over", "think", "also", "back", "after",
    "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want",
    "because", "any", "these", "give", "day", "most", "us", "python", "flask", "are",
    "working", "correctly", "but", "words", "is", "am", "are", "was", "were", "has",
    "had", "spelling", "mistake", "sentence", "some", "wrong"
}

def get_suggestions(word):
    suggestions = []
    for w in WORDS:
        if w.startswith(word[0]) and abs(len(w) - len(word)) <= 2:
            if w not in suggestions:
                suggestions.append(w)
        if len(suggestions) >= 5:
            break
    return suggestions

# Test
test_text = "Hello world! I hav a speling mistak."
words = re.findall(r'\b\w+\b', test_text.lower())

correct = []
errors = []

for word in words:
    if word in WORDS:
        correct.append(word)
    else:
        suggestions = get_suggestions(word)
        errors.append({"word": word, "suggestions": suggestions})

print(f"Text: {test_text}")
print(f"Words: {words}")
print(f"Correct: {correct}")
print(f"Errors: {errors}")
print(f"Is 'hav' in dictionary? {'hav' in WORDS}")
print(f"Is 'have' in dictionary? {'have' in WORDS}")
print(f"Suggestions for 'hav': {get_suggestions('hav')}")