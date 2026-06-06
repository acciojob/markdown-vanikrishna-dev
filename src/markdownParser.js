// CommonJS-friendly markdown parser used by the app and test scripts.
function parseMarkdown(text) {
  if (!text) return "";

  const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Split on any common newline sequence to be robust across environments
  const lines = text.split(/\r\n|\r|\n/);
  const out = [];
  let inList = false;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      continue;
    }

    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      const level = hMatch[1].length;
  const content = escapeHtml(hMatch[2]);
  out.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    const liMatch = line.match(/^\-\s+(.*)$/);
    if (liMatch) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
  out.push(`<li>${escapeHtml(liMatch[1])}</li>`);
      continue;
    }

    out.push(`<p>${escapeHtml(line)}</p>`);
  }

  if (inList) out.push("</ul>");

  let html = out.join("\n");

  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  return html;
}

module.exports = { parseMarkdown };
module.exports.default = { parseMarkdown };

