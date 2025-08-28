# Neosoft [Zebar](https://github.com/glzr-io/zebar)

A Zebar configuration forked from [Neobrutal Zebar](https://github.com/adriankarlen/neobrutal-zebar) for Zebar V3, built with Svelte and Tailwind. This project would not have been possible without the original, please give it a star!

## ✨ Features

- Process icons for the current workspace with focus indicators
- System information meters with dynamic coloring and animations
- Smooth animations
- Media controls
- Configuration using CSS variables and a JSON file
- Customizable layout and appearance
- Built-in auto-tiler
- Multi-monitor support
- Windows Taskbar integration (experimental)
- Background effects (Acrylic, Blur, Mica)

## 🖼️ Showcase

![fullscreen](./misc/fullscreen.png)

https://github.com/user-attachments/assets/f1c8f09f-aa07-4077-890b-8d1162ef65af

https://github.com/user-attachments/assets/c0abbb25-0e5a-4531-9400-c52b9a7f2ffe

https://github.com/user-attachments/assets/47b0a9ae-4f7d-4784-a224-cdf0b10943aa

### Taskbar Integration

![Taskbar Integration](./misc/taskbar-integration.png)

## 🚀 Getting Started

### Simple Installation
For both installtion methods, you can adjust `config.css` and `config.json` as needed (see [Configuration](#Configuration) and [Css & Themes](#CSS-&-Themes))

#### Marketplace
You can now easily install Neosoft Zebar from the Zebar marketplace! Simply search for neosoft-zebar and click install.

The installation location is in `%appData%\zebar\downloads\blaiyz.neosoft-zebar@<version>` (you can find the config files there).

#### Manual
Download `neosoft-zebar.zip` from the latest release. Extract the contents into a folder and place it in your Zebar config directory.

### Advanced Installation (Building from Source)

#### Prerequisites

- Package manager/runtime of your choice (`bun` (recommended), `npm`, `pnpm`, `yarn`, etc.). We use `bun`, so the following instructions will demonstrate its usage.

#### Instructions

1. Download the repository and extract it anywhere
2. To avoid copying files on each rebuild, create a symlink in the Zebar config directory that points to `path/to/repo/neosoft-zebar/build`
4. Navigate to the root directory of neosoft-zebar
5. Install dependencies using your selected package manager:
   ```bash
   bun install
   ```
6. Make any desired edits
7. Build the project:
   ```bash
   bun run build
   ```
8. Reload Zebar

## 🔧 Configuration
General configuration is defined in `config.json`, which ships together with the Neosoft Zebar bundle. The default configuration is:
```json
{
  "$schema": "./schema.json",
  "direction": "top",
  "gradient": "top",
  "attachSides": true,
  "taskbarIntegration": {
    "enabled": false,
    "extraIcons": 0,
    "primaryMonitorSelection": "all",
    "secondaryMonitorSelection": "monitor"
  },
  "transitionDuration": 400,
  "providersConfig": {
    "refreshIntervals": {
      "cpu": 2000,
      "memory": 5000,
      "battery": 60000,
      "weather": 900000,
      "network": 2000
    },
    "enableErrorLogging": false
  },
  "backgroundEffect": "acrylic",
  "enableAutoTiling": true
}
```

In order to see the description and value options for each field, you need to open `config.json` in VSCode (or any editor that supports json schemas), which then detects the schema (shipped together in `schema.json`) and provides intellisense for each field.

Some settings might need to be configured in `zpack.json`, which is the configuration file Zebar uses (shipped together as well). In there, you have options to change the size and positioning of the widget.

> [!NOTE]
> If you're using window scaling in Windows, you may need to edit `zpack.json` to set the correct height (default is `40px`).

## 🎨 CSS & Themes
Style and color configuration is defined in `config.css`. After making changes there, reload Zebar.

Neosoft Zebar currently ships with 5 different themes: Tau (custom), Rosé Pine, Catppuccin, Nord, and Material. These themes are provided as palletes, with the colors represented by CSS variables. You can see the variables of each theme in [this directory](src/themes). Examples are shown below.

In order to change the colors into custom ones, you need to replace the variables with HSL colors without commas. For example, to change the text and accent colors modify the first lines:
```
  --text: 0 73% 56%;
  --accent: 300 100% 50%;
  ...
```

In addition to colors, `config.css` provides variables that control other style options, such as border radius with `--radius`, fonts with `--font-family` and different margins. Use all configuration files (`config.json`, `config.css`, `zpack.json`) to achieve the exact widget style you want.

> [!TIP]
> To scale the entire widget, you need to both increase height in `zpack.json` and increase the font size in `config.css`. Neosoft Zebar's component sizes are all sized relative to the font size.

### Tau (Default)

<details>
<summary>Example config</summary>

##### config.css

```css
/* colors */
--text: var(--tau-text);
--accent: var(--tau-accent);
--bg: var(--tau-overlay);
--muted: var(--tau-muted);
--border: var(--tau-highlight-low);
--shadow: var(--tau-highlight-low);
--icon: var(--tau-love);
--memory: var(--tau-weak);
--cpu: var(--tau-accent);
--cpu-high-usage: var(--tau-strong);
--battery-good: var(--tau-weak);
--battery-mid: var(--tau-mid);
--battery-low: var(--tau-strong);
--focused-process: var(--tau-text);
--process: var(--tau-muted);
--displayed: var(--tau-text);
--ws-1: var(--tau-weak);
--ws-2: var(--tau-low);
--ws-3: var(--tau-accent);
--ws-4: var(--tau-mid);
--ws-5: var(--tau-strong);
--tiling-direction: var(--tau-weak);
--not-playing: var(--tau-love);
--network: var(--tau-text);
--weather: var(--tau-text);
--bg-focused: var(--tau-highlight-high) / 0.4;
--bg-unfocused: var(--tau-overlay) / 0.5;
```

</details>

**TODO:** Add color preset for each theme.
The default `config.css` includes commented-out Rosé Pine colors (the original Neobrutal theme). You can easily switch by commenting out the Tau theme and uncommenting the Rosé Pine theme. Note that not all Rosé Pine colors are fully configured.

## 🎉 Background Effects

> [!WARNING]
> This feature does not work in Windows 11 (Currently, supports only Windows 10). To achieve similar background effects, use an external application like [Mica For Everyone](https://github.com/MicaForEveryone/MicaForEveryone).

To enable background effects, you need to recompile Zebar with a modification. You must have Rust and Node.js installed on your system.

1. Clone the Zebar repository: `git clone https://github.com/glzr-io/zebar.git`
2. Navigate to `packages/desktop/capabilities/widget.json` and add the following permission:

```json
{
  ...,
  "permissions": [
    ...,
    "core:window:allow-set-always-on-bottom",
    "core:window:allow-set-always-on-top",
    "core:window:allow-set-resizable",
    "core:window:allow-set-position",
    "core:window:allow-set-size",
    "core:window:allow-set-title",
    "core:window:allow-set-effects" <--- ADD THIS
  ]
}
```

3. Run the following:
```bash
# Install pnpm (package manager).
npm i -g pnpm

# Install dependencies.
pnpm i

# Build settings UI
pnpm run --filter zebar --filter @zebar/settings-ui build

# Build Zebar
pnpm run build
```
4. Install the newly built Zebar from `target/release/bundle/msi/Zebar_..._x64_en-US.msi`

> [!NOTE]
> By default, Zebar uses the rust nightly channel. To install it properly, you need to run (after uninstalling nightly if you have it already installed) `rustup toolchain install nightly --allow-downgrade --profile minimal`, otherwise Zebar may not be able to build. If it still doesn't manage to build, try changing the channel in `rust-toolchain.toml` to `stable`.

After installation, you can enable background effects in `config.json`.

## 🧪 Taskbar Integration

This is a highly experimental feature that may not work perfectly for everyone and requires extensive tweaking. It adds spaces in the widget containing window icons and the system tray, then moves the widget to overlay the taskbar position. To make both Zebar and the taskbar functional, the taskbar must be configured specifically.

The taskbar must be:

- Always on top
- Completely transparent
- Have clickable-through empty regions (so you can interact with the Zebar widget)
- Have centered icons

After configuring the taskbar, adjust the Zebar widget sizes and margins to align the icons perfectly. In `config.css`, modify these variables:

```css
--process-icon-width: 50px;
--right-margin: 290px;
--left-margin: 50px;
```

Enable taskbar integration in `config.json`:

```json
{
   ...
   "taskbarIntegration": {
      "enabled": true,
      "extraIcons": 0,
      "primaryMonitorSelection": "all",
      "secondaryMonitorSelection": "monitor"
   }
   ...
}
```

### Windows 10 (Tested Configuration)

Download and install TaskbarX from the [official GitHub repository](https://github.com/ChrisAnd1998/TaskbarX/releases), then run it with these arguments:

`Path\To\TaskbarX\TaskbarX.exe -tbs=1 -cfsa=1 -ftotc=1 -sti=1 -as=backeaseout -rzbt=1 -tbr=25 -tbsg=1`

This creates segments with rounded corners, click-through enabled, transparency, and centered icons. You must also unpin all taskbar icons and remove the Windows search bar (or increase the left margin mentioned above). Adjust the window selection in `config.json` and Windows settings to match your preferences.

### Windows 11

This hasn't been tested. If you find a way to achieve the same taskbar effect as TaskbarX, please let me know (Windhawk might be capable of this).
