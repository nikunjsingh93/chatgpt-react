import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownReader = ({ markdownContent }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownReader;
