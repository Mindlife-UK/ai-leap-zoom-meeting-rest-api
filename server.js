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
  // console.log(req);
  console.log("heroku oauth");

  const httpOptions = {
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
      httpOptions
    )
    .then((result) => {
      // console.log(`Status: ${result.status}`);
      // console.log("Body: ", result.data);
      res.json(result.data);
    })
    .catch((err) => {
      // console.error(err);
      throw new Error(err);
    });
});

app.post("/users/:access_token", (req, res) => {
  console.log(req.data);
  console.log("heroku users");

  const options = {
    baseURL: "http://api.zoom.us",
    method: "post",
    url: `/v2/users`,
    headers: {
      Authorization: `BEARER ${req.params.access_token}`,
      "content-type": "application/json",
    },
    // params: {
    //   access_token: req.params.access_token
    // },
    data: {
      action: "create",
      user_info: {
        email: "kevin@help.org.uk",
        first_name: "Jill",
        last_name: "Chill",
        password: "if42!LfH@",
        type: 1,
        feature: {
          zoom_phone: false,
          // zoom_one_type: 16,
        },
        // plan_united_type: "1",
      },
    }
  }; 

  axios
    .request(options)
    .then((result) => {
      console.log(result)
      console.log(`Status: ${result.status}`);
      console.log("Body: ", result.data);
      res.json(result.data);
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
});

app.listen(process.env.PORT || 3000);
