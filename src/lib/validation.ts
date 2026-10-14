/**
 * Security & Input Sanitization Suite
 * Enforces strict input validation, anti-bot protection, and sanitization
 * across all public intake forms and application drawers.
 */

// Basic text sanitizer preventing script/tag injection
export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "") // Strip brackets
    .replace(/javascript:/gi, "") // Neutralize pseudo-protocol
    .trim();
}

// Strict email regex matching valid standard domain patterns
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeText(email);
  if (!sanitized) {
    return { isValid: false, error: "Email address is required." };
  }
  if (!EMAIL_REGEX.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid email address (e.g., name@example.com)." };
  }
  if (sanitized.length > 254) {
    return { isValid: false, error: "Email address exceeds maximum length." };
  }
  return { isValid: true };
}

// Standard phone verification: allows +country code, checks 10-15 digits
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  if (!cleaned) {
    return { isValid: false, error: "Phone or WhatsApp number is required." };
  }
  // Digits count check
  const digitsOnly = cleaned.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Phone number must have at least 10 digits." };
  }
  if (digitsOnly.length > 15) {
    return { isValid: false, error: "Phone number exceeds international format length." };
  }
  return { isValid: true };
}

// Name verification: 2-80 characters
export function validateFullName(name: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeText(name);
  if (!sanitized) {
    return { isValid: false, error: "Full name is required." };
  }
  if (sanitized.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters long." };
  }
  if (sanitized.length > 80) {
    return { isValid: false, error: "Name must not exceed 80 characters." };
  }
  return { isValid: true };
}

// Message verification: max 1000 characters
export function validateMessage(message: string): { isValid: boolean; sanitized: string; error?: string } {
  const sanitized = sanitizeText(message);
  if (sanitized.length > 1000) {
    return {
      isValid: false,
      sanitized: sanitized.slice(0, 1000),
      error: "Message must not exceed 1000 characters.",
    };
  }
  return { isValid: true, sanitized };
}
