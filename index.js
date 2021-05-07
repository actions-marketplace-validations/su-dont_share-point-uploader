"use strict";

const core = require("@actions/core");
const fs = require("fs");
const spsave = require("spsave").spsave;

try {
  const coreOptions = {
    siteUrl: process.env.SP_URL,
  };

  const creds = {
    username: process.env.SP_USERNAME,
    password: process.env.SP_PASSWORD,
  };

  console.log("WS: " + process.env.GITHUB_WORKSPACE);
  console.log("F: " + process.env.FILE);

  const fileOptions = {
    folder: process.env.SP_FOLDER,
    fileName: process.env.SP_FILE_NAME,
    fileContent: fs.readFileSync(
      `${process.env.GITHUB_WORKSPACE}/${process.env.FILE}`
    ),
  };

  spsave(coreOptions, creds, fileOptions).catch((error) => {
    core.setFailed(error.message);
  });
} catch (error) {
  core.setFailed(error.message);
}
