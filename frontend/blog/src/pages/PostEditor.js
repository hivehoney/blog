import React, { useState, useEffect } from "react";
import {Button, CssBaseline, ThemeProvider, Container, Modal, Alert} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import PostDialog from "../components/Blog/PostDialog";
import Editor from "../components/Blog/Editor";
import {useDispatch, useSelector} from "react-redux"
import AlertDialog from "../components/util/AlertDialog";
import ReactRouterPrompt from "react-router-prompt";
import {addPost} from "../redux/post";

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

export default function PostEditor() {
    const dispatch = useDispatch();
    const pageId = useSelector(state => state.pageId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmitPost = (postItemRequest) => {
        const contentRequest = {
            content: window.editor.getData({ rootName: 'content' }),
        };

        const data = {
            postItemRequest,
            contentRequest,
        };

        dispatch(addPost(data));
        setShowPrompt(false);
        console.log("handleAlertDialogClose calledssss");
        window.history.back();
    };

    const handleAlertDialogClose = () => {
        console.log("handleAlertDialogClose called");
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
                                onSubmit={handleAlertDialogClose}
                        />
                )}
                </ReactRouterPrompt>
                <CustomContainer maxWidth="md" sx={{ paddingTop: 10 }}>
                    <Button variant="contained" onClick={handleOpenDialog}>
                        게시글 작성
                    </Button>
                    <PostDialog open={isDialogOpen} onClose={handleCloseDialog} onSubmit={handleSubmitPost} pageId={pageId} />
                    <Editor />
                </CustomContainer>
            </ThemeProvider>
        </>
    );
}
