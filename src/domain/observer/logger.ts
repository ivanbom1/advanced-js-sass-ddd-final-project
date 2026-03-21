import { subscribe } from "./observer";
import { DomainEvent } from "../../domain/events/events";

export const cliLoggerObserver = (event: DomainEvent) => {
  switch (event.type) {
    case "StudentEnrolled":
      console.log(
        `[StudentEnrolled] ${event.studentId} enrolled in ${event.courseCode}`,
      );
      break;

    case "CourseCapacityReached":
      const percent = Math.round(
        (event.currentEnrollment / event.capacity) * 100,
      );
      console.log(
        `[CourseCapacityReached] ${event.courseCode} is at ${percent}% capacity`,
      );
      break;

    case "CourseFull":
      console.log(`[CourseFull] ${event.courseCode} is now completely full!`);
      break;

    case "EnrollmentCancelled":
      console.log(`[EnrollmentCancelled] ${event.enrollmentId} was cancelled`);
      break;
  }
};

export function setupCliLogger() {
  subscribe(cliLoggerObserver);
}
