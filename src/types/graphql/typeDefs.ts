import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  createdAt: Scalars['String']['output'];
  fullAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  locationType: Scalars['String']['output'];
  mainText: Scalars['String']['output'];
  placeId: Scalars['String']['output'];
  secondaryText: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AddressInput = {
  fullAddress: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  locationType?: LocationType;
  mainText: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  secondaryText: Scalars['String']['input'];
};

export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Validated = 'VALIDATED'
}

export type ApplyToTaskInput = {
  message: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};

export type CancelSubscriptionInput = {
  email: Scalars['String']['input'];
  immediately?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CancelSubscriptionResponse = {
  __typename?: 'CancelSubscriptionResponse';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Category = {
  __typename?: 'Category';
  amountInCents: Scalars['Int']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['ID']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ContactUsInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  message: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type ContactUsersInput = {
  message: Scalars['String']['input'];
  users: Array<Scalars['ID']['input']>;
};

export type CreateCategoryInput = {
  amountInCents?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCustomPaymentInput = {
  amount: Scalars['Int']['input'];
  couponCode?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type CreateFileInput = {
  file: Scalars['Upload']['input'];
};

export type CreateFilesInput = {
  files: Array<Scalars['Upload']['input']>;
};

export type CreatePricingConfigInput = {
  basePriceLarge: Scalars['Int']['input'];
  basePriceMedium: Scalars['Int']['input'];
  basePriceSmall: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  pricePerKm: Scalars['Int']['input'];
  pricePerMinute: Scalars['Int']['input'];
};

export type CreateRelayPointInput = {
  address?: InputMaybe<AddressInput>;
  description: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
  openingDays: Array<Scalars['JSONObject']['input']>;
};

export type CreateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  priceId: Scalars['String']['input'];
};

export type CreateTaskInput = {
  address: AddressInput;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  deliveryAddress?: InputMaybe<AddressInput>;
  description: Scalars['String']['input'];
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  packageCategory?: InputMaybe<PackageCategory>;
  packageDetails?: InputMaybe<Scalars['JSONObject']['input']>;
  pickupAddress?: InputMaybe<AddressInput>;
  relayPointId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: TaskType;
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  downloadUrl?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileType: FileType;
  id: Scalars['ID']['output'];
  isFolder: Scalars['Boolean']['output'];
  parentFolderId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export enum FileType {
  CategoryIcon = 'CATEGORY_ICON',
  CategoryIconFolder = 'CATEGORY_ICON_FOLDER',
  Folder = 'FOLDER',
  Invoice = 'INVOICE',
  Other = 'OTHER',
  RelayPointImage = 'RELAY_POINT_IMAGE',
  RelayPointImageFolder = 'RELAY_POINT_IMAGE_FOLDER',
  TaskImage = 'TASK_IMAGE',
  TaskImageFolder = 'TASK_IMAGE_FOLDER',
  UserAvatar = 'USER_AVATAR',
  UserAvatarFolder = 'USER_AVATAR_FOLDER',
  UserFolder = 'USER_FOLDER',
  UserInvoicesFolder = 'USER_INVOICES_FOLDER'
}

export type GeoCoordinates = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

export type GeoPricingInput = {
  packageCategory: PackageCategory;
  relayPointId: Scalars['String']['input'];
  start: GeoCoordinates;
};

export enum LocationType {
  GpsLocation = 'GPS_LOCATION',
  IpLocation = 'IP_LOCATION'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum MessageType {
  System = 'SYSTEM',
  Text = 'TEXT',
  ValidationCode = 'VALIDATION_CODE'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptApplication: TaskApplication;
  activatePricingConfig: Scalars['Boolean']['output'];
  applyToTask: TaskApplication;
  approveTask: Task;
  cancelSubscription: CancelSubscriptionResponse;
  changePasswordWhileLoggedIn: Token;
  completeTask: Task;
  contactUs: Scalars['Boolean']['output'];
  contactUsers: Scalars['Boolean']['output'];
  createCategory?: Maybe<Category>;
  createCustomPayment: PaymentIntentResponse;
  createFiles: Array<File>;
  createFolder: File;
  createPricingConfig: PricingConfig;
  createRelayPoint: RelayPoint;
  createSubscription: SubscriptionResponse;
  createTask: Task;
  deactivatePricingConfig: Scalars['Boolean']['output'];
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteFile: Scalars['Boolean']['output'];
  deletePaymentMethod: Scalars['Boolean']['output'];
  deleteRelayPoint: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  login: Token;
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markAnIntermediaryStepForATask: Task;
  markMessagesAsRead: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  rejectApplication: TaskApplication;
  rejectTask: Task;
  resetPasswordAndSendItByEmail: Scalars['Boolean']['output'];
  saveLastPosition: User;
  sendTaskMessage: TaskMessage;
  startTask: Task;
  suspendUser: User;
  unsubscribe: Scalars['Boolean']['output'];
  updateCategory?: Maybe<Category>;
  updateRelayPoint: RelayPoint;
  updateTask: Task;
  updateUser: User;
  uploadAvatar: File;
  validateTaskCompletion: Task;
};


export type MutationAcceptApplicationArgs = {
  applicationId: Scalars['ID']['input'];
};


export type MutationActivatePricingConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationApplyToTaskArgs = {
  input: ApplyToTaskInput;
};


export type MutationApproveTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelSubscriptionArgs = {
  input: CancelSubscriptionInput;
};


export type MutationChangePasswordWhileLoggedInArgs = {
  input: ChangePasswordInput;
};


export type MutationCompleteTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationContactUsArgs = {
  input: ContactUsInput;
};


export type MutationContactUsersArgs = {
  input: ContactUsersInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCustomPaymentArgs = {
  input: CreateCustomPaymentInput;
};


export type MutationCreateFilesArgs = {
  files: Array<Scalars['Upload']['input']>;
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreatePricingConfigArgs = {
  input: CreatePricingConfigInput;
};


export type MutationCreateRelayPointArgs = {
  input: CreateRelayPointInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeactivatePricingConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePaymentMethodArgs = {
  paymentMethodId: Scalars['ID']['input'];
};


export type MutationDeleteRelayPointArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAnIntermediaryStepForATaskArgs = {
  intermediaryStep: AddressInput;
  taskId: Scalars['ID']['input'];
};


export type MutationMarkMessagesAsReadArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectApplicationArgs = {
  applicationId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRejectTaskArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationResetPasswordAndSendItByEmailArgs = {
  input: ResetPasswordInput;
};


export type MutationSaveLastPositionArgs = {
  input: AddressInput;
};


export type MutationSendTaskMessageArgs = {
  input: SendTaskMessageInput;
};


export type MutationStartTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationSuspendUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnsubscribeArgs = {
  input: UnsubscribeInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateRelayPointArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRelayPointInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationValidateTaskCompletionArgs = {
  taskId: Scalars['ID']['input'];
  validationCode: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export enum NotificationType {
  InvoiceAdded = 'INVOICE_ADDED',
  Message = 'MESSAGE',
  TaskApplicationAccepted = 'TASK_APPLICATION_ACCEPTED',
  TaskApplicationReceived = 'TASK_APPLICATION_RECEIVED',
  TaskApplicationRejected = 'TASK_APPLICATION_REJECTED',
  TaskCompleted = 'TASK_COMPLETED',
  TaskStatusChanged = 'TASK_STATUS_CHANGED',
  TaskValidated = 'TASK_VALIDATED',
  TransactionStatusUpdated = 'TRANSACTION_STATUS_UPDATED'
}

export type OpeningDay = {
  __typename?: 'OpeningDay';
  close: Scalars['String']['output'];
  day: Scalars['String']['output'];
  isOpen: Scalars['Boolean']['output'];
  open: Scalars['String']['output'];
};

export type OpeningDayInput = {
  close: Scalars['String']['input'];
  day: Scalars['String']['input'];
  isOpen: Scalars['Boolean']['input'];
  open: Scalars['String']['input'];
};

export enum PackageCategory {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export type PackageCategoryInfo = {
  __typename?: 'PackageCategoryInfo';
  category: PackageCategory;
  description: Scalars['String']['output'];
  emoji: Scalars['String']['output'];
  maxVolume: Scalars['Int']['output'];
  maxWeight: Scalars['Int']['output'];
};

export type PaymentIntentResponse = {
  __typename?: 'PaymentIntentResponse';
  amount: Scalars['Float']['output'];
  clientSecret: Scalars['String']['output'];
  intentId: Scalars['String']['output'];
  transactions: Array<Transaction>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  brand: Scalars['String']['output'];
  expiryMonth: Scalars['Int']['output'];
  expiryYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  last4: Scalars['String']['output'];
};

export type PricingConfig = {
  __typename?: 'PricingConfig';
  basePriceLarge: Scalars['Int']['output'];
  basePriceMedium: Scalars['Int']['output'];
  basePriceSmall: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricePerKm: Scalars['Int']['output'];
  pricePerMinute: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PricingRange = {
  __typename?: 'PricingRange';
  estimatedDistanceInMeters: Scalars['Float']['output'];
  estimatedDurationInMinutes: Scalars['Float']['output'];
  maxPriceInCents: Scalars['Int']['output'];
  minPriceInCents: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  activePricingConfig?: Maybe<PricingConfig>;
  calculatePriceRangeFromGeoData: PricingRange;
  getActiveSubscriptions: Array<Transaction>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getFileById: File;
  getMyApplications: Array<TaskApplication>;
  getMyTasks: Array<Task>;
  getNotifications: Array<Notification>;
  getPackageCategories: Array<PackageCategoryInfo>;
  getTask?: Maybe<Task>;
  getTaskApplications: Array<TaskApplication>;
  getTaskMessages: Array<TaskMessage>;
  getTransaction?: Maybe<Transaction>;
  getUnreadMessagesCount: Scalars['Int']['output'];
  getUserPaymentMethods: Array<PaymentMethod>;
  getUserTransactions: Array<Transaction>;
  listFiles: Array<File>;
  listFilesInFolder: Array<File>;
  listPendingTasks: Array<Task>;
  listTasks: Array<Task>;
  listTasksByStatus: Array<Task>;
  listUsers: Array<User>;
  me?: Maybe<User>;
  pricingConfigs: Array<PricingConfig>;
  relayPoint?: Maybe<RelayPoint>;
  relayPoints: Array<RelayPoint>;
};


export type QueryCalculatePriceRangeFromGeoDataArgs = {
  input: GeoPricingInput;
};


export type QueryGetCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFileByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskApplicationsArgs = {
  taskId: Scalars['ID']['input'];
};


export type QueryGetTaskMessagesArgs = {
  taskId: Scalars['ID']['input'];
};


export type QueryGetTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListFilesInFolderArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryListTasksArgs = {
  filters?: InputMaybe<TaskFilters>;
};


export type QueryListTasksByStatusArgs = {
  status: TaskStatus;
};


export type QueryRelayPointArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
};

export type RelayPoint = {
  __typename?: 'RelayPoint';
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  fileId?: Maybe<Scalars['ID']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  openingDays: Array<OpeningDay>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  Partner = 'PARTNER',
  SuperAdmin = 'SUPER_ADMIN',
  Tester = 'TESTER'
}

export type SendTaskMessageInput = {
  content: Scalars['String']['input'];
  messageType?: InputMaybe<MessageType>;
  receiverId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};

export type Shipping = {
  __typename?: 'Shipping';
  calculatedPriceInCents?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deliveryAddress: Address;
  deliveryAddressId: Scalars['ID']['output'];
  estimatedDistanceInMeters?: Maybe<Scalars['Float']['output']>;
  estimatedDurationInMinutes?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  packageCategory: PackageCategory;
  packageDetails?: Maybe<Scalars['JSONObject']['output']>;
  pickupAddress: Address;
  pickupAddressId: Scalars['ID']['output'];
  taskId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum SortByFilterOptions {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subscription = {
  __typename?: 'Subscription';
  onNewNotification: Notification;
};

export type SubscriptionResponse = {
  __typename?: 'SubscriptionResponse';
  clientSecret: Scalars['String']['output'];
  intentId: Scalars['String']['output'];
  transaction: Transaction;
};

export type Task = {
  __typename?: 'Task';
  address: Address;
  addressId: Scalars['ID']['output'];
  applications: Array<TaskApplication>;
  calculatedPriceInCents?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['ID']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['ID']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  messages: Array<TaskMessage>;
  shipping?: Maybe<Shipping>;
  status: TaskStatus;
  title: Scalars['String']['output'];
  type: TaskType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
  validatedAt?: Maybe<Scalars['DateTime']['output']>;
  validationCode?: Maybe<Scalars['String']['output']>;
};

export type TaskApplication = {
  __typename?: 'TaskApplication';
  applicant: User;
  applicantId: Scalars['ID']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: ApplicationStatus;
  task: Task;
  taskId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  validatedAt?: Maybe<Scalars['DateTime']['output']>;
  validationCode?: Maybe<Scalars['String']['output']>;
};

export type TaskFilters = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  durationMax?: InputMaybe<Scalars['Int']['input']>;
  durationMin?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<AddressInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaskStatus>;
  type?: InputMaybe<TaskType>;
};

export type TaskMessage = {
  __typename?: 'TaskMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  messageType: MessageType;
  receiver: User;
  receiverId: Scalars['ID']['output'];
  sender: User;
  senderId: Scalars['ID']['output'];
  taskId: Scalars['ID']['output'];
};

export enum TaskStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Done = 'DONE',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Published = 'PUBLISHED'
}

export enum TaskType {
  Service = 'SERVICE',
  Shipping = 'SHIPPING'
}

export type Token = {
  __typename?: 'Token';
  token: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amountInCents: Scalars['Int']['output'];
  autoRenew?: Maybe<Scalars['Boolean']['output']>;
  canceledAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  currentPeriodEnd?: Maybe<Scalars['DateTime']['output']>;
  currentPeriodStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSubscription: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  priceId?: Maybe<Scalars['String']['output']>;
  relatedInvoice?: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  stripeCustomerId: Scalars['String']['output'];
  stripeIntentId?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  stripePriceId: Scalars['String']['output'];
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  trialEnd?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export enum TransactionStatus {
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  SubscriptionActive = 'SUBSCRIPTION_ACTIVE',
  SubscriptionCanceled = 'SUBSCRIPTION_CANCELED',
  SubscriptionExpired = 'SUBSCRIPTION_EXPIRED',
  SubscriptionInitiated = 'SUBSCRIPTION_INITIATED',
  Succeeded = 'SUCCEEDED'
}

export type UnsubscribeInput = {
  message?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  amountInCents?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRelayPointInput = {
  address?: InputMaybe<AddressInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openingDays?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
};

export type UpdateTaskInput = {
  address?: InputMaybe<AddressInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
  packageDetails?: InputMaybe<Scalars['JSONObject']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSuspended: Scalars['Boolean']['output'];
  isUnderSurveillance: Scalars['Boolean']['output'];
  isUserEmailVerified: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  passwordUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ZipArchive = {
  __typename?: 'ZipArchive';
  content: Scalars['String']['output'];
  filename: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', token: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type ChangePasswordWhileLoggedInMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordWhileLoggedInMutation = { __typename?: 'Mutation', changePasswordWhileLoggedIn: { __typename?: 'Token', token: string } };

export type ResetPasswordAndSendItByEmailMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordAndSendItByEmailMutation = { __typename?: 'Mutation', resetPasswordAndSendItByEmail: boolean };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any }> };

export type ContactUsMutationVariables = Exact<{
  input: ContactUsInput;
}>;


export type ContactUsMutation = { __typename?: 'Mutation', contactUs: boolean };

export type CreateFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateFilesMutation = { __typename?: 'Mutation', createFiles: Array<{ __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any }> };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any } };

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: { __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any } };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };

export type ListFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFilesQuery = { __typename?: 'Query', listFiles: Array<{ __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any }> };

export type GetFileByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFileByIdQuery = { __typename?: 'Query', getFileById: { __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any } };

export type ListFilesInFolderQueryVariables = Exact<{
  folderId: Scalars['ID']['input'];
}>;


export type ListFilesInFolderQuery = { __typename?: 'Query', listFilesInFolder: Array<{ __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any }> };

export type CategoryFragmentFragment = { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any };

export type FileFragmentFragment = { __typename?: 'File', id: string, fileName?: string | null, userId: string, displayName: string, isFolder: boolean, parentFolderId?: string | null, downloadUrl?: string | null, createdAt: any, fileType: FileType, updatedAt: any };

export type NotificationFragment = { __typename?: 'Notification', id: string, title: string, createdAt: any, isRead: boolean, updatedAt: any, type: NotificationType };

export type OpeningDayFragmentFragment = { __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean };

export type PackageCategoryInfoFragmentFragment = { __typename?: 'PackageCategoryInfo', category: PackageCategory, description: string, maxVolume: number, maxWeight: number, emoji: string };

export type PaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, brand: string, last4: string, expiryMonth: number, expiryYear: number, isDefault: boolean };

export type PricingConfigFragmentFragment = { __typename?: 'PricingConfig', id: string, name: string, basePriceSmall: number, basePriceMedium: number, basePriceLarge: number, pricePerKm: number, pricePerMinute: number, isActive: boolean, createdAt: string, updatedAt: string };

export type PricingRangeFragmentFragment = { __typename?: 'PricingRange', minPriceInCents: number, maxPriceInCents: number, estimatedDistanceInMeters: number, estimatedDurationInMinutes: number };

export type RelayPointFragmentFragment = { __typename?: 'RelayPoint', id: string, userId: string, fileId?: string | null, fileUrl?: string | null, name: string, description: string, addressId?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string } | null, openingDays: Array<{ __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean }> };

export type TaskBasicFragmentFragment = { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null };

export type TaskFragmentFragment = { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null };

export type TaskApplicationFragmentFragment = { __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type TaskMessageFragmentFragment = { __typename?: 'TaskMessage', id: string, taskId: string, senderId: string, receiverId: string, content: string, messageType: MessageType, isRead: boolean, createdAt: any, sender: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, receiver: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type AddressFragmentFragment = { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string };

export type ShippingFragmentFragment = { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } };

export type TransactionFragment = { __typename?: 'Transaction', id: string, userId: string, stripeCustomerId: string, stripePriceId: string, stripeInvoiceId?: string | null, stripeIntentId?: string | null, stripeSubscriptionId?: string | null, amountInCents: number, currency: string, description?: string | null, name?: string | null, metadata?: any | null, relatedInvoice?: string | null, status: TransactionStatus, isSubscription: boolean, autoRenew?: boolean | null, trialEnd?: any | null, currentPeriodStart?: any | null, currentPeriodEnd?: any | null, canceledAt?: any | null, paidAt?: any | null, createdAt: any, updatedAt: any };

export type UserFragment = { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

export type ContactUsersMutationVariables = Exact<{
  input: ContactUsersInput;
}>;


export type ContactUsersMutation = { __typename?: 'Mutation', contactUsers: boolean };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Notification', id: string, title: string, createdAt: any, isRead: boolean, updatedAt: any, type: NotificationType }> };

export type OnNewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNewNotificationSubscription = { __typename?: 'Subscription', onNewNotification: { __typename?: 'Notification', id: string, title: string, createdAt: any, isRead: boolean, updatedAt: any, type: NotificationType } };

export type DeletePaymentMethodMutationVariables = Exact<{
  paymentMethodId: Scalars['ID']['input'];
}>;


export type DeletePaymentMethodMutation = { __typename?: 'Mutation', deletePaymentMethod: boolean };

export type GetUserPaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPaymentMethodsQuery = { __typename?: 'Query', getUserPaymentMethods: Array<{ __typename?: 'PaymentMethod', id: string, brand: string, last4: string, expiryMonth: number, expiryYear: number, isDefault: boolean }> };

export type CreatePricingConfigMutationVariables = Exact<{
  input: CreatePricingConfigInput;
}>;


export type CreatePricingConfigMutation = { __typename?: 'Mutation', createPricingConfig: { __typename?: 'PricingConfig', id: string, name: string, basePriceSmall: number, basePriceMedium: number, basePriceLarge: number, pricePerKm: number, pricePerMinute: number, isActive: boolean, createdAt: string, updatedAt: string } };

export type ActivatePricingConfigMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ActivatePricingConfigMutation = { __typename?: 'Mutation', activatePricingConfig: boolean };

export type DeactivatePricingConfigMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeactivatePricingConfigMutation = { __typename?: 'Mutation', deactivatePricingConfig: boolean };

export type PricingConfigsQueryVariables = Exact<{ [key: string]: never; }>;


export type PricingConfigsQuery = { __typename?: 'Query', pricingConfigs: Array<{ __typename?: 'PricingConfig', id: string, name: string, basePriceSmall: number, basePriceMedium: number, basePriceLarge: number, pricePerKm: number, pricePerMinute: number, isActive: boolean, createdAt: string, updatedAt: string }> };

export type ActivePricingConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivePricingConfigQuery = { __typename?: 'Query', activePricingConfig?: { __typename?: 'PricingConfig', id: string, name: string, basePriceSmall: number, basePriceMedium: number, basePriceLarge: number, pricePerKm: number, pricePerMinute: number, isActive: boolean, createdAt: string, updatedAt: string } | null };

export type GetPackageCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPackageCategoriesQuery = { __typename?: 'Query', getPackageCategories: Array<{ __typename?: 'PackageCategoryInfo', category: PackageCategory, description: string, maxVolume: number, maxWeight: number, emoji: string }> };

export type CalculatePriceRangeFromGeoDataQueryVariables = Exact<{
  input: GeoPricingInput;
}>;


export type CalculatePriceRangeFromGeoDataQuery = { __typename?: 'Query', calculatePriceRangeFromGeoData: { __typename?: 'PricingRange', minPriceInCents: number, maxPriceInCents: number, estimatedDistanceInMeters: number, estimatedDurationInMinutes: number } };

export type CreateRelayPointMutationVariables = Exact<{
  input: CreateRelayPointInput;
}>;


export type CreateRelayPointMutation = { __typename?: 'Mutation', createRelayPoint: { __typename?: 'RelayPoint', id: string, userId: string, fileId?: string | null, fileUrl?: string | null, name: string, description: string, addressId?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string } | null, openingDays: Array<{ __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean }> } };

export type UpdateRelayPointMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateRelayPointInput;
}>;


export type UpdateRelayPointMutation = { __typename?: 'Mutation', updateRelayPoint: { __typename?: 'RelayPoint', id: string, userId: string, fileId?: string | null, fileUrl?: string | null, name: string, description: string, addressId?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string } | null, openingDays: Array<{ __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean }> } };

export type DeleteRelayPointMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRelayPointMutation = { __typename?: 'Mutation', deleteRelayPoint: boolean };

export type RelayPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type RelayPointsQuery = { __typename?: 'Query', relayPoints: Array<{ __typename?: 'RelayPoint', id: string, userId: string, fileId?: string | null, fileUrl?: string | null, name: string, description: string, addressId?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string } | null, openingDays: Array<{ __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean }> }> };

export type RelayPointQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RelayPointQuery = { __typename?: 'Query', relayPoint?: { __typename?: 'RelayPoint', id: string, userId: string, fileId?: string | null, fileUrl?: string | null, name: string, description: string, addressId?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string } | null, openingDays: Array<{ __typename?: 'OpeningDay', day: string, open: string, close: string, isOpen: boolean }> } | null };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type ApproveTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApproveTaskMutation = { __typename?: 'Mutation', approveTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type RejectTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectTaskMutation = { __typename?: 'Mutation', rejectTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type ApplyToTaskMutationVariables = Exact<{
  input: ApplyToTaskInput;
}>;


export type ApplyToTaskMutation = { __typename?: 'Mutation', applyToTask: { __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } } };

export type AcceptApplicationMutationVariables = Exact<{
  applicationId: Scalars['ID']['input'];
}>;


export type AcceptApplicationMutation = { __typename?: 'Mutation', acceptApplication: { __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } } };

export type RejectApplicationMutationVariables = Exact<{
  applicationId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', rejectApplication: { __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } } };

export type StartTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type StartTaskMutation = { __typename?: 'Mutation', startTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type CompleteTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type CompleteTaskMutation = { __typename?: 'Mutation', completeTask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type ValidateTaskCompletionMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
  validationCode: Scalars['String']['input'];
}>;


export type ValidateTaskCompletionMutation = { __typename?: 'Mutation', validateTaskCompletion: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type SendTaskMessageMutationVariables = Exact<{
  input: SendTaskMessageInput;
}>;


export type SendTaskMessageMutation = { __typename?: 'Mutation', sendTaskMessage: { __typename?: 'TaskMessage', id: string, taskId: string, senderId: string, receiverId: string, content: string, messageType: MessageType, isRead: boolean, createdAt: any, sender: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, receiver: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } } };

export type MarkMessagesAsReadMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type MarkMessagesAsReadMutation = { __typename?: 'Mutation', markMessagesAsRead: boolean };

export type MarkAnIntermediaryStepForATaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
  intermediaryStep: AddressInput;
}>;


export type MarkAnIntermediaryStepForATaskMutation = { __typename?: 'Mutation', markAnIntermediaryStepForATask: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask?: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } | null };

export type ListTasksQueryVariables = Exact<{
  filters?: InputMaybe<TaskFilters>;
}>;


export type ListTasksQuery = { __typename?: 'Query', listTasks: Array<{ __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null }> };

export type GetMyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTasksQuery = { __typename?: 'Query', getMyTasks: Array<{ __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null }> };

export type GetTaskApplicationsQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type GetTaskApplicationsQuery = { __typename?: 'Query', getTaskApplications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }> };

export type GetMyApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyApplicationsQuery = { __typename?: 'Query', getMyApplications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null }, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } }> };

export type GetTaskMessagesQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type GetTaskMessagesQuery = { __typename?: 'Query', getTaskMessages: Array<{ __typename?: 'TaskMessage', id: string, taskId: string, senderId: string, receiverId: string, content: string, messageType: MessageType, isRead: boolean, createdAt: any, sender: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, receiver: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } }> };

export type GetUnreadMessagesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadMessagesCountQuery = { __typename?: 'Query', getUnreadMessagesCount: number };

export type ListPendingTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPendingTasksQuery = { __typename?: 'Query', listPendingTasks: Array<{ __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null }> };

export type ListTasksByStatusQueryVariables = Exact<{
  status: TaskStatus;
}>;


export type ListTasksByStatusQuery = { __typename?: 'Query', listTasksByStatus: Array<{ __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applications: Array<{ __typename?: 'TaskApplication', id: string, taskId: string, applicantId: string, status: ApplicationStatus, message: string, validationCode?: string | null, startedAt?: any | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, applicant: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, task: { __typename?: 'Task', id: string, userId: string, categoryId?: string | null, type: TaskType, status: TaskStatus, title: string, description: string, estimatedDuration?: number | null, fileId?: string | null, fileUrl?: string | null, addressId: string, calculatedPriceInCents?: number | null, validationCode?: string | null, completedAt?: any | null, validatedAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null } }>, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }, category?: { __typename?: 'Category', id: string, name: string, color?: string | null, fileId?: string | null, fileUrl?: string | null, createdAt: any, description?: string | null, amountInCents: number, updatedAt: any } | null, address: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, shipping?: { __typename?: 'Shipping', id: string, taskId: string, packageCategory: PackageCategory, pickupAddressId: string, deliveryAddressId: string, packageDetails?: any | null, estimatedDistanceInMeters?: number | null, estimatedDurationInMinutes?: number | null, calculatedPriceInCents?: number | null, createdAt: any, updatedAt: any, pickupAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string }, deliveryAddress: { __typename?: 'Address', id: string, mainText: string, secondaryText: string, lat: number, lng: number, placeId: string, fullAddress: string, locationType: string, createdAt: string } } | null }> };

export type CreateCustomPaymentMutationVariables = Exact<{
  input: CreateCustomPaymentInput;
}>;


export type CreateCustomPaymentMutation = { __typename?: 'Mutation', createCustomPayment: { __typename?: 'PaymentIntentResponse', clientSecret: string, intentId: string } };

export type CreateSubscriptionMutationVariables = Exact<{
  input: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'SubscriptionResponse', clientSecret: string, intentId: string, transaction: { __typename?: 'Transaction', id: string, userId: string, stripeCustomerId: string, stripePriceId: string, stripeInvoiceId?: string | null, stripeIntentId?: string | null, stripeSubscriptionId?: string | null, amountInCents: number, currency: string, description?: string | null, name?: string | null, metadata?: any | null, relatedInvoice?: string | null, status: TransactionStatus, isSubscription: boolean, autoRenew?: boolean | null, trialEnd?: any | null, currentPeriodStart?: any | null, currentPeriodEnd?: any | null, canceledAt?: any | null, paidAt?: any | null, createdAt: any, updatedAt: any } } };

export type CancelSubscriptionMutationVariables = Exact<{
  input: CancelSubscriptionInput;
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'CancelSubscriptionResponse', ok: boolean, message?: string | null } };

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, userId: string, stripeCustomerId: string, stripePriceId: string, stripeInvoiceId?: string | null, stripeIntentId?: string | null, stripeSubscriptionId?: string | null, amountInCents: number, currency: string, description?: string | null, name?: string | null, metadata?: any | null, relatedInvoice?: string | null, status: TransactionStatus, isSubscription: boolean, autoRenew?: boolean | null, trialEnd?: any | null, currentPeriodStart?: any | null, currentPeriodEnd?: any | null, canceledAt?: any | null, paidAt?: any | null, createdAt: any, updatedAt: any } | null };

export type GetUserTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTransactionsQuery = { __typename?: 'Query', getUserTransactions: Array<{ __typename?: 'Transaction', id: string, userId: string, stripeCustomerId: string, stripePriceId: string, stripeInvoiceId?: string | null, stripeIntentId?: string | null, stripeSubscriptionId?: string | null, amountInCents: number, currency: string, description?: string | null, name?: string | null, metadata?: any | null, relatedInvoice?: string | null, status: TransactionStatus, isSubscription: boolean, autoRenew?: boolean | null, trialEnd?: any | null, currentPeriodStart?: any | null, currentPeriodEnd?: any | null, canceledAt?: any | null, paidAt?: any | null, createdAt: any, updatedAt: any }> };

export type GetActiveSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveSubscriptionsQuery = { __typename?: 'Query', getActiveSubscriptions: Array<{ __typename?: 'Transaction', id: string, userId: string, stripeCustomerId: string, stripePriceId: string, stripeInvoiceId?: string | null, stripeIntentId?: string | null, stripeSubscriptionId?: string | null, amountInCents: number, currency: string, description?: string | null, name?: string | null, metadata?: any | null, relatedInvoice?: string | null, status: TransactionStatus, isSubscription: boolean, autoRenew?: boolean | null, trialEnd?: any | null, currentPeriodStart?: any | null, currentPeriodEnd?: any | null, canceledAt?: any | null, paidAt?: any | null, createdAt: any, updatedAt: any }> };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type SuspendUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SuspendUserMutation = { __typename?: 'Mutation', suspendUser: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type SaveLastPositionMutationVariables = Exact<{
  input: AddressInput;
}>;


export type SaveLastPositionMutation = { __typename?: 'Mutation', saveLastPosition: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any } | null };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, phone?: string | null, stripeCustomerId?: string | null, role: Role, password?: string | null, passwordUpdatedAt?: any | null, isUserEmailVerified: boolean, isSuspended: boolean, avatar?: string | null, isUnderSurveillance: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any }> };

export const FileFragmentFragmentDoc = gql`
    fragment FileFragment on File {
  id
  fileName
  userId
  displayName
  isFolder
  parentFolderId
  downloadUrl
  createdAt
  fileType
  updatedAt
}
    `;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  title
  createdAt
  isRead
  updatedAt
  type
}
    `;
export const PackageCategoryInfoFragmentFragmentDoc = gql`
    fragment PackageCategoryInfoFragment on PackageCategoryInfo {
  category
  description
  maxVolume
  maxWeight
  emoji
}
    `;
export const PaymentMethodFragmentDoc = gql`
    fragment PaymentMethod on PaymentMethod {
  id
  brand
  last4
  expiryMonth
  expiryYear
  isDefault
}
    `;
export const PricingConfigFragmentFragmentDoc = gql`
    fragment PricingConfigFragment on PricingConfig {
  id
  name
  basePriceSmall
  basePriceMedium
  basePriceLarge
  pricePerKm
  pricePerMinute
  isActive
  createdAt
  updatedAt
}
    `;
export const PricingRangeFragmentFragmentDoc = gql`
    fragment PricingRangeFragment on PricingRange {
  minPriceInCents
  maxPriceInCents
  estimatedDistanceInMeters
  estimatedDurationInMinutes
}
    `;
export const OpeningDayFragmentFragmentDoc = gql`
    fragment OpeningDayFragment on OpeningDay {
  day
  open
  close
  isOpen
}
    `;
export const RelayPointFragmentFragmentDoc = gql`
    fragment RelayPointFragment on RelayPoint {
  id
  userId
  fileId
  fileUrl
  name
  description
  address {
    id
    mainText
    secondaryText
    lat
    lng
    placeId
    fullAddress
    locationType
  }
  addressId
  openingDays {
    ...OpeningDayFragment
  }
  createdAt
  updatedAt
}
    ${OpeningDayFragmentFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  phone
  stripeCustomerId
  role
  password
  passwordUpdatedAt
  isUserEmailVerified
  isSuspended
  avatar
  isUnderSurveillance
  lastLoginAt
  createdAt
  updatedAt
}
    `;
export const CategoryFragmentFragmentDoc = gql`
    fragment CategoryFragment on Category {
  id
  name
  color
  fileId
  fileUrl
  createdAt
  description
  amountInCents
  updatedAt
}
    `;
export const AddressFragmentFragmentDoc = gql`
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
export const ShippingFragmentFragmentDoc = gql`
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
    ${AddressFragmentFragmentDoc}`;
export const TaskBasicFragmentFragmentDoc = gql`
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
    ${UserFragmentDoc}
${CategoryFragmentFragmentDoc}
${AddressFragmentFragmentDoc}
${ShippingFragmentFragmentDoc}`;
export const TaskApplicationFragmentFragmentDoc = gql`
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
    ${UserFragmentDoc}
${TaskBasicFragmentFragmentDoc}`;
export const TaskFragmentFragmentDoc = gql`
    fragment TaskFragment on Task {
  ...TaskBasicFragment
  applications {
    ...TaskApplicationFragment
  }
}
    ${TaskBasicFragmentFragmentDoc}
${TaskApplicationFragmentFragmentDoc}`;
export const TaskMessageFragmentFragmentDoc = gql`
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
    ${UserFragmentDoc}`;
export const TransactionFragmentDoc = gql`
    fragment Transaction on Transaction {
  id
  userId
  stripeCustomerId
  stripePriceId
  stripeInvoiceId
  stripeIntentId
  stripeSubscriptionId
  amountInCents
  currency
  description
  name
  metadata
  relatedInvoice
  status
  isSubscription
  autoRenew
  trialEnd
  currentPeriodStart
  currentPeriodEnd
  canceledAt
  paidAt
  createdAt
  updatedAt
  userId
}
    `;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ChangePasswordWhileLoggedInDocument = gql`
    mutation changePasswordWhileLoggedIn($input: ChangePasswordInput!) {
  changePasswordWhileLoggedIn(input: $input) {
    token
  }
}
    `;
export type ChangePasswordWhileLoggedInMutationFn = Apollo.MutationFunction<ChangePasswordWhileLoggedInMutation, ChangePasswordWhileLoggedInMutationVariables>;

/**
 * __useChangePasswordWhileLoggedInMutation__
 *
 * To run a mutation, you first call `useChangePasswordWhileLoggedInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordWhileLoggedInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordWhileLoggedInMutation, { data, loading, error }] = useChangePasswordWhileLoggedInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordWhileLoggedInMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordWhileLoggedInMutation, ChangePasswordWhileLoggedInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordWhileLoggedInMutation, ChangePasswordWhileLoggedInMutationVariables>(ChangePasswordWhileLoggedInDocument, options);
      }
export type ChangePasswordWhileLoggedInMutationHookResult = ReturnType<typeof useChangePasswordWhileLoggedInMutation>;
export type ChangePasswordWhileLoggedInMutationResult = Apollo.MutationResult<ChangePasswordWhileLoggedInMutation>;
export type ChangePasswordWhileLoggedInMutationOptions = Apollo.BaseMutationOptions<ChangePasswordWhileLoggedInMutation, ChangePasswordWhileLoggedInMutationVariables>;
export const ResetPasswordAndSendItByEmailDocument = gql`
    mutation resetPasswordAndSendItByEmail($input: ResetPasswordInput!) {
  resetPasswordAndSendItByEmail(input: $input)
}
    `;
export type ResetPasswordAndSendItByEmailMutationFn = Apollo.MutationFunction<ResetPasswordAndSendItByEmailMutation, ResetPasswordAndSendItByEmailMutationVariables>;

/**
 * __useResetPasswordAndSendItByEmailMutation__
 *
 * To run a mutation, you first call `useResetPasswordAndSendItByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordAndSendItByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordAndSendItByEmailMutation, { data, loading, error }] = useResetPasswordAndSendItByEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordAndSendItByEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordAndSendItByEmailMutation, ResetPasswordAndSendItByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordAndSendItByEmailMutation, ResetPasswordAndSendItByEmailMutationVariables>(ResetPasswordAndSendItByEmailDocument, options);
      }
export type ResetPasswordAndSendItByEmailMutationHookResult = ReturnType<typeof useResetPasswordAndSendItByEmailMutation>;
export type ResetPasswordAndSendItByEmailMutationResult = Apollo.MutationResult<ResetPasswordAndSendItByEmailMutation>;
export type ResetPasswordAndSendItByEmailMutationOptions = Apollo.BaseMutationOptions<ResetPasswordAndSendItByEmailMutation, ResetPasswordAndSendItByEmailMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
  updateCategory(id: $id, input: $input) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetCategoryDocument = gql`
    query getCategory($id: ID!) {
  getCategory(id: $id) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables> & ({ variables: GetCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategorySuspenseQueryHookResult = ReturnType<typeof useGetCategorySuspenseQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const ContactUsDocument = gql`
    mutation contactUs($input: ContactUsInput!) {
  contactUs(input: $input)
}
    `;
export type ContactUsMutationFn = Apollo.MutationFunction<ContactUsMutation, ContactUsMutationVariables>;

/**
 * __useContactUsMutation__
 *
 * To run a mutation, you first call `useContactUsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactUsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactUsMutation, { data, loading, error }] = useContactUsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactUsMutation(baseOptions?: Apollo.MutationHookOptions<ContactUsMutation, ContactUsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactUsMutation, ContactUsMutationVariables>(ContactUsDocument, options);
      }
export type ContactUsMutationHookResult = ReturnType<typeof useContactUsMutation>;
export type ContactUsMutationResult = Apollo.MutationResult<ContactUsMutation>;
export type ContactUsMutationOptions = Apollo.BaseMutationOptions<ContactUsMutation, ContactUsMutationVariables>;
export const CreateFilesDocument = gql`
    mutation createFiles($files: [Upload!]!, $parentFolderId: ID) {
  createFiles(files: $files, parentFolderId: $parentFolderId) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type CreateFilesMutationFn = Apollo.MutationFunction<CreateFilesMutation, CreateFilesMutationVariables>;

/**
 * __useCreateFilesMutation__
 *
 * To run a mutation, you first call `useCreateFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilesMutation, { data, loading, error }] = useCreateFilesMutation({
 *   variables: {
 *      files: // value for 'files'
 *      parentFolderId: // value for 'parentFolderId'
 *   },
 * });
 */
export function useCreateFilesMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilesMutation, CreateFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilesMutation, CreateFilesMutationVariables>(CreateFilesDocument, options);
      }
export type CreateFilesMutationHookResult = ReturnType<typeof useCreateFilesMutation>;
export type CreateFilesMutationResult = Apollo.MutationResult<CreateFilesMutation>;
export type CreateFilesMutationOptions = Apollo.BaseMutationOptions<CreateFilesMutation, CreateFilesMutationVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($name: String!, $parentFolderId: ID) {
  createFolder(name: $name, parentFolderId: $parentFolderId) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentFolderId: // value for 'parentFolderId'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation uploadAvatar($file: Upload!) {
  uploadAvatar(file: $file) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const DeleteFileDocument = gql`
    mutation deleteFile($id: ID!) {
  deleteFile(id: $id)
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const ListFilesDocument = gql`
    query listFiles {
  listFiles {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useListFilesQuery__
 *
 * To run a query within a React component, call `useListFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListFilesQuery(baseOptions?: Apollo.QueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
      }
export function useListFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
        }
export function useListFilesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
        }
export type ListFilesQueryHookResult = ReturnType<typeof useListFilesQuery>;
export type ListFilesLazyQueryHookResult = ReturnType<typeof useListFilesLazyQuery>;
export type ListFilesSuspenseQueryHookResult = ReturnType<typeof useListFilesSuspenseQuery>;
export type ListFilesQueryResult = Apollo.QueryResult<ListFilesQuery, ListFilesQueryVariables>;
export const GetFileByIdDocument = gql`
    query getFileById($id: ID!) {
  getFileById(id: $id) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useGetFileByIdQuery__
 *
 * To run a query within a React component, call `useGetFileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFileByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFileByIdQuery, GetFileByIdQueryVariables> & ({ variables: GetFileByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileByIdQuery, GetFileByIdQueryVariables>(GetFileByIdDocument, options);
      }
export function useGetFileByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileByIdQuery, GetFileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileByIdQuery, GetFileByIdQueryVariables>(GetFileByIdDocument, options);
        }
export function useGetFileByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFileByIdQuery, GetFileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFileByIdQuery, GetFileByIdQueryVariables>(GetFileByIdDocument, options);
        }
export type GetFileByIdQueryHookResult = ReturnType<typeof useGetFileByIdQuery>;
export type GetFileByIdLazyQueryHookResult = ReturnType<typeof useGetFileByIdLazyQuery>;
export type GetFileByIdSuspenseQueryHookResult = ReturnType<typeof useGetFileByIdSuspenseQuery>;
export type GetFileByIdQueryResult = Apollo.QueryResult<GetFileByIdQuery, GetFileByIdQueryVariables>;
export const ListFilesInFolderDocument = gql`
    query listFilesInFolder($folderId: ID!) {
  listFilesInFolder(folderId: $folderId) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useListFilesInFolderQuery__
 *
 * To run a query within a React component, call `useListFilesInFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFilesInFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFilesInFolderQuery({
 *   variables: {
 *      folderId: // value for 'folderId'
 *   },
 * });
 */
export function useListFilesInFolderQuery(baseOptions: Apollo.QueryHookOptions<ListFilesInFolderQuery, ListFilesInFolderQueryVariables> & ({ variables: ListFilesInFolderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>(ListFilesInFolderDocument, options);
      }
export function useListFilesInFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>(ListFilesInFolderDocument, options);
        }
export function useListFilesInFolderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>(ListFilesInFolderDocument, options);
        }
export type ListFilesInFolderQueryHookResult = ReturnType<typeof useListFilesInFolderQuery>;
export type ListFilesInFolderLazyQueryHookResult = ReturnType<typeof useListFilesInFolderLazyQuery>;
export type ListFilesInFolderSuspenseQueryHookResult = ReturnType<typeof useListFilesInFolderSuspenseQuery>;
export type ListFilesInFolderQueryResult = Apollo.QueryResult<ListFilesInFolderQuery, ListFilesInFolderQueryVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation markAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const ContactUsersDocument = gql`
    mutation contactUsers($input: ContactUsersInput!) {
  contactUsers(input: $input)
}
    `;
export type ContactUsersMutationFn = Apollo.MutationFunction<ContactUsersMutation, ContactUsersMutationVariables>;

/**
 * __useContactUsersMutation__
 *
 * To run a mutation, you first call `useContactUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactUsersMutation, { data, loading, error }] = useContactUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactUsersMutation(baseOptions?: Apollo.MutationHookOptions<ContactUsersMutation, ContactUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactUsersMutation, ContactUsersMutationVariables>(ContactUsersDocument, options);
      }
export type ContactUsersMutationHookResult = ReturnType<typeof useContactUsersMutation>;
export type ContactUsersMutationResult = Apollo.MutationResult<ContactUsersMutation>;
export type ContactUsersMutationOptions = Apollo.BaseMutationOptions<ContactUsersMutation, ContactUsersMutationVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications {
  getNotifications {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const OnNewNotificationDocument = gql`
    subscription onNewNotification {
  onNewNotification {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useOnNewNotificationSubscription__
 *
 * To run a query within a React component, call `useOnNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNewNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnNewNotificationSubscription, OnNewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNewNotificationSubscription, OnNewNotificationSubscriptionVariables>(OnNewNotificationDocument, options);
      }
export type OnNewNotificationSubscriptionHookResult = ReturnType<typeof useOnNewNotificationSubscription>;
export type OnNewNotificationSubscriptionResult = Apollo.SubscriptionResult<OnNewNotificationSubscription>;
export const DeletePaymentMethodDocument = gql`
    mutation deletePaymentMethod($paymentMethodId: ID!) {
  deletePaymentMethod(paymentMethodId: $paymentMethodId)
}
    `;
export type DeletePaymentMethodMutationFn = Apollo.MutationFunction<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;

/**
 * __useDeletePaymentMethodMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMethodMutation, { data, loading, error }] = useDeletePaymentMethodMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *   },
 * });
 */
export function useDeletePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>(DeletePaymentMethodDocument, options);
      }
export type DeletePaymentMethodMutationHookResult = ReturnType<typeof useDeletePaymentMethodMutation>;
export type DeletePaymentMethodMutationResult = Apollo.MutationResult<DeletePaymentMethodMutation>;
export type DeletePaymentMethodMutationOptions = Apollo.BaseMutationOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;
export const GetUserPaymentMethodsDocument = gql`
    query getUserPaymentMethods {
  getUserPaymentMethods {
    ...PaymentMethod
  }
}
    ${PaymentMethodFragmentDoc}`;

/**
 * __useGetUserPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetUserPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPaymentMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>(GetUserPaymentMethodsDocument, options);
      }
export function useGetUserPaymentMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>(GetUserPaymentMethodsDocument, options);
        }
export function useGetUserPaymentMethodsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>(GetUserPaymentMethodsDocument, options);
        }
export type GetUserPaymentMethodsQueryHookResult = ReturnType<typeof useGetUserPaymentMethodsQuery>;
export type GetUserPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetUserPaymentMethodsLazyQuery>;
export type GetUserPaymentMethodsSuspenseQueryHookResult = ReturnType<typeof useGetUserPaymentMethodsSuspenseQuery>;
export type GetUserPaymentMethodsQueryResult = Apollo.QueryResult<GetUserPaymentMethodsQuery, GetUserPaymentMethodsQueryVariables>;
export const CreatePricingConfigDocument = gql`
    mutation createPricingConfig($input: CreatePricingConfigInput!) {
  createPricingConfig(input: $input) {
    ...PricingConfigFragment
  }
}
    ${PricingConfigFragmentFragmentDoc}`;
export type CreatePricingConfigMutationFn = Apollo.MutationFunction<CreatePricingConfigMutation, CreatePricingConfigMutationVariables>;

/**
 * __useCreatePricingConfigMutation__
 *
 * To run a mutation, you first call `useCreatePricingConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePricingConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPricingConfigMutation, { data, loading, error }] = useCreatePricingConfigMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePricingConfigMutation(baseOptions?: Apollo.MutationHookOptions<CreatePricingConfigMutation, CreatePricingConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePricingConfigMutation, CreatePricingConfigMutationVariables>(CreatePricingConfigDocument, options);
      }
export type CreatePricingConfigMutationHookResult = ReturnType<typeof useCreatePricingConfigMutation>;
export type CreatePricingConfigMutationResult = Apollo.MutationResult<CreatePricingConfigMutation>;
export type CreatePricingConfigMutationOptions = Apollo.BaseMutationOptions<CreatePricingConfigMutation, CreatePricingConfigMutationVariables>;
export const ActivatePricingConfigDocument = gql`
    mutation activatePricingConfig($id: ID!) {
  activatePricingConfig(id: $id)
}
    `;
export type ActivatePricingConfigMutationFn = Apollo.MutationFunction<ActivatePricingConfigMutation, ActivatePricingConfigMutationVariables>;

/**
 * __useActivatePricingConfigMutation__
 *
 * To run a mutation, you first call `useActivatePricingConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivatePricingConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activatePricingConfigMutation, { data, loading, error }] = useActivatePricingConfigMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActivatePricingConfigMutation(baseOptions?: Apollo.MutationHookOptions<ActivatePricingConfigMutation, ActivatePricingConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivatePricingConfigMutation, ActivatePricingConfigMutationVariables>(ActivatePricingConfigDocument, options);
      }
export type ActivatePricingConfigMutationHookResult = ReturnType<typeof useActivatePricingConfigMutation>;
export type ActivatePricingConfigMutationResult = Apollo.MutationResult<ActivatePricingConfigMutation>;
export type ActivatePricingConfigMutationOptions = Apollo.BaseMutationOptions<ActivatePricingConfigMutation, ActivatePricingConfigMutationVariables>;
export const DeactivatePricingConfigDocument = gql`
    mutation deactivatePricingConfig($id: ID!) {
  deactivatePricingConfig(id: $id)
}
    `;
export type DeactivatePricingConfigMutationFn = Apollo.MutationFunction<DeactivatePricingConfigMutation, DeactivatePricingConfigMutationVariables>;

/**
 * __useDeactivatePricingConfigMutation__
 *
 * To run a mutation, you first call `useDeactivatePricingConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivatePricingConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivatePricingConfigMutation, { data, loading, error }] = useDeactivatePricingConfigMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeactivatePricingConfigMutation(baseOptions?: Apollo.MutationHookOptions<DeactivatePricingConfigMutation, DeactivatePricingConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivatePricingConfigMutation, DeactivatePricingConfigMutationVariables>(DeactivatePricingConfigDocument, options);
      }
export type DeactivatePricingConfigMutationHookResult = ReturnType<typeof useDeactivatePricingConfigMutation>;
export type DeactivatePricingConfigMutationResult = Apollo.MutationResult<DeactivatePricingConfigMutation>;
export type DeactivatePricingConfigMutationOptions = Apollo.BaseMutationOptions<DeactivatePricingConfigMutation, DeactivatePricingConfigMutationVariables>;
export const PricingConfigsDocument = gql`
    query pricingConfigs {
  pricingConfigs {
    ...PricingConfigFragment
  }
}
    ${PricingConfigFragmentFragmentDoc}`;

/**
 * __usePricingConfigsQuery__
 *
 * To run a query within a React component, call `usePricingConfigsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePricingConfigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePricingConfigsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePricingConfigsQuery(baseOptions?: Apollo.QueryHookOptions<PricingConfigsQuery, PricingConfigsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PricingConfigsQuery, PricingConfigsQueryVariables>(PricingConfigsDocument, options);
      }
export function usePricingConfigsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PricingConfigsQuery, PricingConfigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PricingConfigsQuery, PricingConfigsQueryVariables>(PricingConfigsDocument, options);
        }
export function usePricingConfigsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PricingConfigsQuery, PricingConfigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PricingConfigsQuery, PricingConfigsQueryVariables>(PricingConfigsDocument, options);
        }
export type PricingConfigsQueryHookResult = ReturnType<typeof usePricingConfigsQuery>;
export type PricingConfigsLazyQueryHookResult = ReturnType<typeof usePricingConfigsLazyQuery>;
export type PricingConfigsSuspenseQueryHookResult = ReturnType<typeof usePricingConfigsSuspenseQuery>;
export type PricingConfigsQueryResult = Apollo.QueryResult<PricingConfigsQuery, PricingConfigsQueryVariables>;
export const ActivePricingConfigDocument = gql`
    query activePricingConfig {
  activePricingConfig {
    ...PricingConfigFragment
  }
}
    ${PricingConfigFragmentFragmentDoc}`;

/**
 * __useActivePricingConfigQuery__
 *
 * To run a query within a React component, call `useActivePricingConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivePricingConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivePricingConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivePricingConfigQuery(baseOptions?: Apollo.QueryHookOptions<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>(ActivePricingConfigDocument, options);
      }
export function useActivePricingConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>(ActivePricingConfigDocument, options);
        }
export function useActivePricingConfigSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>(ActivePricingConfigDocument, options);
        }
export type ActivePricingConfigQueryHookResult = ReturnType<typeof useActivePricingConfigQuery>;
export type ActivePricingConfigLazyQueryHookResult = ReturnType<typeof useActivePricingConfigLazyQuery>;
export type ActivePricingConfigSuspenseQueryHookResult = ReturnType<typeof useActivePricingConfigSuspenseQuery>;
export type ActivePricingConfigQueryResult = Apollo.QueryResult<ActivePricingConfigQuery, ActivePricingConfigQueryVariables>;
export const GetPackageCategoriesDocument = gql`
    query getPackageCategories {
  getPackageCategories {
    ...PackageCategoryInfoFragment
  }
}
    ${PackageCategoryInfoFragmentFragmentDoc}`;

/**
 * __useGetPackageCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPackageCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPackageCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPackageCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPackageCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>(GetPackageCategoriesDocument, options);
      }
export function useGetPackageCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>(GetPackageCategoriesDocument, options);
        }
export function useGetPackageCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>(GetPackageCategoriesDocument, options);
        }
export type GetPackageCategoriesQueryHookResult = ReturnType<typeof useGetPackageCategoriesQuery>;
export type GetPackageCategoriesLazyQueryHookResult = ReturnType<typeof useGetPackageCategoriesLazyQuery>;
export type GetPackageCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetPackageCategoriesSuspenseQuery>;
export type GetPackageCategoriesQueryResult = Apollo.QueryResult<GetPackageCategoriesQuery, GetPackageCategoriesQueryVariables>;
export const CalculatePriceRangeFromGeoDataDocument = gql`
    query calculatePriceRangeFromGeoData($input: GeoPricingInput!) {
  calculatePriceRangeFromGeoData(input: $input) {
    ...PricingRangeFragment
  }
}
    ${PricingRangeFragmentFragmentDoc}`;

/**
 * __useCalculatePriceRangeFromGeoDataQuery__
 *
 * To run a query within a React component, call `useCalculatePriceRangeFromGeoDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculatePriceRangeFromGeoDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculatePriceRangeFromGeoDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCalculatePriceRangeFromGeoDataQuery(baseOptions: Apollo.QueryHookOptions<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables> & ({ variables: CalculatePriceRangeFromGeoDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>(CalculatePriceRangeFromGeoDataDocument, options);
      }
export function useCalculatePriceRangeFromGeoDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>(CalculatePriceRangeFromGeoDataDocument, options);
        }
export function useCalculatePriceRangeFromGeoDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>(CalculatePriceRangeFromGeoDataDocument, options);
        }
export type CalculatePriceRangeFromGeoDataQueryHookResult = ReturnType<typeof useCalculatePriceRangeFromGeoDataQuery>;
export type CalculatePriceRangeFromGeoDataLazyQueryHookResult = ReturnType<typeof useCalculatePriceRangeFromGeoDataLazyQuery>;
export type CalculatePriceRangeFromGeoDataSuspenseQueryHookResult = ReturnType<typeof useCalculatePriceRangeFromGeoDataSuspenseQuery>;
export type CalculatePriceRangeFromGeoDataQueryResult = Apollo.QueryResult<CalculatePriceRangeFromGeoDataQuery, CalculatePriceRangeFromGeoDataQueryVariables>;
export const CreateRelayPointDocument = gql`
    mutation createRelayPoint($input: CreateRelayPointInput!) {
  createRelayPoint(input: $input) {
    ...RelayPointFragment
  }
}
    ${RelayPointFragmentFragmentDoc}`;
export type CreateRelayPointMutationFn = Apollo.MutationFunction<CreateRelayPointMutation, CreateRelayPointMutationVariables>;

/**
 * __useCreateRelayPointMutation__
 *
 * To run a mutation, you first call `useCreateRelayPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRelayPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRelayPointMutation, { data, loading, error }] = useCreateRelayPointMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRelayPointMutation(baseOptions?: Apollo.MutationHookOptions<CreateRelayPointMutation, CreateRelayPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRelayPointMutation, CreateRelayPointMutationVariables>(CreateRelayPointDocument, options);
      }
export type CreateRelayPointMutationHookResult = ReturnType<typeof useCreateRelayPointMutation>;
export type CreateRelayPointMutationResult = Apollo.MutationResult<CreateRelayPointMutation>;
export type CreateRelayPointMutationOptions = Apollo.BaseMutationOptions<CreateRelayPointMutation, CreateRelayPointMutationVariables>;
export const UpdateRelayPointDocument = gql`
    mutation updateRelayPoint($id: ID!, $input: UpdateRelayPointInput!) {
  updateRelayPoint(id: $id, input: $input) {
    ...RelayPointFragment
  }
}
    ${RelayPointFragmentFragmentDoc}`;
export type UpdateRelayPointMutationFn = Apollo.MutationFunction<UpdateRelayPointMutation, UpdateRelayPointMutationVariables>;

/**
 * __useUpdateRelayPointMutation__
 *
 * To run a mutation, you first call `useUpdateRelayPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRelayPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRelayPointMutation, { data, loading, error }] = useUpdateRelayPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRelayPointMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRelayPointMutation, UpdateRelayPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRelayPointMutation, UpdateRelayPointMutationVariables>(UpdateRelayPointDocument, options);
      }
export type UpdateRelayPointMutationHookResult = ReturnType<typeof useUpdateRelayPointMutation>;
export type UpdateRelayPointMutationResult = Apollo.MutationResult<UpdateRelayPointMutation>;
export type UpdateRelayPointMutationOptions = Apollo.BaseMutationOptions<UpdateRelayPointMutation, UpdateRelayPointMutationVariables>;
export const DeleteRelayPointDocument = gql`
    mutation deleteRelayPoint($id: ID!) {
  deleteRelayPoint(id: $id)
}
    `;
export type DeleteRelayPointMutationFn = Apollo.MutationFunction<DeleteRelayPointMutation, DeleteRelayPointMutationVariables>;

/**
 * __useDeleteRelayPointMutation__
 *
 * To run a mutation, you first call `useDeleteRelayPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRelayPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRelayPointMutation, { data, loading, error }] = useDeleteRelayPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRelayPointMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRelayPointMutation, DeleteRelayPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRelayPointMutation, DeleteRelayPointMutationVariables>(DeleteRelayPointDocument, options);
      }
export type DeleteRelayPointMutationHookResult = ReturnType<typeof useDeleteRelayPointMutation>;
export type DeleteRelayPointMutationResult = Apollo.MutationResult<DeleteRelayPointMutation>;
export type DeleteRelayPointMutationOptions = Apollo.BaseMutationOptions<DeleteRelayPointMutation, DeleteRelayPointMutationVariables>;
export const RelayPointsDocument = gql`
    query relayPoints {
  relayPoints {
    ...RelayPointFragment
  }
}
    ${RelayPointFragmentFragmentDoc}`;

/**
 * __useRelayPointsQuery__
 *
 * To run a query within a React component, call `useRelayPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelayPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelayPointsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRelayPointsQuery(baseOptions?: Apollo.QueryHookOptions<RelayPointsQuery, RelayPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RelayPointsQuery, RelayPointsQueryVariables>(RelayPointsDocument, options);
      }
export function useRelayPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RelayPointsQuery, RelayPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RelayPointsQuery, RelayPointsQueryVariables>(RelayPointsDocument, options);
        }
export function useRelayPointsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RelayPointsQuery, RelayPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RelayPointsQuery, RelayPointsQueryVariables>(RelayPointsDocument, options);
        }
export type RelayPointsQueryHookResult = ReturnType<typeof useRelayPointsQuery>;
export type RelayPointsLazyQueryHookResult = ReturnType<typeof useRelayPointsLazyQuery>;
export type RelayPointsSuspenseQueryHookResult = ReturnType<typeof useRelayPointsSuspenseQuery>;
export type RelayPointsQueryResult = Apollo.QueryResult<RelayPointsQuery, RelayPointsQueryVariables>;
export const RelayPointDocument = gql`
    query relayPoint($id: ID!) {
  relayPoint(id: $id) {
    ...RelayPointFragment
  }
}
    ${RelayPointFragmentFragmentDoc}`;

/**
 * __useRelayPointQuery__
 *
 * To run a query within a React component, call `useRelayPointQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelayPointQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelayPointQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRelayPointQuery(baseOptions: Apollo.QueryHookOptions<RelayPointQuery, RelayPointQueryVariables> & ({ variables: RelayPointQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RelayPointQuery, RelayPointQueryVariables>(RelayPointDocument, options);
      }
export function useRelayPointLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RelayPointQuery, RelayPointQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RelayPointQuery, RelayPointQueryVariables>(RelayPointDocument, options);
        }
export function useRelayPointSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RelayPointQuery, RelayPointQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RelayPointQuery, RelayPointQueryVariables>(RelayPointDocument, options);
        }
export type RelayPointQueryHookResult = ReturnType<typeof useRelayPointQuery>;
export type RelayPointLazyQueryHookResult = ReturnType<typeof useRelayPointLazyQuery>;
export type RelayPointSuspenseQueryHookResult = ReturnType<typeof useRelayPointSuspenseQuery>;
export type RelayPointQueryResult = Apollo.QueryResult<RelayPointQuery, RelayPointQueryVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($id: ID!, $input: UpdateTaskInput!) {
  updateTask(id: $id, input: $input) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ApproveTaskDocument = gql`
    mutation approveTask($id: ID!) {
  approveTask(id: $id) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type ApproveTaskMutationFn = Apollo.MutationFunction<ApproveTaskMutation, ApproveTaskMutationVariables>;

/**
 * __useApproveTaskMutation__
 *
 * To run a mutation, you first call `useApproveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveTaskMutation, { data, loading, error }] = useApproveTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveTaskMutation(baseOptions?: Apollo.MutationHookOptions<ApproveTaskMutation, ApproveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveTaskMutation, ApproveTaskMutationVariables>(ApproveTaskDocument, options);
      }
export type ApproveTaskMutationHookResult = ReturnType<typeof useApproveTaskMutation>;
export type ApproveTaskMutationResult = Apollo.MutationResult<ApproveTaskMutation>;
export type ApproveTaskMutationOptions = Apollo.BaseMutationOptions<ApproveTaskMutation, ApproveTaskMutationVariables>;
export const RejectTaskDocument = gql`
    mutation rejectTask($id: ID!, $reason: String!) {
  rejectTask(id: $id, reason: $reason) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type RejectTaskMutationFn = Apollo.MutationFunction<RejectTaskMutation, RejectTaskMutationVariables>;

/**
 * __useRejectTaskMutation__
 *
 * To run a mutation, you first call `useRejectTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectTaskMutation, { data, loading, error }] = useRejectTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectTaskMutation(baseOptions?: Apollo.MutationHookOptions<RejectTaskMutation, RejectTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectTaskMutation, RejectTaskMutationVariables>(RejectTaskDocument, options);
      }
export type RejectTaskMutationHookResult = ReturnType<typeof useRejectTaskMutation>;
export type RejectTaskMutationResult = Apollo.MutationResult<RejectTaskMutation>;
export type RejectTaskMutationOptions = Apollo.BaseMutationOptions<RejectTaskMutation, RejectTaskMutationVariables>;
export const ApplyToTaskDocument = gql`
    mutation applyToTask($input: ApplyToTaskInput!) {
  applyToTask(input: $input) {
    ...TaskApplicationFragment
  }
}
    ${TaskApplicationFragmentFragmentDoc}`;
export type ApplyToTaskMutationFn = Apollo.MutationFunction<ApplyToTaskMutation, ApplyToTaskMutationVariables>;

/**
 * __useApplyToTaskMutation__
 *
 * To run a mutation, you first call `useApplyToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyToTaskMutation, { data, loading, error }] = useApplyToTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApplyToTaskMutation(baseOptions?: Apollo.MutationHookOptions<ApplyToTaskMutation, ApplyToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyToTaskMutation, ApplyToTaskMutationVariables>(ApplyToTaskDocument, options);
      }
export type ApplyToTaskMutationHookResult = ReturnType<typeof useApplyToTaskMutation>;
export type ApplyToTaskMutationResult = Apollo.MutationResult<ApplyToTaskMutation>;
export type ApplyToTaskMutationOptions = Apollo.BaseMutationOptions<ApplyToTaskMutation, ApplyToTaskMutationVariables>;
export const AcceptApplicationDocument = gql`
    mutation acceptApplication($applicationId: ID!) {
  acceptApplication(applicationId: $applicationId) {
    ...TaskApplicationFragment
  }
}
    ${TaskApplicationFragmentFragmentDoc}`;
export type AcceptApplicationMutationFn = Apollo.MutationFunction<AcceptApplicationMutation, AcceptApplicationMutationVariables>;

/**
 * __useAcceptApplicationMutation__
 *
 * To run a mutation, you first call `useAcceptApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptApplicationMutation, { data, loading, error }] = useAcceptApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useAcceptApplicationMutation(baseOptions?: Apollo.MutationHookOptions<AcceptApplicationMutation, AcceptApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptApplicationMutation, AcceptApplicationMutationVariables>(AcceptApplicationDocument, options);
      }
export type AcceptApplicationMutationHookResult = ReturnType<typeof useAcceptApplicationMutation>;
export type AcceptApplicationMutationResult = Apollo.MutationResult<AcceptApplicationMutation>;
export type AcceptApplicationMutationOptions = Apollo.BaseMutationOptions<AcceptApplicationMutation, AcceptApplicationMutationVariables>;
export const RejectApplicationDocument = gql`
    mutation rejectApplication($applicationId: ID!, $reason: String!) {
  rejectApplication(applicationId: $applicationId, reason: $reason) {
    ...TaskApplicationFragment
  }
}
    ${TaskApplicationFragmentFragmentDoc}`;
export type RejectApplicationMutationFn = Apollo.MutationFunction<RejectApplicationMutation, RejectApplicationMutationVariables>;

/**
 * __useRejectApplicationMutation__
 *
 * To run a mutation, you first call `useRejectApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectApplicationMutation, { data, loading, error }] = useRejectApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectApplicationMutation(baseOptions?: Apollo.MutationHookOptions<RejectApplicationMutation, RejectApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectApplicationMutation, RejectApplicationMutationVariables>(RejectApplicationDocument, options);
      }
export type RejectApplicationMutationHookResult = ReturnType<typeof useRejectApplicationMutation>;
export type RejectApplicationMutationResult = Apollo.MutationResult<RejectApplicationMutation>;
export type RejectApplicationMutationOptions = Apollo.BaseMutationOptions<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const StartTaskDocument = gql`
    mutation startTask($taskId: ID!) {
  startTask(taskId: $taskId) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type StartTaskMutationFn = Apollo.MutationFunction<StartTaskMutation, StartTaskMutationVariables>;

/**
 * __useStartTaskMutation__
 *
 * To run a mutation, you first call `useStartTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTaskMutation, { data, loading, error }] = useStartTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useStartTaskMutation(baseOptions?: Apollo.MutationHookOptions<StartTaskMutation, StartTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTaskMutation, StartTaskMutationVariables>(StartTaskDocument, options);
      }
export type StartTaskMutationHookResult = ReturnType<typeof useStartTaskMutation>;
export type StartTaskMutationResult = Apollo.MutationResult<StartTaskMutation>;
export type StartTaskMutationOptions = Apollo.BaseMutationOptions<StartTaskMutation, StartTaskMutationVariables>;
export const CompleteTaskDocument = gql`
    mutation completeTask($taskId: ID!) {
  completeTask(taskId: $taskId) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type CompleteTaskMutationFn = Apollo.MutationFunction<CompleteTaskMutation, CompleteTaskMutationVariables>;

/**
 * __useCompleteTaskMutation__
 *
 * To run a mutation, you first call `useCompleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTaskMutation, { data, loading, error }] = useCompleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useCompleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<CompleteTaskMutation, CompleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteTaskMutation, CompleteTaskMutationVariables>(CompleteTaskDocument, options);
      }
export type CompleteTaskMutationHookResult = ReturnType<typeof useCompleteTaskMutation>;
export type CompleteTaskMutationResult = Apollo.MutationResult<CompleteTaskMutation>;
export type CompleteTaskMutationOptions = Apollo.BaseMutationOptions<CompleteTaskMutation, CompleteTaskMutationVariables>;
export const ValidateTaskCompletionDocument = gql`
    mutation validateTaskCompletion($taskId: ID!, $validationCode: String!) {
  validateTaskCompletion(taskId: $taskId, validationCode: $validationCode) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type ValidateTaskCompletionMutationFn = Apollo.MutationFunction<ValidateTaskCompletionMutation, ValidateTaskCompletionMutationVariables>;

/**
 * __useValidateTaskCompletionMutation__
 *
 * To run a mutation, you first call `useValidateTaskCompletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateTaskCompletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateTaskCompletionMutation, { data, loading, error }] = useValidateTaskCompletionMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      validationCode: // value for 'validationCode'
 *   },
 * });
 */
export function useValidateTaskCompletionMutation(baseOptions?: Apollo.MutationHookOptions<ValidateTaskCompletionMutation, ValidateTaskCompletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateTaskCompletionMutation, ValidateTaskCompletionMutationVariables>(ValidateTaskCompletionDocument, options);
      }
export type ValidateTaskCompletionMutationHookResult = ReturnType<typeof useValidateTaskCompletionMutation>;
export type ValidateTaskCompletionMutationResult = Apollo.MutationResult<ValidateTaskCompletionMutation>;
export type ValidateTaskCompletionMutationOptions = Apollo.BaseMutationOptions<ValidateTaskCompletionMutation, ValidateTaskCompletionMutationVariables>;
export const SendTaskMessageDocument = gql`
    mutation sendTaskMessage($input: SendTaskMessageInput!) {
  sendTaskMessage(input: $input) {
    ...TaskMessageFragment
  }
}
    ${TaskMessageFragmentFragmentDoc}`;
export type SendTaskMessageMutationFn = Apollo.MutationFunction<SendTaskMessageMutation, SendTaskMessageMutationVariables>;

/**
 * __useSendTaskMessageMutation__
 *
 * To run a mutation, you first call `useSendTaskMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTaskMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTaskMessageMutation, { data, loading, error }] = useSendTaskMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendTaskMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendTaskMessageMutation, SendTaskMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendTaskMessageMutation, SendTaskMessageMutationVariables>(SendTaskMessageDocument, options);
      }
export type SendTaskMessageMutationHookResult = ReturnType<typeof useSendTaskMessageMutation>;
export type SendTaskMessageMutationResult = Apollo.MutationResult<SendTaskMessageMutation>;
export type SendTaskMessageMutationOptions = Apollo.BaseMutationOptions<SendTaskMessageMutation, SendTaskMessageMutationVariables>;
export const MarkMessagesAsReadDocument = gql`
    mutation markMessagesAsRead($taskId: ID!) {
  markMessagesAsRead(taskId: $taskId)
}
    `;
export type MarkMessagesAsReadMutationFn = Apollo.MutationFunction<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;

/**
 * __useMarkMessagesAsReadMutation__
 *
 * To run a mutation, you first call `useMarkMessagesAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkMessagesAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markMessagesAsReadMutation, { data, loading, error }] = useMarkMessagesAsReadMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useMarkMessagesAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>(MarkMessagesAsReadDocument, options);
      }
export type MarkMessagesAsReadMutationHookResult = ReturnType<typeof useMarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationResult = Apollo.MutationResult<MarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationOptions = Apollo.BaseMutationOptions<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;
export const MarkAnIntermediaryStepForATaskDocument = gql`
    mutation markAnIntermediaryStepForATask($taskId: ID!, $intermediaryStep: AddressInput!) {
  markAnIntermediaryStepForATask(
    taskId: $taskId
    intermediaryStep: $intermediaryStep
  ) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export type MarkAnIntermediaryStepForATaskMutationFn = Apollo.MutationFunction<MarkAnIntermediaryStepForATaskMutation, MarkAnIntermediaryStepForATaskMutationVariables>;

/**
 * __useMarkAnIntermediaryStepForATaskMutation__
 *
 * To run a mutation, you first call `useMarkAnIntermediaryStepForATaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAnIntermediaryStepForATaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAnIntermediaryStepForATaskMutation, { data, loading, error }] = useMarkAnIntermediaryStepForATaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      intermediaryStep: // value for 'intermediaryStep'
 *   },
 * });
 */
export function useMarkAnIntermediaryStepForATaskMutation(baseOptions?: Apollo.MutationHookOptions<MarkAnIntermediaryStepForATaskMutation, MarkAnIntermediaryStepForATaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAnIntermediaryStepForATaskMutation, MarkAnIntermediaryStepForATaskMutationVariables>(MarkAnIntermediaryStepForATaskDocument, options);
      }
export type MarkAnIntermediaryStepForATaskMutationHookResult = ReturnType<typeof useMarkAnIntermediaryStepForATaskMutation>;
export type MarkAnIntermediaryStepForATaskMutationResult = Apollo.MutationResult<MarkAnIntermediaryStepForATaskMutation>;
export type MarkAnIntermediaryStepForATaskMutationOptions = Apollo.BaseMutationOptions<MarkAnIntermediaryStepForATaskMutation, MarkAnIntermediaryStepForATaskMutationVariables>;
export const GetTaskDocument = gql`
    query getTask($id: ID!) {
  getTask(id: $id) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables> & ({ variables: GetTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const ListTasksDocument = gql`
    query listTasks($filters: TaskFilters) {
  listTasks(filters: $filters) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useListTasksQuery__
 *
 * To run a query within a React component, call `useListTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useListTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListTasksQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListTasksQuery(baseOptions?: Apollo.QueryHookOptions<ListTasksQuery, ListTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTasksQuery, ListTasksQueryVariables>(ListTasksDocument, options);
      }
export function useListTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTasksQuery, ListTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTasksQuery, ListTasksQueryVariables>(ListTasksDocument, options);
        }
export function useListTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListTasksQuery, ListTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListTasksQuery, ListTasksQueryVariables>(ListTasksDocument, options);
        }
export type ListTasksQueryHookResult = ReturnType<typeof useListTasksQuery>;
export type ListTasksLazyQueryHookResult = ReturnType<typeof useListTasksLazyQuery>;
export type ListTasksSuspenseQueryHookResult = ReturnType<typeof useListTasksSuspenseQuery>;
export type ListTasksQueryResult = Apollo.QueryResult<ListTasksQuery, ListTasksQueryVariables>;
export const GetMyTasksDocument = gql`
    query getMyTasks {
  getMyTasks {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useGetMyTasksQuery__
 *
 * To run a query within a React component, call `useGetMyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
      }
export function useGetMyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
export function useGetMyTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
export type GetMyTasksQueryHookResult = ReturnType<typeof useGetMyTasksQuery>;
export type GetMyTasksLazyQueryHookResult = ReturnType<typeof useGetMyTasksLazyQuery>;
export type GetMyTasksSuspenseQueryHookResult = ReturnType<typeof useGetMyTasksSuspenseQuery>;
export type GetMyTasksQueryResult = Apollo.QueryResult<GetMyTasksQuery, GetMyTasksQueryVariables>;
export const GetTaskApplicationsDocument = gql`
    query getTaskApplications($taskId: ID!) {
  getTaskApplications(taskId: $taskId) {
    ...TaskApplicationFragment
  }
}
    ${TaskApplicationFragmentFragmentDoc}`;

/**
 * __useGetTaskApplicationsQuery__
 *
 * To run a query within a React component, call `useGetTaskApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskApplicationsQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables> & ({ variables: GetTaskApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>(GetTaskApplicationsDocument, options);
      }
export function useGetTaskApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>(GetTaskApplicationsDocument, options);
        }
export function useGetTaskApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>(GetTaskApplicationsDocument, options);
        }
export type GetTaskApplicationsQueryHookResult = ReturnType<typeof useGetTaskApplicationsQuery>;
export type GetTaskApplicationsLazyQueryHookResult = ReturnType<typeof useGetTaskApplicationsLazyQuery>;
export type GetTaskApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetTaskApplicationsSuspenseQuery>;
export type GetTaskApplicationsQueryResult = Apollo.QueryResult<GetTaskApplicationsQuery, GetTaskApplicationsQueryVariables>;
export const GetMyApplicationsDocument = gql`
    query getMyApplications {
  getMyApplications {
    ...TaskApplicationFragment
    task {
      ...TaskFragment
    }
  }
}
    ${TaskApplicationFragmentFragmentDoc}
${TaskFragmentFragmentDoc}`;

/**
 * __useGetMyApplicationsQuery__
 *
 * To run a query within a React component, call `useGetMyApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>(GetMyApplicationsDocument, options);
      }
export function useGetMyApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>(GetMyApplicationsDocument, options);
        }
export function useGetMyApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>(GetMyApplicationsDocument, options);
        }
export type GetMyApplicationsQueryHookResult = ReturnType<typeof useGetMyApplicationsQuery>;
export type GetMyApplicationsLazyQueryHookResult = ReturnType<typeof useGetMyApplicationsLazyQuery>;
export type GetMyApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetMyApplicationsSuspenseQuery>;
export type GetMyApplicationsQueryResult = Apollo.QueryResult<GetMyApplicationsQuery, GetMyApplicationsQueryVariables>;
export const GetTaskMessagesDocument = gql`
    query getTaskMessages($taskId: ID!) {
  getTaskMessages(taskId: $taskId) {
    ...TaskMessageFragment
  }
}
    ${TaskMessageFragmentFragmentDoc}`;

/**
 * __useGetTaskMessagesQuery__
 *
 * To run a query within a React component, call `useGetTaskMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskMessagesQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetTaskMessagesQuery, GetTaskMessagesQueryVariables> & ({ variables: GetTaskMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>(GetTaskMessagesDocument, options);
      }
export function useGetTaskMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>(GetTaskMessagesDocument, options);
        }
export function useGetTaskMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>(GetTaskMessagesDocument, options);
        }
export type GetTaskMessagesQueryHookResult = ReturnType<typeof useGetTaskMessagesQuery>;
export type GetTaskMessagesLazyQueryHookResult = ReturnType<typeof useGetTaskMessagesLazyQuery>;
export type GetTaskMessagesSuspenseQueryHookResult = ReturnType<typeof useGetTaskMessagesSuspenseQuery>;
export type GetTaskMessagesQueryResult = Apollo.QueryResult<GetTaskMessagesQuery, GetTaskMessagesQueryVariables>;
export const GetUnreadMessagesCountDocument = gql`
    query getUnreadMessagesCount {
  getUnreadMessagesCount
}
    `;

/**
 * __useGetUnreadMessagesCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadMessagesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadMessagesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadMessagesCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadMessagesCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(GetUnreadMessagesCountDocument, options);
      }
export function useGetUnreadMessagesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(GetUnreadMessagesCountDocument, options);
        }
export function useGetUnreadMessagesCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>(GetUnreadMessagesCountDocument, options);
        }
export type GetUnreadMessagesCountQueryHookResult = ReturnType<typeof useGetUnreadMessagesCountQuery>;
export type GetUnreadMessagesCountLazyQueryHookResult = ReturnType<typeof useGetUnreadMessagesCountLazyQuery>;
export type GetUnreadMessagesCountSuspenseQueryHookResult = ReturnType<typeof useGetUnreadMessagesCountSuspenseQuery>;
export type GetUnreadMessagesCountQueryResult = Apollo.QueryResult<GetUnreadMessagesCountQuery, GetUnreadMessagesCountQueryVariables>;
export const ListPendingTasksDocument = gql`
    query listPendingTasks {
  listPendingTasks {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useListPendingTasksQuery__
 *
 * To run a query within a React component, call `useListPendingTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPendingTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPendingTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPendingTasksQuery(baseOptions?: Apollo.QueryHookOptions<ListPendingTasksQuery, ListPendingTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPendingTasksQuery, ListPendingTasksQueryVariables>(ListPendingTasksDocument, options);
      }
export function useListPendingTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPendingTasksQuery, ListPendingTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPendingTasksQuery, ListPendingTasksQueryVariables>(ListPendingTasksDocument, options);
        }
export function useListPendingTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListPendingTasksQuery, ListPendingTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPendingTasksQuery, ListPendingTasksQueryVariables>(ListPendingTasksDocument, options);
        }
export type ListPendingTasksQueryHookResult = ReturnType<typeof useListPendingTasksQuery>;
export type ListPendingTasksLazyQueryHookResult = ReturnType<typeof useListPendingTasksLazyQuery>;
export type ListPendingTasksSuspenseQueryHookResult = ReturnType<typeof useListPendingTasksSuspenseQuery>;
export type ListPendingTasksQueryResult = Apollo.QueryResult<ListPendingTasksQuery, ListPendingTasksQueryVariables>;
export const ListTasksByStatusDocument = gql`
    query listTasksByStatus($status: TaskStatus!) {
  listTasksByStatus(status: $status) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useListTasksByStatusQuery__
 *
 * To run a query within a React component, call `useListTasksByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useListTasksByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListTasksByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useListTasksByStatusQuery(baseOptions: Apollo.QueryHookOptions<ListTasksByStatusQuery, ListTasksByStatusQueryVariables> & ({ variables: ListTasksByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>(ListTasksByStatusDocument, options);
      }
export function useListTasksByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>(ListTasksByStatusDocument, options);
        }
export function useListTasksByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>(ListTasksByStatusDocument, options);
        }
export type ListTasksByStatusQueryHookResult = ReturnType<typeof useListTasksByStatusQuery>;
export type ListTasksByStatusLazyQueryHookResult = ReturnType<typeof useListTasksByStatusLazyQuery>;
export type ListTasksByStatusSuspenseQueryHookResult = ReturnType<typeof useListTasksByStatusSuspenseQuery>;
export type ListTasksByStatusQueryResult = Apollo.QueryResult<ListTasksByStatusQuery, ListTasksByStatusQueryVariables>;
export const CreateCustomPaymentDocument = gql`
    mutation createCustomPayment($input: CreateCustomPaymentInput!) {
  createCustomPayment(input: $input) {
    clientSecret
    intentId
  }
}
    `;
export type CreateCustomPaymentMutationFn = Apollo.MutationFunction<CreateCustomPaymentMutation, CreateCustomPaymentMutationVariables>;

/**
 * __useCreateCustomPaymentMutation__
 *
 * To run a mutation, you first call `useCreateCustomPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomPaymentMutation, { data, loading, error }] = useCreateCustomPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomPaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomPaymentMutation, CreateCustomPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomPaymentMutation, CreateCustomPaymentMutationVariables>(CreateCustomPaymentDocument, options);
      }
export type CreateCustomPaymentMutationHookResult = ReturnType<typeof useCreateCustomPaymentMutation>;
export type CreateCustomPaymentMutationResult = Apollo.MutationResult<CreateCustomPaymentMutation>;
export type CreateCustomPaymentMutationOptions = Apollo.BaseMutationOptions<CreateCustomPaymentMutation, CreateCustomPaymentMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation createSubscription($input: CreateSubscriptionInput!) {
  createSubscription(input: $input) {
    clientSecret
    intentId
    transaction {
      ...Transaction
    }
  }
}
    ${TransactionFragmentDoc}`;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const CancelSubscriptionDocument = gql`
    mutation cancelSubscription($input: CancelSubscriptionInput!) {
  cancelSubscription(input: $input) {
    ok
    message
  }
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const GetTransactionDocument = gql`
    query getTransaction($id: ID!) {
  getTransaction(id: $id) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransactionQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables> & ({ variables: GetTransactionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
      }
export function useGetTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export function useGetTransactionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionSuspenseQueryHookResult = ReturnType<typeof useGetTransactionSuspenseQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const GetUserTransactionsDocument = gql`
    query getUserTransactions {
  getUserTransactions {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetUserTransactionsQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, options);
      }
export function useGetUserTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, options);
        }
export function useGetUserTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, options);
        }
export type GetUserTransactionsQueryHookResult = ReturnType<typeof useGetUserTransactionsQuery>;
export type GetUserTransactionsLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsLazyQuery>;
export type GetUserTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetUserTransactionsSuspenseQuery>;
export type GetUserTransactionsQueryResult = Apollo.QueryResult<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>;
export const GetActiveSubscriptionsDocument = gql`
    query getActiveSubscriptions {
  getActiveSubscriptions {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetActiveSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetActiveSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveSubscriptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>(GetActiveSubscriptionsDocument, options);
      }
export function useGetActiveSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>(GetActiveSubscriptionsDocument, options);
        }
export function useGetActiveSubscriptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>(GetActiveSubscriptionsDocument, options);
        }
export type GetActiveSubscriptionsQueryHookResult = ReturnType<typeof useGetActiveSubscriptionsQuery>;
export type GetActiveSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetActiveSubscriptionsLazyQuery>;
export type GetActiveSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useGetActiveSubscriptionsSuspenseQuery>;
export type GetActiveSubscriptionsQueryResult = Apollo.QueryResult<GetActiveSubscriptionsQuery, GetActiveSubscriptionsQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const SuspendUserDocument = gql`
    mutation suspendUser($id: ID!) {
  suspendUser(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type SuspendUserMutationFn = Apollo.MutationFunction<SuspendUserMutation, SuspendUserMutationVariables>;

/**
 * __useSuspendUserMutation__
 *
 * To run a mutation, you first call `useSuspendUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSuspendUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [suspendUserMutation, { data, loading, error }] = useSuspendUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSuspendUserMutation(baseOptions?: Apollo.MutationHookOptions<SuspendUserMutation, SuspendUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SuspendUserMutation, SuspendUserMutationVariables>(SuspendUserDocument, options);
      }
export type SuspendUserMutationHookResult = ReturnType<typeof useSuspendUserMutation>;
export type SuspendUserMutationResult = Apollo.MutationResult<SuspendUserMutation>;
export type SuspendUserMutationOptions = Apollo.BaseMutationOptions<SuspendUserMutation, SuspendUserMutationVariables>;
export const SaveLastPositionDocument = gql`
    mutation saveLastPosition($input: AddressInput!) {
  saveLastPosition(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type SaveLastPositionMutationFn = Apollo.MutationFunction<SaveLastPositionMutation, SaveLastPositionMutationVariables>;

/**
 * __useSaveLastPositionMutation__
 *
 * To run a mutation, you first call `useSaveLastPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLastPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLastPositionMutation, { data, loading, error }] = useSaveLastPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveLastPositionMutation(baseOptions?: Apollo.MutationHookOptions<SaveLastPositionMutation, SaveLastPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveLastPositionMutation, SaveLastPositionMutationVariables>(SaveLastPositionDocument, options);
      }
export type SaveLastPositionMutationHookResult = ReturnType<typeof useSaveLastPositionMutation>;
export type SaveLastPositionMutationResult = Apollo.MutationResult<SaveLastPositionMutation>;
export type SaveLastPositionMutationOptions = Apollo.BaseMutationOptions<SaveLastPositionMutation, SaveLastPositionMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ListUsersDocument = gql`
    query listUsers {
  listUsers {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export function useListUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersSuspenseQueryHookResult = ReturnType<typeof useListUsersSuspenseQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;