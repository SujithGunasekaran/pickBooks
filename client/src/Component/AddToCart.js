import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export default function CartDialougeBox(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.showCartDetails}
        onClose={()=>props.handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.bookName}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontFamily:"'Nunito', sans-serif'",fontSize:'13px',color:'green'}}>
                {props.bookName} Book, Successfully Added to your Cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>props.handleClose()} color="primary" style={{fontSize:'12px'}}>
            Cancel
          </Button>
          <Link to="/Cart" className="product-cart-hover">
            <Button onClick={()=>props.handleClose()} color="secondary" autoFocus style={{fontSize:'12px'}}>
                View Cart
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
