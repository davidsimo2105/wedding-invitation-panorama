# Images Folder

This folder is for storing images used in the wedding invitation website.

## How to Use

1. **Add your images here**: Simply drag and drop or copy your image files into this folder

2. **Supported formats**: 
   - JPEG/JPG (.jpg, .jpeg)
   - PNG (.png)
   - WebP (.webp)
   - SVG (.svg)
   - GIF (.gif)

3. **Reference in code**: Use the path `/images/your-image-name.jpg`

## Example Usage in Next.js

```jsx
// Using Next.js Image component (recommended)
import Image from 'next/image'

<Image 
  src="/images/photo.jpg" 
  alt="Description"
  width={500}
  height={300}
/>

// Using regular img tag
<img src="/images/photo.jpg" alt="Description" />
```

## Suggested Image Names

- `couple-photo.jpg` - Main photo of the couple
- `venue.jpg` - Photo of the wedding venue
- `hero-bg.jpg` - Hero section background
- `gallery-1.jpg`, `gallery-2.jpg`, etc. - Gallery photos

## Tips

- Optimize images before uploading (use tools like TinyPNG, Squoosh)
- Use descriptive file names
- Keep file sizes reasonable for web (< 500KB per image recommended)
