
import TopbarTitle from "./TopbarTitle";
import TopbarActions from "./TopbarActions";
import EnvironmentPanel from "./EnvironmentPanel";
import GlobalSearch from "./GlobalSearch";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

import useTopbar from "../../../hooks/useTopbar";

export default function Topbar({ onMenuClick }) {
  const {
    title,
    apiUrl,
    health,
    checking,

    searchOpen,
    searchQuery,
    setSearchQuery,
    setSearchOpen,
    handleSearch,
    searchStatus,
    searching,

    environmentOpen,
    setEnvironmentOpen,
    toggleEnvironment,
    checkHealth,
    goToDashboard,

    logoutConfirmOpen,
    setLogoutConfirmOpen,
    confirmLogout,
    navigate,
  } = useTopbar();

  return (
    <>
      <header className="theme-bg theme-border sticky top-0 z-30 flex min-h-[68px] w-full min-w-0 items-center justify-between gap-2 border-b px-3 py-3 backdrop-blur-xl transition-colors duration-200 sm:min-h-[76px] sm:gap-4 sm:px-5 md:px-7">
        <TopbarTitle
          title={title}
          onMenuClick={onMenuClick}
        />

        <TopbarActions
          health={health}
          environmentOpen={environmentOpen}
          onToggleEnvironment={toggleEnvironment}
          onSearch={() => {
            setSearchQuery("");
            setSearchOpen(true);
          }}
          onOpenDetections={() => navigate("/detections")}
          onLogout={() => setLogoutConfirmOpen(true)}
        />
      </header>

      {environmentOpen && (
        <EnvironmentPanel
          health={health}
          checking={checking}
          checkHealth={checkHealth}
          apiUrl={apiUrl}
          onClose={() => setEnvironmentOpen(false)}
          onDashboard={goToDashboard}
        />
      )}

      <GlobalSearch
        open={searchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        onSubmit={handleSearch}
        searchStatus={searchStatus}
        searching={searching}
      />

      <LogoutConfirmationModal
        isOpen={logoutConfirmOpen}
        onCancel={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}
