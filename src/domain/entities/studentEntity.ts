import { StudentId, Email, Credits, createStudentId, createEmail  } from "./types";

export type Student = {
    id: StudentId,
    name: string,
    email: Email,
    enrolledCredits?: number;
};

export function createStudent(
    id: string,
    name: string,
    email: string,
    enrolledCredits?: number,
): Student {
    const validId = createStudentId(id);
    const validEmail = createEmail(email);
    if (!name || name.trim() === "") {
        throw new Error("Student's name can't be empty");
    }

    if (enrolledCredits && enrolledCredits > 18) {
        throw new Error("Max 18 credits per semester");
    }
    return {id: validId, name, email: validEmail, enrolledCredits};
}
