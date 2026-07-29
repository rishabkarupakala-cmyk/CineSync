import { AuthProvider } from "../context/AuthContext";
import { TrailerProvider } from "../context/TrailerContext";
import { WatchlistProvider } from "../context/WatchlistContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <TrailerProvider>
          {children}
        </TrailerProvider>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default AppProviders;