import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { LogOut, LayoutDashboard, Brush } from "lucide-react";
import { AlignJustify, X } from "lucide-react";
import { THEMES } from "../Lib/Themes";
const Navbar = () => {
  const { Logout, AuthUser, setSidebar, openSidebar, setAllDisable, setTheme } =
    useAuthStore();
  const [themesDialog, setThemeDialog] = useState(false);
  return (
    <>
      <nav
        className={`w-full bg-base-200 px-6 py-3 z-10 shadow-md ${
          !AuthUser && "fixed"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center gap-5">
            {AuthUser ? (
              <>
                <button
                  className="btn hover:bg-base-300 p-2 rounded-full"
                  onClick={() => {
                    if (openSidebar) setSidebar(false);
                    else setSidebar(true);
                  }}
                >
                  <AlignJustify className="rounded-f" />
                </button>
              </>
            ) : (
              ""
            )}
            <Link
              to="/"
              onClick={() => {
                setAllDisable();
              }}
              className="text-2xl font-bold  flex items-center gap-2"
            >
              <LayoutDashboard className="h-6 w-6" />
              Portal
            </Link>
          </div>
          {AuthUser ? (
            <button
              onClick={Logout}
              className="flex cursor-pointer justify-center items-center gap-2 bg-base-100 hover:bg-red-500  px-4 py-2 rounded-md transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            ""
          )}
          <button
            className="btn btn-accent"
            onClick={() => {
              setThemeDialog(true);
            }}
          >
            <Brush className="w-1/2 h-1/2" />
            <span className="hidden sm:inline">Themes</span>
          </button>
        </div>
      </nav>
      {themesDialog && (
        <>
          <div
            className="fixed inset-0  bg-black bg-opacity-40 z-40"
            onClick={() => setThemeDialog(false)}
          />
          <div className="fixed z-50 top-1/2 left-1/2 w-96 max-h-[80vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-base-100 p-5 rounded-2xl shadow-lg border border-base-300">
            <div className="flex justify-center items-center gap-4">
              <X
                className="absolute left-5 top-5"
                onClick={() => {
                  setThemeDialog(false);
                }}
              ></X>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Choose Theme
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme}
                  className="btn btn-sm w-full capitalize"
                  onClick={() => {
                    setTheme(theme);
                    setThemeDialog(false);
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
