'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Toolbar,
  Typography,
  Collapse,
  Alert,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
  ExpandMore,
  Language,
} from "@mui/icons-material";


const Header: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const [showBanner, setShowBanner] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutAnchor, setAboutAnchor] = useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [mobileLangAnchor, setMobileLangAnchor] = useState<null | HTMLElement>(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string>("");
  const popperRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [mounted, setMounted] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangAnchor(null);
    setMobileLangAnchor(null);
  };




  const normalizePath = (path: string) => path.replace(/\/+$/, "");
  const isActiveLink = (href: string) => normalizePath(pathname) === normalizePath(href);


  const isAboutActive = ["/about", "/customer-moment", "/gallery"].includes(
    pathname
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.menuPrices'), href: "/menu" },
    { label: t('nav.featuredProducts'), href: "/featured-products" },
  ];

  const aboutItems = [
    { label: t('nav.aboutSpa'), href: "/about" },
    { label: t('nav.happyGuests'), href: "/customer-moment" },
    { label: t('nav.gallery'), href: "/gallery" },
  ];

  const rightNavItems = [
    { label: t('nav.contact'), href: "/contacts" },
    { label: t('nav.bookOnline'), href: "/reservation" },
  ];

  const drawer = (
    <Box sx={{ height: "100vh", bgcolor: "white" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: "#9b165d" }}
        >
          <Close sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>

      <List sx={{
        px: 3, py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "calc(100vh - 80px)",
        justifyContent: "flex-start",
      }}>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding >
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                textTransform: "uppercase",
                color: isActiveLink(item.href) ? "#9b165d" : "#1a1a1a",
                fontWeight: isActiveLink(item.href) ? 600 : 500,
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                p: 0,
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            sx={{
              textTransform: "uppercase",
              color: isAboutActive ? "#9b165d" : "#1a1a1a",
              fontWeight: isAboutActive ? 600 : 500,
              fontSize: "0.95rem",
              letterSpacing: "0.05em",
              p: 0,
            }}
          >
            <ListItemText primary={t('nav.about')} />
            <ExpandMore
              sx={{
                transform: mobileAboutOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s",
              }}
            />
          </ListItemButton>
        </ListItem>

        <Collapse in={mobileAboutOpen} timeout="auto" unmountOnExit>
          <List sx={{ pl: 2 }}>
            {aboutItems.map((item) => (
              <ListItem key={item.href} disablePadding sx={{ mb: 2 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    color: isActiveLink(item.href) ? "#9b165d" : "#1a1a1a",
                    fontWeight: isActiveLink(item.href) ? 600 : 400,
                    fontSize: "0.95rem",
                    letterSpacing: "0.03em",
                    p: 0,
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {rightNavItems.map((item) => (
          <ListItem key={item.href} disablePadding >
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                textTransform: "uppercase",
                color: isActiveLink(item.href) ? "#9b165d" : "#1a1a1a",
                fontWeight: isActiveLink(item.href) ? 600 : 500,
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                p: 0,
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const aboutActive = isAboutActive;

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (aboutAnchor && popperRef.current) {
        const buttonRect = aboutAnchor.getBoundingClientRect();
        const popperRect = popperRef.current.getBoundingClientRect();

        const insideButton =
          e.clientX >= buttonRect.left &&
          e.clientX <= buttonRect.right &&
          e.clientY >= buttonRect.top &&
          e.clientY <= buttonRect.bottom;

        const insidePopper =
          e.clientX >= popperRect.left &&
          e.clientX <= popperRect.right &&
          e.clientY >= popperRect.top &&
          e.clientY <= popperRect.bottom;

        // Set aboutHovered dựa trên vị trí chuột
        if (insideButton || insidePopper) {
          setAboutHovered(true);
        } else {
          setAboutHovered(false);
        }

        if (!insideButton && !insidePopper) {
          if (!closeTimeout.current) {
            closeTimeout.current = setTimeout(() => {
              setAboutAnchor(null);
              closeTimeout.current = null;
            }, 150);
          }
        } else if (closeTimeout.current) {
          clearTimeout(closeTimeout.current);
          closeTimeout.current = null;
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [aboutAnchor]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Banner */}
      {showBanner && (
        <Alert
          severity="info"
          onClose={() => setShowBanner(false)}
          sx={{
            background: "linear-gradient(to right, #9e2265, #b12876, #c42e87)",
            color: "white",
            borderRadius: 0,
            py: 0.5,
            fontSize: "14px",
            fontFamily: "'Open Sans', sans-serif",
            "& .MuiAlert-message": {
              width: "100%",
              textAlign: "center",
            },
            "& .MuiAlert-icon": {
              display: "none",
            },
          }}
        >
          <Typography component="span" sx={{ fontWeight: "bold", color: "#f3f900", mr: 1, fontFamily: "'Open Sans', sans-serif", fontSize: '16px' }}>
            {t('banner.hot')}
          </Typography>
          {t('banner.discount')}
        </Alert>
      )}

      {/* Contact Info Bar */}
      <Box sx={{ bgcolor: "white", borderBottom: 1, borderColor: "grey.200", py: 2 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 6 }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ fontSize: 14, fontFamily: "'Open Sans', sans-serif" }}

          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "#9b165d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Phone sx={{ color: "white", fontSize: 14 }} />
              </Box>
              <Typography
                component="a"
                href="tel:+84976591515"
                sx={{ color: "#333", textDecoration: "none", fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
              >
                +84 976 591 515
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "#9b165d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Email sx={{ color: "white", fontSize: 14 }} />
              </Box>
              <Typography
                component="a"
                href="mailto:info@senspadanang.com"
                sx={{ color: "#333", textDecoration: "none", fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
              >
                info@senspadanang.com
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: "auto !important", mr: 2 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "#9b165d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocationOn sx={{ color: "white", fontSize: 14 }} />
              </Box>
              <Typography
                component="a"
                href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                target="_blank"
                sx={{
                  color: "#333",
                  textDecoration: "none",
                  "&:hover": { color: "#9b165d" },
                }}
              >
                <Box component="span" sx={{ display: { xs: "none", md: "inline", fontFamily: "'Open Sans', sans-serif", fontSize: '14px' } }}>
                  21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang
                </Box>
                <Box component="span" sx={{ display: { xs: "inline", md: "none", fontFamily: "'Open Sans', sans-serif", fontSize: '14px' } }}>
                  {t('location.findUsOnGoogleMaps')}
                </Box>
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Desktop Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ display: { xs: "none", lg: "block" } }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              height: 110,
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              px: { xs: 2, sm: 3 },
              position: "relative",
            }}
          >
            {/* Left Nav */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                alignItems: "flex-end",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              {navItems.map((item) => {
                const isCurrentPage = isActiveLink(item.href);
                const isHovered = hovered === item.label.toLowerCase();

                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.label.toLowerCase())}
                    onMouseLeave={() => setHovered("")}
                    sx={{
                      textTransform: "uppercase",
                      fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                      letterSpacing: "0.05em",
                      color: isCurrentPage
                        ? "#9b165d"
                        : isHovered
                          ? "#9b165d"
                          : "#594a39",
                      fontWeight: isCurrentPage ? 500 : 500,
                      borderBottom: isCurrentPage
                        ? "2px solid #9b165d"
                        : isHovered
                          ? "2px solid #9b165d"
                          : "2px solid transparent",
                      paddingBottom: "5px",
                      lineHeight: 1.2,
                      borderRadius: 0,
                      pb: 1,
                      px: 0,
                      minWidth: "auto",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#9b165d",
                        borderBottom: "2px solid #9b165d",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            {/* Logo */}
            <Box sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              px: 4,
            }}>
              <Link href="/">
                <Box
                  component="img"
                  src="/images/image_12.jpg"
                  alt="SEN SPA Da Nang"
                  sx={{
                    height: "auto",
                    width: 171,
                    objectFit: "contain",
                  }}
                />
              </Link>
            </Box>

            {/* Right Nav */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                alignItems: "flex-end",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
              {/* ABOUT US */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  onMouseEnter={(e) => {
                    setAboutAnchor(e.currentTarget);
                    setAboutHovered(true);
                  }}
                  onMouseLeave={() => {
                    setAboutHovered(false);
                  }}
                  sx={{
                    color: aboutHovered ? "#9b165d" : "#594a39",
                    fontWeight: aboutHovered ? 500 : 500,
                    borderBottom: aboutHovered
                      ? "2px solid #9b165d"
                      : "2px solid transparent",
                    borderRadius: 0,
                    textTransform: "none",
                    fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                    letterSpacing: "0.05em",
                    paddingBottom: '5px',
                    "&:hover": {
                      color: "#9b165d",
                      backgroundColor: "transparent",
                    },
                    transition: "color 0.15s, border-bottom 0.15s",
                  }}
                >
                  {t('nav.about').toUpperCase()}
                </Button>

                <Popover
                  open={Boolean(aboutAnchor)}
                  anchorEl={aboutAnchor}
                  onClose={() => setAboutAnchor(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  disableScrollLock
                  slotProps={{
                    paper: {
                      ref: (node: HTMLDivElement | null) => {
                        popperRef.current = node;
                      },
                      onMouseEnter: () => {
                        if (closeTimeout.current) clearTimeout(closeTimeout.current);
                        setAboutHovered(true);
                      },
                      onMouseLeave: () => {
                        setAboutHovered(false);
                        if (!closeTimeout.current) {
                          closeTimeout.current = setTimeout(() => {
                            setAboutAnchor(null);
                            closeTimeout.current = null;
                          }, 150);
                        }
                      },
                      sx: {
                        marginTop: "8px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        minWidth: 200,
                        border: "1px solid #e0e0e0",
                      },
                    },
                  }}
                >
                  <Box>
                    <MenuItem component={Link} href="/about" onClick={() => setAboutAnchor(null)}>
                      {t('nav.aboutSpa')}
                    </MenuItem>
                    <MenuItem component={Link} href="/customer-moment" onClick={() => setAboutAnchor(null)}>
                      {t('nav.happyGuests')}
                    </MenuItem>
                    <MenuItem component={Link} href="/gallery" onClick={() => setAboutAnchor(null)}>
                      {t('nav.gallery')}
                    </MenuItem>
                  </Box>
                </Popover>
              </Box>

              {rightNavItems.map((item) => {
                const isCurrentPage = isActiveLink(item.href);
                const isHovered = hovered === item.label.toLowerCase();
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.label.toLowerCase())}
                    onMouseLeave={() => setHovered("")}
                    sx={{
                      textTransform: "uppercase",
                      fontFamily: "'Open Sans', sans-serif", fontSize: '16px',
                      letterSpacing: "0.05em",
                      color: isCurrentPage
                        ? "#9b165d"
                        : isHovered
                          ? "#9b165d"
                          : "#594a39",
                      fontWeight: isCurrentPage ? 500 : 500,
                      borderBottom: isCurrentPage
                        ? "2px solid #9b165d"
                        : isHovered
                          ? "2px solid #9b165d"
                          : "2px solid transparent",
                      paddingBottom: "5px",
                      lineHeight: 1.2,
                      borderRadius: 0,
                      pb: 1,
                      px: 0,
                      minWidth: "auto",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#9b165d",
                        borderBottom: "2px solid #9b165d",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              {/* Language */}
              <Box>
                <IconButton
                  onClick={(e) => {
                    setLangAnchor(e.currentTarget);
                  }}
                  sx={{
                    color: "#9b165d",
                    fontWeight: 500,
                    borderRadius: 0,
                    textTransform: "none",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    letterSpacing: "0.05em",
                    paddingBottom: "5px",
                    "&:hover": {
                      color: "#9b165d",
                      backgroundColor: "transparent",
                    },
                    transition: "color 0.15s, border-bottom 0.15s",
                  }}
                >
                  <Language />
                </IconButton>
                <Menu
                  anchorEl={langAnchor}
                  open={Boolean(langAnchor)}
                  onClose={() => setLangAnchor(null)}
                  sx={{ mt: 1 }}
                >
                  <MenuItem
                    onClick={() => changeLanguage('en')}
                    sx={{
                      color: i18n.language === 'en' ? "#9b165d" : "inherit",
                      fontWeight: i18n.language === 'en' ? 600 : 400,
                    }}
                  >
                    🇺🇸 English
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage('ja')}
                    sx={{
                      color: i18n.language === 'ja' ? "#9b165d" : "inherit",
                      fontWeight: i18n.language === 'ja' ? 600 : 400,
                    }}
                  >
                    🇯🇵 日本語
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage('ko')}
                    sx={{
                      color: i18n.language === 'ko' ? "#9b165d" : "inherit",
                      fontWeight: i18n.language === 'ko' ? 600 : 400,
                    }}
                  >
                    🇰🇷 한국어
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Mobile Header */}
      <AppBar
        position="static"
        color="inherit"
        elevation={1}
        sx={{ display: { xs: "block", lg: "none" } }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "#9b165d" }}
          >
            <MenuIcon sx={{ fontSize: 36 }} />
          </IconButton>

          <Link href="/">
            <Box
              component="img"
              src="/images/image_12.jpg"
              alt="SEN SPA Da Nang"
              sx={{ height: { xs: 80, md: 150 }, width: "auto" }}
            />
          </Link>

          <Box>
            <IconButton
              onClick={(e) => {
                setLangAnchor(e.currentTarget);
              }}
              sx={{
                color: "#9b165d",
                fontWeight: 500,
                borderRadius: 0,
                textTransform: "none",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                letterSpacing: "0.05em",
                paddingBottom: "5px",
                "&:hover": {
                  color: "#9b165d",
                  backgroundColor: "transparent",
                },
                transition: "color 0.15s, border-bottom 0.15s",
              }}
            >
              <Language />
            </IconButton>
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              sx={{ mt: 1 }}
            >
              <MenuItem
                onClick={() => changeLanguage('en')}
                sx={{
                  color: i18n.language === 'en' ? "#9b165d" : "inherit",
                  fontWeight: i18n.language === 'en' ? 600 : 400,
                }}
              >
                🇺🇸 English
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage('ja')}
                sx={{
                  color: i18n.language === 'ja' ? "#9b165d" : "inherit",
                  fontWeight: i18n.language === 'ja' ? 600 : 400,
                }}
              >
                🇯🇵 日本語
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage('ko')}
                sx={{
                  color: i18n.language === 'ko' ? "#9b165d" : "inherit",
                  fontWeight: i18n.language === 'ko' ? 600 : 400,
                }}
              >
                🇰🇷 한국어
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: "100%", boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;