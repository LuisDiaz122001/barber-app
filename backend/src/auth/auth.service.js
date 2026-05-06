import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTRO
export async function registerUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: "CLIENT",
        },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// LOGIN
export async function loginUser(data) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        },
    });

    if (!user) throw new Error("Usuario no existe");

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({
            userId: user.id,
            role: user.role,
        },
        "SECRET_KEY", {
            expiresIn: "1d"
        },
    );

    return {
        token
    };
}