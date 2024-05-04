import React,{useState, useEffect} from "react";
import { Layout, Typography,Row, Col, Card,Pagination, Space  } from "antd";
import { Button} from "../components/button";
import { Container} from 'react-bootstrap';
import Heroimg from '../assets/heroimg.jpg';
import painting from '../assets/painting.jpg';
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
    const [currentPage, setCurrentPage] = useState(1);
    const artworksPerPage = 8; // Number of artworks to display per page
    const totalArtworks = 10; // Total number of artworks (for example)

    // Calculate the range of artworks to display based on the current page
    const startIndex = (currentPage - 1) * artworksPerPage;
    const endIndex = Math.min(startIndex + artworksPerPage, totalArtworks);

    // Simulated data for artworks (replace with your actual data)
    const artworks = Array.from({ length: totalArtworks }, (_, index) => ({
        title: `Artwork Title ${index + 1}`,
        artist: `Artist Name ${index + 1}`,
        currentBid: `$XXX`, // Replace with actual bid data
        imageUrl: `https://via.placeholder.com/300?text=Artwork${index + 1}`
    }));

    const handleChangePage = (page, pageSize) => {
        setCurrentPage(page);
    };
    
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
            <Scroller Firsttitle={'Featured Artworks on Bid'} Secondtitle={"Least Bidding Art Work At"} Thirdtitle={'$15,500'}  />
            
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
            <Row gutter={[16, 16]} align="middle" style={{marginTop:'60px'}}>
            <Col xs={24} sm={12}>
                <img
                src={painting}
                alt="Art Auction"
                style={{ width: "auto", height: "400px",boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
            </Col>
            <Col xs={24} sm={12}>
                <div style={{ textAlign: "center" }}>
                <Title level={3}>Explore Exclusive Artworks</Title>
                <Paragraph>
                    Find a diverse collection of art pieces from renowned and
                    emerging artists.
                </Paragraph>
                <div className="d-flex justify-content-center  mb-1">
                    <Button to="/contribute" text="Explore" classname={'text-center'}  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '60px'}}/>
                </div>
                </div>
            </Col>
            </Row>
            <div style={{ marginTop: "50px", backgroundColor: "white", width: "100%", padding: "10px" }}>
            <Title level={2}>Top 10 Featured Artworks</Title>
              <Row gutter={[16, 16]}>
                  {artworks.slice(startIndex, endIndex).map((artwork, index) => (
                      <Col key={index} xs={12} sm={6} lg={4} xl={3} style={{ marginBottom: "10px" }}>
                          <Card
                              cover={<img alt="Artwork" src={artwork.imageUrl} style={{ width: "100%" }} />}
                          >
                              <Card.Meta title={artwork.title} description={artwork.artist} />
                              <Paragraph style={{ marginTop: "10px" }}>Current Bid: {artwork.currentBid}</Paragraph>
                              <Space><Button to="/contribute" text="Place Bid" classname='text-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%'}}/></Space>
                          </Card>
                      </Col>
                  ))}
              </Row>
              <Pagination
                  current={currentPage}
                  onChange={handleChangePage}
                  pageSize={artworksPerPage}
                  total={totalArtworks}
                  showSizeChanger={false}
                  style={{ marginTop: "16px", textAlign: "center" }}
              />
            </div>
        </Content>
    </div>
  );
}

export default LandingPage;
