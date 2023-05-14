import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Col, Form, Row, Select, Space, Upload } from 'antd';
import Label from '../../components/elements/Label';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import useInput from '../../hooks/useInput';

import styled from 'styled-components';

const { TextArea } = Input;

const GameRegister = () => {
  const { Option } = Select;

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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
        <StyledGameNameContainer>
          <Label htmlFor='channeltitle'>채널(게임) 이름</Label>
          <Input
            name='channeltitle'
            placeholder='ex)Crypt of Necrodancer'
            className='colorchange'
          />
        </StyledGameNameContainer>

        <StyledGameDetailContainer>
          <Label htmlFor='channeltitle'>게임 설명</Label>
          <TextArea
            rows={6}
            placeholder='ex)Crypt of Necrodancer는 주인공이 리듬에 맞춰 던젼을 탐험하며 아버지의 유산과 자신의 존재의미를 찾는 여정을 담은 rpg와 로그라이크 요소가 결합된 리듬게임입니다.'
            maxLength={600}
            className='colorchange'
          />
        </StyledGameDetailContainer>

        <StyledImageContainer>
          <Label htmlFor='게임대표사진'>게임대표사진</Label>
          <Form.Item
            name='게임대표사진'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            extra='png,jpg 등'
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>파일 업로드</Button>
            </Upload>
          </Form.Item>
        </StyledImageContainer>

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
      margin-bottom: 12rem;
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
    min-height: 25rem;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    > label {
      margin: 0rem 1rem;
    }
    textarea {
      min-height: 40rem;
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

// const StyledButton = styled(Button)`
// flex: ${(props) => props.flex || '1'};
//   font-size: ${(props) => props.fontSize || '1.3rem'};
//   font-weight: ${(props) => props.fontWeight || '600'};
//   text-align: center;
//   background-color: ${(props) => props.bg || 'var(--cyan-dark-400)'};
//   color: ${(props) => props.fontColor || 'white'};
//   margin: ${(props) => props.margin || '0.5rem 0.7rem'};
//   padding: ${(props) => props.padding || '0.5rem 0.7rem'};
//   border-radius: ${(props) => props.radius || '5px'};
//   border: ${(props) => props.border || 'none'};
//   &:hover {
//     background-color: ${(props) => props.hoverBg || 'var(--cyan-dark-500)'};
//   }`;
