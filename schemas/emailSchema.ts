import { z } from "zod";
import { EMAIL_ERRORS } from "../constants/emailErrors";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email(EMAIL_ERRORS.invalidFormat)
  .refine((email) => email.endsWith("@gmail.com"), {
    message: EMAIL_ERRORS.mustBeGmail,
  })
  .refine((email) => {
    const namePart = email.split("@")[0];
    return namePart.length > 3;
  }, { message: EMAIL_ERRORS.shortName });
