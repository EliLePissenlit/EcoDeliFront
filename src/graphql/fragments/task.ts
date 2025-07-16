import { gql } from '@apollo/client';

const taskBasicFragment = gql`
  fragment TaskBasicFragment on Task {
    id
    userId
    user {
      ...User
    }
    categoryId
    category {
      ...CategoryFragment
    }
    type
    status
    title
    description
    estimatedDuration
    fileId
    fileUrl
    addressId
    address {
      ...AddressFragment
    }
    shipping {
      ...ShippingFragment
    }
    calculatedPriceInCents
    validationCode
    completedAt
    validatedAt
    createdAt
    updatedAt
  }
`;

const taskFragment = gql`
  fragment TaskFragment on Task {
    ...TaskBasicFragment
    applications {
      ...TaskApplicationFragment
    }
  }
`;

const taskApplicationFragment = gql`
  fragment TaskApplicationFragment on TaskApplication {
    id
    taskId
    applicantId
    applicant {
      ...User
    }
    task {
      ...TaskBasicFragment
    }
    status
    message
    validationCode
    startedAt
    completedAt
    validatedAt
    createdAt
    updatedAt
  }
`;

const taskMessageFragment = gql`
  fragment TaskMessageFragment on TaskMessage {
    id
    taskId
    senderId
    sender {
      ...User
    }
    receiverId
    receiver {
      ...User
    }
    content
    messageType
    isRead
    createdAt
  }
`;

const addressFragment = gql`
  fragment AddressFragment on Address {
    id
    mainText
    secondaryText
    lat
    lng
    placeId
    fullAddress
    locationType
    createdAt
  }
`;

const shippingFragment = gql`
  fragment ShippingFragment on Shipping {
    id
    taskId
    packageCategory
    pickupAddressId
    pickupAddress {
      ...AddressFragment
    }
    deliveryAddressId
    deliveryAddress {
      ...AddressFragment
    }
    packageDetails
    estimatedDistanceInMeters
    estimatedDurationInMinutes
    calculatedPriceInCents
    createdAt
    updatedAt
  }
`;

export {
  taskFragment,
  addressFragment,
  shippingFragment,
  taskBasicFragment,
  taskMessageFragment,
  taskApplicationFragment,
};
