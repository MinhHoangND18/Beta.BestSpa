'use client'

import { useRef } from "react";
import Image from "next/image";
import { Box, Container, Grid, Typography, Card, CardMedia } from "@mui/material";
import { useTranslation } from 'react-i18next';

interface GalleryImage {
    src: string;
    alt: string;
}

const galleryImages: GalleryImage[] = [
    { src: "/images/image_35.jpg", alt: "Happy customer at SEN SPA Da Nang" },
    { src: "/images/image_10.png", alt: "Customer review post" },
    { src: "/images/image_11.jpg", alt: "Relaxed guest at spa" },
    { src: "/images/image_12.jpg", alt: "Spa treatment session" },
    { src: "/images/image_13.jpg", alt: "Customer enjoying massage" },
    { src: "/images/image_14.jpg", alt: "Spa relaxation area" },
    { src: "/images/image_15.jpg", alt: "Customer in treatment room" },
    { src: "/images/image_16.jpg", alt: "Happy customer after treatment" },
    { src: "/images/image_17.jpg", alt: "Customer review testimonial" },
    { src: "/images/image_18.jpg", alt: "Customer enjoying facial treatment" },
    { src: "/images/image_19.jpg", alt: "Spa wellness experience" },
    { src: "/images/image_20.jpg", alt: "Customer relaxation moment" },
    { src: "/images/image_21.jpg", alt: "Spa treatment in progress" },
    { src: "/images/image_22.jpg", alt: "Customer satisfaction moment" },
    { src: "/images/image_23.jpg", alt: "Spa ambiance experience" },
    { src: "/images/image_24.jpg", alt: "Customer enjoying massage" },
    { src: "/images/image_25.jpg", alt: "Spa treatment room experience" },
    { src: "/images/image_26.jpg", alt: "Customer wellness moment" },
    { src: "/images/image_27.jpg", alt: "Spa relaxation session" },
    { src: "/images/image_28.jpg", alt: "Customer satisfaction moment" },
    { src: "/images/image_29.jpg", alt: "Spa treatment completion" },
];


export default function CustomerMomentPage() {
    const { t } = useTranslation('common');
    const aboTopRef = useRef<HTMLDivElement | null>(null);
    return (
        <Box component="main">
            <Container maxWidth="lg" >
                {/* Tiêu đề */}
                <Box
                    ref={aboTopRef}
                    sx={{
                        width: "100vw",
                        position: "relative",
                        left: "50%",
                        right: "50%",
                        marginLeft: "-50vw",
                        marginRight: "-50vw",
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
                        {t('customerMoment.title')}
                    </Typography>
                </Box>

                {/* Gallery */}
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {galleryImages.map((img, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                elevation={3}
                                sx={{
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    height: "100%",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        position: "relative",
                                        paddingTop: "75%", 
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        loading="lazy"
                                    />
                                </CardMedia>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
