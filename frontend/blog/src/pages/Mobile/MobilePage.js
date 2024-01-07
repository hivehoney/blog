import React from 'react';
import mobilePreparingImg from '../../img/img_mobile_preparing.png';
import { styled } from '@mui/system';

const MobilePageWrapper = styled('div')({
    maxWidth: '400px',
    width: '350px',
    padding: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    position: 'absolute',
    transform: 'translate(5%, 5%)',
});

const MobilePage = () => {
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(document.location.href);
        alert('링크가 복사되었습니다!');
    };

    return (
        <MobilePageWrapper>
            <img src={mobilePreparingImg} alt="mobile icon" />
            <p className="title">PC버전으로 접속해주세요</p>
            <p className="description">
                아쉽게도 모바일은 지원하지 않아요😥 <br />
                PC환경에서 테이커스를 이용해주세요!
            </p>
            <button className="link-copy-button" onClick={handleLinkCopy}>
                링크 복사하기
            </button>
        </MobilePageWrapper>
    );
};

export default MobilePage;