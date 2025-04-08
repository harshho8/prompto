'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [searchdata,setsearchdata]=useState([]);



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log('ye log data->', data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const posts_by_search=(searchinput)=>{
    const regex=new RegExp(searchinput,"i");
    return posts.filter((item)=>
     regex.test(item.prompt)||
     regex.test(item.tag)||
     regex.test(item.creator.username)
    );
    }
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
     setSearchTimeout(setTimeout(() => {
        const filterposts=posts_by_search(e.target.value);
        setsearchdata(filterposts);
      }, 500)
    );
    };

    const handleTagClick=(tag)=>{
     setSearchText(tag);
     const filter=posts_by_search(tag);
     setsearchdata(filter);
   }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          placeholder='Search for tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          type='text'
        />
      </form>

      {
        searchText?(
          <PromptCardList data={searchdata} handleTagClick={handleTagClick} />
        ):(
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  );
};

export default Feed;
