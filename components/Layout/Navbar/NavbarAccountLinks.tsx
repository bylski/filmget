import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Navbar/NavbarAccountLinks.module.scss";

const NavbarAccountLinks: React.FC = () => {
  const router = useRouter();

  const [selectedLink, setSelectedLink] = useState<string | null>();
  useEffect(() => {
    const slicedPath = router.pathname.slice(1, router.pathname.length);
    setSelectedLink(slicedPath);
  }, [router.pathname]);

  const linkBasicClass = styles["link__container"];
  const linkActiveClass = `${styles["link__container"]} ${styles["link--active"]}`;

  return (
    <ul className={styles["nav-links__account"]}>
      <li
        className={selectedLink === "login" ? linkActiveClass : linkBasicClass}
      >
        <Link href="/login">
          <a className={styles["link"]}>LOGIN</a>
        </Link>
      </li>
      <li
        className={selectedLink === "register" ? linkActiveClass : linkBasicClass}
      >
        <Link href="/register">
          <a className={styles["link"]}>REGISTER</a>
        </Link>
      </li>
    </ul>
  );
};

export default NavbarAccountLinks;
