'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Typography, Tabs, Tab, Grid, Paper, Link, Stack } from '@mui/material';
import FormBooking from '@components/FormBooking';
// import { useRouter } from 'next/navigation';
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
  const [activeTab, setActiveTab] = useState('1');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  const menuTopRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    { id: '1', name: 'Body Massage' },
    { id: '2', name: 'Foot Massage' },
    { id: '3', name: 'Facial Treatment' },
    { id: '4', name: 'Package' },
    { id: '5', name: 'Combo' },
  ];

  const services: Services = {
    '1': [
      { id: 'name17', title: 'Sen Signature Massage 4in1', description: 'Massage combination of hot stones, Thai, aroma and deep tissue.', duration: '90 minutes', price: '620,000 ₫ ($22.96)' },
      { id: 'name19', title: 'Body Scrub', description: 'Choices of salt, coffee, green tea.', duration: '30 minutes', price: '300,000 ₫ ($11.11)' },
      { id: 'name18', title: 'Sen Signature Massage 4in1 (120 min)', description: 'Massage combination of hot stones, Thai, aroma and deep tissue.', duration: '120 minutes', price: '720,000 ₫ ($26.67)' },
      { id: 'name16', title: 'Deep Tissue Massage (90 min)', description: 'Body massage with oil and massage with elbow. Pressure: Medium - Strong - Very strong.', duration: '90 minutes', price: '580,000 ₫ ($21.48)' },
      { id: 'name15', title: 'Deep Tissue Massage (75 min)', description: 'Body massage with oil and massage with elbow. Pressure: Medium - Strong - Very strong.', duration: '75 minutes', price: '490,000 ₫ ($18.15)' },
      { id: 'name14', title: 'Deep Tissue Massage', description: 'Body massage with oil and massage with elbow. Pressure: Medium - Strong - Very strong.', duration: '60 minutes', price: '420,000 ₫ ($15.56)' },
      { id: 'name13', title: 'Hot Stone Massage (90 min)', description: 'Body massage with oil and warm stones. Pressure: light - medium.', duration: '90 minutes', price: '580,000 ₫ ($21.48)' },
      { id: 'name12', title: 'Hot Stone Massage', description: 'Body massage with oil and warm stones. Pressure: light - medium.', duration: '75 minutes', price: '490,000 ₫ ($18.15)' },
      { id: 'name11', title: 'Thai Stretch (NO OIL) (90 min)', description: 'Body massage with no oil and with bending/stretching techniques. Pressure: Medium - Strong.', duration: '90 minutes', price: '550,000 ₫ ($20.37)' },
      { id: 'name10', title: 'Thai Stretch (NO OIL) (75 min)', description: 'Body massage with no oil and with bending/stretching techniques. Pressure: Medium - Strong.', duration: '75 minutes', price: '490,000 ₫ ($18.15)' },
      { id: 'name1', title: 'Head Massage', description: 'Using a warm salt pillow as base, this treatment will relax your neck and head area completely.', duration: '30 minutes', price: '250,000 ₫ ($9.26)' },
      { id: 'name9', title: 'Thai Stretch (NO OIL)', description: 'Body massage with no oil and with bending/stretching techniques. Pressure: Medium - Strong.', duration: '60 minutes', price: '420,000 ₫ ($15.56)' },
      { id: 'name8', title: 'Vietnam Body Massage (90 min)', description: 'A combination of local massage technique with massage oil and body stretch and pull. Pressure: Light - medium.', duration: '90 minutes', price: '550,000 ₫ ($20.37)' },
      { id: 'name7', title: 'Vietnam Body Massage (75 min)', description: 'A combination of local massage technique with massage oil and body stretch and pull. Pressure: Light - medium.', duration: '75 minutes', price: '480,000 ₫ ($17.78)' },
      { id: 'name6', title: 'Vietnam Body Massage', description: 'A combination of local massage technique with massage oil and body stretch and pull. Pressure: Light - medium.', duration: '60 minutes', price: '390,000 ₫ ($14.44)' },
      { id: 'name5', title: 'Aroma Massage (90 min)', description: 'Body massage with essential oil. Pressure: Light - medium.', duration: '90 minutes', price: '550,000 ₫ ($20.37)' },
      { id: 'name4', title: 'Aroma Massage (75 min)', description: 'Body massage with essential oil. Pressure: Light - medium.', duration: '75 minutes', price: '480,000 ₫ ($17.78)' },
      { id: 'name3', title: 'Aroma Massage', description: 'Body massage with essential oil. Pressure: Light - medium.', duration: '60 minutes', price: '390,000 ₫ ($14.44)' },
      { id: 'name2', title: 'Back and Shoulder Massage', description: 'Reduce stiffness and improve circulation in back & shoulder area.', duration: '45 minutes', price: '310,000 ₫ ($11.48)' },
    ],
    '2': [
      { id: 'name22', title: 'Foot Massage With Warm-Stones', description: 'Includes: Foot bath and foot massage with warm stones', duration: '90 minutes', price: '450,000 ₫ ($16.67)' },
      { id: 'name21', title: 'Foot Treatment', description: 'Includes: Foot bath, foot scrub, foot massage with essential oil and foot mask.', duration: '90 minutes', price: '450,000 ₫ ($16.67)' },
      { id: 'name20', title: 'Foot Massage', description: 'Foot massage will help relieve all stress from your feet and improve blood circulation.', duration: '60 minutes', price: '290,000 ₫ ($10.74)' },
    ],
    '3': [
      { id: 'name25', title: 'Basic Facial Care', description: 'Includes: cleansing, exfoliation, massage, facial mask, lotion application.', duration: '60 minutes', price: '450,000 ₫ ($16.67)' },
      { id: 'name24', title: 'Eyes Massage', description: 'Relieve your eyes from tiredness and give you a refreshing look.', duration: '30 minutes', price: '300,000 ₫ ($11.11)' },
      { id: 'name23', title: 'Mini Facial', description: 'A quick relieving massage and treatment for your face.', duration: '30 minutes', price: '300,000 ₫ ($11.11)' },
    ],
    '4': [
      { id: 'name26', title: 'Sen Signature', description: 'Body scrub 30 min, Traditional sauna 30 min, Aroma massage 90 min.', duration: '150 minutes', price: '1,100,000 ₫ ($40.74)' },
      { id: 'name27', title: 'Gentlemen Care', description: 'Hot stones massage 90 min, facial massage 30 min and foot treatment 30 min.', duration: '150 minutes', price: '1,050,000 ₫ ($38.89)' },
      { id: 'name28', title: 'Skin Refresh', description: 'Body massage 60 min, Body scrub 30 min, Body wrap 30 min, mini facial (while doing body wrap) 30 min.', duration: '120 minutes', price: '1,150,000 ₫ ($42.59)' },
      { id: 'name29', title: 'Relaxing Package', description: 'Traditional sauna 30 min, Aroma massage 90 min, Basic facial 60 min.', duration: '180 minutes', price: '1,150,000 ₫ ($42.59)' },
      { id: 'name30', title: 'Sen Luxury Package', description: 'Traditional sauna 30 min, Sen signature 4 in 1 120 min, Basic facial 60 min.', duration: '210 minutes', price: '1,350,000 ₫ ($50.00)' },
    ],
    '5': [
      { id: 'name33', title: "Body 90' + Body Scrub 30'", description: 'Body massage 90 min of your choice and body scrub 30 min.', duration: '120 minutes', price: '750,000 ₫ ($27.78)' },
      { id: 'name31', title: "Back 30' + Face 30'", description: 'Back massage 30 min and mini-facial.', duration: '60 minutes', price: '520,000 ₫ ($19.26)' },
      { id: 'name32', title: "Body 90' + Foot 30'", description: 'Body massage 90 min of your choice and foot massage 30 min.', duration: '120 minutes', price: '690,000 ₫ ($25.56)' },
    ],
  };

  const handleBookNow = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    setShowBookingModal(true);
  };

  useEffect(() => {
    if (menuTopRef.current) {
      menuTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

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
          Spa Menu & Prices
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
            zIndex: 1200,
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
            onChange={(_, val) => setActiveTab(val)}
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { backgroundColor: "#9e2265" } }}
            sx={{
              "& .MuiTab-root": {
                fontFamily: "'Open Sans', sans-serif", fontSize: '14px',
                fontWeight: 600,
                color: "black",
                minHeight: { xs: 56, md: 64 },
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
          {tabs.map((tab) =>
            activeTab === tab.id ? (
              <Grid container spacing={2} key={tab.id}>
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
                        <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: "'Open Sans', sans-serif", fontSize: '18px', }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: "'Open Sans', sans-serif", fontSize: '14px', }}>
                          {service.description}
                        </Typography>
                        <Typography sx={{ mt: 1, fontFamily: "'Open Sans', sans-serif", fontSize: '14px',}}>
                          {service.duration} &bull; <strong>{service.price}</strong>
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleBookNow(service.title)}
                        sx={{
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
                        BOOK NOW
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : null
          )}
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
          sx={{ mb: 1, color: "text.primary" }}
        >
          <strong>Note:</strong> You can choose multiple treatments in one visit. For groups of 3 or more people, please{" "}
          <Link
            component={NextLink}
            href="/contact-us"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            contact us
          </Link>
          . We look forward to serving you!
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.primary", maxWidth: 800, mx: "auto" }}
        >
          Discover our relaxing spa treatments and wellness{" "}
          <Link
            component={NextLink}
            href="/featured-products"
            sx={{ color: "#9e2265", textDecoration: "none", fontWeight: 500 }}
          >
            monthly featured products
          </Link>
          . Call hotline <strong>+84 976 591 515</strong> for consultation and appointment booking.
        </Typography>

        {/* Download button */}
        <Stack alignItems="center">
          <Button
            component="a"
            href="/pdf/Menu_SenSpa_Danang_2025.pdf"
            download="Menu_SenSpa_Danang_2025.pdf"
            variant="contained"
            sx={{
              bgcolor: "#9e2265",
              color: "white",
              textTransform: "uppercase",
              px: 6,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: 0,
              "&:hover": {
                bgcolor: "#7b1b52",
              },
            }}
          >
            Download PDF Menu
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
