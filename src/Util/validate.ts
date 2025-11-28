type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validateRequiredFields = (
  body: any,
  fields: string[]
): ValidationResult => {
  for (const field of fields) {
    const value = body[field];

    // Missing field
    if (value === undefined || value === null) {
      return {
        isValid: false,
        message: `${field} is required`,
      };
    }

    // Empty string
    if (typeof value === "string" && !value.trim()) {
      return {
        isValid: false,
        message: `${field} cannot be empty`,
      };
    }

    // Empty array
    if (Array.isArray(value) && value.length === 0) {
      return {
        isValid: false,
        message: `${field} cannot be an empty array`,
      };
    }
  }

  return { isValid: true };
};
