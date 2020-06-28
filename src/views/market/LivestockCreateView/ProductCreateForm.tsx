import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const waterTypes = [
  { id: 'salt', name: 'Saltwater' },
  { id: 'fresh', name: 'Freshwater' }
];

const classifications = [
  { id: 'invert', name: 'INVERTEGRATE' },
  { id: 'coral', name: 'coral' },
  { id: 'fish', name: 'FISH' }
];

const species = [
  { id: 'sps', name: 'SPS' },
  { id: 'lps', name: 'LPS' },
  { id: 'soft_coral', name: 'Soft Corals' }
];

const ProductCreateForm = () => {
  return <div>Product Create Form</div>;
};

export default ProductCreateForm;
