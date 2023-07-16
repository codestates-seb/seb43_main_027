import styled from 'styled-components';
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
import { Select, Space } from 'antd';
import Loading from '../common/Loading';
import { postInputInitValue } from '../../data/initialData';
import Modal from '../common/Modal';

const InputSection = () => {
  const [post, setPost] = useState<PostType>(postInputInitValue);
  const [images, setImages] = useState<{ urls: string[]; files: File[] }>({
    urls: [],
    files: []
  });
  const { gameId, postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
      setImages((prev) => ({
        ...prev,
        files: prev.files.filter((_, i) => i !== index)
      }));
    },
    []
  );

  const onDeleteUrlClickHandler = useCallback(
    (index: number) => () => {
      setImages((prev) => ({
        ...prev,
        urls: prev.urls.filter((_, i) => i !== index)
      }));
    },
    []
  );

  const onUploadHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      e.target.files &&
      setImages((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files as FileList)]
      })),
    []
  );

  const onSubmitHandler = (e: SubmitType) => {
    e.preventDefault();

    if (!validatePost(post)) {
      setIsOpen(true);
      setErrorMsg('입력값을 정확하게 입력해주세요.');
      return;
    }
    const formData = new FormData();
    if (images.files.length !== 0) {
      images.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    if (!postId) {
      // 함수 추출 가능
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
        () => setErrorMsg('게시글 작성에 오류가 발생했습니다.')
      );
    } else {
      formData.append(
        'patch',
        new Blob(
          [
            JSON.stringify({
              fileUrlList: [...images.urls]
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
        () => setErrorMsg('게시글 작성에 오류가 발생했습니다.')
      );
    }
  };

  useEffect(() => {
    if (!postId) return;
    // 함수 추출 가능
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_URL}/api/posts/${postId}`
        );
        const { content, title, fileUrlList, postTag } = res.data.data;

        setPost((prev) => ({
          ...prev,
          content,
          title,
          postTag
        }));
        setImages((prev) => ({ ...prev, urls: fileUrlList }));
        setIsLoading(false);
      } catch (err: any) {
        if (err.response.status === 404) {
          () => setErrorMsg('존재하지 않는 게시글입니다.');
          navigation(PATH_URL.HOME);
        }
        setIsLoading(false);
      }
    })();
  }, [postId]);

  return (
    <>
      <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
        <StyledContainer>
          <Space wrap>
            <Select
              value={convertTag.asKR(post.postTag) || '태그 선택'}
              style={{ width: 120 }}
              onChange={onTagChangeHandler}
              options={postOptionTags.slice(1)}
            />
          </Space>

          <StyledTitleInput
            value={post.title}
            placeholder='제목을 입력하세요.'
            onChange={onInputChangeHandler('title')}
            maxLength={40}
          />
          <StyledTextarea
            value={post.content}
            placeholder='내용을 입력하세요.'
            onChange={onInputChangeHandler('content')}
          />
          <ImageSection
            files={images.files}
            onUploadHandler={onUploadHandler}
            onDeleteFileClickHandler={onDeleteFileClickHandler}
            onDeleteUrlClickHandler={onDeleteUrlClickHandler}
            urls={images.urls}
          />
          <StyledButtonContainer>
            <StyledSubmitButton onClick={onSubmitHandler}>
              작성하기
            </StyledSubmitButton>
          </StyledButtonContainer>
        </StyledContainer>
      </form>
      {isLoading && <Loading />}
      <Modal
        isOpen={isOpen}
        confirmMessage={errorMsg}
        closeModalHandlerWithConfirm={() => {
          setIsOpen(false);
        }}
      />
    </>
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
