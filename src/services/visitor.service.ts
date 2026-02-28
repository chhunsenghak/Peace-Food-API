import mongoose from "mongoose";
import { IVisitor } from "../models/visitor";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/error";
import { VisitorDAO } from "../dao/visitor.dao";
import { isAppError } from "../utils/errorGuards";
import { emitVisitorCreated, emitVisitorDeleted } from "../realtime/socket";


export const createVisitor = async (visitorData: IVisitor) => {
  try {
    const exitingVisitor = await VisitorDAO.findByPhoneNumber(
      visitorData.phoneNumber,
    );
    if (exitingVisitor) {
      throw new BadRequestError("PHONE_NUMBER_ALREADY_EXISTS");
    }
    const visitor = await VisitorDAO.create(visitorData);
    emitVisitorCreated(visitor);
    return visitor;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in createVisitor:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};


export const getVisitorById = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_VISITOR_ID");
    }
    const visitor = await VisitorDAO.findById(id);
    if (!visitor) {
      throw new NotFoundError("VISITOR_NOT_FOUND");
    }
    return visitor;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in getVisitorById:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const getAllVisitors = async () => {
  try {
    const visitors = await VisitorDAO.findAll();
    if (!visitors) {
      throw new NotFoundError("VISITORS_NOT_FOUND");
    }
    return visitors;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in getAllVisitors:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};


export const getVisitorByPhoneNumber = async (phoneNumber: string) => {
  try {
    const visitor = await VisitorDAO.findByPhoneNumber(phoneNumber);
    if (!visitor) {
      throw new NotFoundError("VISITOR_NOT_FOUND");
    }
    return visitor;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in getVisitorByPhoneNumber:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};


export const deleteVisitor = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_VISITOR_ID");
    }
    const visitor = await VisitorDAO.deleteVisitor(id);
    if (!visitor) {
      throw new NotFoundError("VISITOR_NOT_FOUND");
    }
    emitVisitorDeleted(visitor);
    return visitor;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in deleteVisitor:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};
