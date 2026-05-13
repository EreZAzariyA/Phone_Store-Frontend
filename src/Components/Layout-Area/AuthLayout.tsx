import { NavLink, Outlet } from "react-router-dom";
import { FiArrowLeft, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../Utils/useTheme";

const AuthLayout = () => {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <header className={[
        "relative z-[1050] border-b backdrop-blur-xl",
        isDark
          ? "border-white/10 bg-ps-bg/88"
          : "border-stone-300/70 bg-[#f6f4ef]/92",
      ].join(" ")}>
        <div className="store-shell">
          <div className="flex min-h-[76px] items-center justify-between">
            <NavLink
              to="/"
              className="font-display text-2xl uppercase tracking-[0.16em] text-stone-950 no-underline transition-colors hover:text-gold dark:text-white"
            >
              Phone-Store
            </NavLink>

            <div className="flex shrink-0 items-center gap-2">
              <NavLink
                to="/"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/75 text-stone-800 shadow-sm no-underline transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-white/5 dark:text-gray-200 sm:w-auto sm:rounded-none sm:px-4 sm:text-xs sm:font-semibold sm:uppercase sm:tracking-[0.14em]"
                aria-label="Back to store"
              >
                <FiArrowLeft size={14} />
                <span className="hidden sm:inline">Store</span>
              </NavLink>
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/75 text-stone-800 shadow-sm transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
