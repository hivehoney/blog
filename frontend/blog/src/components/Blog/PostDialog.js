import React, {useEffect, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function PostDialog({ open, onClose, onSubmit, data }) {
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if (data) {
            setPostData(data);
        }
    }, [data]);

    const handleSubmit = () => {
        onSubmit(postData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isSubmitDisabled = !postData.title || !postData.subTitle;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>게시글 작성</DialogTitle>
            <DialogContent>
                <DialogContentText>제목과 부제목을 입력하세요.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="제목"
                    fullWidth
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="부제목"
                    fullWidth
                    name="subTitle"
                    value={postData.subTitle}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="태그"
                    fullWidth
                    name="tag"
                    value={postData.tag}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={isSubmitDisabled}>
                    작성
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;