const { parseMarkdown } = require('./src/MarkdownEditor');

const input = '# Hello world';
console.log(parseMarkdown(input));
