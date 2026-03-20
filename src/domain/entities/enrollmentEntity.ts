    import { StudentId, CourseCode, Semester, EnrollmentId, createEnrollmentId, createStudentId, createCourseCode, createSemester } from "./types";
export type Enrollment = {
    id: EnrollmentId;
    studentId: StudentId;
    courseCode: CourseCode;
    semester: Semester;
    status: "active" | "cancelled";
};

export function createEnrollment(
    id: string,
    studentId: string,
    courseCode: string,
    semester: string,
): Enrollment {
    const validEnrollmentId = createEnrollmentId(id);
    const validStudentId = createStudentId(studentId);
    const validCourseCode = createCourseCode(courseCode);
    const validSemester = createSemester(semester);

    return { id: validEnrollmentId, 
             studentId: validStudentId, 
             courseCode: validCourseCode, 
             semester: validSemester, 
             status: "active" };
}