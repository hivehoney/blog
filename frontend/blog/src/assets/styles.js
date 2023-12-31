import { styled } from '@mui/system';
import theme from "./Theme";

const StyledDiv = styled('div')({
    fontFamily: 'NotoSans',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
});

export const FullWidthImage = styled('img')({
    width: "100vw",
    minHeight: "calc(var(--vh, 1vh) * 100)",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundAttachment: "fixed",
    '@media (max-width: 600px)': {
        width: '80%', // 화면 너비가 600px 이하일 때 이미지 크기를 80%로 축소
    },
});

export default StyledDiv;
