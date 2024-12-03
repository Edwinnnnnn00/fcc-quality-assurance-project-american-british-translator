const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST /api/translate", () => {
    test("Translation with text and locale fields", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "Mangoes are my favorite fruit.");
          assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });

      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "We watched the footie match for a while.",
          locale: "british-to-american",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "We watched the footie match for a while.");
          assert.equal(res.body.translation, 'We watched the <span class="highlight">soccer</span> match for a while.');
          done();
        });
    });

    test("Translation with text and invalid locale field", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "invalid",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value for locale field");
          done();
        });
    });

    test("Translation with missing text field", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with missing locale field", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with empty text", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "No text to translate");
          done();
        });
    });

    test("Translation with text that needs no translation", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/translate")
        .send({
          text: "Mangoes are my favourite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
    });
  });
});
