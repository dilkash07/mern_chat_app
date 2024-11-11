const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification Email</title>
    <style>
      body {
        background-color: #f4f4f4;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }
      .logo {
        font-size: 28px;
        font-weight: bold;
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
      }
      .logo span {
        color: #e90303;
      }
      .body {
        font-size: 16px;
        text-align: left;
        color: #555555;
      }
      .highlight {
        font-size: 24px;
        font-weight: bold;
        color: #e90303;
        text-align: center;
        margin: 20px 0;
      }
      .cta {
        display: inline-block;
        padding: 12px 24px;
        background-color: #ffd60a;
        color: #000000;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0;
      }
      .support {
        font-size: 14px;
        color: #888888;
        margin-top: 30px;
        text-align: center;
      }
      .footer {
        font-size: 12px;
        color: #aaaaaa;
        text-align: center;
        margin-top: 20px;
      }
      a {
        color: #e90303;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">Mansuri<span>Chat</span></div>
      <div class="body">
        <p>Dear User,</p>
        <p>
          Thank you for choosing Mansuri Chat! To complete your registration,
          please use the OTP below to verify your account:
        </p>
        <h2 class="highlight">${otp}</h2>
        <p>
          This OTP is valid for <strong>5 minutes</strong>. Please do not share
          this code with anyone, even if they claim to be from Mansuri Chat.
        </p>
        <p>
          If you did not request this verification, please ignore this email.
          Your account will remain secure.
        </p>
      </div>
      <div class="support">
        Need help? Contact us at
        <a href="mailto:info@mansurimart.com">info@mansurimart.com</a>.
      </div>
           <div class="footer">
          &copy; ${new Date().getFullYear()} Mansuri Mart. All rights reserved.
        </div>
    </div>
  </body>
</html>
`;
};

module.exports = otpTemplate;
