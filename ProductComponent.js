import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    Box,
    List
  } from '@material-ui/core';

  const styles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    linespace: {
      padding: theme.spacing(1, 1)
    },
    rootCard: {
        width: 250,
      },
      bulletCard: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      titleCard: {
        fontSize: 20,
      },
      posCard: {
        marginBottom: 12,
      },
      footeBox: {
        width: '100%',
        backgroundColor: '#3f51b5',
        position: 'fixed',
        bottom: '2px',
        marginLeft: '0px',
        marginBottom: '-2px',
        height: '130px'
      },
      footerList: {
        textAlign : 'center'
      },
  }));


function ProductComponent () {
    const [productList, setProductList] = useState([])
    const [cart, setCart] = useState(0)

    useEffect (async ()=> {
        var response = await axios.get('http://localhost:4000/product/getproduct')
        setProductList(response.data);
        updateCart(response)
    }, [])

    const updateProduct = async (id, quantity) => {
        await axios.put(`http://localhost:4000/product/updateproduct/${id}`, {
            userQuantity : quantity
        })
        var response = await axios.get('http://localhost:4000/product/getproduct')
        setProductList(response.data);
        updateCart(response)
    }
    
    const updateCart = (response) => {
        var cart = response.data.reduce((accumulator, currentValue)=> {
            return (currentValue.userQuantity) ?  accumulator + 1 :  accumulator
        }, 0);
        setCart(cart)
    }

    const classes = styles();
    return(
        <>
            <Grid>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        Guvi Products
                        </Typography>
                        <ShoppingCartIcon/> <span> {cart} </span>
                        <Button color="inherit">Checkout</Button>
                    </Toolbar>
                </AppBar>
                <br/> 
                <Grid container spacing={2} style={{margin: '30px'}}>
                {productList.map(row => 
                (
                <Grid item key={row._id}>
                <Card className={classes.rootCard} variant="outlined">
                <CardContent>
                    
                    <Typography variant="h5" component="h2">
                    {row.productName}
                    </Typography>
                    <Typography className={classes.posCard} color="textSecondary">
                    Quantity : {row.quantity}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {row.description}
                    </Typography>
                    <Typography className={classes.titleCard} color="textSecondary" gutterBottom>
                        Price : {row.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => updateProduct(row._id, row.userQuantity+1)} disabled={row.userQuantity>=row.quantity}>+</Button> 
                    {row.userQuantity} 
                    <Button size="small" onClick={() => updateProduct(row._id, row.userQuantity-1)} disabled={row.userQuantity === 0}>-</Button>
                </CardActions>
                </Card>
                </Grid>
                
                ))}
                </Grid>
                <Box className={classes.footeBox}>
                <List className={classes.footerList}>
                    <Button >
                    {' '}
                    Contact US{' '}
                    </Button>
                    <Button >
                    {' '}
                    ABOUT US{' '}
                    </Button>
                    <Button >
                    {' '}
                    FEEDBACK{' '}
                    </Button>
                    <Button >
                    {' '}
                    BRANCHES{' '}
                    </Button>
                </List>
                </Box>
            </Grid>
        </>
    )
}

export default ProductComponent;