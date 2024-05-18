import React, { useState } from 'react';
import { Timeline as AntTimeline, Image, Grid ,Modal} from 'antd';
import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

const Timeline = ({ data, startindex, endindex}) => {
    const start = startindex||0;
    const end = endindex||data.lenght;
    const slicedData = data.slice(start, end);
    const screens = useBreakpoint();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    // Function to handle opening the modal when an image or video is clicked
    //const handleMediaClick = (media) => {
    //    setSelectedMedia(media);
    //    setModalVisible(true);
    //};

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedMedia(null);
        setModalVisible(false);
    };

    return (
        <div style={{ overflowX: 'auto'}}>
            <AntTimeline mode="left">
                {slicedData.map((event, index) => (
                    <AntTimeline.Item key={index}>
                        <div style={{ marginBottom: '2px', marginTop:'20px' }}>    
                            <div><h3>{event.title}</h3>
                                {event.date}
                                <span>  </span>
                                {(event.status === 'ongoing')?
                                <span className='text-success'>
                                    {event.status}
                                </span>
                                :(event.status === 'ended')?<span className='text-danger'>
                                                                {event.status}
                                                            </span>
                                                            :<span className='text-info'>
                                                                {event.status}
                                                            </span>}
                            </div>
                            <p>{event.description}</p>
                            Currently Auctioned works
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {event.media.map((media, mediaIndex) => (
                                    <>
                                        <div key={mediaIndex} style={{ cursor: 'pointer', marginRight: '2px', marginBottom: '2px' }}>
                                            {media.type === 'image' && (
                                                <Image src={media.src} alt={media.alt} width={screens.xs ? 100 : 180} height={screens.xs ? 100:180}/>
                                            )}
                                        </div>
                                        <Modal
                                            visible={modalVisible}
                                            onCancel={handleCloseModal}
                                            footer={null}
                                            closable={false}
                                            centered
                                            width={800} // Adjust modal width as needed
                                            destroyOnClose
                                        >
                                            {/* Render image or video based on selectedMedia */}
                                            {selectedMedia && selectedMedia.type === 'image' && (
                                                <img src={selectedMedia.src} alt={selectedMedia.alt} style={{ width: '100%', height: '70vh' }} />
                                            )}
                                        </Modal>
                                    </>
                                ))}
                            </div>
                        </div>
                        <Link to={`/events/${event.id}`} className='ant-btn p-2 float-start fw-bold text-decoration-none'> View Event</Link>
                    </AntTimeline.Item>
                ))}
            </AntTimeline>
        </div>
    );
};

export default Timeline;
