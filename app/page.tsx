import ProtectedRoute from "../components/ProtectedRoute";

export default function AppMain() {
  return (
    <div>
      <ProtectedRoute>
        <h1>AppMain Page</h1>
        <h2>Lotto Service</h2>
      </ProtectedRoute>
    </div>
  );
}
