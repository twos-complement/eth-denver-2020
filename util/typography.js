export const renderTextAsParagraphs = function renderTextAsParagraphs(text, Component = `p`, props = {}) {
  const paragraphs = (text || "").split("\n");
  
  return paragraphs.map((paragraph, index) =>
    !!paragraph.length ? <Component {...props} key={index}>{paragraph}</Component> : <br key={index} />
  );
};