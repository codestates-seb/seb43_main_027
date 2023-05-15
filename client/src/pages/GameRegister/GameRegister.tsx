import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Form, Space, Upload } from 'antd';
import Label from '../../components/elements/Label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

const { TextArea } = Input;

const GameRegister = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [url, setUrl] = useState('');

  const titleOnChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const detailOnChange = (e) => {
    setDetail(e.target.value);
  };
  const urlOnChange = (e) => {
    setUrl(e.target.value);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  interface PostDataType {
    gameName: string;
    downloadUrl: string;
    categoryNames: string[];
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const postData: PostDataType = {
      gameName: title,
      downloadUrl: url,
      categoryNames: ['tags']
    };

    const formData = new FormData();
    formData.append('file', values.gametitleimg);

    const blob = new Blob([JSON.stringify(postData)], {
      type: 'application/json'
    });

    formData.append('post', blob);
    console.log(formData);
    // formData를 axios를 사용하여 POST합니다.
    axios
      .post(
        'ec2-13-209-70-188.ap-northeast-2.compute.amazonaws.com:8080/api/games',
        formData
      )
      .then((response) => {
        // 성공적으로 요청을 처리한 후에 수행할 작업을 여기에 추가합니다.
        console.log('등록에 성공하였습니다');
        // message.success('요청이 성공적으로 전송되었습니다.');
      })
      .catch((error) => {
        // 요청이 실패한 경우에 수행할 작업을 여기에 추가합니다.
        console.error(error);
        // message.error('요청을 전송하는 중에 오류가 발생했습니다.');
      });
  };

  return (
    <StyledFormContainer>
      <Form
        name='validate_other'
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5
        }}
      >
        {/* 게임 제목 */}
        <StyledGameNameContainer>
          <Label htmlFor='channeltitle'>채널(게임) 이름</Label>
          <Input
            name='channeltitle'
            placeholder='ex)Crypt of Necrodancer'
            className='colorchange'
            onChange={titleOnChange}
            value={title}
          />
        </StyledGameNameContainer>
        {/* 태그 선택 */}
        <GameTagsContainer></GameTagsContainer>
        {/* 게임 설명 */}
        <StyledGameDetailContainer>
          <Label htmlFor='channeltitle'>게임 설명</Label>
          <TextArea
            rows={6}
            placeholder='ex)Crypt of Necrodancer는 주인공이 리듬에 맞춰 던젼을 탐험하며 아버지의 유산과 자신의 존재의미를 찾는 여정을 담은 rpg와 로그라이크 요소가 결합된 리듬게임입니다.'
            maxLength={600}
            className='colorchange'
            onChange={detailOnChange}
            value={detail}
          />
        </StyledGameDetailContainer>
        {/* 다운로드 URL */}
        <StyledGameNameContainer>
          <Label htmlFor='downloadurl'>다운로드 링크</Label>
          <Input
            name='downloadurl'
            placeholder='ex)게임 홈페이지 주소'
            className='colorchange'
            onChange={urlOnChange}
            type='url'
            value={url}
          />
        </StyledGameNameContainer>
        {/* 게임 대표이미지 */}
        <StyledImageContainer>
          <Label htmlFor='gametitleimg'>게임대표사진</Label>
          <Form.Item
            name='gametitleimg'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            extra='png,jpg 등'
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>파일 업로드</Button>
            </Upload>
          </Form.Item>
        </StyledImageContainer>
        {/* 확인/취소 버튼 */}
        <StyledButtonsContainer>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit' className='enroll'>
                등록
              </Button>
              <Button htmlType='reset' className='cancel'>
                취소
              </Button>
            </Space>
          </Form.Item>
        </StyledButtonsContainer>
      </Form>
    </StyledFormContainer>
  );
};

export default GameRegister;

const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: (100%-50px);
  margin-top: 1rem;
  > form {
    width: 50rem;
    @media screen and (max-width: 650px) {
      width: 40rem;
      margin-top: 5rem;
      margin-bottom: 5rem;
    }
  }
`;

const StyledGameNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  margin: 1rem;
  > form {
    display: flex;
    flex: 1;
  }

  > label {
    margin: 0.5rem 1rem;
  }

  > input {
    margin: 0.5rem 1rem;
  }

  .colorchange {
    margin: 1rem;
    &:hover {
      border-color: var(--cyan-light-400);
    }
    &:focus {
      border-color: var(--cyan-light-400);
      box-shadow: 0 0 0 2px var(--cyan-light-200);
    }
  }

  @media screen and (max-width: 650px) {
    flex-direction: row;
    > label {
      margin: 0rem 1rem;
    }
    > input {
      margin: 1rem;
    }
  }
`;

const StyledGameDetailContainer = styled(StyledGameNameContainer)`
  textarea {
    min-height: 20rem;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    > label {
      margin: 0rem 1rem;
    }
    textarea {
      min-height: 30rem;
    }
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > label {
    display: flex;
    margin: 0.5rem 1rem;
  }

  > form {
    display: flex;
  }

  button {
    &:hover {
      color: var(--cyan-dark-400) !important;
      border-color: var(--cyan-dark-400) !important;
    }
  }

  > svg {
    &:hover {
      background-color: var(--cyan-dark-400);
    }
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .enroll {
    background-color: var(--cyan-dark-400);
    &:hover {
      background-color: var(--cyan-dark-500);
    }
  }
  .cancel {
    &:hover {
      color: white;
      background-color: var(--button-inactive-hover-color);
      border-color: var(--button-inactive-hover-color);
    }
  }
`;
