const Thumb = ({ src, alt = '', width = 60, height = 48 }) => (
  <div
    style={{ flexShrink: 0, width, height, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E2E3FF' }}
  >
    <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

export default Thumb;
