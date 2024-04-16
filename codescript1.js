function getEmotionalStatus() {
  // Get the input text from the textarea
  var inputText = document.getElementById('textarea input').value;

  // Perform sentiment analysis
  var sentimentAnalysis = analyzeSentiment(inputText);

  // Display the results (accessing specific properties)
  document.getElementById('textarea output').value = 
    "Sentiment Analysis Results:\n" +
    "Positive words: " + sentimentAnalysis.sentiment_counts["positive"] + "\n" +
    "Negative words: " + sentimentAnalysis.sentiment_counts["negative"] + "\n" +
    "Neutral words: " + sentimentAnalysis.sentiment_counts["neutral"] + "\n" +
    "Depression words: " + sentimentAnalysis.sentiment_counts["depression"] + "\n" +
    "Stress words: " + sentimentAnalysis.sentiment_counts["stress"] + "\n" ;
}

// Function to analyze sentiment of the input text
function analyzeSentiment(text) {
  // Split the input text into words
  var words = text.toLowerCase().split(/\s+/);

  // Define emotional words for different emotions
  var emotionalWords = {
    "positive": ["happy", "joyful", "good", "great", "excited", "helpful", "amazing", "self-confident", "caring", "go-getter", "youthful", "confident", 
                  "unique", "aroma", "fresh", "assertive", "relaxed", "fit", "sweet", "energetic"],
    "negative": ["sad", "angry", "frustrated", "terrible", "awful", "lazy", "stupid", 
                  "arrogant", "strange", "stench", "naive", "obsessed", "fearful", "pushy", "skinny", "mushy", "hyperactive"],
    "neutral": ["fine", "alright", "okay", "home", "house", "prison", "smell", "music", "muscular", "wealthy", "failing", "dog",
                 "cold", "disagreement", "uninterested", "friend", "area", "pleased"],
    "depression": ["sad", "hopeless", "gloomy", "worthless", "despair", "bad", "helpless", "aching", "lost", "worthless",
                   "depressing", "useless", "stupid", "stuck", "untethered", "adrift", "hurting", "alone", "afraid",
                   "unsure", "insecure", "despair", "black and blue", "drowning", "pain"],
    "stress": ["anxious", "tense", "burdened", "frantic", "chaos", "turmoil", "pressure", "exhaustion", "burnout",
               "overwhelm", "tension", "apprehension", "frustration", "flustered", "rush", "urgent", "struggled","stress"]
  };

  // Count occurrences of emotional words in the input text
  var counts = {
    "positive": 0,
    "negative": 0,
    "neutral": 0,
    "depression": 0,
    "stress": 0
  };
  Object.keys(emotionalWords).forEach(function(emotion) {
    emotionalWords[emotion].forEach(function(word) {
      counts[emotion] += words.filter(function(w) { return w === word; }).length;
    });
  });

  // Return both sentiment counts and severity
  return {sentiment_counts: counts};
}
