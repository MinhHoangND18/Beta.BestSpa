'use client'

import React, { useState, useRef } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import FormBooking from "@components/FormBooking";
import { useTranslation } from "react-i18next";

export interface Product {
    id: number;
    image: string;
    title: string;
    duration: string;
    price: string;
    description: string;
}

export default function FeaturedProducts() {
    const { t, i18n } = useTranslation('common');
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const feaTopRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const handleBookNow = (product: Product) => {
        setSelectedProduct(product);
        setShowBookingForm(true);
    };

    const handleCloseForm = () => {
        setShowBookingForm(false);
        setSelectedProduct(null);
    };

    const products = [
        {
            id: 1,
            image: '/images/5.png',
            title: t('products.1.title'),
            duration: t('products.1.duration'),
            description: t('products.1.description'),
            price: '550,000 ₫ ($20.37)',
        },
        {
            id: 2,
            image: '/images/8.png',
            title: t('products.2.title'),
            duration: t('products.2.duration'),
            description: t('products.2.description'),
            price: '550,000 ₫ ($20.37)',
        },
        {
            id: 3,
            image: '/images/16.png',
            title: t('products.3.title'),
            duration: t('products.3.duration'),
            description: t('products.3.description'),
            price: '580,000 ₫ ($21.48)',
        },
        {
            id: 4,
            image: '/images/32.png',
            title: t('products.4.title'),
            duration: t('products.4.duration'),
            description: t('products.4.description'),
            price: '690,000 ₫ ($25.56)',
        },
        {
            id: 5,
            image: '/images/13.png',
            title: t('products.5.title'),
            duration: t('products.5.duration'),
            description: t('products.5.description'),
            price: '580,000 ₫ ($21.48)',
        },
        {
            id: 6,
            image: '/images/20.png',
            title: t('products.6.title'),
            duration: t('products.6.duration'),
            description: t('products.6.description'),
            price: '290,000 ₫ ($10.74)',
        },
        {
            id: 7,
            image: '/images/18.png',
            title: t('products.7.title'),
            duration: t('products.7.duration'),
            description: t('products.7.description'),
            price: '720,000 ₫ ($26.67)',
        },
        {
            id: 8,
            image: '/images/25.png',
            title: t('products.8.title'),
            duration: t('products.8.duration'),
            description: t('products.8.description'),
            price: '450,000 ₫ ($16.67)',
        },
        {
            id: 9,
            image: '/images/21.png',
            title: t('products.9.title'),
            duration: t('products.9.duration'),
            description: t('products.9.description'),
            price: '450,000 ₫ ($16.67)',
        },
        {
            id: 10,
            image: '/images/11.png',
            title: t('products.10.title'),
            duration: t('products.10.duration'),
            description: t('products.10.description'),
            price: '550,000 ₫ ($20.37)',
        }
    ];

    return (
        <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: 0 }}>
            {/* Tiêu đề */}
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
                    Featured Products
                </Typography>
            </Box>

            {/* Danh sách sản phẩm */}
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
                {products.map((product) => (
                    <Card
                        key={product.id}
                        sx={{
                            borderRadius: 0,
                            // boxShadow: 3,
                            transition: "transform 0.3s ease",
                            // "&:hover": { transform: "scale(1.05)" },
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="350"
                            image={product.image}
                            alt={product.title}
                            sx={{ 
                                objectFit: "cover", 
                                cursor: "pointer",
                                borderRadius: 0,
                            }}
                            onClick={() => handleBookNow(product)}
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
                                onClick={() => handleBookNow(product)}
                            >
                                {product.title}
                            </Typography>
                            <Box component="ul" sx={{ pl: 2, m: 0, }}>
                                <li>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', }}>
                                        <strong>Duration:</strong> {product.duration}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', }}>
                                        <strong>Price:</strong> {product.price}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', mt: 1 }}>
                                        <strong>Description:</strong> {product.description}
                                    </Typography>
                                </li>
                            </Box>
                        </CardContent>
                        <Box sx={{ textAlign: "center", pb: 3 }}>
                            <Button
                                variant="contained"
                                onClick={() => handleBookNow(product)}
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
                                {t('bookNow')}
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>


            {/* Hiển thị form booking */}
            <FormBooking
                open={showBookingForm}
                onClose={handleCloseForm}
                selectedProduct={selectedProduct}
            />
        </Box>
    );
}
