const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  const translator = new Translator();
  suite("American to British English", () => {
    test("Translate 'Mangoes are my favorite fruit.' to British English", () => {
      assert.equal(
        translator.ameToBrit("Mangoes are my favorite fruit.").translatedText,
        "Mangoes are my favourite fruit."
      );
    });

    test("Translate 'I ate yogurt for breakfast.' to British English", () => {
      assert.equal(
        translator.ameToBrit("I ate yogurt for breakfast.").translatedText,
        "I ate yoghurt for breakfast."
      );
    });

    test("Translate 'We had a party at my friend's condo.' to British English", () => {
      assert.equal(
        translator.ameToBrit("We had a party at my friend's condo.").translatedText,
        "We had a party at my friend's flat."
      );
    });

    test("Translate 'Can you toss this in the trashcan for me?' to British English", () => {
      assert.equal(
        translator.ameToBrit("Can you toss this in the trashcan for me?").translatedText,
        "Can you toss this in the bin for me?"
      );
    });

    test("Translate 'The parking lot was full.' to British English", () => {
      assert.equal(
        translator.ameToBrit("The parking lot was full.").translatedText,
        "The car park was full."
      );
    });

    test("Translate 'Like a high tech Rube Goldberg machine.' to British English", () => {
      assert.equal(
        translator.ameToBrit("Like a high tech Rube Goldberg machine.").translatedText,
        "Like a high tech Heath Robinson device."
      );
    });

    test("Translate 'To play hooky means to skip class or work.' to British English", () => {
      assert.equal(
        translator.ameToBrit("To play hooky means to skip class or work.").translatedText,
        "To bunk off means to skip class or work."
      );
    });

    test("Translate 'No Mr. Bond, I expect you to die.' to British English", () => {
      assert.equal(
        translator.ameToBrit("No Mr. Bond, I expect you to die.").translatedText,
        "No Mr Bond, I expect you to die."
      );
    });

    test("Translate 'Dr. Grosh will see you now.' to British English", () => {
      assert.equal(
        translator.ameToBrit("Dr. Grosh will see you now.").translatedText,
        "Dr Grosh will see you now."
      );
    });

    test("Translate 'Lunch is at 12:15 today.' to British English", () => {
      assert.equal(
        translator.ameToBrit("Lunch is at 12:15 today.").translatedText,
        "Lunch is at 12.15 today."
      );
    });
  });

  suite("British to American English", () => {
    test("Translate \'We watched the footie match for a while.\' to American English", () => {
      assert.equal(
        translator.britToAme("We watched the footie match for a while.").translatedText,
        "We watched the soccer match for a while."
      );
    });

    test("Translate \'Paracetamol takes up to an hour to work.\' to American English", () => {
      assert.equal(
        translator.britToAme("Paracetamol takes up to an hour to work.").translatedText,
        "Tylenol takes up to an hour to work."
      );
    });

    test("Translate \'First, caramelise the onions.\' to American English", () => {
      assert.equal(
        translator.britToAme("First, caramelise the onions.").translatedText,
        "First, caramelize the onions."
      );
    });

    test("Translate \'I spent the bank holiday at the funfair.\' to American English", () => {
      assert.equal(
        translator.britToAme("I spent the bank holiday at the funfair.").translatedText,
        "I spent the public holiday at the carnival."
      );
    });

    test("Translate \'I had a bicky then went to the chippy.\' to American English", () => {
      assert.equal(
        translator.britToAme("I had a bicky then went to the chippy.").translatedText,
        "I had a cookie then went to the fish-and-chip shop."
      );
    });

    test("Translate \'I've just got bits and bobs in my bum bag.\' to American English", () => {
      assert.equal(
        translator.britToAme("I've just got bits and bobs in my bum bag.").translatedText,
        "I've just got odds and ends in my fanny pack."
      );
    });

    test("Translate \'The car boot sale at Boxted Airfield was called off.\' to American English", () => {
      assert.equal(
        translator.britToAme("The car boot sale at Boxted Airfield was called off.").translatedText,
        "The swap meet at Boxted Airfield was called off."
      );
    });

    test("Translate \'Have you met Mrs Kalyani?\' to American English", () => {
      assert.equal(
        translator.britToAme("Have you met Mrs Kalyani?").translatedText,
        "Have you met Mrs. Kalyani?"
      );
    });

    test("Translate \'Prof Joyner of King's College, London.\' to American English", () => {
      assert.equal(
        translator.britToAme("Prof Joyner of King's College, London.").translatedText,
        "Prof. Joyner of King's College, London."
      );
    });

    test("Translate \'Tea time is usually around 4 or 4.30.\' to American English", () => {
      assert.equal(
        translator.britToAme("Tea time is usually around 4 or 4.30.").translatedText,
        "Tea time is usually around 4 or 4:30."
      );
    });
  });

  suite('Highlight translation', () => {
    test("Highlight translation in Mangoes are my favorite fruit.", () => {
      assert.equal(
        translator.translate("Mangoes are my favorite fruit.", "american-to-british"),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });

    test("Highlight translation in I ate yogurt for breakfast.", () => {
      assert.equal(
        translator.translate("I ate yogurt for breakfast.", "american-to-british"),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });
      
    test("Highlight translation in We watched the footie match for a while.", () => {
      assert.equal(
        translator.translate("We watched the footie match for a while.", "british-to-american"),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });

    test("Highlight translation in Paracetamol takes up to an hour to work.", () => {
      assert.equal(
        translator.translate("Paracetamol takes up to an hour to work.", "british-to-american"),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
  });
});
