import React, { useState, useRef } from "react";
import { LogOut, Edit2 } from "lucide-react"; // icons

export default function AdminMenu({
  initialName = "Admin",
  initialEmail = "admin@example.com",
  onSave,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Profile state
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef(null);

  function handleSave(e) {
    e.preventDefault();
    const payload = { name: name.trim(), email: email.trim(), avatar };
    if (!payload.name || !payload.email)
      return alert("Please enter name and email.");
    if (onSave) onSave(payload);
    setProfileOpen(false);
  }

  function handleFile(ev) {
    const f = ev.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(f);
  }

  return (
    <>
      {/* Avatar trigger */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition focus:outline-none"
        >
          <div
            className="h-10 w-10 rounded-full grid place-items-center text-xl shadow-sm"
            style={{ background: "linear-gradient(135deg,#f97316,#fb7185)" }}
            title="Admin"
          >
            <span className="select-none">🧑‍🍳</span>
          </div>

          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold leading-tight">Admin</div>
            <div className="text-xs text-slate-500">Super Admin</div>
          </div>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border py-2 z-40 animate-fade-in">
            <button
              onClick={() => {
                setProfileOpen(true);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition"
            >
              <Edit2 className="w-4 h-4 text-slate-600" />
              Update profile
            </button>
            <button
              onClick={() => {
                setLogoutOpen(true);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-slate-50 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Update Profile Modal */}
      {profileOpen && (
        <Modal onClose={() => setProfileOpen(false)}>
          <div className="w-full max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-center mb-2">
              Update Profile
            </h3>
            <p className="text-sm text-center text-slate-500 mb-4">
              Make your profile shine ✨
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex gap-4 items-center justify-center">
                <div className="relative">
                  <div
                    className="h-20 w-20 rounded-full grid place-items-center text-2xl shadow-md"
                    style={{
                      background: "linear-gradient(135deg,#60a5fa,#7c3aed)",
                    }}
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <span>🧑‍🍳</span>
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute -right-2 -bottom-2 bg-white border rounded-full p-1 shadow cursor-pointer"
                    title="Change avatar"
                  >
                    ✏️
                  </label>
                  <input
                    id="avatar-upload"
                    ref={fileRef}
                    onChange={handleFile}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs text-slate-500">
                    Full name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-95 shadow"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Logout Confirmation Modal */}
      {logoutOpen && (
        <Modal onClose={() => setLogoutOpen(false)}>
          <div className="max-w-sm w-full text-center">
            <div className="text-6xl mb-2">👋</div>
            <h3 className="text-lg font-semibold">Confirm Logout</h3>
            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to logout? You can always sign back in.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setLogoutOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  setLogoutOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white shadow"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

/* -----------------------
   Centered Modal Component
   ----------------------- */
function Modal({ children, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
      />

      {/* Centered modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border p-6 
                     max-h-[90vh] overflow-auto transform animate-pop-in"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition"
            aria-label="Close"
          >
            ✕
          </button>
          {children}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-pop-in {
          animation: popIn 0.25s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
