import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormHelperText} from "@mui/material";
import {useState} from "react";
import {validateEmail, validateName, validatePassword} from "../../common/utils/Validation";
import {styled} from "@mui/system";
import {USER_REG_SUCCESS} from "../../common/utils/constant";
import {alterMessgae} from "../../common/utils/StringUtil";
import {useUserInfo} from "../../quires/useLoginQuery";
import {useNavigate} from "react-router-dom";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const { addUser } = useUserInfo();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 조건이 하나라도 안 맞을 경우
        if (emailError || passwordError || firstNameError || lastNameError) {
            return alterMessgae("error", USER_REG_SUCCESS);
        }

        await addUser(formData, {
            onSuccess: () => {
                alterMessgae('success', USER_REG_SUCCESS)
                navigate("/login");
            },
            onError: () => {
                alterMessgae('error', '회원가입 실패')
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name == "firstName") {
            setFirstNameError(validateName(value) ? '' : '올바른 이름을 입력해주세요.');
        }

        if (name == "lastName") {
            setLastNameError(validateName(value) ? '' : '올바른 이름을 입력해주세요.');
        }

        if (name == "email") {
            setEmailError(validateEmail(value) ? '' : '올바른 이메일 형식이 아닙니다.');
        }

        if (name == "password") {
            setPasswordError(validatePassword(value) ? '' : '숫자+영문자+특수문자 조합으로 8자리 이상 25자리 이하로 입력해주세요!');
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    autoFocus
                                    error={firstNameError !== '' || false}
                                    onChange={handleChange}
                                />
                                <FormHelperTexts>{firstNameError}</FormHelperTexts>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={lastNameError !== '' || false}
                                    onChange={handleChange}
                                />
                                <FormHelperTexts>{lastNameError}</FormHelperTexts>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError !== '' || false}
                                    onChange={handleChange}
                                />
                                <FormHelperTexts>{emailError}</FormHelperTexts>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    error={passwordError !== '' || false}
                                    onChange={handleChange}
                                />
                                <FormHelperTexts>{passwordError}</FormHelperTexts>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Login/Login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}