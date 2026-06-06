import React, { useState, useEffect } from "react";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Hello world");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setPreview(parseMarkdown(markdown));
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [markdown]);

  const parseMarkdown = (text) => {
    return text
      .replace(/^###### (.+)$/gm, "<h6>$1</h6>")
      .replace(/^##### (.+)$/gm, "<h5>$1</h5>")
      .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/^\- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n{2,}/g, "</p><p>")
      .replace(/^(?!<[h|u|p|l])/gm, "")
      .trim();
  };

  return (
    <div className="app">
      <textarea
        className="textarea"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        spellCheck={false}
      />
      <div className="preview-pane">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        )}
      </div>
    </div>
  );
}

export default MarkdownEditor;