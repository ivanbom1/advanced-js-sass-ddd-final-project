import { CourseCode, EnrollmentId, StudentId } from "../entities/types";

export type DomainEvent =
  | {
      type: "StudentEnrolled";
      enrollmentId: EnrollmentId;
      studentId: StudentId;
      courseCode: CourseCode;
    }
  | {
      type: "CourseCapacityReached";
      courseCode: CourseCode;
      currentEnrollment: number;
      capacity: number;
    }
  | { type: "CourseFull"; courseCode: CourseCode }
  | { type: "EnrollmentCancelled"; enrollmentId: EnrollmentId };
