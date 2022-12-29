const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes

app.use(cors({ origin: "*" }));

app.get("/oauth", (req, res, next) => {

  console.log( 'heroku oauth')
  const httpOptions2 = {
    headers: {
      Authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);

  axios
    .post(
      "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
        params.code +
        "&redirect_uri=http://localhost:4200/protocols/create",
      {},
      httpOptions2
    )
    .then(res => {
      console.log(`Status: ${res.status}`)
      console.log('Body: ', res.data)
    })
    .catch(err => {
      console.error(err)
    })
});

app.listen(process.env.PORT || 3000);
