'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Typography, Tabs, Tab, Grid, Paper, Link, Stack } from '@mui/material';
import FormBooking from '@components/FormBooking';
import { useRouter } from 'next/navigation';
import { useMediaQuery, useTheme } from '@mui/material';
import NextLink from "next/link";


interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

interface Services {
  [key: string]: Service[];
}

export default function SpaMenu() {
  const { t, i18n } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('1');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  const menuTopRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isScrolling = useRef(false);

  const tabs = useMemo(() => [
    { id: '1', name: t('menu.tabs.bodyMassage') },
    { id: '2', name: t('menu.tabs.footMassage') },
    { id: '3', name: t('menu.tabs.facialTreatment') },
    { id: '4', name: t('menu.tabs.package') },
    { id: '5', name: t('menu.tabs.combo') },
  ], [t, i18n.language]);

  const services: Services = {
    '1': [
      { id: 'name17', title: t('services.1.name17.title'), description: t('services.1.name17.description'), duration: t('services.1.name17.duration'), price: '620,000 ₫ ($22.96)' },
      { id: 'name19', title: t('services.1.name19.title'), description: t('services.1.name19.description'), duration: t('services.1.name19.duration'), price: '300,000 ₫ ($11.11)' },
      { id: 'name18', title: t('services.1.name18.title'), description: t('services.1.name18.description'), duration: t('services.1.name18.duration'), price: '720,000 ₫ ($26.67)' },
      { id: 'name16', title: t('services.1.name16.title'), description: t('services.1.name16.description'), duration: t('services.1.name16.duration'), price: '580,000 ₫ ($21.48)' },
      { id: 'name15', title: t('services.1.name15.title'), description: t('services.1.name15.description'), duration: t('services.1.name15.duration'), price: '490,000 ₫ ($18.15)' },
      { id: 'name14', title: t('services.1.name14.title'), description: t('services.1.name14.description'), duration: t('services.1.name14.duration'), price: '420,000 ₫ ($15.56)' },
      { id: 'name13', title: t('services.1.name13.title'), description: t('services.1.name13.description'), duration: t('services.1.name13.duration'), price: '580,000 ₫ ($21.48)' },
      { id: 'name12', title: t('services.1.name12.title'), description: t('services.1.name12.description'), duration: t('services.1.name12.duration'), price: '490,000 ₫ ($18.15)' },
      { id: 'name11', title: t('services.1.name11.title'), description: t('services.1.name11.description'), duration: t('services.1.name11.duration'), price: '550,000 ₫ ($20.37)' },
      { id: 'name10', title: t('services.1.name10.title'), description: t('services.1.name10.description'), duration: t('services.1.name10.duration'), price: '490,000 ₫ ($18.15)' },
      { id: 'name1', title: t('services.1.name1.title'), description: t('services.1.name1.description'), duration: t('services.1.name1.duration'), price: '250,000 ₫ ($9.26)' },
      { id: 'name9', title: t('services.1.name9.title'), description: t('services.1.name9.description'), duration: t('services.1.name9.duration'), price: '420,000 ₫ ($15.56)' },
      { id: 'name8', title: t('services.1.name8.title'), description: t('services.1.name8.description'), duration: t('services.1.name8.duration'), price: '550,000 ₫ ($20.37)' },
      { id: 'name7', title: t('services.1.name7.title'), description: t('services.1.name7.description'), duration: t('services.1.name7.duration'), price: '480,000 ₫ ($17.78)' },
      { id: 'name6', title: t('services.1.name6.title'), description: t('services.1.name6.description'), duration: t('services.1.name6.duration'), price: '390,000 ₫ ($14.44)' },
      { id: 'name5', title: t('services.1.name5.title'), description: t('services.1.name5.description'), duration: t('services.1.name5.duration'), price: '550,000 ₫ ($20.37)' },
      { id: 'name4', title: t('services.1.name4.title'), description: t('services.1.name4.description'), duration: t('services.1.name4.duration'), price: '480,000 ₫ ($17.78)' },
      { id: 'name3', title: t('services.1.name3.title'), description: t('services.1.name3.description'), duration: t('services.1.name3.duration'), price: '390,000 ₫ ($14.44)' },
      { id: 'name2', title: t('services.1.name2.title'), description: t('services.1.name2.description'), duration: t('services.1.name2.duration'), price: '310,000 ₫ ($11.48)' }
    ],
    '2': [
      { id: 'name22', title: t('services.2.name22.title'), description: t('services.2.name22.description'), duration: t('services.2.name22.duration'), price: '450,000 ₫ ($16.67)' },
      { id: 'name21', title: t('services.2.name21.title'), description: t('services.2.name21.description'), duration: t('services.2.name21.duration'), price: '450,000 ₫ ($16.67)' },
      { id: 'name20', title: t('services.2.name20.title'), description: t('services.2.name20.description'), duration: t('services.2.name20.duration'), price: '290,000 ₫ ($10.74)' }
    ],
    '3': [
      { id: 'name25', title: t('services.3.name25.title'), description: t('services.3.name25.description'), duration: t('services.3.name25.duration'), price: '450,000 ₫ ($16.67)' },
      { id: 'name24', title: t('services.3.name24.title'), description: t('services.3.name24.description'), duration: t('services.3.name24.duration'), price: '300,000 ₫ ($11.11)' },
      { id: 'name23', title: t('services.3.name23.title'), description: t('services.3.name23.description'), duration: t('services.3.name23.duration'), price: '300,000 ₫ ($11.11)' }
    ],
    '4': [
      { id: 'name26', title: t('services.4.name26.title'), description: t('services.4.name26.description'), duration: t('services.4.name26.duration'), price: '1,100,000 ₫ ($40.74)' },
      { id: 'name27', title: t('services.4.name27.title'), description: t('services.4.name27.description'), duration: t('services.4.name27.duration'), price: '1,050,000 ₫ ($38.89)' },
      { id: 'name28', title: t('services.4.name28.title'), description: t('services.4.name28.description'), duration: t('services.4.name28.duration'), price: '1,150,000 ₫ ($42.59)' },
      { id: 'name29', title: t('services.4.name29.title'), description: t('services.4.name29.description'), duration: t('services.4.name29.duration'), price: '1,150,000 ₫ ($42.59)' },
      { id: 'name30', title: t('services.4.name30.title'), description: t('services.4.name30.description'), duration: t('services.4.name30.duration'), price: '1,350,000 ₫ ($50.00)' }
    ],
    '5': [
      { id: 'name33', title: t('services.5.name33.title'), description: t('services.5.name33.description'), duration: t('services.5.name33.duration'), price: '750,000 ₫ ($27.78)' },
      { id: 'name31', title: t('services.5.name31.title'), description: t('services.5.name31.description'), duration: t('services.5.name31.duration'), price: '520,000 ₫ ($19.26)' },
      { id: 'name32', title: t('services.5.name32.title'), description: t('services.5.name32.description'), duration: t('services.5.name32.duration'), price: '690,000 ₫ ($25.56)' }
    ]
  };


  const handleBookNow = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    setShowBookingModal(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    isScrolling.current = true;

    // Scroll to section on desktop
    if (sectionRefs.current[newValue]) {
      sectionRefs.current[newValue]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      if (menuTopRef.current) {
        menuTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;
        lastScrollY = currentScrollY;

        if (isScrollingUp) {
          // Scroll lên: Chọn section có top nhỏ nhất (gần đầu trang nhất)
          let topMostSection = null;
          let minTop = Infinity;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.target.getBoundingClientRect();
              if (rect.top < minTop && rect.top < window.innerHeight * 0.5) {
                minTop = rect.top;
                topMostSection = entry.target.getAttribute('data-tab-id');
              }
            }
          });

          if (topMostSection && topMostSection !== activeTab) {
            setActiveTab(topMostSection);
          }
        } else {
          // Scroll xuống: Chọn section có intersectionRatio cao nhất
          let maxRatio = 0;
          let maxTabId = null;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              maxTabId = entry.target.getAttribute('data-tab-id');
            }
          });

          if (maxTabId && maxTabId !== activeTab && maxRatio > 0.3) {
            setActiveTab(maxTabId);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeTab, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    if (isScrolling.current) {
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  }, [activeTab, isMobile]);

  return (
    <Container sx={{ py: 0, m: 0, p: 0 }}>
      <Box
        ref={menuTopRef}
        sx={{
          width: "100vw",
          position: "relative",
          top: 0,
          left: 0,
          bgcolor: "#9e2265",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 0,
            fontFamily: "'MTD Valky', serif",
            fontWeight: 500,
            letterSpacing: "0.05em",
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            textTransform: "uppercase",
            color: "#ffffff",
            textShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {t('menu.title')}
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 16 },
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {/* Sticky Tabs */}
        <Box
          sx={{
            maxWidth: "1210px",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mb: 4,
            mx: "auto",
            borderBottom: "1px solid #c1c1c1",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { backgroundColor: "#9e2265" } }}
            sx={{
              "& .MuiTab-root": {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                color: "black",
                minHeight: { xs: 56, md: 72 },
              },
              "& .Mui-selected": {
                color: "#9e2265",
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.id} label={tab.name} value={tab.id} />
            ))}
          </Tabs>
        </Box>

        <Box
          sx={{
            maxWidth: "1210px",
            mx: "auto",
            width: "100%",
          }}
        >
          {/* Services List */}
          {tabs.map((tab) => (
            <Box
              key={tab.id}
              ref={(el) => {
                if (el) sectionRefs.current[tab.id] = el as HTMLDivElement;
              }}
              data-tab-id={tab.id}
              sx={{
                display: isMobile || activeTab === tab.id ? 'block' : 'none',
                mb: isMobile ? 4 : 0
              }}
            >
              {isMobile && (
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                    fontWeight: 600,
                    mb: 3,
                    color: '#9e2265',
                    textAlign: 'left'
                  }}
                >
                  {tab.name}
                </Typography>
              )}
              <Grid container spacing={2}>
                {services[tab.id].map((service) => (
                  <Grid item xs={12} key={service.id}>
                    <Paper
                      sx={{
                        p: { xs: 2, md: 4 },
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: "space-between",
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2,
                        height: "100%",
                        borderBottom: '1px solid #d0ceceff',
                        boxShadow: 'none',
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          textAlign: 'left',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600 , fontFamily: "'Open Sans', sans-serif", fontSize: '20px',}}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                          {service.description}
                        </Typography>
                        <Typography sx={{ mt: 1, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                          {service.duration} &bull; <strong>{service.price}</strong>
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleBookNow(service.title)}
                        sx={{
                          fontFamily: "'Open Sans', sans-serif", fontSize: '15px',
                          borderRadius: 0,
                          background: '#9e2265',
                          width: { xs: '100%', sm: '150px' },
                          height: '50px',
                          fontWeight: 600,
                          '&:hover': {
                            background: '#7d1a50',
                          },
                        }}
                      >
                        {t('booking.bookNow')}
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
      <FormBooking
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedTreatment={selectedTreatment}
      />

      <Box
        sx={{
          py: 4,
          px: { xs: 2, md: 16 },
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {/* Note section */}
        <Typography
          variant="body1"
          sx={{ mb: 1, color: "text.primary" , fontFamily: "'Open Sans', sans-serif", fontSize: '14px',}}
        >
          <strong>{t('menu.noteLabel')}</strong> {t('menu.note')}{" "}
          <Link
            component={NextLink}
            href="/contacts"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            {t('menu.contactUs')}
          </Link>
          . {t('menu.noteEnd')}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.primary", maxWidth: 800, mx: "auto", fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}
        >
          {t('menu.description')}{" "}
          <Link
            component={NextLink}
            href="/featured-products"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            {t('menu.monthlyFeaturedProducts')}
          </Link>
          . {t('menu.descriptionEnd')}
        </Typography>

        {/* Download button */}
        <Stack alignItems="center">
          <Button
            component="a"
            href="/pdf/Menu_SenSpa_Danang_2025.pdf"
            download="Menu_SenSpa_Danang_2025.pdf"
            variant="contained"
            sx={{
              fontFamily: "'Open Sans', sans-serif", fontSize: '18px',
              bgcolor: "#9e2265",
              color: "white",
              textTransform: "uppercase",
              px: 6,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": {
                bgcolor: "#7b1b52",
              },
            }}
          >
            {t('menu.downloadPdfMenu')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}