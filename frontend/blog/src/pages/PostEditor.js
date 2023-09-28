import React, {useState} from "react";
import {Button, Container, CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme, styled} from '@mui/material/styles';
import PostDialog from "../components/Blog/PostDialog";
import Editor from "../components/Blog/Editor";
import AlertDialog from "../components/util/AlertDialog";
import ReactRouterPrompt from "react-router-prompt";
import usePostMutation from "../quires/usePostMutation";
import usePostQuery from "../quires/usePostQuery";
import {API} from "../config";
import axios from "axios";
import {useQuery} from "react-query";

export default function PostEditor() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const { data: postItemRequest } = useQuery('POSTINFO', async()  => await axios.get(API.POSTADD).then(({ data }) => JSON.parse(data).data));
    const { mutate } = usePostMutation();

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const onSubmit = (postItemRequest) => {
        const contentRequest = { content: window.editor.getData({ rootName: 'content' }) };

        mutate({ postItemRequest, contentRequest } );
        setShowPrompt(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReactRouterPrompt when={showPrompt}>
                    {({ isActive, onCancel }) => isActive && (
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
                    <PostDialog open={isDialogOpen} onClose={handleCloseDialog} onSubmit={onSubmit} data={postItemRequest} />
                    <Editor />
                </CustomContainer>
            </ThemeProvider>
        </>
    );
}

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
}));

const theme = createTheme({
    palette: {
        background: {
            default: '#F9F9F9',
        },
    },
});