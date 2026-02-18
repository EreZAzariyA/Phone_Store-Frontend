import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import TopThreeProducts from "./TopPhones";
import TopBrands from "./TopBrands";
import TopCarousel from "./TopCarousel";
import BrandCard from "../Brands-Area/BrandCard";
import { Container } from "react-bootstrap";

function HomePage(): JSX.Element {
  const brands = useSelector((state: RootState) => state.store.brands || []);

  return (
    <>
      {/* Hero — full bleed, overlaps fixed header */}
      <div style={{ marginTop: '-76px' }}>
        <TopCarousel />
      </div>

      {/* Top Products */}
      <Container className="py-5">
        <h2 className="ps-section-title">Top Products</h2>
        <hr className="ps-section-divider" />
        <TopThreeProducts />
      </Container>

      {/* Top Brands */}
      <Container className="py-4">
        <h2 className="ps-section-title">Top Brands</h2>
        <hr className="ps-section-divider" />
        <TopBrands />
      </Container>

      {/* All Brands */}
      <div style={{ backgroundColor: 'var(--ps-bg-secondary)', padding: '48px 0' }}>
        <Container>
          <h2 className="ps-section-title">Our Brands</h2>
          <hr className="ps-section-divider" />
          <div className="ps-card-row">
            {brands.map((brand) =>
              <BrandCard key={brand._id} brand={brand} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
