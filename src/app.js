const express = require("express");
const async = require("hbs/lib/async");
const app = express();
const path = require("path");
const port = 8000;
const staticPath = path.join(__dirname, "../public");
require("./db/conn");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const RegistrationLogin = require("./model/registration-login");

app.use(express.static(staticPath));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("Registration");
});
app.get("/Login", (req, res) => {
  res.render("Login");
});

app.post("/Registration", async (req, res) => {
  try {
    const name = req.body.Name;
    const email = req.body.Email;
    const password = req.body.Password;

    const registerUser = new RegistrationLogin({
      name: name,
      email: email,
      password: password,
    });
    const registered = await registerUser.save();
    res.status(201).render("Registration", {
      warning: "Account created successfully.",
    });
  } catch (error) {
    res.status(400).render("Registration", {
      warning: "Invalid details. Please try again",
    });
  }
});

app.post("/Login", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    const userEmail = await RegistrationLogin.findOne({ email: email });
    if (userEmail.password === password) {
      res.status(201).render("Login", {
        warning: "Logged in successfully.",
      });
    } else {
      res.status(400).render("Login", {
        warning: "Invalid login details. Please try again",
      });
    }
  } catch (error) {
    res.status(400).render("Login", {
      warning: "Invalid login details. Please try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
