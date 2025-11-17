'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Typography,
    Dialog,
    IconButton,
    Grid,
} from '@mui/material';
// import Grid from '@mui/material/Grid2'; 
import CloseIcon from '@mui/icons-material/Close';

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
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa', fontFamily: 'sans-serif' }}>

            {/* Tiêu đề */}
            <Box
                ref={aboTopRef}
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
                    {t('customerMoment.title')}
                </Typography>
            </Box>

            {/* Gallery */}
            <Container maxWidth="lg">
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {galleryImages.map((img, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 2,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 4,
                                    },
                                    height: 250,
                                }}
                                onClick={() => setSelectedImage(img)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 600px) 100vw, 25vw"
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        bgcolor: 'rgba(0,0,0,0.9)',
                        boxShadow: 'none',
                        position: 'relative',
                    },
                }}
            >
                <IconButton
                    onClick={() => setSelectedImage(null)}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>

                {selectedImage && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxHeight: '90vh',
                            p: 2,
                        }}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1200}
                            height={800}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                )}
            </Dialog>
        </Box>
    );
}
