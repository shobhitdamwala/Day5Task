const GOOGLE_RECAPTCHA_VERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";

export const verifyRecaptchaToken = async (token, remoteIp) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY on the server");
  }

  const params = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    params.append("remoteip", remoteIp);
  }

  const response = await fetch(GOOGLE_RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to verify reCAPTCHA with Google");
  }

  return response.json();
};
