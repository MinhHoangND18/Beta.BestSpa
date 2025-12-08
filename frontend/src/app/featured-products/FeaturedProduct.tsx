'use client'

import React, { useState, useRef } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import FormBooking from "@components/FormBooking";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/api/services";
import { Service, ServiceStatus, PaginatedServices } from "@/types";

const staticImages = [
    '/images/5.png',
    '/images/8.png',
    '/images/16.png',
    '/images/32.png',
    '/images/13.png',
    '/images/20.png',
    '/images/18.png',
    '/images/25.png',
    '/images/21.png',
    '/images/11.png',
];

export default function FeaturedProducts() {
    const { t, i18n } = useTranslation('common');
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const feaTopRef = useRef<HTMLDivElement | null>(null);

    const { data: services = [], isLoading } = useQuery<PaginatedServices, Error, Service[]>({
        queryKey: ["featuredServices", i18n.language],
        queryFn: () => getServices({ limit: 10, status: 'active' as ServiceStatus }),
        select: (data: PaginatedServices) => data.data.data,
    });

    const handleBookNow = (service: Service) => {
        setSelectedService(service);
        setShowBookingForm(true);
    };

    const handleCloseForm = () => {
        setShowBookingForm(false);
        setSelectedService(null);
    };

    const formatCurrency = (price: number, currency: 'VND' | 'USD') => {
        return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    }

    return (
        <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: 0 }}>
            <Box
                ref={feaTopRef}
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
                    {t('featuredProducts.title', 'Featured Services')}
                </Typography>
            </Box>


            <Box
                sx={{
                    py: 4,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr",
                    },
                    gap: 4,
                    maxWidth: "1300px",
                    mx: "auto",
                    px: { xs: 2, md: 4 },
                }}
            >
                {isLoading ? (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress />
                    </Grid>
                ) : (
                    services.map((service, index) => (
                        <Card
                            key={service.id}
                            sx={{
                                borderRadius: 0,
                                transition: "transform 0.3s ease",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="350"
                                image={staticImages[index % staticImages.length]}
                                alt={service.name}
                                sx={{ 
                                    objectFit: "cover", 
                                    cursor: "pointer",
                                    borderRadius: 0,
                                }}
                                onClick={() => handleBookNow(service)}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    sx={{
                                        fontFamily: "'Open Sans', sans-serif", fontSize: '19px',
                                        mb: 1, cursor: "pointer", color: "#000",
                                        "&:hover": { color: '#9e2265' }
                                    }}
                                    onClick={() => handleBookNow(service)}
                                >
                                    {service.name}
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0, }}>
                                    <li>
                                        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', }}>
                                            <strong>{t('duration', 'Duration')}:</strong> {service.durationMinutes} {t('minutes', 'minutes')}
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', }}>
                                            <strong>{t('price', 'Price')}:</strong> {formatCurrency(service.price, 'VND')} ({formatCurrency(service.priceUSD || 0, 'USD')})
                                        </Typography>
                                    </li>
                                    {service.description && (
                                        <li>
                                            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', mt: 1 }}>
                                                <strong>{t('description', 'Description')}:</strong> {service.description}
                                            </Typography>
                                        </li>
                                    )}
                                </Box>
                            </CardContent>
                            <Box sx={{ textAlign: "center", pb: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleBookNow(service)}
                                    sx={{
                                        fontFamily: "'Open Sans', sans-serif", 
                                        borderRadius: 0,
                                        backgroundColor: "#9e2265",
                                        width: "150px",
                                        height: "50px",
                                        fontSize: "1rem",
                                        "&:hover": { backgroundColor: "#d83b8a" },
                                    }}
                                >
                                    {t('bookNow', 'Book Now')}
                                </Button>
                            </Box>
                        </Card>
                    ))
                )}
            </Box>


            {/* Hiển thị form booking */}
            {selectedService && (
                <FormBooking
                    open={showBookingForm}
                    onClose={handleCloseForm}
                    selectedTreatment={selectedService.name}
                />
            )}
        </Box>
    );
}
