import React from "react";
import {Avatar, Box, CircularProgress, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import LongMenu from "../../components/util/LongMenu";
import HorizonLine from "../../components/util/HorizonLine";
import {deepOrange} from "@mui/material/colors";
import {usePostsQuery} from "../../quires/post/usePostsQuery";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";
import PageImage from "../../components/Layout/PageImage";
import Grid from "@mui/material/Grid";

export default function Post() {
    const navigate = useNavigate();
    const postCode  = useParams();
    const { data, deletePost } = usePostsQuery(postCode);
    const [token, setToken] = useRecoilState(tokenState);

    const handleEdit = async () => {
        navigate("/blog/tech/editor", { state: { data } });
    };

    const handleDelete = async () => {
        await deletePost(postCode,{
            onSuccess: () => {
                navigate("/blog/tech");
            }
        });
    };

    return (
        <>
            {!data ? (
                <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                </Box>
            ) : (
                <>
                    <Grid container component="main" className="main-bg-content">
                        <PageImage imgSrc={data.bannerImage} title={data.title} />
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                                marginTop: 10,
                            }}
                        >
                            <Typography variant="h4" component="h4" className="font weight" sx={{ mb: 5 }}>
                                {data.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', mb: 3, alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30, mr: 2 }}>
                                    {data.authorId}
                                </Avatar>
                                <Typography className="font weight" variant="h6" component="h6" sx={{ mr: 3 }}>
                                    {data.authorId}
                                </Typography>
                                <Typography className="font" variant="subtitle1" color="gray">
                                    {data.postsDate}
                                </Typography>
                                {token && (
                                    <Box ml="auto">
                                        <LongMenu
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                    </Box>
                                )}
                            </Box>
                            <HorizonLine />
                            <Typography
                                variant="body1"
                                className="font"
                                dangerouslySetInnerHTML={{
                                    __html: data.contents,
                                }}
                                sx={{ minHeight: '100vh', minWidth: '50%' }}
                            ></Typography>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}