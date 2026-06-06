import React, { useState, useEffect } from "react";
import parser from "./markdownParser";

function MarkdownEditor() {
  // Start with empty input so tests that type content behave deterministically
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setPreview(parser.parseMarkdown(markdown));
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [markdown]);

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