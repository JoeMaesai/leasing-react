import { useAuth } from "../auth/AuthContext";

export default function Main() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Main</h1>
      <p className="mb-4">Welcome, <b>{user?.username}</b>.</p>
      <button
        onClick={logout}
        className="rounded bg-red-600 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
