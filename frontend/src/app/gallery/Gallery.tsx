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
    id: number;
    alt: string;
    src: string;
    srcset: {
        x1: string;
        x2: string;
    };
}

const galleryImages: GalleryImage[] = [
    { id: 1, alt: 'Happy guest at SEN SPA Da Nang', src: '/images/image_14.jpg', srcset: { x1: '/images/image_16.jpg', x2: '/images/image_14.jpg' } },
    { id: 2, alt: 'Guest enjoying spa treatment', src: '/images/image_3.jpg', srcset: { x1: '/images/image_24.jpg', x2: '/images/image_3.jpg' } },
    { id: 3, alt: 'Relaxed guest after massage', src: '/images/image_5.jpg', srcset: { x1: '/images/image_22.jpg', x2: '/images/image_5.jpg' } },
    { id: 4, alt: 'Relaxed guest after massage', src: '/images/image_2.jpg', srcset: { x1: '/images/image_29.jpg', x2: '/images/image_2.jpg' } },
    { id: 5, alt: 'Guest with facial treatment', src: '/images/image.jpg', srcset: { x1: '/images/image_18.jpg', x2: '/images/image.jpg' } },
    { id: 6, alt: 'Happy couple at spa', src: '/images/image_13.jpg', srcset: { x1: '/images/image_17.jpg', x2: '/images/image_13.jpg' } },
    { id: 7, alt: 'Spa relaxation area', src: '/images/image_1.jpg', srcset: { x1: '/images/image_21.jpg', x2: '/images/image_1.jpg' } },
    { id: 8, alt: 'Massage therapy session', src: '/images/image_6.jpg', srcset: { x1: '/images/image_27.jpg', x2: '/images/image_6.jpg' } },
    { id: 9, alt: 'Spa treatment room', src: '/images/image_10.jpg', srcset: { x1: '/images/image_25.jpg', x2: '/images/image_10.jpg' } },
    { id: 10, alt: 'Wellness services', src: '/images/image_9.jpg', srcset: { x1: '/images/image_15.jpg', x2: '/images/image_9.jpg' } },
    { id: 11, alt: 'Customer satisfaction', src: '/images/image_4.jpg', srcset: { x1: '/images/image_23.jpg', x2: '/images/image_4.jpg' } },
    { id: 12, alt: 'Spa ambiance', src: '/images/image_8.jpg', srcset: { x1: '/images/image_20.jpg', x2: '/images/image_8.jpg' } },
    { id: 13, alt: 'Premium spa experience', src: '/images/image_11.jpg', srcset: { x1: '/images/image_26.jpg', x2: '/images/image_11.jpg' } },
    { id: 14, alt: 'Premium spa experience', src: '/images/image_7.jpg', srcset: { x1: '/images/image_28.jpg', x2: '/images/image_7.jpg' } },
];

export default function GalleryPage() {
    const { t } = useTranslation('common');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const galTopRef = useRef<HTMLDivElement | null>(null);
    return (

        <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa', fontFamily: 'sans-serif' }}>
            {/* Title */}
            <Box
                ref={galTopRef}
                sx={{
                    width: "100%",
                    position: "relative",
                    left: "50%",
                    right: "50%",
                    marginLeft: "-50vw",
                    marginRight: "-50vw",
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
                 {t('gallery.title')}
                </Typography>
            </Box>

            {/* Gallery Grid */}
            <Container maxWidth="lg">
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {galleryImages.map((img) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={img.id}>
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

            {/* Lightbox Modal */}
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
