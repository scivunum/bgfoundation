import React, {useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { colors, fontsizes } from './style';
import {Typography,Card,Modal } from "antd";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.avif';
import slide5 from '../assets/logo.jpg';
import slide6 from '../assets/heroimg.jpg';

// import required modules
import { FreeMode} from 'swiper/modules';
const { Title, Paragraph } = Typography;

export default function Scroller({Items}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const slideItems = Items || [
        { title: 'Monalisa', imageUrl: slide1 },
        { title: 'Starry Night', imageUrl: slide2 },
        { title: 'The Scream', imageUrl: slide3 },
        { title: 'Girl with a Pearl Earring', imageUrl: slide4 },
        { title: 'The Last Supper', imageUrl: slide5 },
        { title: 'The Persistence of Memory', imageUrl: slide6 },
        { title: 'Mona Lisa Smile', imageUrl: slide2 },
        { title: 'The Birth of Venus', imageUrl: slide4 },
        { title: 'Guernica', imageUrl: slide1 }
      ];
    // Show modal with achievement details
    const showModal = (item) => {
        setCurrentItem(item);
        setVisible(true);
        setIsMobile(window.innerWidth < 768);
    };

    // Hide modal
    const handleCancel = () => {
          setVisible(false);
      };
    return (
        <div>
            <Title level={3} strong style={{ margin:10,marginTop:18, alignSelf:'flex-start'}}>
                Featured Artworks on Bid
            </Title>
            <Paragraph style={{fontSize:fontsizes.small }}>
                Least Bidding Art Work At <span className='fw-bold'>$15,500</span>..
            </Paragraph>
        <Swiper
            slidesPerView={isMobile ? 3 : 5}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            className="bidding-artworks"
            style={{
            width: '100%',
            height: '180px',
            background: '#fff',
            margin: '10px 0',
            padding: '4px 4px',
            }}
        >
            {slideItems.map((item, index) => (
                <SwiperSlide key={index} style={{cursor: 'pointer', marginRight: '4px' }}>
                <Card
                    hoverable
                    style={{ width: '100%',cursor: 'pointer',border: `1px dotted ${colors.primary}` }}
                    onClick={() => showModal(item)}
                    cover={<img alt={item.title} src={item.imageUrl} style={{ height:'138px',maxHeight: '138px', objectFit: 'cover' }} />}
                ><Card.Meta title={item.title} />
                </Card>
                
                
                </SwiperSlide>
                
            ))}
            <Modal
                title={currentItem ? currentItem.title : ''}
                visible={visible}
                onCancel={handleCancel}
                width={'350px'}
                footer={null}
            >
                {currentItem ? <img alt={currentItem.title} src={currentItem.imageUrl} style={{ height:'60vh',width:'100%'}}/> : null}
            </Modal>
        </Swiper>
        </div>
  );
}
