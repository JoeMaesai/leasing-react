import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="p-6">
      {/* All pages will render here */}
      <Outlet />
    </div>
  );
}

export default App;
