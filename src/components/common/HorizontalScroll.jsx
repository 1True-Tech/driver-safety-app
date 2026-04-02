import '../../styles/components/HorizontalScroll.css';

function HorizontalScroll({ title, children }) {
  return (
    <div className="horizontal-scroll-container">
      {title && <h4 className="horizontal-scroll-title">{title}</h4>}
      <div className="horizontal-scroll">
        {children}
      </div>
    </div>
  );
}

export default HorizontalScroll;
