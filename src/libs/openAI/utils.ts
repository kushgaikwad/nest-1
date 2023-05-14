export function getPromptforSummary(selectedText: string): string {
  return 'Give a brief summary for: ' + selectedText;
}

export function getPromptforTags(selectedText: string): string {
  return 'What will be the hashtags words associated to: ' + selectedText;
}
