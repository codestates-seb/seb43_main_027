import styled from 'styled-components';

import InputContainer from '../../components/common/InputContainer';

import { InputContainerType } from '../../types/componentsTypes';

const SignUpFieldsInputContainer = ({
  placeholder,
  title,
  useInput,
  validmessage
}: InputContainerType) => {
  return (
    <>
      <StyledInputContainer
        placeholder={placeholder}
        title={title}
        useInput={useInput}
        validmessage={validmessage}
        validity={useInput !== undefined ? useInput.validity : undefined}
      ></StyledInputContainer>
    </>
  );
};

export default SignUpFieldsInputContainer;

const StyledInputContainer = styled(InputContainer)`
  margin-bottom: 24px;
`;
