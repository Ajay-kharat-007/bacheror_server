import { AdminModel } from './../models/admin.model';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';


// User CRUD Operations 

export const getUser = asyncHandler(async (req: Request<{ id: any }, {}, {}, {}>, res: Response) => {
    try {
        const contacts = await AdminModel.findOne({ _id: req.params.id });

        if (!contacts) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    try {
        const contacts = await AdminModel.find({});
        res.status(200).json({
            successs: true,
            data: contacts
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const contact = await AdminModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    await AdminModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        message: 'user updated successfully'
    });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const contact = await AdminModel.findById(req.params.id);

    if (!contact) {
        res.status(404).send('Contact not found');
    }

    await AdminModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {

    const { id, firstName, lastName, email, address} = req.body;

    if (!email || !id || !firstName || !lastName || !address) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const existingUser = await AdminModel.findOne({ email: email });

    if (existingUser) {
        res.status(400);
        throw new Error("Email Already Exists !!");
    }

    const contacts = await AdminModel.find({});
    const user = await AdminModel.create({
        ...req.body,
        email,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            userCode: 2300 + contacts.length + 1,
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});