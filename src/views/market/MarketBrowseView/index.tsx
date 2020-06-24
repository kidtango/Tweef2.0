import React from 'react';
import Header from './Header';
import { makeStyles, Container, Box } from '@material-ui/core';
import useIsMountedRef from 'hooks/useIsMountedRef';
import Page from 'components/Page';
import { Filter } from 'react-feather';
import Results from './Results';
import { Livestock } from 'models';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const livestock: Livestock[] = [
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4.4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX',
    subcribers: [uuidv4(), uuidv4(), uuidv4()]
  },
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX'
  },
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX'
  },
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX'
  },
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX'
  },
  {
    id: uuidv4(),
    water: 'SALTY',
    seller: {
      id: uuidv4(),
      kind: 'Reefer',
      firstName: 'Joe',
      lastName: 'Smoe',
      avatar:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70',
      location: 'Cedar Park, TX',
      createdAt: new Date(),
      rating: 4
    },
    media:
      'https://topshelfaquatics.com/wp-content/uploads/2020/05/EC3.G10.043020-1.jpg',
    createdAt: new Date(),
    class: {
      type: 'INVERTEGRATES',
      species: 'SPS'
    },
    name: 'SR Snagglepuss',
    description:
      'WYSIWYG - you will receive the exact piece shown. Photos are taken under Radion G4 Pros, 100% Violet, 100% UV, 100% Deep Blue, 50% blue.',
    likes: 10,
    isLiked: true,
    updatedAt: new Date('01/11/2020'),
    location: 'Cedar Park, TX'
  }
];

const MarketBrowseView: React.FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results livestock={livestock} />
        </Box>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default MarketBrowseView;
