import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

const SubCategory = ({ subs, details }) => {
    const [expand, setExpand] = React.useState(false);

    const handleClick = () => {
        setExpand(!expand);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={details} />
                {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {
                !!subs.length && subs.map((data) => {
                    return (

                        <Collapse key={data._id} in={expand} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary={data.name} />
                                </ListItemButton>
                            </List>
                        </Collapse>

                    )
                })

            }
        </>
    )
}

export default SubCategory