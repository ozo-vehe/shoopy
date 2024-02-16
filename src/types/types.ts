export type ErrorResponse = {
  code: string;
  message?: string;
  issues?: { message: string }[];
};

export type UserInfo = {
  email?: string;
  country?: string;
  picture?: string;
  givenName?: string;
  familyName?: string;
  streetAddress?: string;
  locality?: string;
  phoneNumber?: string;
  postalCode?: string;
};
