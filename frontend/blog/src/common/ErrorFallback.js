import { useNavigate } from 'react-router-dom';
import {getErrorMessage} from "./utils/constant";

function ErrorFallback({ error, resetErrorBoundary }) {
    const { status } = error;
    const navigate = useNavigate();
    const { title, content } = getErrorMessage(status);
    const isNotAuthorized = status === 401 || status === 403;
    const buttonMessage = isNotAuthorized ? '로그인' : '새로고침';

    const onClickHandler = () => {
        if (isNotAuthorized) {
            navigate('/login');
        } else {
            resetErrorBoundary();
        }
    };

    return (
        <div className="error-fallback-wrapper" style={{position: 'absolute', top: '50%', textAlign: 'center'}}>
            <div className="inner">
                <h2 className="title">{title}</h2>
                <p className="content">{content}</p>
                <button type="button" onClick={onClickHandler} style={{ display: 'block', margin: 'auto' }}>
                    {buttonMessage}
                </button>
            </div>
        </div>
    );
}

export default ErrorFallback;