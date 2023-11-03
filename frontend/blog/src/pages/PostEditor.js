import React, {useState} from "react";
import {Button, Container, CssBaseline, ThemeProvider} from "@mui/material";
import {styled} from '@mui/material/styles';
import PostDialog from "../components/Blog/PostDialog";
import Editor from "../components/Blog/Editor";
import AlertDialog from "../components/util/AlertDialog";
import ReactRouterPrompt from "react-router-prompt";
import {API} from "../config";
import axios from "axios";
import {useQuery, useQueryClient} from "react-query";
import * as utils from "../common/utils/StringUtil";
import {usePostMutation} from "../quires/usePostMutation";
import {useLocation} from "react-router-dom";
import {theme1} from "../assets/Theme";

export default function PostEditor() {
    const { state } = useLocation();
    const postMutation = usePostMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const [postItem, setPostItem] = useState({
        title: state?.data.title ?? "",
        subTitle: state?.data.subTitle ?? "",
        tag: state?.data.tag ?? "",
        bannerImage: ""
    });

    const queryClient = useQueryClient();
    let postCode = (state) ? state.data.postCode : queryClient.getQueryData(['POSTCODE']);

    const { data, isLoading, isError } = useQuery(['POSTCODE'],() => axios.get(`${API.POSTADD}`)
        .then( ({ data }) => data.data),{
            enabled: !state,
            onSuccess: (data) => {
                postCode = data
        },
    });

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const onSubmit = (formData, status) => {
        const content = { postCode: postCode, contents: window.editor.getData({ rootName: 'content' }) };
        const imgFile = utils.extractFilenames(content.contents);

        const postInfo = {
            ... (formData ? formData : postItem),
            status: status,
            postCode: postCode,
        };

        postMutation.mutate({postInfo, content, imgFile});
        document.querySelector('[role="toolbar"]').remove();
        window.history.back();
        // window.location.reload();
        setShowPrompt(false);
    };

    const onCancel = () => {
        // deleteMutation.mutate({postCode}); 추후 삭제
        document.querySelector('[role="toolbar"]').remove();
        setShowPrompt(false);
    };

    return (
        <>
            {!isLoading && (
                <ThemeProvider theme={theme1}>
                    <CssBaseline />
                    <ReactRouterPrompt when={showPrompt}>
                        {({ isActive }) => isActive && (
                            <AlertDialog
                                    title="작성중 다른페이지로 이동하시겠습니까?"
                                    message="작성사항이 저장되지 않을 수 있습니다."
                                    open={isActive}
                                    onClose={onCancel}
                                    onSubmit={onSubmit}
                            />
                    )}
                    </ReactRouterPrompt>
                    <CustomContainer maxWidth="md" sx={{ paddingTop: 10 }}>
                        <Button variant="contained" onClick={handleOpenDialog}>
                            게시글 작성
                        </Button>
                        <PostDialog open={isDialogOpen} onClose={handleCloseDialog} onSubmit={onSubmit} data={postItem} postCode={postCode} />
                        <Editor code={postCode} data={state?.data.contents} />
                    </CustomContainer>
                </ThemeProvider>
            )}
        </>
    );
}

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
}));

