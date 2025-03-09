module.exports = {
  content: [
    './*.{html,js,jsx}'
  ],
  safelist: [{
    pattern: /./,
    variants: ['md', 'lg', 'xl', 'text'],
  }],
  theme: {
    screens: {
      // 'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '640px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  }
}
