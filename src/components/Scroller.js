import React, {useState } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { colors, fontsizes } from './style';
import {Typography,Card,Button } from "antd";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.avif';
import slide5 from '../assets/logo.jpg';
import slide6 from '../assets/heroimg.jpg';

// import required modules
import { FreeMode} from 'swiper/modules';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const { Title, Paragraph } = Typography;

export default function Scroller({Firsttitle, Secondtitle, Thirdtitle, Items}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    //artworks must be on bid----------------
    const slideItems = Items || [
        { id:1,title: 'Monalisa', imageUrl: slide1, date:'2022-12-01' },
        { id:2,title: 'Starry Night', imageUrl: slide2, date:'2022-12-02' },
        { id:3,title: 'The Scream', imageUrl: slide3, date:'2022-12-03' },
        { id:4,title: 'Girl with a Pearl Earring', imageUrl: slide4, date:'2024-05-03' },
        { id:5,title: 'The Last Supper', imageUrl: slide5,date:'2024-05-03' },
        { id:6,title: 'The Persistence of Memory', imageUrl: slide6,date:'2024-05-03' },
        { id:7,title: 'Mona Lisa Smile', imageUrl: slide2,date:'2024-05-03' },
        { id:8,title: 'The Birth of Venus', imageUrl: slide4,date:'2024-05-03' },
        { id:9,title: 'Guernica', imageUrl: slide1,date:'2024-05-03' }
      ];
    
    return (
        <div>
            <Title level={3} strong style={{ margin:10,marginTop:18, alignSelf:'flex-start'}}>
                {Firsttitle}
            </Title>
            <Paragraph style={{fontSize:fontsizes.small }}>
                {Secondtitle} <span className='fw-bold'>{Thirdtitle}</span>..
            </Paragraph>
            <Swiper
                slidesPerView={isMobile ? 3 : 5}
                spaceBetween={10}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    speed: 1500,
                }}
                freeMode={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation,FreeMode]}
                className="bidding-artworks"
                style={{
                width: '100%',
                height: '200px',
                background: '#fff',
                margin: '10px 0',
                padding: '4px 4px',
                }}
            >
                {slideItems.map((item, index) => (
                    <SwiperSlide key={index} style={{cursor: 'pointer', marginRight: '4px' }}>
                    <Link to ={`/artworks/${item.id}`}>
                        <Card
                            hoverable
                            style={{ width: '100%',cursor: 'pointer',border: `1px dotted ${colors.primary}` }}
                            cover={<img alt={item.title} src={item.imageUrl} style={{ height:'138px',maxHeight: '138px', objectFit: 'cover' }} />}
                        >
                            <Card.Meta title={item.title} />
                            <Link to={`/artworks/${item.id}`} className='m-2 text-decoration-none'>
                                <Button >
                                    Place Bid
                                </Button>
                            </Link>
                        </Card>
                    </Link>
                    </SwiperSlide>
                    
                ))}
                
            </Swiper>
        </div>
  );
}
