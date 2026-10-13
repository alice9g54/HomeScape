# HomeScape Icon Generation Guide

## Overview
This folder contains all icons for the HomeScape PWA. Use the SVG source files to generate PNG icons.

## Required PNG Icons

Generate these PNG files from `icon.svg`:

| Size | Filename | Purpose |
|------|----------|---------|
| 72×72 | `icon-72x72.png` | Legacy Android |
| 96×96 | `icon-96x96.png` | Shortcuts |
| 128×128 | `icon-128x128.png` | Chrome Web Store |
| 144×144 | `icon-144x144.png` | Windows tiles |
| 152×152 | `icon-152x152.png` | iPad |
| 192×192 | `icon-192x192.png` | Android home |
| 384×384 | `icon-384x384.png` | Windows wide tile |
| 512×512 | `icon-512x512.png` | Splash screen |

## Required Maskable Icons

Generate from `icon-maskable.svg`:

| Size | Filename | Purpose |
|------|----------|---------|
| 192×192 | `icon-192x192-maskable.png` | Android adaptive |
| 512×512 | `icon-512x512-maskable.png` | Android adaptive HD |

## Required Screenshots

| Size | Filename | Purpose |
|------|----------|---------|
| 375×812 | `screenshot-mobile.jpg` | Mobile preview |
| 375×812 | `screenshot-mobile-properties.jpg` | Properties page |
| 1280×720 | `screenshot-desktop.jpg` | Desktop preview |

## Required Favicon

| Format | Filename | Purpose |
|--------|----------|---------|
| ICO | `favicon.ico` | Browser tab (16, 32, 48) |
| SVG | `favicon.svg` | Modern browsers |

## Required Other

| Type | Filename | Size | Purpose |
|------|----------|------|---------|
| PNG | `og-image.jpg` | 1200×630 | Social sharing |
| SVG | `logo.svg` | Any | Header logo |
| ICO | `favicon.ico` | Multi | Browser tab |

## Recommended Tool

**PWA Builder Image Generator:**
https://www.pwabuilder.com/imageGenerator

Upload `icon.svg` and it generates all sizes automatically.

## Manual Generation

### Using ImageMagick

```bash
# Generate all PNG sizes
magick icon.svg -resize 72x72 icon-72x72.png
magick icon.svg -resize 96x96 icon-96x96.png
magick icon.svg -resize 128x128 icon-128x128.png
magick icon.svg -resize 144x144 icon-144x144.png
magick icon.svg -resize 152x152 icon-152x152.png
magick icon.svg -resize 192x192 icon-192x192.png
magick icon.svg -resize 384x384 icon-384x384.png
magick icon.svg -resize 512x512 icon-512x512.png

# Maskable versions
magick icon-maskable.svg -resize 192x192 icon-192x192-maskable.png
magick icon-maskable.svg -resize 512x512 icon-512x512-maskable.png