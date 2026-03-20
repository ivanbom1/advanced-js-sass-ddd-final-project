import { eventBus } from "./observer";
import { DomainEvent } from "../../domain/events/events";

type StudentEnrolledEvent = Extract<DomainEvent, { type: "StudentEnrolled" }>;
type CourseCapacityReachedEvent = Extract<
  DomainEvent,
  { type: "CourseCapacityReached" }
>;
type CourseFullEvent = Extract<DomainEvent, { type: "CourseFull" }>;
type EnrollmentCancelledEvent = Extract<
  DomainEvent,
  { type: "EnrollmentCancelled" }
>;

export function setupCliLogger() {
  eventBus.subscribe("StudentEnrolled", (p: StudentEnrolledEvent) =>
    console.log(`[StudentEnrolled] ${p.studentId} enrolled in ${p.courseCode}`),
  );

  eventBus.subscribe(
    "CourseCapacityReached",
    (p: CourseCapacityReachedEvent) => {
      // Calculate the percentage on the fly for the logger
      const percent = Math.round((p.currentEnrollment / p.capacity) * 100);
      console.log(
        `[CourseCapacityReached] ${p.courseCode} is at ${percent}% capacity`,
      );
    },
  );

  eventBus.subscribe("CourseFull", (p: CourseFullEvent) =>
    console.log(`[CourseFull] ${p.courseCode} is now completely full!`),
  );

  eventBus.subscribe("EnrollmentCancelled", (p: EnrollmentCancelledEvent) =>
    console.log(`[EnrollmentCancelled] ${p.enrollmentId} was cancelled`),
  );
}
