import { CourseCode, Credits, createCourseCode, createCredits } from "./types";
export type Course = {
    code: CourseCode;
    name: string;
    credits: Credits;
    capacity: number;
    enrolledCount: number;
};

export function createCourse(
    code: string,
    name: string,
    credits: number,
    capacity: number,
): Course {
    const validCourseCode = createCourseCode(code);
    const validCredits = createCredits(credits);

    if (capacity < 1 || capacity > 200) {
        throw new Error("Capacity must be 1-200");
    }

    return { code: validCourseCode, name, credits: validCredits, capacity, enrolledCount: 0};
}