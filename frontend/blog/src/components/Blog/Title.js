import {Avatar, Box, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import React from "react";

const PostTitle = ({ title, author, date }) => {
    return (
        <>
        <Typography variant="h4" component="h4" sx={{ mb:5 }}>{title}</Typography>
        <Box sx={{ display: "flex", flexWrap: "nowrap", mb:3, alignItems: 'center'}}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30, mr:2 }}>{author}</Avatar>
            <Typography variant="h6" component="h6" sx={{ mr: 3 }}>{author}</Typography>
            <Typography variant="subtitle1" color="gray">{date}</Typography>
        </Box>
        </>
    );
};

export default PostTitle;