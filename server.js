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
      redirect_uri: "http://localhost:4200/protocols/create",
    },
    headers: {
      Authorization:
        "Basic RWRSN3JXUklSd0dkUXlxaG9YUGcydzpqN09SUUo2dHlIc2gyM215Y2hDMkFPcmRLb3RZcTN2Mw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  sendAxiosRequest(axiosOptions, res);
});

app.post("/users/:access_token", (req, res) => {
  console.log("heroku users");
  const axiosOptions = {
    baseURL: "http://api.zoom.us/v2",
    method: "post",
    url: `/users`,
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
  sendAxiosRequest(axiosOptions, res);
});

app.post("/meetings/:access_token", (req, res) => {
  console.log("heroku meetings");
  const axiosOptions = {
    baseURL: "http://api.zoom.us/v2",
    method: "post",
    // url: `/users/${req.params.userId}/meetings`,
    url: `/users/FEbl_2N5RAqg_qNCxIk8IQ/meetings`,
    headers: {
      Authorization: `BEARER ${req.params.access_token}`,
      "content-type": "application/json",
    },
    data: {
      agenda: "My AiLeap Meeting",
      duration: 30,
      settings: {
        allow_multiple_devices: false,
        alternative_hosts: "numerized@gmail.com",
        alternative_hosts_email_notification: true,
        approval_type: 2,
        audio: "voip",
        calendar_type: 1,
        private_meeting: false,
        contact_email: "numerized@gmail.com",
        contact_name: "Kévin Perrée",
        email_notification: true,
        encryption_type: "enhanced_encryption",
        focus_mode: false,
        host_video: true,
        jbh_time: 10,
        join_before_host: true,
        meeting_authentication: false,
        mute_upon_entry: false,
        participant_video: false,
        show_share_button: false,
        use_pmi: false,
        waiting_room: false,
        watermark: false,
        host_save_video_order: true,
        alternative_host_update_polls: true,
      },
      // start_time: Date.now(),
      topic: "My Meeting Topic",
    },
  };
  sendAxiosRequest(axiosOptions, res);
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
