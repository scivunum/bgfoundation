import React,{useState, useEffect} from "react";
import { Layout, Typography,Row, Col, Card } from "antd";
import { Button} from "../components/button";
import { Container} from 'react-bootstrap';
import Heroimg from '../assets/heroimg.jpg';
import Scroller from '../components/Scroller';
import { fontsizes } from "../components/style";
const {Content} = Layout;
const { Title, Paragraph } = Typography;

function LandingPage({companyname}) {
    const [heroimg, setHeroImg] = useState(
        `url(${Heroimg})`
    );
    const [index, setIndex] = useState(0);
    const [imgheight, SetImgHeight] = useState('40vh');
    const setHeights = () => {
        const windowWidth = window.outerWidth;
        let imgHeight;
        if (windowWidth <= 240) {
          imgHeight = '215vh';
        } else if (windowWidth <= 330) {
          imgHeight = '93vh';
        }else if (windowWidth <= 360) {
          imgHeight = '72vh';
        } else if (windowWidth <= 375) {
          
          if (window.outerHeight <= 670) {
            imgHeight = '74vh';
          }else if(window.outerHeight <= 813) {
            imgHeight = '60vh';
          }
        } else if (windowWidth <= 390) {
          imgHeight = '60vh';
        } else if (windowWidth <= 416) {
          imgHeight = '56vh';
          if (window.outerHeight <= 800) {
            imgHeight = '64vh';
          }
        }else if (windowWidth <= 430) {
          imgHeight = '53vh';
        } else if (windowWidth <= 459) {
          imgHeight = '66vh';
        } else if (windowWidth <= 574) {
          imgHeight = '67vh';
          
        } else if (windowWidth <= 720) {
          
          imgHeight = '60vh';
        }else if (windowWidth <= 768) {
          imgHeight = '38vh';
        } else if (windowWidth <= 820) {
          imgHeight = '30vh';
        }else if (windowWidth <= 912) {
          imgHeight = '30vh';
        } else if (windowWidth <= 1024) {
          if (window.outerHeight <= 1200) {
            
            imgHeight = '62vh';
          }else{
            imgHeight = '28vh';
          }
        } else if (windowWidth <= 1400) {
          
          if (window.outerHeight <= 720) {
            imgHeight = '60vh';
          }else if (window.outerHeight <= 820) {
            imgHeight = '50vh';
          }else{
            imgHeight = '34vh';
          }
        }else {
          imgHeight = '40vh';
        }
        
      
        SetImgHeight(imgHeight);
      };
      
    const herostyle = {
        backgroundImage: heroimg, // Use imported image directly
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '370px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "70px"
    };
    const [texts, setTexts] = useState([
        "Discover, Bid, and Collect Unique Art Pieces",
        "Explore Art from Different Cultures",
        "Uncover Hidden Gems in the Art World",
        "Experience the Beauty of Fine Art",
        "Find Your Next Masterpiece Here"
    ]);
    
    
    // Function to update text index after a certain time interval
    useEffect(() => {
        setHeights();
        window.addEventListener('resize', setHeights);
        window.addEventListener('load', setHeights);
        setHeroImg(
            `url(${Heroimg})`
        );
        setTexts([
            "Discover, Bid, and Collect Unique Art Pieces",
            "Explore Art from Different Cultures",
            "Uncover Hidden Gems in the Art World",
            "Experience the Beauty of Fine Art",
            "Find Your Next Masterpiece Here"
        ]);
        const interval = setInterval(() => {
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle through texts array
            }, 500); // Wait for text to fade out before changing
        }, 5000); // Change text every 5 seconds (adjust interval as needed)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [texts]); // Re-run effect when texts array changes
 
  return (
    <div>
        <div style={herostyle}>
            <div className="text-start m-4 text-center">
                <Title level={1} strong style={{ margin: 4, color: "white",fontSize:fontsizes.xxlarge }}>
                    Welcome to {companyname || ' Art Auction'}
                </Title>
                <Paragraph style={{ color: "white",fontSize:fontsizes.medium,transition: "1.5s ease-in-out"  }}>
                    {texts[index]}
                </Paragraph>
            </div>  
        </div>
        
        <Content style={{ padding: "6px" }}>
            <Scroller  />
            
            <div className='m-0 p-0 mb-2 text-center' style={{height:'340px', width:'100%'}}>
                <div style={{
                        position: 'relative',
                        height: '340px',
                        
                    }}>
                        <div style={{
                            backgroundImage: heroimg,
                            backgroundSize: 'cover',
                            height: imgheight,
                            zIndex: '-1',
                            filter: 'brightness(30%)',
                            width: '100%',
                        }}>

                        </div>

                    <Container className="py-5 d-flex flex-column justify-content-center align-items-center text-white"
                    style={{ zIndex: '1', position: 'absolute', top: '160px', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <h1 className="text-center fw-bold mb-2 mt-3">Discover Unique Art Treasures</h1>
                            <p className="text-center fw-bold">Bid and Auction Exquisite Artwork from Artists</p>
                            <div className="d-flex justify-content-center  mb-1">
                                    <Button to="/contribute" text="Bid" classname={'text-center'}  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '60px'}}/>
                                        <span className="mx-3"></span>
                                    <Button to="/contribute" text="Bid" classname={'text-center'}  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '60px'}}/>
                                </div>
                        </Container>
                </div>
            </div>  
            <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12}>
                <img
                src="https://via.placeholder.com/800x400"
                alt="Art Auction"
                style={{ width: "100%", height: "auto" }}
                />
            </Col>
            <Col xs={24} sm={12}>
                <div style={{ textAlign: "center" }}>
                <Title level={3}>Explore Exclusive Artworks</Title>
                <Paragraph>
                    Find a diverse collection of art pieces from renowned and
                    emerging artists.
                </Paragraph>
                <Button type="primary" size="large">
                    View Artworks
                </Button>
                </div>
            </Col>
            </Row>
            <div style={{ marginTop: "50px" }}>
            <Title level={2}>Featured Artworks</Title>
            <Row gutter={[16, 16]}>
                {/* Featured artworks will be dynamically rendered here */}
                <Col xs={24} sm={12} lg={8}>
                <Card
                    cover={
                    <img
                        alt="Artwork"
                        src="https://via.placeholder.com/300"
                        style={{ width: "100%" }}
                    />
                    }
                    actions={[
                        <Button type="primary">Place Bid</Button>
                    ]}
                >
                    <Card.Meta
                    title="Artwork Title"
                    description="Artist Name"
                    />
                    <Paragraph style={{ marginTop: "10px" }}>
                    Current Bid: $XXX
                    </Paragraph>
                </Card>
                </Col>
                {/* Repeat this Col for each featured artwork */}
            </Row>
            </div>
        </Content>
    </div>
  );
}

export default LandingPage;
