import { Alert } from "@mui/material";

export function alterMessgae(type, text) {
    return (
        <Alert severity={type}>{text}</Alert>
    );
}

