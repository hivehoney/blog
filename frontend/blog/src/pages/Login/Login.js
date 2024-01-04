import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {alterMessgae} from "../../common/utils/StringUtil";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../quires/useLoginQuery";
import {setCookie} from "../../common/utils/Cookies";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";

const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const { loginUser } = useUserInfo();
    const [token, setToken] = useRecoilState(tokenState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get('email')) {
            setErrorMessage('Email을 입력해 주세요');
            clearErrorMessageAfterDelay();
            return;
        }

        if (!data.get('password')) {
            setErrorMessage('Password를 입력해 주세요');
            clearErrorMessageAfterDelay();
            return;
        }

        await loginUser.mutate({
            userId: data.get("email"),
            password: data.get("password"),
        },{
            onSuccess: (token) => {
                // 응답에서 헤더 정보를 추출
                const accessToken = token.headers.authorization.replace('Bearer ', '');

                if(accessToken){
                    setCookie('accessToken', accessToken, {
                        path: '/',
                        expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
                    });
                    setToken(accessToken);
                }
                navigate("/blog/tech");
            },
            onError: (error) => {
                setErrorMessage('회원정보가 틀렸습니다.');
                clearErrorMessageAfterDelay();
            }
        });
    };

    const clearErrorMessageAfterDelay = () => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {errorMessage && (
                            alterMessgae('error', errorMessage)
                        )}
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>*/}
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://tae-uk.com/">
                tae-uk.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}