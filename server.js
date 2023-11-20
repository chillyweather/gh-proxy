const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Add this line
const app = express();

app.use(cors()); // Add this line
app.use(express.json());

const githubToken = process.env.FEEDBACK_TOKEN;

app.post("/issues", async (req, res) => {
  const { issueTitle, issueBody } = req.body;

  const url = `https:\/\/api.github.com/repos/tidy-dev-team/tidy-guide-feedback/issues`;
  const headers = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };
  const body = {
    title: issueTitle,
    body: issueBody,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log("response :>> ", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
