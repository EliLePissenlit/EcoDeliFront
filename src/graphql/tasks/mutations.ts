import { gql } from '@apollo/client';

import userFragment from '../fragments/user';
import categoryFragment from '../fragments/category';
import {
  taskFragment,
  addressFragment,
  shippingFragment,
  taskMessageFragment,
  taskApplicationFragment,
} from '../fragments';

const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const APPROVE_TASK = gql`
  mutation approveTask($id: ID!) {
    approveTask(id: $id) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const REJECT_TASK = gql`
  mutation rejectTask($id: ID!, $reason: String!) {
    rejectTask(id: $id, reason: $reason) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const APPLY_TO_TASK = gql`
  mutation applyToTask($input: ApplyToTaskInput!) {
    applyToTask(input: $input) {
      ...TaskApplicationFragment
    }
  }
  ${taskApplicationFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const ACCEPT_APPLICATION = gql`
  mutation acceptApplication($applicationId: ID!) {
    acceptApplication(applicationId: $applicationId) {
      ...TaskApplicationFragment
    }
  }
  ${taskApplicationFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const REJECT_APPLICATION = gql`
  mutation rejectApplication($applicationId: ID!, $reason: String!) {
    rejectApplication(applicationId: $applicationId, reason: $reason) {
      ...TaskApplicationFragment
    }
  }
  ${taskApplicationFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const START_TASK = gql`
  mutation startTask($taskId: ID!) {
    startTask(taskId: $taskId) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const COMPLETE_TASK = gql`
  mutation completeTask($taskId: ID!) {
    completeTask(taskId: $taskId) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const VALIDATE_TASK_COMPLETION = gql`
  mutation validateTaskCompletion($taskId: ID!, $validationCode: String!) {
    validateTaskCompletion(taskId: $taskId, validationCode: $validationCode) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const SEND_TASK_MESSAGE = gql`
  mutation sendTaskMessage($input: SendTaskMessageInput!) {
    sendTaskMessage(input: $input) {
      ...TaskMessageFragment
    }
  }
  ${taskMessageFragment}
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

const MARK_MESSAGES_AS_READ = gql`
  mutation markMessagesAsRead($taskId: ID!) {
    markMessagesAsRead(taskId: $taskId)
  }
`;

const MARK_AN_INTERMEDIARY_STEP_FOR_A_TASK = gql`
  mutation markAnIntermediaryStepForATask($taskId: ID!, $intermediaryStep: AddressInput!) {
    markAnIntermediaryStepForATask(taskId: $taskId, intermediaryStep: $intermediaryStep) {
      ...TaskFragment
    }
  }
  ${taskFragment}
  ${categoryFragment}
  ${userFragment}
  ${addressFragment}
  ${shippingFragment}
`;

export {
  START_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  REJECT_TASK,
  APPROVE_TASK,
  APPLY_TO_TASK,
  COMPLETE_TASK,
  SEND_TASK_MESSAGE,
  ACCEPT_APPLICATION,
  REJECT_APPLICATION,
  MARK_MESSAGES_AS_READ,
  VALIDATE_TASK_COMPLETION,
  MARK_AN_INTERMEDIARY_STEP_FOR_A_TASK,
};
