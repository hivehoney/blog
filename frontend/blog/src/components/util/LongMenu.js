import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {ListItemIcon, ListItemText} from "@mui/material";
import Divider from '@mui/material/Divider';

const LongMenu = ({ handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            key: 'edit',
            text: '수정하기',
            color: 'disabled',
            icon: <ModeEditIcon color="disabled" />,
            onClick: handleEdit,
        },
        {
            key: 'delete',
            text: '삭제하기',
            color: '#b71c1c',
            icon: <DeleteOutlineIcon sx={{color: '#b71c1c'}} />,
            onClick: handleDelete,
        }
    ];

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{ 'aria-labelledby': 'long-button', }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => (
                    <>
                    <MenuItem key={item.key} onClick={item.onClick}>
                            <ListItemText primary={item.text} style={{ color: item.color, mr: 50 }} />
                            <ListItemIcon> {item.icon} </ListItemIcon>
                    </MenuItem>
                    {index === 0 && <Divider />}
                    </>
                ))}
            </Menu>
        </div>
    );
}

export default LongMenu;