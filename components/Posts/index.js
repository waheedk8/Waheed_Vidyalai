import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

const ErrorMessage = styled.p(() => ({
  color: 'red',
  textAlign: 'center',
  marginTop: '20px',
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { isSmallerDevice } = useWindowWidth();
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0); // Track the number of clicks

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get('/api/v1/posts', {
        params: { page, limit: isSmallerDevice ? 5 : 10 },
      });

      if (response.data.length === 0) {
        setHasMore(false); // No more posts to load
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isSmallerDevice]);

  const handleClick = () => {
    if (!isLoading && hasMore && clickCount < 2) {
      setClickCount((prevCount) => prevCount + 1);
      fetchPosts();
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {hasMore && clickCount < 2 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
