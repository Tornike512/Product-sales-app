import "../SidebarSkeleton/SidebarSkeleton.css";

export default function SidebarSkeleton() {
  const placeholderItems = Array(17).fill(null);

  return (
    <div className="wrapper">
      <aside className="sidebar">
        <div className="skeleton-header"></div>
        <ul className="category-list">
          {placeholderItems.map((_, index) => {
            return (
              <li key={index} className="category-item">
                <div className="skeleton-link"></div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
