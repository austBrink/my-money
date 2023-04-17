import react, { useEffect, useState, useContext } from 'react';
import {
    getRef,
    getOnValue,
    deleteRecord,
    updateRecord
} from '../../utils/firebase';
import {
    Box,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    CardActionArea,
    Fab,
    Tooltip,
    IconButton,
    Skeleton,
    TextField,
    Snackbar,
    Alert,
    Stack,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UserContext from '../../context/UserContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { formatter } from '../../utils/genUtils';
import { Warning } from '@mui/icons-material';
import CategoryCard from '../CategoryCard/CategoryCard';

export const ListCategories = () => {

    // data state
    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState(false);
    const [ value, setValue ] = useState();
    const [ cat, setCat ] = useState(null);
    
    // UI State 
    const [ cardHover, setCardHover ] = useState(null);
    const [ cardClicked, setCardClicked ] = useState(null);
    const [ editorDialogOpen, setEditorDialogOpen ] = useState(false);
    const [ transfer, setTransfer ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ noCats, setNoCats ] = useState(false);

    const setOpenWrapper = (x) => {
        setEditorDialogOpen(x);
    }

    const updateCat = (val, isDeposit, category, trans) => {
        if (!isDeposit) {
            updateCatQuick(`-${val}`, category);
            return;
        }
        updateCatQuick(val, category, trans);
    }

    const updateCatQuick = (val, category, trans) => {
        if (val.includes('-')) {
            val = val.replace('-','');
            if(!isNaN(val)) {
                const newBal = Number(category.balance) - Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    if(trans === false) {setValue('');}
                });
                
            }
        } else {
            if(!isNaN(val)) {
                const newBal = Number(category.balance) + Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    if(trans === false) {setValue('');}
                });
             
            }
        }
        
    }

    // FUNCTIONS // 
    const getCategories = () => {
        const ref = getRef(`categories/${user.userID}`);
        getOnValue(ref, (snapshot) => {
            const cats = snapshot.val();
            const newCats = [];
            for (let cat in cats) {
              newCats.push({
                id: cat,
                name: cats[cat].name,
                balance: cats[cat].balance,
                limit: cats[cat].limit
              });
            }
            setCategories(newCats);
          });
    }

    const handleEnter = () => {
        console.log(value);      
    }

    // USE EFFECT //
    useEffect(() => {
        if (user.userID) {
            getCategories();
        }   
    },[]);


    useEffect(() => {
        if(categories.length === 0) {
            setNoCats(true);
            return; 
        } 
        setNoCats(false);
    },[categories.length]);

    return(
        <Box sx = {{
            padding: '10px',
            width: '98%',
        }}>
            <CreateCategory
                open = {editorDialogOpen}
                cat = { cat }
                setOpenWrapper = {setOpenWrapper}
            />
            <Divider>
                <Box sx = {{
                    margin: '0px 15px 0px 15px',
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant = 'h4' sx = {{
                        letterSpacing: '5px'
                    }}>
                        YOUR CATEGORIES
                    </Typography>
                    <Tooltip title = 'Create New Category'>
                        <Fab 
                            size = {'small'}
                            color="primary"
                            aria-label="add"
                            sx ={{'&:hover': {transform: 'scale(1.2)'}}}
                            onClick = {() => {
                                setOpenWrapper(true);
                                setCat(null);
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>   
                </Box>
            </Divider>
                <Grid container spacing = {3} sx = {{margin: '15px'}}>
                    { noCats 
                        && <Box sx = {{
                            margin: '15px'
                        }}>
                            <Typography 
                                variant = 'h6'
                                sx = {{letterSpacing: '3px'
                            }}>
                                No categories to display.
                            </Typography>
                            <Typography sx = {{letterSpacing: '2px'}}> 
                                Click the '+' button above to create categories and start your budget.
                            </Typography>
                    </Box> }
                    { categories?.length > 0 && categories.map((x) => {
                        return (
                            <Grid item sx = {cardHover === x.id && {zIndex: 9000}}> 
                                {/**This Card should probably be abstracted. */}
                                <CategoryCard 
                                    data = { {cardClicked,
                                    setCardClicked,
                                    transfer,
                                    updateCatQuick,
                                    setTransfer,
                                    setSuccess,
                                    setCardHover,
                                    setValue,
                                    value} }
                                />
                            </Grid>
                        )
                    }) } 
                    
                    {/* {
                        categories === false && 
                        <Grid 
                            container 
                            spacing = {3} 
                            sx = {{margin: '15px'}}
                        > 
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                        </Grid>   
                    } */}
                    {/* { categories?.length === 0 && 
                    <Box sx = {{
                        margin: '15px',
                        height: '100%',
                        width: '100%',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Typography variant = 'h5' color = 'error'>
                            Looks like you don't have any categories.
                        </Typography>
                        <Typography color = 'primary'>
                            To better track your spending click the big + icon above to get started making categories.
                        </Typography>

                    </Box>
                    } */}         
                </Grid>   
       
                <Snackbar open={transfer} autoHideDuration={8000} onClose={() => {}}>
                    <Alert onClose={() => {}} severity="info" sx={{ width: '100%' }}>
                        Choose a category to transfer {formatter.format(value)} to. Click anywhere else to abort.
                    </Alert>
                </Snackbar>  
                <Snackbar open={success} autoHideDuration={6000} onClose={() => {setSuccess(true)}}>
                    <Alert onClose={() => {setSuccess(false)}} severity="success" sx={{ width: '100%' }}>
                        Nice. Monies tranfered. 
                    </Alert>
                </Snackbar> 
      
        </Box>
    );
}
