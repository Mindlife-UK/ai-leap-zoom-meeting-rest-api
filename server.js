const express = require("express");
// const helmet = require("helmet");
const cors = require("cors");
// const compression = require("compression");
const axios = require("axios");

require("dotenv").config();

const app = express();

// app.use(helmet());
// app.use(compression()); //Compress all routes

app.use(cors({ origin: "*" }));

console.log("heroku start");

app.get("/oauth/:code", (req, res, next) => {
  console.log(req);
  console.log("heroku oauth");

  const httpOptions2 = {
    headers: {
      Authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  axios
    .post(
      "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
        req.params.code +
        "&redirect_uri=http://localhost:4200/protocols/create",
      { code: req.params.code },
      httpOptions2
    )
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
      res.json(res.data);
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
});

app.listen(process.env.PORT || 3000);
