import { request, response } from "express";
import {
  createVisitor as createVisitorService,
  getVisitorById as getVisitorByIdService,
  getAllVisitors as getAllVisitorsService,
  getVisitorByPhoneNumber as getVisitorByPhoneNumberService,
  deleteVisitor as deleteVisitorService,
} from "../services/visitor.service";
import { isAppError } from "../utils/errorGuards";

export const getVisitors = async (_req: typeof request, res: typeof response) => {
  try {
    const visitors = await getAllVisitorsService();
    res.status(200).json({ data: visitors });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVisitorById = async (
  req: typeof request,
  res: typeof response,
) => {
  try {
    const visitor = await getVisitorByIdService(req.params.id as string);
    res.status(200).json({ data: visitor });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVisitorByPhoneNumber = async (
  req: typeof request,
  res: typeof response,
) => {
  try {
    const visitor = await getVisitorByPhoneNumberService(
      req.params.phoneNumber as string,
    );
    res.status(200).json({ data: visitor });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createVisitor = async (
  req: typeof request,
  res: typeof response,
) => {
  try {
    const visitor = await createVisitorService(req.body);
    res
      .status(200)
      .json({ message: "Visitor created successfully", data: visitor });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteVisitor = async (
  req: typeof request,
  res: typeof response,
) => {
  try {
    const visitor = await deleteVisitorService(req.params.id as string);
    res
      .status(200)
      .json({ message: "Visitor deleted successfully", data: visitor });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
