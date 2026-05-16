export function buildMockResults(topic) {
  const hook = topic.trim() || 'your topic'

  return {
    script: `Imagine this: ${hook}

For five seconds, every flame on Earth would vanish. Combustion stops. Jet engines fail mid-flight. Your body wouldn't explode—but every cell would gasp without the oxygen it needs to keep going.

Then, just as suddenly, oxygen returns. Fires reignite. Planes fall. The atmosphere slams back into balance.

Five seconds sounds harmless. In reality, it would be the most violent moment in human history—and almost no one would see it coming.`,

    scenes: [
      {
        id: 1,
        duration: '0:00–0:05',
        text: 'Hook: What happens the instant oxygen disappears from the air?',
      },
      {
        id: 2,
        duration: '0:05–0:20',
        text: 'Fire dies. Engines stall. Cells begin to starve without O₂.',
      },
      {
        id: 3,
        duration: '0:20–0:35',
        text: 'Oxygen snaps back—reignition, chaos, atmospheric shock.',
      },
      {
        id: 4,
        duration: '0:35–0:45',
        text: 'Closing: Five seconds is enough to rewrite civilization.',
      },
    ],

    imagePrompts: [
      {
        sceneId: 1,
        prompt:
          'Cinematic Earth from space, atmosphere glowing thin and fading, dramatic lighting, 9:16 vertical, hyperreal',
      },
      {
        sceneId: 2,
        prompt:
          'City at night with extinguished flames, stalled aircraft, eerie silence, cool blue tones, vertical frame',
      },
      {
        sceneId: 3,
        prompt:
          'Sudden wildfires reigniting, shockwave in sky, chaotic energy, orange and violet contrast, vertical',
      },
      {
        sceneId: 4,
        prompt:
          'Silhouette looking at horizon, subtle lens flare, hopeful dread, documentary style, vertical short',
      },
    ],

    voiceover: {
      status: 'Voiceover ready (mock preview)',
      duration: '0:45',
      note: 'Connect ElevenLabs in the backend to replace this placeholder.',
    },

    subtitles: `1
00:00:00,000 --> 00:00:05,000
What happens if Earth lost oxygen for 5 seconds?

2
00:00:05,000 --> 00:00:20,000
Every flame dies. Engines stall. Your cells gasp.

3
00:00:20,000 --> 00:00:35,000
Then oxygen returns—and chaos reignites.

4
00:00:35,000 --> 00:00:45,000
Five seconds is enough to change everything.`,
  }
}
