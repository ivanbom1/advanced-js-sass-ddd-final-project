import { createStudent, Student  } from "./studentEntity";
import { createCourse, Course } from "./courseEntity";
import { createEnrollment, Enrollment } from "./enrollmentEntity";
import { createStudentId, createCourseCode, createCredits } from "./types";


export function enrollStudentInCourse(student: Student, course: Course, semester: string): Enrollment {

    if (course.enrolledCount >= course.capacity) {
        throw new Error("Course is full");
    }

    const newCredits = student.enrolledCredits + course.credits;
    if (newCredits > 18) {
        throw new Error(`Cannot enroll: ${newCredits} credits exceeds 18 credit limit`);
    }

    student.enrolledCredits += course.credits;
    course.enrolledCount++;

    return createEnrollment(`ENR-${Date.now()}`, student.id, course.code, semester);
}