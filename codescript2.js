function getEmotionalStatus() {
    // Get the input text from the textarea
    var inputText = document.getElementById('textarea input').value;
  
    // Perform sentiment analysis and emotional word counting
    var sentimentAnalysis = analyzeSentiment(inputText);
  
    // Display the results
    document.getElementById('textarea output').value = 
      "Sentiment Analysis Results:\n" +
      "Positive words: " + sentimentAnalysis.sentiment_counts["positive"] + "\n" +
      "Negative words: " + sentimentAnalysis.sentiment_counts["negative"] + "\n" +
      "Neutral words: " + sentimentAnalysis.sentiment_counts["neutral"] + "\n" +
      "Depression words: " + sentimentAnalysis.sentiment_counts["depression"] + "\n" +
      "Stress words: " + sentimentAnalysis.sentiment_counts["stress"] + "\n" +
      "Suicidal words: " + sentimentAnalysis.sentiment_counts["suicidal"] + "\n" +
      "Murder words: " + sentimentAnalysis.sentiment_counts["murder"] + "\n" +
      "Severity: " + sentimentAnalysis.severity + "\n";
  }
  
  // Function to analyze sentiment of the input text and count emotional words
function analyzeSentiment(text)  {
    // Split the input text into words
    var words = text.toLowerCase().split(/\s+|\./);
    // Define emotional words for different emotions
    var emotionalWords = {
      "positive": ["happy", "joyful", "good", "great", "excited", "helpful", "amazing", "self-confident", "caring", "go-getter", "youthful", "confident", 
                    "unique", "aroma", "fresh", "assertive", "relaxed", "fit", "sweet", "energetic","optimistic", "enthusiastic", "grateful", "peaceful", "hopeful",
                    "compassionate", "vibrant", "resilient", "inspired", "mindful", "creative", "authentic", "dreamer", "achiever", "adaptable", "courageous", "resourceful",
                    "kind", "harmonious", "uplifting", "blissful", "flourishing", "determined", "empowered", "inventive", "articulate", "charismatic", "hilarious", "charitable", "generous", "patient", "understanding", "thoughtful", "visionary", "tenacious"],
      "negative": ["sad", "angry", "frustrated", "terrible", "awful", "lazy", "stupid", 
                    "arrogant", "strange", "stench", "naive", "obsessed", "fearful", "pushy", "skinny", "mushy", "hyperactive",
                    "gloomy", "disappointed", "irritated", "dreadful", "wretched", "unmotivated", "clueless", "conceited", "peculiar", "unpleasant", "gullible", "fixated", "anxious", "intrusive", "bony", "soggy", "restless"],
      "neutral": ["fine", "alright", "okay", "home", "house", "prison", "smell", "music", "muscular", "wealthy", "failing", "dog",
                   "cold", "disagreement", "uninterested", "friend", "area", "pleased","satisfactory", "adequate", "acceptable", "residence", "dwelling", "institution", "odor", "melody", "well-built", "affluent", "struggling", "canine", "chilly", "dispute",
                    "indifferent", "companion", "location", "content", "tolerable", "mediocre", "average", "passable", "accommodation", "habitation", "fragrance", "tune", "toned", "opulent", "challenging", "pup", "cool", "debate", "neutral", "associate", "setting", "satisfied", "balanced", "moderate", "functional", "neutral", "unbiased", "objective"],
      "depression": ["sad", "hopeless", "worthless", "despair", "bad", "helpless", "aching", "lost","depressing", "useless", "stupid", "stuck", "untethered", "adrift", "hurting", "alone", "afraid",
                  "unsure", "insecure", "despair", "black and blue", "drowning", "pain", "dejected", "downcast","saddened", "unhappy", "miserable", "morose", "despondent", "melancholy", "gloomy", "dismal",
                  "heartbroken", "heartsick", "devastated", "distraught", "low", "disheartened", "despairing", "drowning in sorrow", "hurting deeply", "desolate", "forlorn", "wretched",
                  "defeated", "abandoned", "isolated", "languishing", "sorrowful", "pessimistic", "broken","anguished", "disconsolate", "inconsolable", "regretful", "bereft", "heavy-hearted", "weary",
                  "dreary", "tortured", "desperate","bleak", "desolate", "disconsolate", "downtrodden", "dismayed", "dejected", "dispirited", "lamenting", "mournful", "sullen", "teary", "tearful", "sorrowing", "wistful", "bereaved", "crestfallen", "weeping", "doleful", "melancholic", "regretful"],
      "stress": ["tense", "burdened", "frantic", "chaos", "turmoil", "pressure", "exhaustion", "burnout","overwhelm", "tension", "apprehension", "frustration", "flustered", "rush", "urgent", "struggled",
                  "agitated", "worried", "overworked", "nervous", "frazzled", "hectic", "drained", "frenzied","anxious", "panicked", "rushed", "strained", "overburdened", "jittery", "overwhelmed", "tense",
                  "apprehensive", "frustrated", "flustered", "urgent"],
      "suicidal": ["suicide", "suicidal", "self-harm", "self-destructive", "desperate", "hopeless", "isolated", "overwhelmed",
                   "despairing", "inconsolable", "broken", "abandoned", "guilt-ridden", "anguished", "tormented", "desolate",
                   "dark", "lost", "trapped", "haunted", "emotionally drained", "suffocated","quitting my life"],
      "murder": ["murder", "kill", "homicide", "manslaughter", "suicide", "crime", "assassination", "slaying", "bloodshed",
                 "carnage", "butchery", "agony", "misery", "massacre", "execution", "infanticide", "infliction", "annihilation",
                 "demise", "euthanasia", "liquidation", "perpetration", "violence", "homicide", "fatality", "death", "fatal",
                 "lifeless", "corpse", "stabbing", "strangling", "poisoning", "dismemberment", "gunshot", "chokehold", "bludgeon",
                 "assault", "hanging", "suffocation", "deadly", "cold-blooded", "vendetta", "revenge", "criminal", "victim",
                 "perpetrator", "forensics", "investigation", "evidence", "detective", "sleuth", "interrogation", "witness",
                 "alibi", "cover-up", "crime scene", "autopsy", "inquest", "conviction", "sentence", "jail", "prison",
                 "penalty", "guilt", "innocence", "motive", "weapon", "bloody", "gory", "chilling", "macabre", "sinister",
                 "grim", "forensic pathologist", "psychopath", "serial killer", "cold case", "covered up", "whodunit",
                  "noir", "criminal minds"]
    };
  
  
    // Count occurrences of emotional words in the input text
    var counts = {
      "positive": 0,
      "negative": 0,
      "neutral": 0,
      "depression": 0,
      "stress": 0,
      "suicidal": 0,
      "murder": 0
    };
  
    Object.keys(emotionalWords).forEach(function(emotion) {
      emotionalWords[emotion].forEach(function(word) {
        counts[emotion] += words.filter(function(w) { return w === word; }).length;
      });
    });
    // Check for the presence of suicidal words or murder words
    for (var i = 0; i < words.length; i++) {
      if (emotionalWords["suicidal"].includes(words[i]) || emotionalWords["murder"].includes(words[i])) {
         alert("Severity: More severe - Recommended for counseling" );
         window.location.reload();
      }
    }
      // Calculate severity based on the counts
      var sentiment_diff = counts['positive'] - counts['negative'] - counts['depression'] - counts['stress'] - counts['suicidal'] - counts['murder'];
      console.log(sentiment_diff)
      var severity = "";
      
        if (sentiment_diff < -20) {
          severity = "More severe - Recommended for counseling";
        } else if (sentiment_diff < 0) {
          severity = "Medium severity - Advised for meditation";
        } else {
          severity = "Less severe - You are fine";
        }
    
      // Return both sentiment counts and severity
    return {sentiment_counts: counts, severity: severity};
}
  