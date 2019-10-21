import jwt_decode from 'jwt-decode';
import { getToken } from './auth';

export const getUserId = (token) => {
  return jwt_decode(token).userId;
};

export const shouldShowIntroduction = (token) => {
  return jwt_decode(token).showIntroduction;
}

export const hasPaymentMethod = (token) => {
  return jwt_decode(token).hasPaymentMethod;
}

export const getTrialPeriodDays = (token) => {
  const decoded = jwt_decode(token);
  const unixDate = decoded.currentPeriodEnds;
  const trialEndDate = new Date(unixDate * 1000);
  const oneDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.round(Math.abs((new Date() - trialEndDate) / oneDay))
  return daysLeft;
}
