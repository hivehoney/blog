import * as React from 'react';
import {Box, Button, Grid, Link, Skeleton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Link as RouterLink} from "react-router-dom";
import ErrorPage from "../errorPage";
import {usePostListQuery} from "../../quires/post/usePostListQuery";
import PageHeader from "../../components/Layout/PageHeader";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";
import PostCard from "../../components/Blog/PostCard";

function Tech() {
    const [token, setToken] = useRecoilState(tokenState);
    const postItemRequest = { status: 1 };
    const { data, isLoading, error } = usePostListQuery(postItemRequest);

    if (error) return <ErrorPage error />

    return (
        <>
            <Grid container className="sub-bg-color2" sx={{ display: "flex", justifyContent: "center" }}>
                <PageHeader title={"Related Posts"} />
                {token && (
                    <Link component={RouterLink} to="editor" underline="none" color="White">
                        <Button variant="contained" endIcon={<EditIcon />}>
                            Post
                        </Button>
                    </Link>
                )}
                {(!isLoading ? data : Array.from(new Array(6))).map((item, index) =>
                    item ? (
                        <PostCard key={index} item={item} />
                    ) : (
                        <Box key={index} sx={{ width: 350, margin: '50px 20px', justifyContent: 'center' }}>
                            <Skeleton variant="rectangular" width={300} height={200} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    )
                )}
            </Grid>
        </>
    );
}

export default Tech;