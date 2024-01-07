import * as React from 'react';
import {useState} from 'react';
import {Box, Button, Grid, Link, Skeleton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Link as RouterLink} from "react-router-dom";
import {usePostListQuery} from "../../quires/post/usePostListQuery";
import PageHeader from "../../components/Layout/PageHeader";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";
import PostCard from "../../components/Blog/PostCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Tech() {
    const [token, setToken] = useRecoilState(tokenState);
    const [search, setSearch] = useState(null);
    const { data, moreDataHandler, hasNextPage } = usePostListQuery("");

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
                {(data ? data : Array.from(new Array(6))).map((item, index) =>
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
                {hasNextPage && (
                    <Grid container sx={{ justifyContent: "center", marginBottom: '80px' }}>
                        <button style={{ width:'120px', height:'50px', fontSize: '16px'}} onClick={moreDataHandler}>
                            <ExpandMoreIcon /> 더 보기
                        </button>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Tech;