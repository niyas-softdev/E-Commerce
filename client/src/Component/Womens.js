import { Carousel, Card, Container, Spinner, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Womens() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("product:", product);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/product/get";
      try {
        const response = await axios.get(url);
        setProduct(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, []);

  const womensProduct = product.filter(
    (product)=>product.category === "women"
  );

  return (
    <div>
      <div>
        {/* <Carousel>
      <Carousel.Item>
        <img/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> */}
      </div>
      <div className="  d-flex justify-content-center align-items-center m-3">
        <h1>LATEST ITEMS</h1>
      </div>

      <div>
        <Container className=" d-flex justify-content-between align-items-center flex-wrap py-3 gap-1">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            womensProduct.map((product) => (
              <Card
              style={{
                width: '16rem',
                fontFamily: 'Poppins, sans-serif',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                margin: '1rem'
              }}
              key={product._id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '250px', background: 'cover' }}
              />
              <Card.Body style={{ padding: '0.75rem' }}>
                <Card.Title style={{ fontWeight: '700', fontSize: '1rem' }}>
                  {product.name}
                </Card.Title>
                <Card.Text style={{ fontWeight: '400', color: 'gray', fontSize: '0.875rem' }}>
                  {product.description}
                </Card.Text>
                <Card.Text style={{ fontWeight: '500', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
                  Stock: {product.stock}
                </Card.Text>
                <Card.Text style={{ fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem', color:'green' }}>
                  Price: ₹ {product.price}
                </Card.Text>
                <Button variant="primary" size="sm">Buy</Button>
              </Card.Body>
            </Card>
            ))
          )}
        </Container>
      </div>
    </div>
  );
}

export default Womens;
