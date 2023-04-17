
export default function CategoryCard(props) {
    const {
        cardClicked,
        setCardClicked,
        transfer,
        updateCatQuick,
        setTransfer,
        setSuccess,
        setCardHover,
        setValue,
        value,
    } = props.data;
    return (
    <Tooltip title = 'Click to withdraw or deposit'>
                                    <Card 
                                        onClick = {() => {
                                            if (cardClicked) {
                                                setCardClicked(null);
                                            } else {
                                                setCardClicked(x.id);
                                            }
                                            if (transfer) {
                                                updateCatQuick(value, x, false);
                                                setTransfer(false);
                                                setSuccess(true);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            setCardHover(x.id);
                                        }}
                                        onMouseLeave={() => { 
                                            setCardHover(null); 
                                            setCardClicked(null);
                                            if (!transfer) {
                                                setValue('');
                                            }  
                                        }}
                                        sx = { cardHover === x.id ? {
                                            zIndex: 6000,
                                            margin:'-40px',
                                            height: '330px',
                                            width: '330px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                        } : {
                                            height: '250px',
                                            width: '250px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                        }}>
                      
                                        <CardContent>
                                            <Box sx = {{
                                                height: '100%'
                                                // display: 'flex',
                                                // flexDirection: 'column',
                                                // justifyContent: 'center',
                                                // alignItems: 'center'
                                            }}>
                                                <Box sx = {{display: 'flex', alignItems: 'center', justifyContent: cardHover === x.id ? 'spaceBetween' : 'center', marginTop: '-5px', width: '100%'}}>
                                                    <Typography variant = 'h4' sx = {{
                                                        // width: '100%',
                                                        // textAlign: 'left',
                                                        letterSpacing: '4px',
                                                        //color: cardHover === x.id ? (theme) => theme.palette.secondary.main : (theme) => theme.palette.text
                                                        fontWeight: cardHover === x.id ? 600 : 400
                                                    }}>
                                                        {x.name}
                                                    </Typography>
                                                    {cardHover === x.id && <Typography
                                                        variant = 'h6'
                                                        sx = {{
                                                            color: (theme) => theme.palette.text.disabled,
                                                            marginBottom: '-8px',
                                                            marginLeft: 'auto'
                                                        }}>
                                                        {formatter.format(x.limit)}
                                                    </Typography>}
                                                </Box>
                                                <Divider />
                                           
                                                <Typography 
                                                        variant = {cardHover === x.id ? 'h5' : 'h4'}
                                                        sx = {cardHover === x.id ? {
                                                        width: '100%',
                                                        textAlign: 'center'
                                                    } : {
                                                        width: '100%',
                                                        textAlign: 'center',
                                                        marginTop: '50px'
                                                    }}>
                                                      {formatter.format(x.balance)}
                                                    </Typography>
                                          
                                                     
                                   
                                            </Box>
                                               
                                        </CardContent>

                                        {((cardHover === x.id || cardClicked === x.id) && !transfer) &&
                                            <>
                                                <Box sx = {{
                                                    padding: '20px 20px 0px 20px',
                                                    display:'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                    {/* <Typography sx = {{
                                                        letterSpacing: '2px',
                                                        color: (theme) => theme.palette.text.disabled,
                                                    }}>
                                                        Withdraw (-) / Deposit (+)
                                                    </Typography> */}
                                                </Box>
                                                <Box sx = {{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    padding: '20px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <IconButton sx = {{ 
                                                        width: '40px',
                                                        height: '40px',
                                                        '&:hover' : 
                                                            { 
                                                                "*": {
                                                                    color: (theme) => theme.palette.error.main
                                                                }
                                                            }
                                                        }}
                                                        onClick = {() => {updateCat(value, false, x, false)}}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <form 
                                                        style = {{width: '100%'}}
                                                        onSubmit = {(e) => {
                                                            e.preventDefault();
                                                            if(!isNaN(value)) {
                                                                updateCatQuick(value, x, false);
                                                        }
                                                    }}>
                                                        <TextField
                                                            autoFocus = {true}
                                                            // focused = {true}
                                                            variant = 'standard'
                                                            sx = {{ width: '100%' }}
                                                            onChange = {(e) => {
                                                                setValue(e.target.value);
                                                                console.log(e.target.value);
                                                            }}
                                                            value = {value}
                                                            name = {'value'}
                                                        />
                                                    </form>

                                                    
                                                    <IconButton
                                                        onClick = {() => {updateCat(value, true, x, false)}} 
                                                        sx = {{ 
                                                            width: '40px',
                                                            height: '40px',
                                                            '&:hover' : { 
                                                                "*": {
                                                                    color: (theme) => theme.palette.success.main
                                                                  }
                                                            }
                                                            }}>
                                                        <AddIcon />
                                                    </IconButton>

                                                </Box>
                                            </>
                                            }
                                        
                                        <Box sx = {{
                                            marginTop: 'auto',
                                        }}>
                                            
                                            { cardHover === x.id && !transfer? 
                                                <Box sx = {{
                                                    display: 'flex',
                                                    padding: '0px 10px 5px 10px'
                                                }}>
                                                    <IconButton 
                                                        onClick = {() => {
                                                            setTransfer(!transfer);
                                                            updateCat(value, false, x, true)               
                                                        }}
                                                        sx = {{
                                                            '&:hover' : {
                                                                '*' : {
                                                                    color: (theme) => theme.palette.secondary.main
                                                                }
                                                            }
                                                    }}>
                                                        <SwapHorizIcon />
                                                    </IconButton>
                                                    <Box onClick = {() => {
                                                        setCat(x);
                                                        setEditorDialogOpen(true);
                                                    }}>
                                                        <IconButton sx = {{
                                                        '&:hover' : {
                                                            '*' : {
                                                                color: (theme) => theme.palette.warning.main
                                                            }
                                                        }
                                                    }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box onClick = {() => {
                                                        deleteRecord(`categories/${user.userID}`, x.id);
                                                    }}
                                                    sx = {{
                                                        marginLeft: 'auto'
                                                    }}>
                                                        <IconButton >
                                                            <DeleteForeverIcon color= 'error'/>
                                                        </IconButton>
                                                    </Box>  
                                                </Box>  
                                            : 
                                                <></> 
                                            }
                                        </Box>         
                                    </Card>
                                </Tooltip>
    )
}