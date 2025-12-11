"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  Link,
  Stack,
} from "@mui/material";
import FormBooking from "@components/FormBooking";
import { useRouter } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";
import NextLink from "next/link";
import {
  getServices,
  deleteService,
  createService,
  updateService,
} from '@/lib/api/services';
import { getActiveServiceCategories } from '@/lib/api/service-categories';
import {
  Service,
  ServiceCategory,
  ServiceStatus,
  QueryServiceDto,
  UpdateServiceDto,
  CreateServiceDto,
  PaginatedServices,
} from '@/types';
// interface ServiceFormData {
//   name: string;
//   categoryId: string;
//   description: string;
//   durationMinutes: string;
//   price: string;
//   discountPrice: string;
//   imageUrl: string;
//   isCombo: boolean;
//   status: ServiceStatus;
// }
interface Services {
  [key: string]: Service[];
}

export default function SpaMenu() {
  const { t, i18n } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("1");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const menuTopRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isScrolling = useRef(false);
  const [services, setServices] = useState<Services>({});
  const [isLoading, setIsLoading] = useState(true);

  const tabs = useMemo(
    () => [
      { id: "1", name: t("menu.tabs.bodyMassage") },
      { id: "2", name: t("menu.tabs.footMassage") },
      { id: "3", name: t("menu.tabs.facialTreatment") },
      { id: "4", name: t("menu.tabs.package") },
      { id: "5", name: t("menu.tabs.combo") },
    ],
    [i18n.language]
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const params: QueryServiceDto = {
          status: 'active',
          limit: 9999,
        };
        const paginatedData = await getServices(params);
        const data: Service[] = paginatedData.data;
        const groupedServices = data.reduce((acc: Services, service) => {
          if (service && service.categoryId != null) {
            const categoryId = service.categoryId.toString();
            if (!acc[categoryId]) {
              acc[categoryId] = [];
            }
            acc[categoryId].push(service);
          }
          return acc;
        }, {} as Services);
        setServices(groupedServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [i18n.language]);

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
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      if (menuTopRef.current) {
        menuTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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
          let topMostSection = null;
          let minTop = Infinity;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.target.getBoundingClientRect();
              if (rect.top < minTop && rect.top < window.innerHeight * 0.5) {
                minTop = rect.top;
                topMostSection = entry.target.getAttribute("data-tab-id");
              }
            }
          });

          if (topMostSection && topMostSection !== activeTab) {
            setActiveTab(topMostSection);
          }
        } else {
          let maxRatio = 0;
          let maxTabId = null;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              maxTabId = entry.target.getAttribute("data-tab-id");
            }
          });

          if (maxTabId && maxTabId !== activeTab && maxRatio > 0.3) {
            setActiveTab(maxTabId);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-20% 0px -20% 0px",
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

  if (isLoading) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">{t("menu.loading")}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        ref={menuTopRef}
        sx={{
          width: "100%",
          position: "relative",
          top: 0,
          left: 0,
          bgcolor: "#9e2265",
          py: 4,
          textAlign: "center",
          overflowX: "hidden",
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
          {t("menu.title")}
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 16 },
          width: "100%",
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
                display:
                  services[tab.id]?.length > 0
                    ? isMobile || activeTab === tab.id
                      ? "block"
                      : "none"
                    : "none",
                mb: isMobile ? 4 : 0,
              }}
            >
              {isMobile && (
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    mb: 3,
                    color: "#9e2265",
                    textAlign: "left",
                  }}
                >
                  {tab.name}
                </Typography>
              )}
              <Grid container spacing={2}>
                {(services[tab.id] || []).map((service) => (
                    <Grid item xs={12} key={service.id}>
                      <Paper
                        sx={{
                          p: { xs: 2, md: 4 },
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          alignItems: { xs: "flex-start", sm: "center" },
                          gap: 2,
                          height: "100%",
                          borderBottom: "1px solid #d0ceceff",
                          boxShadow: "none",
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            textAlign: "left",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontFamily: "'Open Sans', sans-serif",
                              fontSize: "20px",
                            }}
                          >
                            {service.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 1,
                              fontFamily: "'Open Sans', sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {service.description}
                          </Typography>
                          <Typography
                            sx={{
                              mt: 1,
                              fontFamily: "'Open Sans', sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {service.durationMinutes} {t("booking.minutes")}
                            &bull;
                            <strong>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(service.price)}{" "}
                              (
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(service.priceUSD || 0)}
                              )
                            </strong>
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          onClick={() => handleBookNow(t(`${service.name}`))}
                          sx={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: "15px",
                            borderRadius: 0,
                            background: "#9e2265",
                            width: { xs: "100%", sm: "150px" },
                            height: "50px",
                            fontWeight: 600,
                            "&:hover": {
                              background: "#7d1a50",
                            },
                          }}
                        >
                          {t("booking.bookNow")}
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
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        {/* Note section */}
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "text.primary",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "14px",
          }}
        >
          <strong>{t("menu.noteLabel")}</strong> {t("menu.note")}{" "}
          <Link
            component={NextLink}
            href="/contacts"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            {t("menu.contactUs")}
          </Link>
          . {t("menu.noteEnd")}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.primary",
            maxWidth: 800,
            mx: "auto",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "14px",
          }}
        >
          {t("menu.description")}{" "}
          <Link
            component={NextLink}
            href="/featured-products"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            {t("menu.monthlyFeaturedProducts")}
          </Link>
          . {t("menu.descriptionEnd")}
        </Typography>

        {/* Download button */}
        <Stack alignItems="center">
          <Button
            component="a"
            href="/pdf/Menu_SenSpa_Danang_2025.pdf"
            download="Menu_SenSpa_Danang_2025.pdf"
            variant="contained"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
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
            {t("menu.downloadPdfMenu")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
