import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Input,Avatar} from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { Button} from "../components/button";
const { TextArea } = Input;
const { Meta } = Card;

const BlogPostPage = ({ IsloggedIn }) => {
    const { id } = useParams();
    // Dummy blog post data
    const blogPost = {
        id: id,
        title: 'How to Start a Blog',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin accumsan massa id dolor vehicula, eget ultrices magna sodales. Morbi fermentum enim nec sapien tincidunt, sit amet hendrerit velit mollis.',
    };

    // Dummy comments data
    const [comments, setComments] = useState([]);
    const handleComment = (value) => {
        setComments([...comments, { id: comments.length + 1, content: value }]);
    };

    // Dummy likes and dislikes data
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
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
        <Row justify="center" style={{ marginTop: '80px', paddingBottom: '8px' }}>
            <Col span={22}>
                <Card title={blogPost.title} style={{ borderRadius: '1px' }}>
                    <p>{blogPost.content}</p>
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        description={IsloggedIn?
                            <Button text="Log In" htmlType="submit" classname='justify-content-center'  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '98px'}}/>
                            :
                        <>
                            <LikeFilled onClick={handleLike} style={{ marginRight: '5px' }} />
                            {likes}
                            <DislikeFilled onClick={handleDislike} style={{ marginLeft: '10px', marginRight: '5px' }} />
                            {dislikes}
                        </>
                        }
                    />
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
    );
};

export default BlogPostPage;
