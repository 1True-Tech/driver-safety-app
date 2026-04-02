import '../../styles/components/Badge.css';

function Badge({ status, children }) {
  const statusClass = status === 'licensed' ? 'badge-success' : 'badge-danger';
  
  return (
    <span className={`badge ${statusClass}`}>
      {children}
    </span>
  );
}

export default Badge;
