const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes

app.use(cors({ origin: "*" }));

console.log("heroku start");

app.get("/oauth/:code", (req, res, next) => {
  console.log("heroku oauth");

  const axiosOptions = {
    baseURL: "https://zoom.us",
    method: "post",
    url: `/oauth/token`,
    params: {
      grant_type: "authorization_code",
      code: req.params.code,
      redirect_uri: "https://89cb-2a02-8429-3583-7001-8435-6b68-6bd9-f3aa.eu.ngrok.io/protocols/create",
    },
    headers: {
      Authorization:
        "Basic X0tiZlNjd21UajI1Sk05TEJhZEdJZzpMc013VjFPdzBkUW5LNENObUlIallSSFp6ajNFcXZTaw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  sendAxiosRequest(axiosOptions, res);
});

app.get("/token/:access_token", (req, res) => {
  console.log("heroku token 2");
  const axiosOptions = {
    baseURL: "https://api.zoom.us/v2",
    method: "get",
    url: `/users/me/token`,
    headers: {
      Authorization: `Bearer ${req.params.access_token}`,
      "content-type": "application/json",
    },
    data: {
      ttl: 7776000,
      type: "zak",
    },
  };
  sendAxiosRequest(axiosOptions, res);
});

app.post("/users/:access_token", (req, res) => {
  console.log("heroku users");
  const axiosOptions = {
    baseURL: "https://api.zoom.us/v2",
    method: "post",
    url: `/users`,
    headers: {
      Authorization: `Bearer ${req.params.access_token}`,
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
  sendAxiosRequest(axiosOptions, res);
});

app.post("/meetings/:access_token", (req, res) => {
  console.log("heroku meetings");
  console.log(req.params.access_token);
  const axiosOptions = {
    baseURL: "https://api.zoom.us/v2",
    method: "post",
    // url: `/users/${req.params.userId}/meetings`,
    url: `/users/me/meetings`,
    headers: {
      Authorization: `Bearer ${req.params.access_token}`,
      "content-type": "application/json",
    },
    data: {
      // agenda: "My AiLeap Meeting",
      // duration: 30,
      // default_password: false,
      // timezone: "Europe/Paris",
      // type: 2,
      // password: "123456abcde",
      // // settings: {
      // //   allow_multiple_devices: false,
      // //   approval_type: 2,
      // //   audio: "voip",
      // //   private_meeting: true,
      // //   email_notification: false,
      // //   focus_mode: false,
      // //   host_video: true,
      // //   jbh_time: 10,
      // //   join_before_host: true,
      // //   meeting_authentication: false,
      // //   mute_upon_entry: false,
      // //   participant_video: false,
      // //   show_share_button: false,
      // //   use_pmi: false,
      // //   waiting_room: true,
      // //   watermark: false,
      // //   host_save_video_order: false,
      // //   alternative_host_update_polls: true,
      // // },
      // start_time: "2023-01-25T07:32:55Z",
      // topic: "My Meeting Topic",
      topic: "Corona testing 2",
      duration: 60,
      settings: {
        mute_upon_entry: true,
        join_before_host: true,
      },
      password: "test-123",
    },
  };
  // sendAxiosRequest(axiosOptions, res);
  axios
    .post("https://api.zoom.us/v2/users/me/meetings", axiosOptions.data, {
      headers: axiosOptions.headers,
    })
    .then((result) => {
      console.log(result);
      res.json(result.data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const sendAxiosRequest = (axiosOptions, res) => {
  axios
    .request(axiosOptions)
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

app.listen(process.env.PORT || 3000);
