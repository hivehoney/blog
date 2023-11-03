import * as React from 'react';
import PropTypes from "prop-types";
import {Box, Button, Container, Grid, Link, Skeleton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Link as RouterLink} from "react-router-dom";
import ErrorPage from "./errorPage";
import {usePostListQuery} from "../quires/usePostListQuery";

function Board(props) {
    const { loading = false, data } = props;

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
                            <Link component={RouterLink} to={`detail/${item.postCode}`} underline="none" color="White">
                                <img
                                    style={{ width: 300, height: 200 }}
                                    alt={item.title}
                                    src={item.src}
                                />
                                <Box sx={{ pr: 2 }}>
                                    <Typography gutterBottom variant="h6">
                                        {item.title}
                                    </Typography>
                                    <Typography display="block" variant="caption" color="text.secondary">
                                        {item.authorId}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {`${item.postsDate} • ${item.tag}`}
                                    </Typography>
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton variant="rectangular" width={300} height={200} />
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

function Tech() {
    const postItemRequest = {
        status: 1
    };

    const { data, isLoading, error } = usePostListQuery(postItemRequest);

    if (error) return <ErrorPage error />

    return (
        <>
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ p: 5 }}>
                Related Posts
                <Link component={RouterLink} to="editor" underline="none" color="White">
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        sx={{
                            textAlign: 'left',
                            float: 'right'
                        }}
                    >
                        Post
                    </Button>
                </Link>
            </Typography>
            {data != undefined && !isLoading && (
                <Box sx={{ overflow: 'hidden' }}>
                    <Board loading={isLoading} data={data} />
                </Box>
                )}
        </Container>
        </>
    );
}

export default Tech;