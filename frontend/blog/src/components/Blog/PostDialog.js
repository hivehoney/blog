import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import {useSelector} from "react-redux";
import reducers from "../../redux/reducers";

function PostDialog({ open, onClose, onSubmit, pageId }) {
    const [formData, setFormData] = useState({
        id: pageId,
        title: '',
        subTitle: '',
        tag: '',
    });

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isSubmitDisabled = !formData.title || !formData.subTitle;

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
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="부제목"
                    fullWidth
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="태그"
                    fullWidth
                    name="tag"
                    value={formData.tag}
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