import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FilterTap from '../common/FilterTap';
import { userInfoTab, otherInfoTab } from '../../data/filterTabList';
import { StyledMainContent } from '../../pages/GameChannel';
import SelectTag from '../common/SelectTag';
import postOptionTags, { optionMapping } from '../../data/postOptionTags';

const UserInfoTap = ({
  isSameUser,
  setIsSelectTab,
  isSelectTab,
  setIsSelectTag,
  setIsMappingTag
}: {
  isSameUser: boolean;
  setIsSelectTab: React.Dispatch<React.SetStateAction<string>>;
  isSelectTab: string;
  setIsSelectTag: React.Dispatch<React.SetStateAction<string>>;
  setIsMappingTag: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { memberId } = useParams();
  const [showSelectTag, setShowSelectTag] = useState<boolean>(false);

  useEffect(() => {
    if (isSameUser) {
      setIsSelectTab(isSelectTab);
    } else {
      if (!otherInfoTab.includes(isSelectTab)) {
        return setIsSelectTab(otherInfoTab[0]);
      } else {
        setIsSelectTab(isSelectTab);
      }
    }
  }, [memberId, isSameUser]);

  useEffect(() => {
    setShowSelectTag(
      isSelectTab === '북마크 글' ||
        isSelectTab === '내가 쓴 글' ||
        isSelectTab === '작성글'
    );
  }, [isSelectTab]);

  const handleClick = (item: string) => {
    setIsSelectTab(item);
  };

  const handleChange = (value: string) => {
    setIsSelectTag(value);
    setIsMappingTag(optionMapping[value]);
  };

  return (
    <StyledWrapper>
      {showSelectTag && (
        <StyledSubContent>
          <SelectTag options={postOptionTags} onChange={handleChange} />
        </StyledSubContent>
      )}
      <FilterTap
        filterList={isSameUser ? userInfoTab : otherInfoTab}
        onClickFilter={handleClick}
      />
    </StyledWrapper>
  );
};

export default UserInfoTap;

const StyledWrapper = styled.div`
  padding-top: 20px;
`;

const StyledSubContent = styled.div`
  padding-left: 20px;
  padding-bottom: 10px;
`;
