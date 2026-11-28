// Page-width wrapper used by every section.
// max-w-360 = 1440px; with px-20 (80px) each side and border-box sizing,
// the content area is exactly 1280px, as in Figma. Wider screens just
// add margin, so the content never grows past 1280px.
// md:px-10 (40px at tablet) is our own choice, not in Figma: see docs/decisions.md.
export default function Container({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`mx-auto w-full max-w-360 px-4 md:px-10 lg:px-20 ${className}`}>
      {children}
    </Tag>
  )
}
