import * as React from 'react';
import PropTypes from "prop-types";
import {Box, Button, Container, Grid, Link, makeStyles, Skeleton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Layout from "../components/Layout/Layout";

const data = [
    {
        src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
        title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
        channel: 'Don Diablo',
        views: '396k views',
        createdAt: 'a week ago',
    },
    {
        src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
        title: 'Queen - Greatest Hits',
        channel: 'Queen Official',
        views: '40M views',
        createdAt: '3 years ago',
    },
    {
        src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
        title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
        channel: 'Calvin Harris',
        views: '130M views',
        createdAt: '10 months ago',
    },
];

function Board(props) {
    const { loading = false } = props;

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
                    <Box key={index} sx={{ width: 300, marginRight: 5, my: 5 }}>
                        {item ? (
                            <img
                                style={{ width: 300, height: 200 }}
                                alt={item.title}
                                src={item.src}
                            />
                        ) : (
                            <Skeleton variant="rectangular" width={300} height={200} />
                        )}
                        {item ? (
                            <Box sx={{ pr: 2 }}>
                                <Typography gutterBottom variant="h6">
                                    {item.title}
                                </Typography>
                                <Typography display="block" variant="caption" color="text.secondary">
                                    {item.channel}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {`${item.views} • ${item.createdAt}`}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        )}
                    </Box>
                ))}
            </Grid>
        </Box>
        </>
    );
}

Board.propTypes = {
    loading: PropTypes.bool,
};

export default function Tech() {
    return (
        <>
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ p: 5 }}>
                Related Posts
            </Typography>
            <Link href="/post/editor" underline="none" color="White">
                <Button variant="contained" endIcon={<EditIcon />}>Post</Button>
            </Link>
            <Box sx={{ overflow: 'hidden' }}>
                <Board loading />
                <Board />
            </Box>
        </Container>
        </>
    );
}