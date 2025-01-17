"use client";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}

            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="true"
              onClick={handleMenuToggle}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="bg-white text-black rounded-md px-3 py-2 text-xl font-medium hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >
                EquipMaint
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/equipment-form"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Equipment Form
                </Link>
                <Link
                  href="/maintenance-form"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Maintenance Record Form
                </Link>
                <Link
                  href="/equipment-table"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Equipment Table
                </Link>
                <Link
                  href="/mainttable"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Maintenance Records Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        // Mobile menu, show/hide based on menu state.
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="/equipment"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              aria-current="page"
            >
              Equipment Form
            </a>
            <a
              href="/maintenance"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Maintenance Record Form
            </a>
            <a
              href="/equiptable"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Equipment Table
            </a>
            <a
              href="/mainttable"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Maintenance Records Table
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/*  <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              className="sm:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
            <NavbarBrand>
              <p className="font-bold text-inherit">Equipmaint</p>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Equipment Form
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Maintenance Record Form
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Equipment Table
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Maintenance Records Table
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Dashboard
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar> 
*/
