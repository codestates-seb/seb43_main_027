import styled from 'styled-components';
import SelectTag from '../common/SelectTag';
import ButtonEl from '../elements/Button';
import ImageSection from './ImageSection';
import { useCallback, useEffect, useState } from 'react';
import postOptionTags from '../../data/postOptionTags';
import axios from 'axios';
import convertTag from '../../utils/convertTag';
import { PostType } from '../../types/dataTypes';
import { validatePost } from '../../utils/validatePost';
import { useNavigate, useParams } from 'react-router-dom';
import PATH_URL from '../../constants/pathUrl';
import { InputChangeType, SubmitType } from '../../types/parameterTypes';
import { patchData, postData } from '../../api/apiCollection';

const InputSection = () => {
  const [post, setPost] = useState<PostType>({
    postTag: '',
    title: '',
    content: ''
  });
  const [url, setUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { gameId, postId } = useParams();
  const navigation = useNavigate();

  const onTagChangeHandler = (postTag: string) => {
    const convertedTag = convertTag.asEN(postTag);
    setPost((prev) => ({ ...prev, postTag: convertedTag }));
  };

  const onInputChangeHandler = (type: string) => (e: InputChangeType) => {
    setPost((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const onDeleteFileClickHandler = useCallback(
    (index: number) => () => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const onDeleteUrlClickHandler = useCallback(
    (index: number) => () => {
      setUrl((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const onUploadHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      if (e.target.files !== null) {
        setFiles((prev) => [
          ...prev,
          ...Array.from(e.target.files as FileList)
        ]);
      }
    },
    []
  );

  const onSubmitHandler = (e: SubmitType) => {
    e.preventDefault();

    if (!validatePost(post)) {
      alert('입력값을 정확히 입력해주세요');
      return;
    }
    const formData = new FormData();
    if (files.length !== 0) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    if (!postId) {
      formData.append(
        'post',
        new Blob([JSON.stringify(post)], {
          type: 'application/json'
        })
      );
      postData(
        `${process.env.REACT_APP_API_URL}/api/games/${gameId}/posts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => navigation(`${PATH_URL.GAME}${gameId}`),
        () => alert('게시글 작성에서 오류가 발생하였습니다.')
      );
    } else {
      formData.append(
        'patch',
        new Blob(
          [
            JSON.stringify({
              ...post,
              fileUrlList: [...url]
            })
          ],
          {
            type: 'application/json'
          }
        )
      );
      patchData(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('access_token')
          }
        },
        () => navigation(`${PATH_URL.GAME}${gameId}`),
        () => alert('게시글 작성에서 오류가 발생하였습니다.')
      );
    }
  };

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const res = await axios(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`
      );
      const { content, title, fileUrlList } = res.data.data;
      setPost((prev) => ({ ...prev, content, title }));
      setUrl(fileUrlList);
    })();
  }, [postId]);

  return (
    <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
      <StyledContainer>
        <SelectTag
          options={postOptionTags.slice(1)}
          onChange={onTagChangeHandler}
        />
        <StyledTitleInput
          value={post.title}
          placeholder='제목을 입력하세요.'
          onChange={onInputChangeHandler('title')}
        />
        <StyledTextarea
          value={post.content}
          placeholder='내용을 입력하세요.'
          onChange={onInputChangeHandler('content')}
        />
        <ImageSection
          files={files}
          onUploadHandler={onUploadHandler}
          onDeleteFileClickHandler={onDeleteFileClickHandler}
          onDeleteUrlClickHandler={onDeleteUrlClickHandler}
          urls={url}
        />
        <StyledButtonContainer>
          <StyledSubmitButton onClick={onSubmitHandler}>
            작성하기
          </StyledSubmitButton>
        </StyledButtonContainer>
      </StyledContainer>
    </form>
  );
};

export default InputSection;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (min-width: 650px) {
    display: block;
    text-align: end;
  }
`;

const StyledSubmitButton = ButtonEl({
  flex: '1',
  padding: '1rem'
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTitleInput = styled.input`
  font-size: 2rem;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  padding: 1rem;
`;

const StyledTextarea = styled.textarea`
  font-size: 1.6rem;
  resize: none;
  height: 45vh;
  padding: 1rem;
  outline: none;
  border-radius: 5px;
  border-color: #ddd;
`;
