import Card from '@mui/material/Card';
import type { CardProps } from '@mui/material/Card';

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import type { PaymentMethod } from 'src/types/graphql/typeDefs';

import { PaymentMethodItem } from './payment-method-item';

// ----------------------------------------------------------------------

type Props = CardProps & {
  cards: PaymentMethod[];
};

export function PaymentMethods({ cards, sx, ...other }: Props) {
  const carousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  });

  return (
    <Card sx={{ ...sx }} {...other}>
      <CarouselArrows
        filled
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ position: 'absolute', top: '50%' }}
        leftButtonProps={{
          sx: {
            left: -16,
            ...(!cards.length && { display: 'none' }),
          },
        }}
        rightButtonProps={{
          sx: {
            right: -16,
            ...(!cards.length && { display: 'none' }),
          },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {cards.map((card) => (
            <PaymentMethodItem key={card.id} card={card} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
  );
}
