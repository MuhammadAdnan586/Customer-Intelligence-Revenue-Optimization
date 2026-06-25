/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#0A0D14",
        surface:   "#111827",
        surface2:  "#1A2235",
        border:    "#1E2D3D",
        borderHi:  "#2D4060",
        ink:       "#E2E8F0",
        muted:     "#64748B",
        subtle:    "#94A3B8",
        indigo:    "#818CF8",
        indigoDim: "#3730A3",
        emerald:   "#34D399",
        emeraldDim:"#065F46",
        amber:     "#FBBF24",
        amberDim:  "#78350F",
        rose:      "#F87171",
        roseDim:   "#7F1D1D",
        violet:    "#C084FC",
        chart1:    "#818CF8",
        chart2:    "#34D399",
        chart3:    "#FBBF24",
        chart4:    "#F87171",
        chart5:    "#C084FC",
        chart6:    "#38BDF8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
        sm:   "6px",
      },
      boxShadow: {
        card:  "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        glow:  "0 0 20px rgba(129,140,248,0.15)",
        glowG: "0 0 20px rgba(52,211,153,0.15)",
      },
    },
  },
  plugins: [],
};