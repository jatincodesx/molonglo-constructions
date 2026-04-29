function formatInline(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const html: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushList();
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      html.push(`<h1>${formatInline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("- ")) {
      listItems.push(`<li>${formatInline(line.slice(2))}</li>`);
      continue;
    }
    if (!line.trim()) {
      flushList();
      continue;
    }
    flushList();
    html.push(`<p>${formatInline(line)}</p>`);
  }

  flushList();
  return html.join("\n");
}
