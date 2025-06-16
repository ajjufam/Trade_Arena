const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const open = require("open").default;

const sendWelcomeEmail = async (to, password, role = "Admin") => {
  // Load HTML template
  const templatePath = path.join(
    __dirname,
    "../templates/welcome-email-template.html"
  );
  let html = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders
  html = html
    .replace("{{email}}", to)
    .replace("{{password}}", password)
    .replace("{{role}}", role);

  // Configure SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465, // or 587
    secure: true,
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your email password or app password
    },
  });

  // Send email
  await transporter.sendMail({
    from: `"Trade Arena" <${process.env.SMTP_USER}>`,
    to,
    subject: "🎉 Welcome to Trade Arena!",
    html,
  });
};

const sendEmailWithOutCredentials = async (to, password, role = "Admin") => {
  // Load HTML template
  const templatePath = path.join(
    __dirname,
    "../templates/welcome-email-template.html"
  );
  let html = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders
  html = html
    .replace("{{email}}", to)
    .replace("{{password}}", password)
    .replace("{{role}}", role);

  // Make sure /emails folder exists
  const emailDir = path.join(__dirname, "../emails");
  if (!fs.existsSync(emailDir)) {
    fs.mkdirSync(emailDir);
  }

  // Save HTML to file
  const filePath = path.join(emailDir, `email-preview-${Date.now()}.html`);
  fs.writeFileSync(filePath, html);

  // Auto-open in default browser
  await open(filePath);
};

module.exports = { sendWelcomeEmail, sendEmailWithOutCredentials };
