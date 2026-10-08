import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import { NavContainer, NavLogo, NavIconButton, NavSpacer, NavAvatar, NavProfilePopover } from "../ui/nav";

const IconMessages = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const NavSidebar = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile } = useAuthContext();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <NavContainer>
      <NavLogo>Z</NavLogo>

      <NavIconButton
        active={pathname.startsWith("/chathub")}
        onClick={() => navigate({ to: "/chathub" })}
        title="Messages"
      >
        <IconMessages />
      </NavIconButton>

      <NavSpacer />

      <NavProfilePopover
        open={profileOpen}
        email={profile?.email}
        onSettings={() => { setProfileOpen(false); navigate({ to: "/settings" }); }}
        onClose={() => setProfileOpen(false)}
      />
      <NavAvatar
        src={profile?.avatar}
        initial={profile?.email?.charAt(0).toUpperCase()}
        onClick={() => setProfileOpen((v) => !v)}
      />
    </NavContainer>
  );
};
