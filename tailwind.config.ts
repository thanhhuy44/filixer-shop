import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     container: {
      center: true,
      padding: "12px"
     },
     boxShadow: {
      'card': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
     },
     listStyleType: {
      check: 'url("/assets/images/check.png")'
     },
     colors: {
      primary: {
        100: "#56B280"
      }
     }
    },
  },
  plugins: [],
}
export default config
