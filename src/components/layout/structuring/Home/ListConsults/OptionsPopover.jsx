import { Popover,  ListItemButton, ListItemText } from '@mui/material';

function OptionsPopover(props) {
    const { deleteConsult, destination, ...otherProps } = props;
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
            <ListItemButton id={props.id} component="a" href={`consult/${destination}/edit`}>
                <ListItemText primary="Edit" />
            </ListItemButton>
            <ListItemButton onClick={function(event){ deleteConsult(destination); otherProps.onClose()}}>
                <ListItemText primary="Delete" />
            </ListItemButton>
        </Popover>
    );
}

export default OptionsPopover; 