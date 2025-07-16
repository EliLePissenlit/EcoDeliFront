import { gql } from '@apollo/client';

const openingDayFragment = gql`
  fragment OpeningDayFragment on OpeningDay {
    day
    open
    close
    isOpen
  }
`;

export default openingDayFragment;
