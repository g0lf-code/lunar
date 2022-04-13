import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ id, prod, user }) {
  const navigate = useNavigate();

  function _onCardClick(e) {
    navigate(`/user/${id}`);
  }

  return (
    <Card
      key={id}
      style={{
        width: '500px',
        margin: 10,
        height: '40vh',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={(e) => _onCardClick(e)}
    >
      <CardMedia
        component="img"
        alt="user"
        height="120px"
        image="/test-product.png"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textTranform: 'capitalize' }}
        >
          {prod?.title || user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prod?.description?.substring(0, 40) || user?.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
