import { useCallback } from 'react';

const useApiError = (handlers) => {
    const handle403 = () => {
        // 세션 만료 팝업 호출
    };

    const handle500 = () => {
        // 500 상태 관련 로직
    };

    const handleDefault = () => {
        // 기본 에러 처리 로직
    };

    const defaultHandlers = {
        403: {
            default: handle403,
        },
        500: {
            default: handle500,
        },
        default: handleDefault,
    };

    const handleError = useCallback(error => {
        const httpStatus = error.status;
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (true) {
            case handlers && handlers[httpStatus]?.[errorCode]?.[errorMessage]:
                handlers[httpStatus][errorCode][errorMessage]();
                break;

            case handlers && handlers[httpStatus]?.[errorCode]:
                handlers[httpStatus][errorCode](error);
                break;

            case handlers && handlers[httpStatus]:
                handlers[httpStatus].default(error);
                break;

            case defaultHandlers[httpStatus]?.[errorCode]:
                defaultHandlers[httpStatus][errorCode]();
                break;

            case defaultHandlers[httpStatus]:
                defaultHandlers[httpStatus].default();
                break;

            default:
                defaultHandlers.default();
        }
    }, [handlers]);

    return { handleError };
};

export default useApiError;
