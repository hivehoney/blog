import Paper from "@mui/material/Paper";
import {Box, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";

const PostCard = ({ item }) => (
    <Paper elevation={3} sx={{ width: 350, margin: '50px 20px', justifyContent: 'center'}}>
        <Link component={RouterLink} to={`detail/${item.postCode}`} underline="none" color="White">
            <img style={{ width: 350, height: 250 }} alt={item.title} src={item.bannerImage} />
            <Box className="template-card3" sx={{ p:3}}>
                <Typography gutterBottom variant="h6" className="font weight">
                    {item.title}
                </Typography>
                <Typography display="block" variant="caption" className="font weight">
                    {item.authorId}
                </Typography>
                <Typography variant="caption" className="font weight">
                    {`${item.postsDate} • ${item.tag}`}
                </Typography>
            </Box>
        </Link>
    </Paper>
);

export default PostCard;
