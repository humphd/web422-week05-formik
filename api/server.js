const express = require("express");
// See https://www.npmjs.com/package/celebrate
const { celebrate, Joi, Segments, errors } = require("celebrate");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post(
  "/signup",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  celebrate({
    // See https://joi.dev/ for Joi API docs
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      gitHubUsername: Joi.string().alphanum().min(5).max(15).required(),
      blogUrl: Joi.string().uri(),
    }),
  }),
  function (req, res) {
    const { name, email, gitHubUsername, blogUrl } = req.body;
    console.log("Signup Success!", name, email, gitHubUsername, blogUrl);
    res.status(201).end();
  }
);

app.use(errors());

app.listen(process.env.PORT || 8000);
