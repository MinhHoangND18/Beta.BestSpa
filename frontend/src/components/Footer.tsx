'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Fab,
} from "@mui/material";
import {
  AccessTime,
  LocationOn,
  Email,
  Phone,
  Facebook,
  Instagram,
  KeyboardArrowUp,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const [, setForceUpdate] = useState(0);
  
  // useEffect(() => {
  //   if (i18n.isInitialized) {
  //     setForceUpdate(prev => prev + 1);
  //   }
  // }, [i18n.isInitialized, i18n.language]);
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactInfo = [
    { icon: <AccessTime />, text: t('footer.openDaily') },
    {
      icon: <LocationOn />,
      text: "21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang",
      href: "https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9",
    },
    { icon: <Email />, text: "senspa.dn@gmail.com", href: "mailto:senspa.dn@gmail.com" },
    { icon: <Phone />, text: "+84 976 591 515", href: "tel:+84976591515" },
  ];

  const quickLinks = [
    { text: t('footer.quickLinks.aboutUs'), href: "/about" },
    { text: t('footer.quickLinks.featuredProducts'), href: "/featured-products" },
    { text: t('footer.quickLinks.bookOnline'), href: "/reservation" },
    { text: t('footer.quickLinks.spaMenu'), href: "/menu" },
    { text: t('footer.quickLinks.contactUs'), href: "/contacts" },
  ];

  const floatingButtons = [
    {
      href: "https://qr.kakao.com/talk/LDai_5BIuEvHqivW1VkyKsw.sJs-",
      src: "/images/kakaotalk-logo.svg",
      bgcolor: "#FEE500",
    },
    { href: "https://wa.me/84976591515", src: "/images/whatsapp-icon.svg", bgcolor: "#25D366" },
    { href: "https://line.me/ti/p/lgR6MK5ug3", src: "/images/line-logo.svg", bgcolor: "#00B900" },
    { href: "https://zalo.me/84976591515", src: "/images/zalo-icon.svg", bgcolor: "#0068FF" },
    { href: "tel:+84976591515", icon: <Phone />, bgcolor: "#ffffffff" },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#fcf7f9", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        {/* --- 3 Columns layout --- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
            gap: 6,
          }}
        >
          {/* --- Our Locations --- */}
          <Box>
            <Typography variant="h6" sx={{ mb: 3, color: "#9b165d", fontWeight: 600, fontFamily: "'Open Sans', sans-serif", size: '16px'}}>
              {t('footer.ourLocations')}
            </Typography>

            <Stack spacing={2}>
              {contactInfo.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#9b165d",
                      color: "#fff",
                      width: 32,
                      height: 32,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      flexShrink: 0,
                      mt: "2px",
                    }}
                  >
                    {item.icon}
                  </Box>

                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      
                      sx={{
                        fontFamily: "'Open Sans', sans-serif",
                        size: '14px',
                        color: "#594a39",
                        textDecoration: "none",
                        lineHeight: 1.5,
                        "&:hover": { color: "#9b165d" },
                      }}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#594a39", lineHeight: 1.5 }}>
                      {item.text}
                    </Typography>
                  )}
                </Box>
              ))}   
            </Stack>

            {/* --- Social icons --- */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "#9b165d", fontWeight: 600, fontFamily: "'Open Sans', sans-serif", size: '16px'}}>
                {t('footer.followUs')}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {[
                  {
                    href: "https://www.facebook.com/p/Sen-Spa-%C4%90%C3%A0-N%E1%BA%B5ng-61554952904145/",
                    icon: <Facebook fontSize="inherit" />,
                  },
                  {
                    href: "https://www.instagram.com/senspadanang21",
                    icon: <Instagram fontSize="inherit" />,
                  },
                  {
                    href: "https://www.tripadvisor.com.vn/Attraction_Review-g298085-d28147710-Reviews-Sen_Spa_Da_Nang-Da_Nang.html",
                    icon: <Box component="i" className="fa fa-tripadvisor" sx={{ fontSize: "inherit" }} />,
                  },
                ].map((social, idx) => (
                  <Box
                    key={idx}
                    component="a"
                    href={social.href}
                    target="_blank"
                    sx={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "6px",
                      backgroundColor: "#eadcc7",
                      fontSize: "1.3rem",
                      color: "#594a39",
                      cursor: "pointer",
                      marginRight: "10px",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "#d8c6b2",
                        transform: "scale(1.08)",
                      },
                    }}
                  >
                    {social.icon}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* --- Links --- */}
          <Box>
            <Typography variant="h6" sx={{ mb: 3, color: "#9b165d", fontWeight: 600, fontFamily: "'Open Sans', sans-serif", size: '16px'}}>
              {t('footer.spaName')}
            </Typography>
            <Stack spacing={1.2}>
              {quickLinks.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  underline="none"
                  variant="body2"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif", size: '14px',
                    color: "#594a39",
                    fontSize: "15px",
                    "&:hover": { color: "#9b165d" },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* --- Payment Methods --- */}
          <Box>
            <Typography variant="h6" sx={{ mb: 3, color: "#9b165d", fontWeight: 600, fontFamily: "'Open Sans', sans-serif", size: '16px'}}>
              {t('footer.paymentMethods')}
            </Typography>
            <Image
              src="/images/payment-methods.svg"
              alt="Payment Methods"
              width={230}
              height={45}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* --- Floating buttons --- */}
        <Stack
          spacing={1}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1100,
          }}
        >
          <Fab
            size="small"
            onClick={handleScrollToTop}
            sx={{
              bgcolor: "#fff",
              color: "#000",
              "&:hover": { bgcolor: "#e6e6e6" },
            }}
          >
            <KeyboardArrowUp />
          </Fab>

          {floatingButtons.map((fab, index) => (
            <Fab
              key={index}
              size="small"
              component="a"
              href={fab.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: fab.bgcolor,
                "&:hover": { opacity: 0.9 },
              }}
            >
              {fab.icon ? (
                fab.icon
              ) : (
                <Image
                  alt="icon"
                  width={36}
                  height={36}
                  src={fab.src}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Fab>
          ))}
        </Stack>

        {/* --- Copyright --- */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid #e0e0e0",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#594a39" }}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
