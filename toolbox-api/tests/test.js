const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("API Endpoint /files/data", () => {
  it("Debe responder exitosamente con los datos correctos", (done) => {
    chai
      .request(app)
      .get("/files/data")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);

        for (const item of res.body) {
          expect(item).to.have.property("file");
          expect(item).to.have.property("text");
          expect(item).to.have.property("number");
          expect(item).to.have.property("hex");
        }

        done();
      });
  });
});
