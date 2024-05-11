import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Input,Avatar} from 'antd';
import { LikeFilled, DislikeFilled, MessageFilled } from '@ant-design/icons';
import { Button} from "../components/button";
import Title from 'antd/es/typography/Title';
const { TextArea } = Input;
const { Meta } = Card;

const BlogPostPage = ({ IsloggedIn }) => {
    const { id } = useParams();
    // Dummy blog post data
    const blogPost = {
        id: id,
        title: 'How to Start a Blog',
        author: 'John Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
        date:'12/12/2020',
    };

    // Dummy comments data
    const [comments, setComments] = useState([]);
    const handleComment = (value) => {
        setComments([...comments, { id: comments.length + 1, content: value }]);
    };

    // Dummy likes and dislikes data
    const [likes, setLikes] = useState(10);
    const [dislikes, setDislikes] = useState(2);
    const [likeAction, setLikeAction] = useState(null);
    const [dislikeAction, setDislikeAction] = useState(null);

    const handleLike = () => {
        if (likeAction === null) {
            setLikes(likes + 1);
            setLikeAction('liked');
            if (dislikeAction !== null) {
                setDislikeAction(null);
                setDislikes(dislikes - 1);
            }
        } else {
            setLikes(likes - 1);
            setLikeAction(null);
        }
    };

    const handleDislike = () => {
        if (dislikeAction === null) {
            setDislikes(dislikes + 1);
            setDislikeAction('disliked');
            if (likeAction !== null) {
                setLikeAction(null);
                setLikes(likes - 1);
            }
        } else {
            setDislikes(dislikes - 1);
            setDislikeAction(null);
        }
    };

    return (
        <div className='container'>
            <Row justify="center" style={{ marginTop: '80px', paddingBottom: '8px' }}>
            <Col span={22}>
                <Card title={<Title level={2}>{blogPost.title}</Title>} style={{ borderRadius: '1px'}}>
                    
                    <Meta
                        avatar={<div className='d-flex  flex-column jusify-content-between align-items-left'>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <small className='fw-bold text-black'> By: {blogPost.author} - {blogPost.date}</small>
                            </div>}
                        description={IsloggedIn?
                            <Button text="Log In" htmlType="submit" classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                            :
                        <div  className='float-end'>
                            <LikeFilled onClick={handleLike} style={{ marginRight: '5px' }} />
                            {likes}
                            <DislikeFilled onClick={handleDislike} style={{ marginLeft: '10px', marginRight: '5px' }} />
                            {dislikes}
                            <MessageFilled style={{ marginLeft: '10px', marginRight: '5px'  }} />
                            {comments.length}
                        </div>
                        }
                    />
                    <p className='m-2 align-text-left'>{blogPost.content}</p>
                </Card>
            </Col>
            <Col span={22}>
                        <TextArea rows={4} placeholder="Leave a comment" autoSize={{
                            minRows: 2,
                            maxRows: 10,
                            }}
                            /> <Button onClick={(e) => handleComment(e.target.value)} text="Send" classname='justify-content-center mt-1'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}} />
                        {comments.map(comment => (
                            <TextArea
                                key={comment.id}
                                author="Anonymous"
                                prefix={<Avatar>A</Avatar>}
                                value={<p>{comment.content}</p>}
                                disabled
                            />
                        ))}
                    </Col>
        </Row>
        </div>
    );
};

export default BlogPostPage;
