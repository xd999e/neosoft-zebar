// eslint-disable-next-line @typescript-eslint/no-require-imports
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        zb: {
          text: "hsl( var(--text) / <alpha-value> )",
          base: "hsl( var(--bg) / <alpha-value> )",
          muted: "hsl( var(--muted) / <alpha-value> )",
          border: "hsl(var(--border) / <alpha-value> )",
          shadow: "hsl(var(--shadow) / <alpha-value> )",
          "bg-focused": "hsl(var(--bg-focused))",
          "bg-unfocused": "hsl(var(--bg-unfocused))",
          icon: "hsl(var(--icon) / <alpha-value> )",
          memory: "hsl(var(--memory) / <alpha-value> )",
          cpu: "hsl(var(--cpu) / <alpha-value> )",
          "cpu-high-usage": "hsl(var(--cpu-high-usage) / <alpha-value> )",
          battery: {
            good: "hsl(var(--battery-good) / <alpha-value> )",
            mid: "hsl(var(--battery-mid) / <alpha-value> )",
            low: "hsl(var(--battery-low) / <alpha-value> )"
          },
          "focused-process": "hsl(var(--focused-process) / <alpha-value> )",
          process: "hsl(var(--process) / <alpha-value> )",
          displayed: "hsl(var(--displayed) / <alpha-value> )",
          ws: {
            0: "hsl(var(--ws-1) / <alpha-value> )",
            1: "hsl(var(--ws-2) / <alpha-value> )",
            2: "hsl(var(--ws-3) / <alpha-value> )",
            3: "hsl(var(--ws-4) / <alpha-value> )",
            4: "hsl(var(--ws-5) / <alpha-value> )"
          },
          accent: "hsl(var(--accent))",
          "tiling-direction": "hsl(var(--tiling-direction) / <alpha-value> )",
          spotify: {
            playing: "hsl(var(--now-playing) / <alpha-value> )",
            paused: "hsl(var(--not-playing) / <alpha-value> )"
          },
          network: "hsl(var(--network) / <alpha-value> )",
          weather: "hsl(var(--weather) / <alpha-value> )"
        },
        blend: generateBlends()
      },
      borderRadius: {
        base: "var(--radius)"
      },
      borderWidth: {
        DEFAULT: "var(--border-size)"
      },
      boxShadow: {
        button:
          "var(--shadow-size-button) var(--shadow-size-button) 0 hsl(var(--shadow))",
        bar: "var(--shadow-size-bar) var(--shadow-size-bar) 0 hsl(var(--shadow))",
        "inverted-l": "var(--radius) 0 0 0 hsl(var(--bg))",
        "inverted-r": "calc(-1*var(--radius)) 0 0 0 hsl(var(--bg))"
      },
      translate: {
        boxShadowX: "var(--shadow-size-button)",
        boxShadowY: "var(--shadow-size-button)",
        reverseBoxShadowX: "-var(--shadow-size-button)",
        reverseBoxShadowY: "-var(--shadow-size-button)"
      },
      transitionDuration: {
        DEFAULT: "var(--transition-duration)"
      },
      fontFamily: {
        zb: ["var(--font-family)", ...defaultTheme.fontFamily.sans]
      },
      fontWeight: {
        base: "var(--font-weight)"
      },
      fontSize: {
        "zb-size": "var(--font-size)"
      },
      height: {
        bar: "var(--height)",
        radius: "var(--radius)"
      },
      width: {
        radius: "var(--radius)",
        processIcon: "var(--process-icon-width)"
      },
      inset: {
        radius: "var(--radius)"
      },
      margin: {
        zbx: "var(--bar-margin-x)",
        zby: "var(--bar-margin-y)",
        zrby: "var(--right-margin)",
        zlby: "var(--left-margin)"
      },
      padding: {
        zrby: "var(--right-margin)",
        zlby: "var(--left-margin)"
      }
    }
  },
  safelist: [
    "text-zb-ws-0",
    "text-zb-ws-1",
    "text-zb-ws-2",
    "text-zb-ws-3",
    "text-zb-ws-4",
    "border-zb-ws-0",
    "border-zb-ws-1",
    "border-zb-ws-2",
    "border-zb-ws-3",
    "border-zb-ws-4",
    "justify-self-start",
    "justify-self-center",
    "justify-self-end"
  ],
  plugins: []
};

function generateBlends() {
  const blends = {};
  for (let i = 5; i <= 100; i += 5) {
    blends[i] = `color-mix(in srgb, currentColor ${i}%, transparent)`;
  }
  return blends;
}
