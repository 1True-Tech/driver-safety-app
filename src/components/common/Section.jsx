import '../../styles/components/Section.css';

function Section({ title, children }) {
  return (
    <section className="section">
      {title && <h3 className="section-title">{title}</h3>}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}

export default Section;
