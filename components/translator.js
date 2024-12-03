const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// Create reversed dictionary
const britishToAmericanSpelling = Object.fromEntries(
  Object.entries(americanToBritishSpelling).map(([key, value]) => [value, key])
);
const britishToAmericanTitles = Object.fromEntries(
  Object.entries(americanToBritishTitles).map(([key, value]) => [value, key])
);

// Combine dictionaries
const ameToBritDict = {
  ...americanOnly,
  ...americanToBritishSpelling,
};
const britToAmeDict = {
  ...britishOnly,
  ...britishToAmericanSpelling,
};

// Sort dictionary keys by length in descending order for phrase matching
const sortedAmeToBritKeys = Object.keys(ameToBritDict).sort(
  (a, b) => b.length - a.length
);
const sortedBritToAmeKeys = Object.keys(britToAmeDict).sort(
  (a, b) => b.length - a.length
);
const sortedAmetoBritTitlesKeys = Object.keys(americanToBritishTitles).sort(
  (a, b) => b.length - a.length
);
const sortedBritToAmeTitlesKeys = Object.keys(britishToAmericanTitles).sort(
  (a, b) => b.length - a.length
);

class Translator {
  translate(text, locale) {
    let translatedText = "";
    let highlight = [];

    if (locale === "american-to-british") {
      ({ translatedText, highlight } = this.ameToBrit(text));
    } else if (locale === "british-to-american") {
      ({ translatedText, highlight } = this.britToAme(text));
    }

    if (highlight.length === 0) {
      return "Everything looks good to me!";
    }

    highlight.forEach((word) => {
      translatedText = translatedText.replace(
        word,
        `<span class="highlight">${word}</span>`
      );
    });

    return translatedText;
  }

  ameToBrit(text) {
    let translatedText = text;
    let highlight = [];

    sortedAmeToBritKeys.forEach((americanWord) => {
      const regex = new RegExp(`(^|\\b)${americanWord}(\\b|$)`, "gi");
      translatedText = translatedText.replace(
        regex,
        (match, before, punctuation, after) => {
          let newWord = ameToBritDict[americanWord] + (punctuation || "");
          highlight.push(newWord);
          return newWord;
        }
      );
    });

    sortedAmetoBritTitlesKeys.forEach((americanTitle) => {
      const regex = new RegExp(`${americanTitle}`, "gi");
      translatedText = translatedText.replace(regex, (match) => {
        let newWord = americanToBritishTitles[americanTitle];
        highlight.push(newWord);
        return newWord;
      });
    });

    const timeRegex = /(\d{1,2}:\d{2})(?:\s(AM|PM))?/gi;
    translatedText = translatedText.replace(timeRegex, (match, p1, p2) => {
      let updatedTime = p1.replace(":", ".");
      if (p2) {
        updatedTime += " " + p2;
      }
      highlight.push(updatedTime);
      return updatedTime;
    });

    translatedText =
      translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

    return { translatedText, highlight };
  }

  britToAme(text) {
    let translatedText = text;
    let highlight = [];

    sortedBritToAmeKeys.forEach((britishWord) => {
      const regex = new RegExp(`(^|\\b)${britishWord}(\\b|$)`, "gi");
      translatedText = translatedText.replace(
        regex,
        (match, before, punctuation, after) => {
          let newWord = britToAmeDict[britishWord] + (punctuation || "");
          highlight.push(newWord);
          return newWord;
        }
      );
    });

    sortedBritToAmeTitlesKeys.forEach((britishTitle) => {
      const regex = new RegExp(`(^|\\b)${britishTitle}(\\b|$)`, "gi");
      translatedText = translatedText.replace(regex, (match) => {
        let newWord = britishToAmericanTitles[britishTitle];
        highlight.push(newWord);
        return newWord;
      });
    });

    const timeRegex = /(\d{1,2}.\d{2})(?:\s(AM|PM))?/gi;
    translatedText = translatedText.replace(timeRegex, (match, p1, p2) => {
      let updatedTime = p1.replace(".", ":");
      if (p2) {
        updatedTime += " " + p2;
      }
      highlight.push(updatedTime);
      return updatedTime;
    });

    translatedText =
      translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

    return { translatedText, highlight };
  }
}

module.exports = Translator;
