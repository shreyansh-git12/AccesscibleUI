export const enhanceAccessibility = (figmaData) => {
  const modified = {
    ...figmaData,
    accessibilityNotes: [],
  };

  modified.accessibilityNotes.push(
    "Consider increasing contrast for all text."
  );
  modified.accessibilityNotes.push(
    "ARIA labels needed for interactive elements."
  );
  modified.accessibilityNotes.push("Auto alt text generation pending.");

  return modified;
};
