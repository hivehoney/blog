import {Avatar, Box, CircularProgress, Container, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import React from "react";
import {createTheme, styled} from "@mui/material/styles";
import ErrorPage from "./errorPage";
import {useNavigate, useParams} from "react-router-dom";
import LongMenu from "../components/util/LongMenu";
import HorizonLine from "../components/util/HorizonLine";
import {deepOrange} from "@mui/material/colors";
import {usePostQuery} from "../quires/usePostQuery";

export default function Post() {
    const navigate = useNavigate();
    const { code } = useParams();
    const { data, isLoading, error } = usePostQuery(code);

    if (error) return <ErrorPage error />

    const handleEdit = async () => {
        navigate("/blog/tech/editor", { state: { data } });
    };

    const handleDelete = async () => {
        console.log("delete")
        // 삭제 버튼을 눌렀을 때의 작업을 작성해주세요.
        // 예: 삭제 API 호출
        // await deleteMutation.mutateAsync();
        // 성공적으로 삭제되면 홈페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
        // history.push('/');
    };

    // const deleteMutation = useMutation(handleDelete); // 추가

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CustomContainer maxWidth="md" sx={{ paddingTop: 10 }}>
                        {isLoading ? (
                            <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Typography variant="h4" component="h4" sx={{ mb:5 }}>{data.title}</Typography>
                                <Box sx={{ display: "flex", flexWrap: "nowrap", mb:3, alignItems: 'center'}}>
                                    <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30, mr:2 }}>{data.author}</Avatar>
                                    <Typography variant="h6" component="h6" sx={{ mr: 3 }}>{data.author}</Typography>
                                    <Typography variant="subtitle1" color="gray">{data.date}</Typography>
                                    <Box ml="auto">
                                        <LongMenu
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                    </Box>
                                </Box>
                                <HorizonLine />
                                <Typography
                                    variant="body1"
                                    dangerouslySetInnerHTML={{
                                        __html: data.contents
                                    }}
                                    sx={{ minHeight: '100vh'}}
                                ></Typography>
                            </>
                        )}
                </CustomContainer>
            </ThemeProvider>
        </>
    );
}

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
}));

const theme = createTheme({
    palette: {
        background: {
            default: '#F9F9F9',
        },
    },
});