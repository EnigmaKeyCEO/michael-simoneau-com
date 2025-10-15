export const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const parseInlineMarkdown = (text: string): string => {
  let html = escapeHtml(text);

  // Bold (**text**)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic (*text*) - avoid matching bold syntax by handling after bold replacement
  html = html.replace(/(^|[^*])\*(?!\*)([^*]+)\*(?!\*)/g, (_match, prefix, content) => {
    return `${prefix}<em>${content}</em>`;
  });
  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  // Links [text](url) - support external and internal URLs
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text, url) => {
    const isExternal = /^https?:\/\//i.test(url);
    const attributes = isExternal
      ? 'href="' + url + '" target="_blank" rel="noopener noreferrer"'
      : 'href="' + url + '"';

    return `<a ${attributes} class="text-cyan-400 hover:text-cyan-300">${text}</a>`;
  });

  return html;
};
