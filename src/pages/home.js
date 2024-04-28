import React,{useState, useEffect} from "react";
import { Layout, Typography, Button, Row, Col, Card } from "antd";
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
