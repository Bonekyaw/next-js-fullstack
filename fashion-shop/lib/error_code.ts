export const ErrorCodes = {
  ACCOUNT_FROZEN: {
    code: "ACCOUNT_FROZEN",
    message:
      "This account has been frozen. Please contact support for assistance.",
  },
  ADMIN_ACCOUNT: {
    code: "ADMIN_ACCOUNT",
    message: "This is an admin account.",
  },
  EMAIL_ALREADY_EXISTS: {
    code: "EMAIL_ALREADY_EXISTS",
    message: "An account with this email already exists.",
  },
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "The provided credentials are invalid.",
  },
  USER_NOT_FOUND: { code: "USER_NOT_FOUND", message: "User not found." },
  INVALID_OTP: { code: "INVALID_OTP", message: "The provided OTP is invalid." },
  OTP_EXPIRED: {
    code: "OTP_EXPIRED",
    message: "The provided OTP has expired.",
  },
  OTP_ALREADY_USED: {
    code: "OTP_ALREADY_USED",
    message: "The provided OTP has already been used.",
  },
  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_NOT_VERIFIED",
    message: "The email address is not verified.",
  },
  PASSWORD_RESET_REQUIRED: {
    code: "PASSWORD_RESET_REQUIRED",
    message: "A password reset is required.",
  },
};
