# XFUSE Project Guidelines

## Performance Optimization Guidelines

### Fonts & Typography
- ✅ Use only 2 font weights: 400 (normal) and 700 (bold)
- ✅ Combine font requests into single URL: `family=El+Messiri:wght@400;700&family=Playpen+Sans:wght@400`
- ✅ Always use `font-display: swap` for better performance
- ✅ Use preconnect for Google Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>`

### Image Optimization
- ✅ Use WebP format when possible
- ✅ Mobile images should be ≤ 800px wide
- ✅ Icons should be ≤ 96px
- ✅ Use `loading="lazy"` for all images below the fold
- ✅ Set explicit width and height attributes to prevent CLS
- ✅ Use `fetchpriority="high"` only for hero/critical images

### Critical Resource Loading
```html
<!-- Add these to <head> for preconnections -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://i.postimg.cc" crossorigin>
```

### CSS & JavaScript
- ✅ Inline critical CSS for above-the-fold content
- ✅ Use `defer` or `async` for non-critical scripts
- ✅ Group DOM reads and writes in `requestAnimationFrame`
- ✅ Use `transform` and `opacity` for animations (not `top`/`left`)
- ✅ Add `content-visibility: auto` for below-the-fold sections

### Motion & Animations
- ✅ Respect `prefers-reduced-motion` setting
- ✅ Use durations: 280-360ms for transitions
- ✅ Use `cubic-bezier(0.22, 1, 0.36, 1)` easing
- ✅ Add `will-change: transform` only during active animations
- ✅ Use `motion-element` class for performance optimization

### SEO
- Use proper heading hierarchy (h1 → h6)
- Implement structured data (JSON-LD)
- Add appropriate meta tags
- Use canonical URLs
- Implement proper OpenGraph tags

## Design System Guidelines

### Typography
- Base font-size: 17px (18px on desktop)
- Use system fonts as fallbacks: `'Playpen Sans', system-ui, sans-serif`
- Arabic text: `'El Messiri', system-ui, sans-serif`

### Colors & Gradients
- Primary gradient: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)`
- Use CSS custom properties for consistent theming
- Support both light and dark modes

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (md), 1024px (lg)
- Use `clamp()` for fluid typography
- Always test on mobile devices

### RTL Support
- Use logical properties when possible
- Test all components in both LTR and RTL modes
- Use `space-x-reverse` for RTL spacing
- Ensure gradient text works in RTL

### Performance Targets
- **FCP (First Contentful Paint)**: < 1.8s on mobile
- **LCP (Largest Contentful Paint)**: < 2.5s on mobile  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.8s on mobile

## Component Guidelines

### Hero Section
- Use `fetchpriority="high"` for hero images
- Implement image carousel with proper loading
- Ensure CTA buttons are accessible and responsive

### Navigation
- Desktop: Full horizontal navigation
- Mobile: Horizontal scrollable bar (no hamburger menu)
- Support RTL navigation
- Include active state indicators

### Animations
- Use Motion/React for smooth animations
- Implement scroll-triggered animations
- Ensure animations are accessible
- Add loading states for dynamic content

### Images
- Use `ImageWithFallback` component for images
- Implement proper alt text for accessibility
- Use appropriate aspect ratios
- Optimize for different screen sizes

## Code Quality

### React Best Practices
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Use useMemo and useCallback appropriately
- Keep components focused and reusable

### Styling
- Use Tailwind CSS with design tokens
- Avoid inline styles unless necessary
- Use CSS custom properties for theming
- Follow BEM methodology for custom CSS

### Accessibility
- Use semantic HTML elements
- Implement proper focus management
- Add ARIA labels where needed
- Test with keyboard navigation
- Ensure color contrast meets WCAG guidelines

## Accessibility Guidelines

### Links & Buttons
- ✅ Every link must have a descriptive name instead of just an icon
- ✅ If link is image/icon only, add screen reader accessible name with `aria-label`
- ✅ All buttons must have clear functional names describing their purpose
- ✅ Slider/carousel buttons should be understandable for blind users ("Go to slide 1")
- ✅ Use `aria-current="page"` for active navigation items
- ✅ External links should include "Opens in new window" in `aria-label`

### Form Inputs
- ✅ Connect every input field (Name, Email, Company, Message) with proper labels
- ✅ Use `htmlFor` attribute to link labels with inputs
- ✅ Required fields must have `aria-required="true"` and visual indicator
- ✅ Add placeholder text for guidance
- ✅ Include error containers with `aria-live="polite"`
- ✅ Use `noValidate` on forms to control validation messaging

### Images & Media
- ✅ All images must have descriptive `alt` text
- ✅ Decorative images should have `aria-hidden="true"` or empty alt=""
- ✅ Use `fetchpriority="high"` for critical images (logo, hero)
- ✅ Interactive elements should be keyboard accessible with `tabIndex`

### Keyboard Navigation
- ✅ All interactive elements must be keyboard accessible
- ✅ Implement arrow key navigation for carousels/sliders
- ✅ Use `role` attributes for complex components
- ✅ Ensure focus indicators are visible and clear
- ✅ Support keyboard shortcuts where appropriate

### Screen Readers
- ✅ Use `.sr-only` class for screen reader only content
- ✅ Add `aria-label` for complex interactions
- ✅ Use `aria-describedby` for additional context
- ✅ Implement `aria-live` regions for dynamic content
- ✅ Use semantic HTML structure (headings hierarchy)

### Color & Contrast
- ✅ Ensure color contrast meets WCAG AA standards (4.5:1 for normal text)
- ✅ Don't rely solely on color to convey information
- ✅ Provide alternative text descriptions for important visual elements

### Motion & Animation
- ✅ Respect `prefers-reduced-motion` setting
- ✅ Provide alternatives for motion-based interactions
- ✅ Ensure animations don't trigger seizures (avoid rapid flashing)