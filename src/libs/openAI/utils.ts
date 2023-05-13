export function getPromptforSummary(selctedText: string): string {
  return 'Give a brief summary for: ' + selctedText;
}

export function getPromptforTags(selctedText: string): string {
  return 'What will be the hashtags words associated to: ' + selctedText;
}
