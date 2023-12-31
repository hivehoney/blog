import React, {useEffect, useState} from "react";
import {Button, Container, CssBaseline, ThemeProvider} from "@mui/material";
import {styled} from '@mui/material/styles';
import PostDialog from "../../components/Blog/PostDialog";
import Editor from "../../components/Blog/Editor";
import AlertDialog from "../../components/util/AlertDialog";
import ReactRouterPrompt from "react-router-prompt";
import * as utils from "../../common/utils/StringUtil";
import {useLocation} from "react-router-dom";
import {theme1} from "../../assets/Theme";
import {usePostsQuery} from "../../quires/post/usePostsQuery";

export default function PostEditor() {
    const { state } = useLocation();
    const { updatePost, addPost } = usePostsQuery({enabled: false});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const [postCode, setPostCode] = useState(null)
    const [postItem, setPostItem] = useState({
        title: state?.data.title ?? "",
        subTitle: state?.data.subTitle ?? "",
        tag: state?.data.tag ?? "",
        bannerImage: ""
    });

    const onSubmit = async (formData, status) => {
        const content = { postCode: postCode, contents: window.editor.getData({ rootName: 'content' }) };
        const imgFile = utils.extractFilenames(content.contents);

        const postInfo = {
            ... (formData ? formData : postItem),
            status: status,
            postCode: postCode,
        };

        await updatePost({postInfo, content, imgFile}, {
            onSuccess:() => {
                document.querySelector('[role="toolbar"]').remove();
                window.history.back();
                setShowPrompt(false);
            }
        })
    };

    const fetchData = async (state) => {
        if (!state) {
            await addPost((postCode), {
                onSuccess: (code) => {
                    setPostCode(code.data)
                }
            })
        } else {
            setPostCode(state.data.postCode);
        }
    };

    const onCancel = () => {
        document.querySelector('[role="toolbar"]').remove();
        window.history.back();
        setShowPrompt(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        fetchData(state);
    }, [state]);

    return (
        <>
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
        </>
    );
}

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
}));

