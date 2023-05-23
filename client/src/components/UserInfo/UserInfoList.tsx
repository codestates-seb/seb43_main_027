import React from 'react';
import styled from 'styled-components';

const UserInfoList = ({ isSelectTab }
  : { 
    isSelectTab: string
  }
  ) => {

  return (
    <StyledWrapper>
      { isSelectTab }
    </StyledWrapper>
  );
};

export default UserInfoList;

const StyledWrapper = styled.div`
  padding: 20px;
`;