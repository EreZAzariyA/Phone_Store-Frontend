import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Carousel, Image } from "react-bootstrap";
import img from "../../Assets/iPhone-14.jpg";
import moreImg from "../../Assets/Galaxy-S22-Ultra.jpg";

const slides = [
  { src: img, title: "iPhone 14", subtitle: "Experience the extraordinary" },
  { src: moreImg, title: "Galaxy S22 Ultra", subtitle: "Power meets elegance" },
];

const TopCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="ps-hero-carousel">
      <Carousel
        fade
        indicators={false}
        controls={false}
        interval={5000}
        activeIndex={activeIndex}
        onSelect={(idx) => setActiveIndex(idx)}
      >
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <Image src={slide.src} alt={slide.title} />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Gradient overlays */}
      <div className="ps-hero-overlay" />
      <div className="ps-hero-overlay-left" />

      {/* Content overlay — synced with active slide */}
      <div className="ps-hero-content">
        <p className="ps-hero-label">Featured</p>
        <h2 className="ps-hero-title">{slides[activeIndex].title}</h2>
        <p className="ps-hero-subtitle">{slides[activeIndex].subtitle}</p>
        <NavLink to="/phones">
          <Button className="ps-btn-gold">
            Shop Now
          </Button>
        </NavLink>
      </div>

      {/* Slide indicators */}
      <div style={{ position: 'absolute', bottom: 24, right: 32, display: 'flex', gap: 8, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 48 : 32,
              height: 3,
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: i === activeIndex ? 'var(--ps-gold)' : 'var(--ps-text-muted)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCarousel;
