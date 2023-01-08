import { Popover,  ListItemButton, ListItemText } from '@mui/material';
import usePage from "@services/Providers/PageProvider"
import { Link as RouterLink } from "react-router-dom";

function OptionsPopover(props) {
    const { page, setPage } = usePage();
    const { deleteConsult, destination, ...otherProps } = props;
    
    const handleChange = (event) => {
        setPage("edit");
    };
    return (
        <Popover
            {...otherProps}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {
                page === "edit" ? "" : 
                <ListItemButton onClick={handleChange} id={props.id} component={RouterLink} to={`consult/${destination}/edit`}>
                    <ListItemText primary="Edit" />
                </ListItemButton>
            }
            
            <ListItemButton onClick={function(event){ deleteConsult(destination); otherProps.onClose()}}>
                <ListItemText primary="Delete" />
            </ListItemButton>
        </Popover>
    );
}

export default OptionsPopover; 