import { NavLink } from "react-router-dom";
import { FiMail, FiShield, FiPackage } from "react-icons/fi";
import { logout } from "../Layout-Area/Header";
import Role from "../../Models/role";
import UserModel from "../../Models/user-model";

const ProfilePage = (props: { user: UserModel }) => {
  const { user } = props;

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("");

  const roleLabel = user?.roleId === Role.Admin ? "Admin" : "User";
  const isAdmin = user?.roleId === Role.Admin;

  return (
    <div className="flex justify-center items-start py-16 px-4 min-h-[60vh]">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-ps-border bg-white dark:bg-ps-card p-8 flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center text-2xl font-display font-semibold text-gold bg-gold/5">
          {initials || "?"}
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="font-display text-2xl text-gray-900 dark:text-gray-100 mb-1">
            {user?.firstName} {user?.lastName}
          </h1>
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
            isAdmin
              ? 'text-blue-500 bg-blue-500/10 border-blue-500/20'
              : 'text-gold bg-gold/10 border-gold/20'
          }`}>
            {roleLabel}
          </span>
        </div>

        {/* Info rows */}
        <div className="w-full border border-gray-100 dark:border-ps-border rounded-xl overflow-hidden mt-2">
          {[
            { icon: <FiMail size={15} />, label: 'Email', value: user?.email },
            { icon: <FiShield size={15} />, label: 'Role', value: roleLabel },
          ].map(({ icon, label, value }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-ps-border' : ''}`}>
              <span className="text-gold">{icon}</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 w-12">{label}</span>
              <span className="text-sm text-gray-700 dark:text-gray-200 ml-auto truncate">{value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full mt-2">
          {user?.roleId === Role.User && (
            <NavLink
              to="/my-orders"
              className="flex items-center justify-center gap-2 btn-gold py-2.5 no-underline"
            >
              <FiPackage size={16} /> My Orders
            </NavLink>
          )}
          <button type="button" className="w-full rounded-lg border border-red-400/40 px-4 py-2.5 text-red-400 transition-colors hover:bg-red-500/10" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
