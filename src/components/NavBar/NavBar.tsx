import { FC, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


import LogoAffinidi from "public/images/logo-affinidi.svg";
import CartIcon from "public/images/cart-icon.png";
import { clientLogin } from "src/lib/auth/client-login";

import Box from "src/components/Box/Box";
import IconPersonFilled from "public/images/icon-person-filled.svg";

import { useAuthentication } from "src/lib/hooks/use-authentication";
import { useLocalContent } from "src/lib/hooks/use-local-content";

import * as S from "./NavBar.styled";

const NavBar: FC = () => {
  const [isSignInPage, setIsSignInPage] = useState(false);
  const [confirmLogOut, setConfirmLogOut] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuthentication();
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("home");

  const { country } = useLocalContent();
  const router = useRouter();

  const fullName = `${user?.givenName} ${user?.familyName}`;

  const confirmUserLogOut = () => setConfirmLogOut(true);
  const cancleConfirmUserLogOut = () => setConfirmLogOut(false);

  async function handleUserLogOut() {
    if (confirmLogOut) {
      await signOut();
    }
  }

  return (
    <>
      <div
        className={`lg:hidden md:hidden sm:flex bg-blue-500 overflow-hidden gap-8 flex flex-col items-center justify-center text-[#fbfbfb] px-4 transition-all duration-300 ${showMenu ? "min-h-[200px]" : "h-[0px]"
          }`}
      >
        <ul className="flex flex-col items-center gap-2 text-center">
          <li>
            <Link
              href="/"
              className={`capitalize cursor-pointer text-[14px] lg:text-[18px] md:text-[18px] sm:text-[16px] ${active === "home"
                  ? "underline underline-offset-2"
                  : "no-underline"
                }`}
              onClick={() => setActive("home")}
            >
              <span className="text-[18px]">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`capitalize cursor-pointer text-[14px] lg:text-[18px] md:text-[18px] sm:text-[16px] ${active === "about"
                  ? "underline underline-offset-2"
                  : "no-underline"
                }`}
              onClick={() => setActive("about")}
            >
              <span className="text-[18px]">About</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`capitalize cursor-pointer text-[14px] lg:text-[18px] md:text-[18px] sm:text-[16px] ${active === "contact"
                  ? "underline underline-offset-2"
                  : "no-underline"
                }`}
              onClick={() => setActive("contact")}
            >
              <span className="text-[18px]">Contact Us</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between px-12 h-[80px] lg:px-20 md:px-18 sm:px-16">
        <S.Title $isLocal={country} onClick={() => router.push("/")}>
          SHOOPY
        </S.Title>

        {!isSignInPage && (
          <>
            <div>
              {isLoading && <S.Loading $isLocal={country}>Loading...</S.Loading>}

              {!isLoading && !isAuthenticated && (
                <Box gap={20} justifyContent="end" alignItems="center" direction="row">
                  <button className="bg-blue-500 min-w-[150px] text-[16px] text-slate-50 flex gap-5 py-5 px-8 items-center" onClick={clientLogin}>
                    <Image src={LogoAffinidi} alt="logo affinidi" />
                    Affinidi Login
                  </button>
                </Box>
              )}

              {!isLoading && isAuthenticated && (
                <S.Account
                  direction="row"
                  alignItems="center"
                  justifyContent="end"
                  gap={16}
                >
                  <Image
                    width={24}
                    height={24}
                    src={CartIcon}
                    alt="menu--v6"
                    onClick={() => router.push("/cart")}
                  />
                  {!confirmLogOut && (
                    <S.Avatar $isLocal={country}>
                      <Image width={100} height={100} style={{ borderRadius: '50%' }} src={user?.picture || IconPersonFilled} alt="avatar" />
                    </S.Avatar>
                  )}
                  <S.Email $isLocal={country} onClick={confirmUserLogOut}>
                    { !confirmLogOut && fullName }
                  </S.Email>

                  {confirmLogOut && (
                    <div className="logout_btn flex items-center">
                      <button onClick={handleUserLogOut}>Log out</button>
                      <button onClick={cancleConfirmUserLogOut} className="px-7 flex items-center justify-center bg-red-500 text-slate-50 hover:bg-red-600">x</button>
                    </div>
                  )}
                </S.Account>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
