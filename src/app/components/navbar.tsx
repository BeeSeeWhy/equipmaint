"use client";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-gray-800 border-r-2 border-white">
      <ul className="flex gap-4 list-none text-xl">
        <li>
          <Link href="/" legacyBehavior>
            <a style={styles.link}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/equipment-form" legacyBehavior>
            <a style={styles.link}>Equipment Form</a>
          </Link>
        </li>
        <li>
          <Link href="/maintenance" legacyBehavior>
            <a style={styles.link}>Maintenance Record Form</a>
          </Link>
        </li>
        <li>
          <Link href="/equiptable" legacyBehavior>
            <a style={styles.link}>Equipment Table</a>
          </Link>
        </li>
        <li>
          <Link href="/mainttable" legacyBehavior>
            <a style={styles.link}>Maintenance Record Table</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { padding: "1rem", backgroundColor: "#333" },
  navList: { listStyleType: "none", display: "flex", gap: "1rem" },
  link: { color: "#fff", textDecoration: "none" },
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
