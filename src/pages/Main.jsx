import { useAuth } from "../auth/AuthContext";
import { NavLink, Outlet} from "react-router-dom";

export default function Main() {
  const { user, logout } = useAuth();

  return (
 <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 border-r border-gray-200 p-6">
        <p className="mb-6">
          Welcome, <b>{user?.username}</b>.
        </p>
        <button
          onClick={logout}
          className="mb-8 w-full rounded bg-red-600 text-white px-4 py-2 hover:bg-red-700"
        >
          Logout
        </button>

        <nav className="flex flex-col gap-3 text-sm">
          <NavLink
            to="createpackage"
            className={({ isActive }) =>
              `rounded px-3 py-2 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Create Package
          </NavLink>
          <NavLink
            to="createuser"
            className={({ isActive }) =>
              `rounded px-3 py-2 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Create User
          </NavLink>
          <NavLink
            to="createcustomer"
            className={({ isActive }) =>
              `rounded px-3 py-2 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Create Customer
          </NavLink>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
