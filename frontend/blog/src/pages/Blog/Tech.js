import * as React from 'react';
import PropTypes from "prop-types";
import {Box, Button, Container, Grid, Link, Skeleton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Link as RouterLink} from "react-router-dom";
import ErrorPage from "../errorPage";
import {usePostListQuery} from "../../quires/post/usePostListQuery";
import PageHeader from "../../components/Layout/PageHeader";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";

function Board(props) {
    const { loading = false, data } = props;

    return (
        <>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                marginLeft={0}
            >
            {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
                <Box key={index}
                     sx={{ width:350, margin: '50px 20px', justifyContent: 'center' }}>
                    {item ? (
                        <Link component={RouterLink} to={`detail/${item.postCode}`} underline="none" color="White">
                            <img
                                style={{ width: 345, height: 250 }}
                                alt={item.title}
                                src={item.bannerImage}
                            />
                            <Box>
                                <Typography gutterBottom variant="h6" color="#000000">
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
        </>
    );
}

Board.propTypes = {
    loading: PropTypes.bool,
};

function Tech() {
    const [token, setToken] = useRecoilState(tokenState);
    const postItemRequest = {
        status: 1
    };

    const { data, isLoading, error } = usePostListQuery(postItemRequest);
    if (error) return <ErrorPage error />

    return (
        <>
        <Container maxWidth="false">
            <PageHeader title={"Related Posts"} />
            {!token && (
                <Link component={RouterLink} to="editor" underline="none" color="White">
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        sx={{ textAlign: 'left', float: 'right' }}
                    >
                        Post
                    </Button>
                </Link>
            )}
            {data != undefined && !isLoading && (
                <Box sx={{ overflow: 'hidden', maxWidth: '1800px', margin: '0 auto' }}>
                    <Board loading={isLoading} data={data} />
                </Box>
                )}
        </Container>
        </>
    );
}

export default Tech;