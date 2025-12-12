import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'adcci-primary': '#0066CC',
        'adcci-secondary': '#00A859',
        'adcci-accent': '#F5A623',
      },
    },
  },
  plugins: [],
}
export default config