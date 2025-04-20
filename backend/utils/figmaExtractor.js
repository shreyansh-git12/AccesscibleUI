export const extractDesignData = (figmaData) => {
  const results = [];

  const traverse = (node) => {
    if (!node) return;

    // 1. Description (if component set level)
    if (node.description) {
      results.push({ type: "description", value: node.description });
    }

    // 2. Background Color
    if (node.backgroundColor) {
      results.push({ type: "backgroundColor", value: node.backgroundColor });
    }

    // 3. Fills
    if (node.fills) {
      node.fills.forEach((fill) => {
        results.push({
          type: "fill",
          blendMode: fill.blendMode,
          color: fill.color || null,
          opacity: fill.opacity || null,
        });
      });
    }

    // 4. Strokes
    if (node.strokes) {
      node.strokes.forEach((stroke) => {
        results.push({
          type: "stroke",
          blendMode: stroke.blendMode,
          color: stroke.color || null,
          typeStroke: stroke.type,
        });
      });
    }

    // 5. Style (Font, Size, Alignment)
    if (node.style) {
      results.push({
        type: "style",
        fontFamily: node.style.fontFamily,
        fontSize: node.style.fontSize,
        fontWeight: node.style.fontWeight,
        textAlignHorizontal: node.style.textAlignHorizontal,
        textAlignVertical: node.style.textAlignVertical,
      });
    }

    // 6. Absolute Bounding Box
    if (node.absoluteBoundingBox) {
      results.push({
        type: "absoluteBoundingBox",
        dimensions: node.absoluteBoundingBox,
      });
    }

    // 7. Effects
    if (node.effects && Array.isArray(node.effects)) {
      node.effects.forEach((effect) => {
        results.push({
          type: "effect",
          effectType: effect.type,
          visible: effect.visible,
          radius: effect.radius || null,
        });
      });
    }

    // Recursively handle child nodes
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(figmaData.document);
  return results;
};
