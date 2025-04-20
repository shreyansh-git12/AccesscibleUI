export function calculateAccessibilityScore(figmaData) {
  if (!figmaData || !figmaData.document) return 0;

  const traverseNodes = (node) => {
    let score = 0;

    if (node.description) score += 10;
    if (node.backgroundColor) score += 5;

    if (node.style) {
      if (node.style.fontFamily) score += 3;
      if (node.style.fontSize) score += 2;
    }

    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect) => {
        // Add score for effects
        if (effect.type === "DROP_SHADOW") score += 4;
      });
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((childNode) => {
        score += traverseNodes(childNode); //
      });
    }

    return score;
  };

  return traverseNodes(figmaData.document);
}
