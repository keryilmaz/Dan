# Design System Documentation
## The Fix by Dan Koe

**Purpose**: Complete design language specification enabling consistent reproduction of this website's visual and interaction patterns for AI training and implementation.

---

## 1. Visual Identity

### 1.1 Color Palette

#### Dark Theme (Default)
- **Background (`--bg`)**: `#0f0f0f` (near-black)
- **Foreground (`--fg`)**: `#ffffff` (white)
- **Border (`--border`)**: `rgba(255, 255, 255, 0.15)` (15% white opacity)
- **Muted (`--muted`)**: `rgba(255, 255, 255, 0.4)` (40% white opacity)
- **Accent (`--accent`)**: `rgba(255, 255, 255, 0.08)` (8% white opacity)

#### Light Theme
- **Background (`--bg`)**: `#f5f5f5` (light gray)
- **Foreground (`--fg`)**: `#000000` (black)
- **Border (`--border`)**: `rgba(0, 0, 0, 0.15)` (15% black opacity)
- **Muted (`--muted`)**: `rgba(0, 0, 0, 0.4)` (40% black opacity)
- **Accent (`--accent`)**: `rgba(0, 0, 0, 0.08)` (8% black opacity)

#### Additional Colors
- **Button Secondary Background (Dark)**: `#222222`
- **Button Secondary Background (Light)**: `#dddddd`
- **Input Background (Dark)**: `#0a0a0a`
- **Input Background (Light)**: `#e8e8e8`
- **Callout Background (Dark)**: `#1a1a1a`
- **Warning Background (Light)**: `#e8e8e8`
- **Modal Backdrop (Dark)**: `rgba(15, 15, 15, 0.5)` with `backdrop-filter: blur(12px)`
- **Modal Backdrop (Light)**: `rgba(245, 245, 245, 0.6)` with `backdrop-filter: blur(12px)`
- **Synthesis Card**: Always `#ffffff` (white) with black text, regardless of theme

#### Opacity Scale
- **Full**: `1` (100%)
- **High**: `0.9` (90%)
- **Medium**: `0.85` (85%)
- **Low**: `0.6` (60%)
- **Muted**: `0.5` (50%)
- **Very Low**: `0.4` (40%)
- **Minimal**: `0.3` (30%)
- **Barely Visible**: `0.2` (20%)

### 1.2 Typography

#### Font Family
- **Primary**: `'IBM Plex Mono', monospace`
- **Weights**: 400 (regular), 500 (medium)
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');`

#### Base Typography
- **Font Size**: `12px` (universal - all text uses this size)
- **Base Line Height**: `1.6`
- **Text Transform**: `uppercase` (applied to body)
- **Letter Spacing**: `0.02em` (applied to body)
- **Font Smoothing**: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`

#### Typography Hierarchy

**Headings (h1-h6)**
```css
font-size: 12px;
font-weight: 500;
line-height: 1.6;
margin-bottom: 24px;
```

**Article Title**
```css
font-size: 12px;
font-weight: 500;
margin-bottom: 24px;
opacity: 0.8;
```

**Body Paragraphs**
```css
font-size: 12px;
margin-bottom: 16px;
line-height: 1.8;
opacity: 0.85;
```

**Labels & Metadata**
```css
font-size: 12px;
color: var(--muted);
display: block;
margin-bottom: 8px;
```

**Lead/Subtitle Text**
```css
font-size: 12px;
line-height: 1.8;
opacity: 0.6;
margin-bottom: 32px;
```

**Hero Meta Text**
```css
font-size: 12px;
opacity: 0.4;
margin-bottom: 48px;
```

**Context/Helper Text**
```css
font-size: 12px;
line-height: 1.5;
color: var(--muted);
margin-bottom: 16px;
```

**Blockquote Text**
```css
font-size: 12px;
line-height: 1.8;
opacity: 0.9;
margin-bottom: 8px;
```

**Blockquote Citation**
```css
font-size: 12px;
opacity: 0.4;
font-style: normal;
```

**Emphasis**
- `em`: `font-style: italic;`
- `strong`: `font-weight: 500;`

### 1.3 Spacing System

#### Base Unit
- **Base Unit**: `4px` (all spacing is multiples of 4px)

#### Spacing Scale
- **4px**: `4px` (minimal gap)
- **8px**: `8px` (small gap, icon spacing)
- **12px**: `12px` (small padding, gaps)
- **16px**: `16px` (standard padding, gaps)
- **20px**: `20px` (tab padding)
- **24px**: `24px` (standard section padding, margins)
- **28px**: `28px` (button horizontal padding)
- **32px**: `32px` (larger gaps, icon sizes)
- **48px**: `48px` (section spacing, large margins)
- **60px**: `60px` (mobile section padding)
- **80px**: `80px` (desktop section padding)
- **120px**: `120px` (bottom padding for content)

#### Specific Spacing Rules
- **Header Height**: `48px`
- **Footer Height**: `48px`
- **Container Padding**: `0 24px`
- **Section Padding**: `80px 0` (desktop), `60px 0` (mobile)
- **Question Block Margin**: `48px` bottom
- **Part Header Margin**: `48px` bottom
- **Button Margin Top**: `24px`
- **Button Padding**: `14px 28px`
- **Input Padding**: `16px` (textarea), `12px 16px` (single-line)
- **Callout Padding**: `24px`
- **Modal Padding**: `24px`
- **Tab Padding**: `20px 24px`

### 1.4 Grid Structure

#### Container System
- **Max Width**: `640px` (all content containers)
- **Centering**: `margin: 0 auto;`
- **Padding**: `0 24px` (horizontal only)

#### Layout Patterns
- **Single Column**: All content flows in one column, max-width 640px
- **No Multi-Column Grids**: Design uses vertical stacking only
- **Flexbox for Horizontal Layouts**: Used for header, footer, button groups
- **CSS Grid**: Used only for interrupt items (time picker + question)

#### Responsive Breakpoint
- **Mobile**: `@media (max-width: 640px)`
- **Desktop**: Above 640px

---

## 2. Component Library

### 2.1 Buttons

#### Primary Button (`.btn`, `.start-execute-btn`, `.continue-btn`)
```css
background: var(--fg);
color: var(--bg);
border: none;
padding: 14px 28px;
font-family: inherit;
font-size: 12px;
cursor: pointer;
transition: opacity 0.2s ease;
display: inline-block;
margin-top: 24px;
text-transform: uppercase;
border-radius: 8px;
```

**Hover State**:
```css
opacity: 0.7;
```

**Disabled State**:
```css
opacity: 0.2;
cursor: not-allowed;
```

#### Secondary Button (`.scroll-btn`, `.export-btn`)
```css
background: #222; /* #ddd in light theme */
color: var(--fg);
border: none;
padding: 14px 28px;
font-family: inherit;
font-size: 12px;
cursor: pointer;
transition: opacity 0.2s ease;
text-transform: uppercase;
display: inline-block;
border-radius: 8px;
```

**Hover State**:
```css
opacity: 0.6;
```

#### Mode Toggle Button (`.mode-btn`)
```css
background: transparent;
border: none;
padding: 8px 16px;
font-family: inherit;
font-size: 12px;
color: var(--fg);
opacity: 0.4;
cursor: pointer;
transition: opacity 0.2s ease;
text-transform: uppercase;
```

**Hover State**:
```css
opacity: 0.7;
```

**Active State**:
```css
opacity: 1;
```

#### Theme Toggle Button (`.theme-btn`)
```css
background: #222; /* #ddd in light theme */
border: none;
padding: 8px;
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
font-family: inherit;
font-size: 16px;
color: var(--fg);
cursor: pointer;
transition: opacity 0.2s ease;
margin-left: 16px;
border-radius: 8px;
```

**Icon Size**: `16px × 16px`

#### Reset Button (`.reset-btn`)
```css
background: transparent;
border: none;
padding: 0;
font-family: inherit;
font-size: 12px;
color: var(--fg);
opacity: 0.4;
cursor: pointer;
transition: opacity 0.2s ease;
text-transform: uppercase;
margin-left: auto;
```

**Hover State**:
```css
opacity: 1;
```

#### Synthesis Toggle Button (`.synthesis-toggle-btn`)
```css
position: fixed;
bottom: 72px;
left: 50%;
transform: translateX(-50%);
z-index: 98;
background: #222; /* #fff in light theme */
border: none;
padding: 14px 28px;
font-family: inherit;
font-size: 12px;
color: var(--fg);
cursor: pointer;
text-transform: uppercase;
transition: opacity 0.2s ease;
display: none; /* shown with .visible class */
border-radius: 999px; /* fully rounded */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

**Visible State**:
```css
display: block;
```

**Hover State**:
```css
opacity: 0.7;
```

### 2.2 Forms

#### Textarea Input (`.response`)
```css
width: 100%;
padding: 16px;
font-family: inherit;
font-size: 12px;
line-height: 1.6;
background: #0a0a0a; /* #e8e8e8 in light theme */
color: var(--fg);
border: none;
resize: vertical;
transition: background 0.2s ease;
text-transform: uppercase;
letter-spacing: 0.02em;
border-radius: 8px;
```

**Focus State**: Same background (no visual change)
**Placeholder**: `color: var(--muted);`
**Selection**: `background: rgba(255, 255, 255, 0.2);` (dark) / `rgba(0, 0, 0, 0.2);` (light)

#### Single-Line Input (`.response-line`)
```css
width: 100%;
padding: 12px 16px;
font-family: inherit;
font-size: 12px;
line-height: 1.6;
background: #0a0a0a; /* #e8e8e8 in light theme */
color: var(--fg);
border: none;
transition: background 0.2s ease;
text-transform: uppercase;
letter-spacing: 0.02em;
border-radius: 8px;
```

**Max Length**: Typically `150-200` characters
**Placeholder**: Same styling as textarea

#### Checkbox (`.commitment input[type="checkbox"]`)
```css
width: 16px;
height: 16px;
margin-top: 3px;
cursor: pointer;
flex-shrink: 0;
accent-color: var(--fg);
background: #fff;
border: 1px solid rgba(0, 0, 0, 0.2); /* rgba(0, 0, 0, 0.3) in light theme */
appearance: none;
-webkit-appearance: none;
border-radius: 8px;
```

**Checked State**: 
- Background: `#fff`
- Background Image: SVG circle (3px radius, black fill)
- Pattern: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='3' fill='%23000'/%3E%3C/svg%3E`

#### Time Picker (`.custom-time-picker`)
```css
display: flex;
align-items: center;
gap: 4px;
```

**Time Select (`.time-hour`, `.time-minute`)**
```css
padding: 8px;
font-family: inherit;
font-size: 12px;
background: #222; /* #ddd in light theme */
color: var(--fg);
border: none;
appearance: none;
-webkit-appearance: none;
border-radius: 8px;
cursor: pointer;
text-transform: uppercase;
min-width: 50px;
```

**Focus State**:
```css
background: #2a2a2a; /* #d0d0d0 in light theme */
```

**Time Separator**:
```css
color: var(--fg);
opacity: 0.6;
font-size: 12px;
```

### 2.3 Navigation

#### Header (`.header`)
```css
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 100;
background: var(--bg);
height: 48px;
```

**Header Inner**:
```css
max-width: 640px;
margin: 0 auto;
padding: 0 24px;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
```

#### Logo (`.logo`)
```css
font-size: 12px;
color: var(--fg);
text-decoration: none;
transition: opacity 0.2s ease;
```

**Hover State**:
```css
opacity: 0.6;
```

**Author Span**:
```css
opacity: 0.5;
```

#### Footer (`.sticky-footer`)
```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 100;
background: var(--bg);
height: 48px;
```

**Footer Inner**:
```css
max-width: 640px;
margin: 0 auto;
padding: 0 24px;
height: 100%;
display: flex;
align-items: center;
gap: 12px;
```

**Footer Links**:
```css
color: var(--fg);
text-decoration: none;
font-size: 12px;
transition: opacity 0.2s ease;
```

**Footer Divider**:
```css
opacity: 0.3;
```

### 2.4 Cards & Containers

#### Callout (`.callout`)
```css
margin: 32px 0;
padding: 24px;
background: #1a1a1a;
border: none;
border-radius: 8px;
```

**Callout Text**:
```css
font-size: 12px;
margin-bottom: 8px;
opacity: 0.85;
```

#### Warning (`.warning`)
```css
margin: 32px 0;
padding: 24px;
background: #1a1a1a; /* #e8e8e8 in light theme */
border: none;
border-radius: 8px;
```

#### Question Block (`.question-block`)
```css
margin-bottom: 48px;
opacity: 1;
transition: opacity 0.4s ease;
```

#### Part Header (`.part-header`)
```css
margin-bottom: 48px;
```

**Part Label**:
```css
font-size: 12px;
color: var(--muted);
display: block;
margin-bottom: 8px;
```

**Part Context**:
```css
font-size: 12px;
line-height: 1.8;
opacity: 0.6;
margin-bottom: 32px;
```

### 2.5 Lists

#### Numbered List (`.numbered-list`)
```css
margin: 24px 0;
padding-left: 0;
list-style: none;
counter-reset: item;
```

**List Item**:
```css
position: relative;
padding-left: 32px;
margin-bottom: 12px;
font-size: 12px;
line-height: 1.8;
opacity: 0.85;
```

**Number Marker**:
```css
content: counter(item);
counter-increment: item;
position: absolute;
left: 0;
font-size: 12px;
opacity: 0.4;
```

#### Formula List (`.formula-list`)
Same as numbered list, but marker is:
```css
content: '—';
position: absolute;
left: 0;
opacity: 0.4;
```

### 2.6 Structured Content

#### Stage/Phase Item (`.stage`, `.phase`)
```css
padding: 24px 0;
border-bottom: 1px solid var(--border);
display: flex;
gap: 16px;
```

**Last Child**: `border-bottom: none;`

**Stage/Phase Number**:
```css
font-size: 12px;
opacity: 0.4;
width: 24px;
flex-shrink: 0;
```

**Phase Number** (additional):
```css
font-weight: 500;
```

**Stage/Phase Content Strong**:
```css
display: block;
font-size: 12px;
font-weight: 500;
margin-bottom: 8px;
```

**Stage/Phase Content Paragraph**:
```css
font-size: 12px;
margin-bottom: 0;
opacity: 0.6;
```

#### Game Item (`.game-item`)
```css
padding: 24px 0;
border-bottom: 1px solid var(--border);
```

**Game Label**:
```css
font-size: 12px;
color: var(--muted);
display: block;
margin-bottom: 8px;
```

**Game Meta**:
```css
display: block;
font-size: 12px;
opacity: 0.4;
margin-bottom: 8px;
```

#### Protocol Part (`.protocol-part`)
```css
padding: 24px 0;
border-bottom: 1px solid var(--border);
```

**Part Time**:
```css
font-size: 12px;
color: var(--muted);
display: block;
margin-bottom: 8px;
```

#### Output Row (`.output-row`)
```css
padding: 24px 0;
border-bottom: 1px solid var(--border);
```

**Output Label**:
```css
font-size: 12px;
color: var(--muted);
display: block;
margin-bottom: 8px;
```

**Output Text**:
```css
font-size: 12px;
line-height: 1.6;
```

### 2.7 Blockquotes

```css
margin: 32px 0;
padding-left: 24px;
border-left: 1px solid var(--border);
```

**Blockquote Paragraph**:
```css
font-size: 12px;
line-height: 1.8;
opacity: 0.9;
margin-bottom: 8px;
```

**Blockquote Cite**:
```css
font-size: 12px;
opacity: 0.4;
font-style: normal;
```

### 2.8 Modals

#### Modal Overlay (`.synthesis-modal`)
```css
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 200;
display: none;
align-items: center;
justify-content: center;
padding: 24px;
opacity: 0;
transition: opacity 0.3s ease;
```

**Active State**:
```css
display: flex;
opacity: 1;
```

#### Modal Backdrop (`.modal-backdrop`)
```css
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(15, 15, 15, 0.5); /* rgba(245, 245, 245, 0.6) in light theme */
backdrop-filter: blur(12px);
```

#### Modal Content (`.modal-content`)
```css
position: relative;
max-width: 640px;
width: 100%;
z-index: 201;
transform: scale(0.95);
transition: transform 0.3s ease;
padding: 0 24px;
```

**Active State**:
```css
transform: scale(1);
```

#### Synthesis Card (`.synthesis-card`)
```css
background: #fff;
border-radius: 8px;
overflow: hidden;
display: flex;
flex-direction: column;
position: relative;
color: #000;
```

#### Synthesis Tabs (`.synthesis-tabs`)
```css
display: flex;
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
```

#### Synthesis Tab (`.synthesis-tab`)
```css
flex: 1;
background: transparent;
border: none;
padding: 20px 24px;
font-family: inherit;
font-size: 12px;
color: #000;
cursor: pointer;
text-transform: uppercase;
letter-spacing: 0.05em;
opacity: 0.5;
transition: opacity 0.2s ease;
border-bottom: 2px solid transparent;
```

**Hover State**:
```css
opacity: 0.7;
```

**Active State**:
```css
opacity: 1;
border-bottom-color: #000;
```

#### Tab Content (`.tab-content`)
```css
display: none;
padding: 24px;
flex: 1;
min-height: 200px;
```

**Active State**:
```css
display: block;
```

#### Modal Close (`.modal-close`)
```css
position: absolute;
top: 16px;
right: 16px;
background: transparent;
border: none;
color: #000;
font-size: 24px;
line-height: 1;
cursor: pointer;
padding: 0;
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
opacity: 0.7;
transition: opacity 0.2s ease;
text-transform: none;
font-weight: 300;
z-index: 10;
```

**Hover State**:
```css
opacity: 1;
```

### 2.9 Info Icons & Tooltips

#### Info Icon (`.info-icon`)
```css
display: inline-flex;
align-items: center;
justify-content: center;
width: 16px;
height: 16px;
cursor: help;
flex-shrink: 0;
margin-top: 2px;
opacity: 0.5;
transition: opacity 0.2s ease;
position: relative;
color: var(--muted);
```

**Hover State**:
```css
opacity: 1;
color: var(--fg);
```

**SVG**:
```css
width: 100%;
height: 100%;
display: block;
```

#### Info Tooltip (`.info-tooltip`)
```css
position: absolute;
bottom: 100%;
left: 0;
margin-bottom: 8px;
padding: 12px 16px;
background: var(--bg);
border: 1px solid var(--border);
border-radius: 8px;
font-size: 11px;
line-height: 1.6;
color: var(--fg);
opacity: 0;
pointer-events: none;
transform: translateY(4px);
transition: opacity 0.2s ease, transform 0.2s ease;
max-width: 320px;
min-width: 240px;
z-index: 1000;
text-transform: none;
letter-spacing: 0;
white-space: normal;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
```

**Hover State (on parent icon)**:
```css
opacity: 1;
transform: translateY(0);
pointer-events: auto;
```

### 2.10 Interrupt Items

#### Interrupts Grid (`.interrupts-grid`)
```css
display: flex;
flex-direction: column;
gap: 0;
margin-bottom: 24px;
```

#### Interrupt Item (`.interrupt-item`)
```css
display: grid;
grid-template-columns: 100px 1fr;
gap: 24px;
align-items: center;
padding: 24px 0;
border-bottom: 1px solid var(--border);
```

**Last Child**: `border-bottom: none;`

**Mobile**:
```css
grid-template-columns: 1fr;
gap: 8px;
```

**Interrupt Question**:
```css
font-size: 12px;
line-height: 1.5;
opacity: 0.6;
```

---

## 3. Layout Patterns

### 3.1 Page Structure

#### Mode Content Container (`.mode-content`)
```css
display: none;
padding-top: 48px; /* header height */
padding-bottom: 120px; /* footer + spacing */
```

**Active State**:
```css
display: block;
```

#### Content Container (`.container`, `.learn-container`, `.block-content`)
```css
max-width: 640px;
margin: 0 auto;
padding: 0 24px;
```

#### Section (`.section`, `.learn-section`, `.block`)
```css
padding: 80px 0; /* 60px on mobile */
```

#### Hero Section (`.hero-section`, `#block-intro`)
```css
min-height: calc(100vh - 48px);
display: flex;
align-items: center;
```

### 3.2 Content Arrangement

#### Vertical Flow
- All content flows vertically in single column
- No horizontal sidebars or multi-column layouts
- Maximum content width: 640px
- Centered on page

#### Section Spacing
- Standard sections: 80px vertical padding (desktop), 60px (mobile)
- Hero sections: Full viewport height minus header
- Question blocks: 48px bottom margin
- Part headers: 48px bottom margin

#### Content Hierarchy
1. **Part Header** (label + title + context)
2. **Question Blocks** (question + context + input)
3. **Continue Buttons** (revealed progressively)
4. **Final Output** (label + text pairs)

### 3.3 Responsive Behavior

#### Breakpoint
- **Mobile**: `max-width: 640px`
- **Desktop**: Above 640px

#### Mobile Adjustments
- Section padding: `60px 0` (reduced from 80px)
- Mode button padding: `8px 12px` (reduced from `8px 16px`)
- Interrupt items: Single column (reduced from 2-column grid)
- Stage/phase items: Column layout (reduced from row)
- Info tooltip: Smaller max-width (280px) and font-size (10px)

#### Print Styles
- Hide: header, footer, buttons, modals, mode toggle
- Show: All content blocks (even if hidden)
- Padding: `24px 0` per section
- Page breaks: Avoid inside blocks

---

## 4. Interaction Design

### 4.1 Hover States

#### Universal Hover Pattern
- **Opacity Reduction**: Most interactive elements reduce opacity on hover
- **Transition**: `transition: opacity 0.2s ease;`
- **Hover Opacity Values**:
  - Buttons: `0.7` (primary), `0.6` (secondary)
  - Links: `0.6`
  - Mode buttons: `0.7`
  - Info icons: `1` (from 0.5)
  - Reset button: `1` (from 0.4)

#### Button Hover States
- **Primary**: `opacity: 0.7`
- **Secondary**: `opacity: 0.6`
- **Disabled**: No hover effect (`opacity: 0.2`, `cursor: not-allowed`)

### 4.2 Transitions

#### Standard Transition
```css
transition: opacity 0.2s ease;
```

#### Modal Transitions
- **Modal Overlay**: `transition: opacity 0.3s ease;`
- **Modal Content**: `transition: transform 0.3s ease;`
- **Initial State**: `transform: scale(0.95); opacity: 0;`
- **Active State**: `transform: scale(1); opacity: 1;`

#### Question Block Transitions
```css
transition: opacity 0.4s ease;
```

#### Tooltip Transitions
```css
transition: opacity 0.2s ease, transform 0.2s ease;
```

### 4.3 Animations

#### Fade In Animation
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Application**:
- Blocks/Sections: `animation: fadeIn 0.6s ease-out;`
- Question Blocks: `animation: fadeIn 0.4s ease-out;`

### 4.4 User Flow Patterns

#### Progressive Reveal
- Questions reveal after previous question has 10+ characters
- Next question scrolls into view (`scrollIntoView({ behavior: 'smooth', block: 'center' })`)
- Continue buttons reveal after completing question sequences
- Sections reveal after clicking continue buttons

#### Auto-Save
- Inputs save to localStorage after 500ms delay
- Key format: `protocol-{data-save-attribute}`
- All responses persist across page reloads

#### Mode Switching
- Smooth scroll to top on mode change
- Active mode button highlighted (opacity: 1)
- Inactive mode button dimmed (opacity: 0.4)
- Synthesis toggle appears in execute mode when data exists

#### Modal Interactions
- Opens on synthesis toggle button click
- Closes on: backdrop click, close button click, Escape key
- Body scroll locked when open
- Tab switching within modal

#### Form Validation
- Begin button disabled until checkbox checked
- Continue buttons hidden until prerequisites met
- No visual error states (rely on disabled state)

#### Scroll Behavior
- Smooth scrolling enabled (`scroll-behavior: smooth`)
- Auto-scroll to revealed questions
- Auto-scroll to last filled field on page load (execute mode)

---

## 5. Content Strategy

### 5.1 Voice & Tone

#### Characteristics
- **Direct**: No fluff, straight to the point
- **Challenging**: Questions push users to confront uncomfortable truths
- **Minimal**: Every word serves a purpose
- **Uppercase**: All text transformed to uppercase for consistency
- **Monospace**: Technical, code-like aesthetic reinforces focus

#### Writing Style
- Short, declarative sentences
- Questions are probing and specific
- Context text provides minimal guidance
- No exclamation marks or excessive punctuation
- Quotes and citations used sparingly for authority

### 5.2 Content Hierarchy

#### Primary Content
1. **Article Title**: Main headline (opacity: 0.8)
2. **Section Headings (h2)**: Concept titles, part titles
3. **Body Text**: Explanatory paragraphs (opacity: 0.85)
4. **Questions**: Interactive prompts (full opacity)

#### Secondary Content
1. **Labels**: Part numbers, concept numbers, metadata (muted color)
2. **Context**: Helper text below questions (muted color)
3. **Meta Text**: Hero descriptions, protocol intros (opacity: 0.4-0.6)

#### Tertiary Content
1. **Citations**: Blockquote attributions (opacity: 0.4)
2. **Tooltips**: Info icon explanations (smaller font, normal case)
3. **Status Messages**: Reminder activation feedback

### 5.3 Content Patterns

#### Question Structure
```html
<label class="question">
    [Question text]
    [Optional info icon]
</label>
<p class="context">[Helper text]</p>
<textarea class="response" data-save="[key]"></textarea>
```

#### Part Structure
```html
<div class="part-header">
    <span class="part-label">Part [N]</span>
    <h2>[Part Title]</h2>
    <p class="part-context">[Description]</p>
</div>
[Question blocks...]
```

#### List Structure
- Numbered lists: Sequential concepts, steps
- Formula lists: Key-value pairs with em-dash markers
- Stage/Phase lists: Numbered items with titles and descriptions

#### Callout Structure
```html
<div class="callout">
    <p>[Emphasized content]</p>
</div>
```

### 5.4 Content Rules

#### Do's
- ✅ Use uppercase for all user-facing text
- ✅ Keep questions specific and actionable
- ✅ Provide minimal context to avoid hand-holding
- ✅ Use opacity to create hierarchy
- ✅ Maintain consistent 12px font size
- ✅ Use monospace font throughout

#### Don'ts
- ❌ Don't use multiple font sizes
- ❌ Don't add decorative elements
- ❌ Don't use color for emphasis (use opacity instead)
- ❌ Don't break the single-column layout
- ❌ Don't add icons except info icons and theme toggle
- ❌ Don't use serif or sans-serif fonts

---

## 6. Implementation Guidelines

### 6.1 CSS Architecture

#### CSS Variables
All colors use CSS custom properties for theme switching:
```css
:root {
    --bg: #0f0f0f;
    --fg: #fff;
    --border: rgba(255, 255, 255, 0.15);
    --muted: rgba(255, 255, 255, 0.4);
    --accent: rgba(255, 255, 255, 0.08);
}

[data-theme="light"] {
    --bg: #f5f5f5;
    --fg: #000;
    --border: rgba(0, 0, 0, 0.15);
    --muted: rgba(0, 0, 0, 0.4);
    --accent: rgba(0, 0, 0, 0.08);
}
```

#### Class Naming
- Semantic names: `.question-block`, `.part-header`, `.output-row`
- BEM-like but not strict: `.mode-content`, `.mode-btn`
- State classes: `.active`, `.hidden`, `.visible`

### 6.2 JavaScript Patterns

#### Progressive Reveal Flow
```javascript
{
    'q1': { next: 'q2-block', revealBtn: null },
    'q2': { next: 'q3-block', revealBtn: null },
    'q4': { next: null, revealBtn: 'continue-antivision' },
    'antivision-statement': { 
        next: null, 
        revealBtn: 'continue-vision', 
        updateSynthesis: 'antivision' 
    }
}
```

#### Auto-Save Pattern
- Debounce: 500ms timeout
- Storage key: `protocol-{data-save-attribute}`
- Load on page init

#### Theme Toggle
- Toggle `data-theme="light"` attribute on `<html>`
- Persist in localStorage as `protocol-theme`
- Default: dark theme

### 6.3 HTML Structure

#### Required Attributes
- `data-save`: For all inputs (used for auto-save)
- `data-mode`: For mode toggle buttons
- `data-theme`: On `<html>` for theme switching
- `data-info`: On info icons for tooltip content
- `data-reminder`: On time pickers for reminder IDs
- `data-time`: On time pickers for default times

#### Semantic HTML
- Use `<section>` for major content blocks
- Use `<main>` for mode containers
- Use `<header>` and `<footer>` for navigation
- Use `<label>` for form questions
- Use proper form inputs (`<textarea>`, `<input>`, `<select>`)

---

## 7. Do's and Don'ts

### 7.1 Visual Design

#### ✅ Do
- Use only 12px font size for all text
- Apply uppercase transformation to all text
- Use opacity for visual hierarchy (not font sizes)
- Maintain 640px max-width for all content
- Use 8px border-radius consistently
- Keep monochrome color scheme
- Use monospace font exclusively

#### ❌ Don't
- Don't use multiple font sizes
- Don't add colors beyond black/white/gray scale
- Don't break the single-column layout
- Don't use decorative fonts
- Don't add shadows except on modals and tooltips
- Don't use gradients or images
- Don't add icons except specified ones

### 7.2 Interaction Design

#### ✅ Do
- Use opacity transitions for hover states
- Implement smooth scrolling
- Show progressive reveals with animations
- Auto-save all form inputs
- Persist theme preference
- Scroll to relevant content on reveal

#### ❌ Don't
- Don't use color changes for hover states
- Don't add complex animations
- Don't show loading spinners
- Don't use toast notifications
- Don't add sound effects
- Don't implement drag-and-drop

### 7.3 Content

#### ✅ Do
- Keep questions direct and challenging
- Use minimal context text
- Maintain consistent voice
- Use uppercase throughout
- Provide tooltips for complex concepts

#### ❌ Don't
- Don't add excessive explanations
- Don't use casual language
- Don't add emojis or decorative elements
- Don't break the monochrome aesthetic
- Don't add marketing copy

---

## 8. Component Usage Examples

### 8.1 Question Block
```html
<div class="question-block" id="q1-block">
    <label class="question">
        What is the dull, persistent dissatisfaction you've learned to live with?
        <span class="info-icon" data-info="Contextual help text here">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M11.157 12.2558L10.6861 8.48843C10.5873 7.69809 11.2035 7 12 7C12.7965 7 13.4127 7.69807 13.314 8.4884L12.8431 12.2558C12.7899 12.6809 12.4285 13 12.0001 13C11.5716 13 11.2102 12.681 11.157 12.2558Z" fill="currentColor"/>
                <circle cx="12" cy="15.7996" r="1.2" fill="currentColor"/>
            </svg>
        </span>
    </label>
    <p class="context">Not deep suffering. The thing you tolerate.</p>
    <textarea class="response" data-save="q1" rows="3"></textarea>
</div>
```

### 8.2 Part Header
```html
<div class="part-header">
    <span class="part-label">Part 1</span>
    <h2>Excavation</h2>
    <p class="part-context">Create brutal awareness of the life you do not want.</p>
</div>
```

### 8.3 Button Group
```html
<div class="hero-buttons">
    <button class="scroll-btn" id="scroll-to-learn">Scroll Down to Read Details</button>
    <button class="start-execute-btn" id="start-execute">Begin the Fix</button>
</div>
```

### 8.4 Stage List
```html
<div class="stages-list">
    <div class="stage">
        <span class="stage-num">1</span>
        <div class="stage-content">
            <strong>Impulsive</strong>
            <p>No separation between impulse and action.</p>
        </div>
    </div>
</div>
```

### 8.5 Callout
```html
<div class="callout">
    <p>If you want a specific outcome in life, you must have the <em>lifestyle</em> that creates that outcome long before you reach it.</p>
</div>
```

### 8.6 Blockquote
```html
<blockquote>
    "Trust only movement. Life happens at the level of events, not of words."
    <cite>— Alfred Adler</cite>
</blockquote>
```

### 8.7 Interrupt Item
```html
<div class="interrupt-item">
    <div class="custom-time-picker" data-reminder="1" data-time="11:00">
        <select class="time-hour">
            <option value="11" selected>11</option>
            <!-- ... other hours ... -->
        </select>
        <span class="time-separator">:</span>
        <select class="time-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30" selected>30</option>
            <option value="45">45</option>
        </select>
    </div>
    <span class="interrupt-q">What am I avoiding right now?</span>
</div>
```

### 8.8 Modal Structure
```html
<div class="synthesis-modal" id="synthesis-modal">
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div class="modal-content">
        <div class="synthesis-card">
            <button class="modal-close" id="modal-close">×</button>
            <div class="synthesis-tabs">
                <button class="synthesis-tab active" data-tab="antivision">Anti-Vision</button>
                <button class="synthesis-tab" data-tab="vision">Vision</button>
            </div>
            <div class="tab-content active" id="tab-antivision">
                <div class="synthesis-text" id="synthesis-antivision">—</div>
            </div>
            <div class="tab-content" id="tab-vision">
                <div class="synthesis-text" id="synthesis-vision">—</div>
            </div>
        </div>
    </div>
</div>
```

---

## 9. Responsive Specifications

### 9.1 Breakpoints
- **Mobile**: `max-width: 640px`
- **Desktop**: Above 640px

### 9.2 Mobile Adjustments

#### Spacing
- Section padding: `60px 0` (from `80px 0`)
- Mode button padding: `8px 12px` (from `8px 16px`)

#### Layout
- Interrupt items: Single column (from 2-column grid)
- Stage/phase items: Column layout (from row)
- Stage/phase numbers: Auto width (from fixed 24px)

#### Typography
- Info tooltip: `10px` font (from `11px`)
- Info tooltip: `280px` max-width (from `320px`)
- Info tooltip: `200px` min-width (from `240px`)
- Info tooltip: `10px 12px` padding (from `12px 16px`)

### 9.3 Print Styles
- Hide all interactive elements
- Show all content (including hidden blocks)
- Reduce padding to `24px 0` per section
- Avoid page breaks inside blocks

---

## 10. Accessibility Considerations

### 10.1 Semantic HTML
- Use proper heading hierarchy
- Use `<label>` for form inputs
- Use `<button>` for interactive elements
- Use `aria-label` for icon-only buttons

### 10.2 Keyboard Navigation
- All interactive elements keyboard accessible
- Escape key closes modals
- Tab order follows visual flow

### 10.3 Focus States
- Inputs maintain background on focus (no outline)
- Buttons use opacity for hover (no focus ring)
- Modal close button accessible via keyboard

---

## 11. Technical Specifications

### 11.1 Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support
- localStorage API
- Notifications API (optional)

### 11.2 Performance
- No external dependencies (except Google Fonts)
- Vanilla JavaScript (no frameworks)
- CSS-only animations
- Minimal DOM manipulation

### 11.3 Data Persistence
- localStorage keys prefixed with `protocol-`
- Theme preference: `protocol-theme`
- Mode preference: `protocol-mode`
- Form responses: `protocol-{data-save-attribute}`
- Reminder times: `protocol-reminder-{id}`

### 11.4 Z-Index Hierarchy
- **Header/Footer**: `z-index: 100`
- **Synthesis Toggle**: `z-index: 98`
- **Modal Backdrop**: `z-index: 200`
- **Modal Content**: `z-index: 201`
- **Tooltip**: `z-index: 1000`

---

## 12. Complete CSS Variable Reference

```css
/* Dark Theme (Default) */
:root {
    --bg: #0f0f0f;
    --fg: #fff;
    --border: rgba(255, 255, 255, 0.15);
    --muted: rgba(255, 255, 255, 0.4);
    --accent: rgba(255, 255, 255, 0.08);
}

/* Light Theme */
[data-theme="light"] {
    --bg: #f5f5f5;
    --fg: #000;
    --border: rgba(0, 0, 0, 0.15);
    --muted: rgba(0, 0, 0, 0.4);
    --accent: rgba(0, 0, 0, 0.08);
}
```

---

## 13. Complete JavaScript Flow Reference

### 13.1 Progressive Reveal Flow Map
```javascript
const flows = {
    // Excavation
    'q1': { next: 'q2-block', revealBtn: null },
    'q2': { next: 'q3-block', revealBtn: null },
    'q3': { next: 'q4-block', revealBtn: null },
    'q4': { next: null, revealBtn: 'continue-antivision' },
    
    // Anti-vision
    'q5': { next: 'q6-block', revealBtn: null },
    'q6': { next: 'q7-block', revealBtn: null },
    'q7': { next: 'q8-block', revealBtn: null },
    'q8': { next: 'antivision-synthesis-block', revealBtn: null },
    'antivision-statement': { 
        next: null, 
        revealBtn: 'continue-vision', 
        updateSynthesis: 'antivision' 
    },
    
    // Vision
    'q9': { next: 'q10-block', revealBtn: null },
    'q10': { next: 'q11-block', revealBtn: null },
    'q11': { next: 'q12-block', revealBtn: null },
    'q12': { next: 'q13-block', revealBtn: null },
    'q13': { next: 'vision-synthesis-block', revealBtn: null },
    'vision-statement': { 
        next: null, 
        revealBtn: 'continue-interrupts', 
        updateSynthesis: 'vision' 
    },
    
    // Synthesis
    's1': { next: 's2-block', revealBtn: null },
    's2': { next: 's3-block', revealBtn: null },
    's3': { next: 's4-block', revealBtn: null },
    's4': { next: 's5-block', revealBtn: null },
    's5': { next: null, revealBtn: 'continue-final' },
};
```

### 13.2 Section Navigation Map
```javascript
const sectionNavigation = {
    'continue-antivision': 'block-antivision',
    'continue-vision': 'block-vision',
    'continue-interrupts': 'block-interrupts',
    'continue-synthesis': 'block-synthesis',
    'continue-final': 'block-final'
};
```

### 13.3 Final Output Mapping
```javascript
const finalOutputMapping = {
    'final-antivision': 'protocol-antivision-statement',
    'final-vision': 'protocol-vision-statement',
    'final-enemy': 'protocol-s2',
    'final-year': 'protocol-s3',
    'final-month': 'protocol-s4',
    'final-tomorrow': 'protocol-s5'
};
```

---

## 14. Success Criteria

This design system documentation enables:
- ✅ Accurate recreation of visual design
- ✅ Consistent component implementation
- ✅ Proper interaction patterns
- ✅ Responsive behavior matching reference
- ✅ Theme switching functionality
- ✅ Progressive reveal flows
- ✅ Auto-save functionality
- ✅ Modal interactions
- ✅ Content hierarchy reproduction
- ✅ Complete JavaScript flow implementation

**All specifications are derived directly from the reference implementation. No speculative or generic design principles are included.**

---

## 15. Quick Reference Checklist

When implementing this design system, ensure:

### Visual Identity
- [ ] All text is 12px
- [ ] All text is uppercase
- [ ] Monospace font (IBM Plex Mono) throughout
- [ ] Opacity used for hierarchy (not font sizes)
- [ ] 640px max-width containers
- [ ] 8px border-radius on all rounded elements
- [ ] Monochrome color scheme maintained

### Components
- [ ] Buttons use opacity hover states
- [ ] Inputs have proper background colors
- [ ] Modals use backdrop blur
- [ ] Tooltips appear on info icon hover
- [ ] All interactive elements have transitions

### Layout
- [ ] Single column layout maintained
- [ ] 80px section padding (60px mobile)
- [ ] 48px header/footer heights
- [ ] Proper spacing scale (multiples of 4px)

### Interactions
- [ ] Progressive reveal after 10+ characters
- [ ] Auto-save with 500ms debounce
- [ ] Smooth scrolling enabled
- [ ] Theme toggle persists preference
- [ ] Modal closes on Escape key

### Content
- [ ] All text uppercase
- [ ] Direct, challenging questions
- [ ] Minimal context text
- [ ] Consistent voice throughout

---

**Document Version**: 1.0  
**Last Updated**: Based on reference implementation analysis  
**Status**: Complete specification for AI training and implementation
