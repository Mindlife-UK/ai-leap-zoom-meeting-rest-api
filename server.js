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

  const axiosOptions = {
    baseURL: "https://zoom.us",
    method: "get",
    url: `/oauth/token?grant_type=authorization_code&code=${req.params.code}&redirect_uri=http://localhost:4200/protocols/create`,
    headers: {
      Authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: { code: req.params.code },
  };

  sendAxiosRequest(axiosOptions);
});

app.post("/users/:access_token", (req, res) => {
  console.log(req.data);
  console.log("heroku users");

  const axiosOptions = {
    baseURL: "http://api.zoom.us",
    method: "post",
    url: `/v2/users`,
    headers: {
      Authorization: `BEARER ${req.params.access_token}`,
      "content-type": "application/json",
    },
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
        },
      },
    },
  };
  sendAxiosRequest(axiosOptions);
});

sendAxiosRequest = (axiosOptions) => {
  axios
    .post(axiosOptions)
    .then((result) => {
      console.log(result);
      console.log(`Status: ${result.status}`);
      console.log("Body: ", result.data);
      res.json(result.data);
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
};

app.listen(process.env.PORT || 3000);
