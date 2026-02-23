# AUDIO FILES SETUP
To ensure your audio files work on Netlify and in the app:

1. RECOMMENDED: Put your .mp3 files in the `public/audio/` folder.
   - `public/audio/azan1.mp3`
   - `public/audio/azan2.mp3`
   - `public/audio/Azan.mp3`

2. ALTERNATIVE: You can also put them in this root `audio/` folder.
   - The build script is configured to copy this folder to the final website.

3. IMPORTANT: Make sure the filenames match EXACTLY (including capitalization).
   - `azan1.mp3`
   - `azan2.mp3`
   - `Azan.mp3` (Note the capital 'A')

4. After uploading to GitHub, wait for Netlify to finish building.
5. Use the "Check Audio Files Status" button in the app's Settings menu to verify they are loaded correctly.
