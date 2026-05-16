export const PIPELINE_STEPS = [
  { id: 'script', label: 'Write script', description: 'Generate narration from your topic' },
  { id: 'scenes', label: 'Split scenes', description: 'Break script into timed beats' },
  { id: 'images', label: 'Image prompts', description: 'Visual prompts per scene' },
  { id: 'voice', label: 'Voiceover', description: 'ElevenLabs narration' },
  { id: 'subtitles', label: 'Subtitles', description: 'Timed caption track' },
  { id: 'export', label: 'Export', description: 'Package assets for editing' },
]

export const EXAMPLE_TOPICS = [
  'What If Earth Lost Oxygen for 5 Seconds?',
  'What If the Sun Disappeared for 24 Hours?',
  'What If Humans Could Photosynthesize?',
]
